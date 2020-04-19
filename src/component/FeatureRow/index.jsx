import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map} from 'immutable'

import modelMap from '../../model/map'
import modelStyle from '../../model/style'
import Icon from  '../Icon'
import Property from '../Property'

class FeatureRow extends React.Component {

	constructor (props){
		super(props)
		const {featureState} = props

		this.ogFeatureState = featureState || Map({})

		this.state = {
			groupShows:{
				properties: true,
				featureState: true,
			}
		}
	}

	handleChange = async ({name, value})=>{
		const {feature, style} = this.props

		// store feature state on feature in store
		await modelStyle.actions.setFeatureState({
			featureId: String(feature.id),
			source: feature.source,
			sourceLayer: feature.sourceLayer,
			featureState: value,
			style,
		})
	}

	handleDeploy = async ()=>{
		const {featureState} = this.props
		await modelMap.actions.setFeatureStateDeploy({deploy:true})
		this.ogFeatureState = featureState
	}

	handleGroupShow = ({group, show})=>{
		const {groupShows} = this.state
		this.setState({
			groupShows: {...groupShows, [group]: show}
		})
	}

	render (){
		const {feature, style} = this.props, 
			{featureStateShow} = this.state

		return (
			<div className="content-body-row feature-row">
				<div className="clearfix feature-row-title">
					<Icon className="pr-2" icon="map-focus"/>
					feature {feature.id}
				</div>
				{this.renderProperties()}
				{this.renderFeatureState()}
			</div>
		)
	}

	renderProperties (){
		const {feature, style} = this.props,
			{groupShows} = this.state

		if (!groupShows.properties){
			return (
				<div className="content-body-group interactive" onClick={()=>this.handleGroupShow({group:'properties',show:true})}>
					<span className="content-body-group-icon">
						<Icon icon={'group-open'}/>
					</span>
					<span className="">
						properties
					</span>
				</div>
			)
		}

		return (
			<React.Fragment>
				<div className="content-body-group interactive" onClick={()=>this.handleGroupShow({group:'properties',show:false})}>
					<span className="content-body-group-icon">
						<Icon icon={'group-close'}/>
					</span>
					<span className="">
						properties
					</span>
				</div>
				<div className="info-content">
					<div className="clearfix">
						<span className="text-muted">
							ID
						</span>
						<span className="float-right text-flow-breaks">
							{feature.id}
						</span>
					</div>
					{feature.properties && Object.keys(feature.properties).map(prop => {
						return (
							<div className="clearfix feature-property-row" key={prop}>
								<span className="text-muted">
									{prop}
								</span>
								<span className="float-right text-flow-breaks">
									{feature.properties[prop]}
								</span>
							</div>
						)
					})}
				</div>
			</React.Fragment>
		)
	}

	renderFeatureState (){
		const {feature, featureState, style} = this.props,
			{groupShows} = this.state

		const handle = {
			change: this.handleChange
		}

		if (!groupShows.featureState){
			return (
				<div className="content-body-group interactive" onClick={()=>this.handleGroupShow({group:'featureState',show:true})}>
					<span className="content-body-group-icon">
						<Icon icon={'group-open'}/>
					</span>
					<span className="">
						feature-state
					</span>
				</div>
			)
		}

		return (
			<React.Fragment>
				<div className="content-body-group interactive" onClick={()=>this.handleGroupShow({group:'featureState',show:false})}>
					<span className="content-body-group-icon">
						<Icon icon={'group-close'}/>
					</span>
					<span className="">
						feature-state
					</span>
				</div>
				<div className="info-content position-relative">
					<Property
						className={'mb-0'}
						name={'featureState'}
						type={'metadata'}
						handle={handle}
						value={featureState || Map({})}
					/>
					{featureState && !featureState.equals(this.ogFeatureState) && !featureState.hasIn(['']) && (
						<button className="btn btn-outline-info btn-xs feature-row-deploy" onClick={this.handleDeploy}>
							<Icon icon={'deploy'} weight={'solid'}/>
						</button>
					)}
				</div>
			</React.Fragment>
		)
	}
}


FeatureRow.propTypes = {
	feature: PropTypes.object,
	featureState: PropTypes.object,
	style: PropTypes.object,
}

const mapStoreToProps = (store, props)=>{
	const {feature, style} = props
	const featureStates = modelStyle.selectors.featureStates(store, {styleId: style.getIn(['current','id'])})
	const featureStatePath = [feature.source, feature.sourceLayer, String(feature.id)]
	return {
		featureState: featureStates && featureStates.getIn(featureStatePath)
	}
}

export default connect(
	mapStoreToProps,
)(FeatureRow)