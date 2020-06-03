import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import React from 'react'

import Icon from '../Icon'
import LayerEditActions from './LayerEditActions'
import LayerEditFeatures from './LayerEditFeatures'
import LayerEditJson from './LayerEditJson'
import LayerEditView from './LayerEditView'
import Infotip from '../Infotip'
import modelMap from '../../model/map'
import modelPreference from '../../model/preference'
import modelStyle from '../../model/style'

class LayerEdit extends React.Component {

	render (){
		const {layer} = this.props

		if (!layer) return <div/>

		return <div>
			{this.renderTitle()}
			<div className="position-relative">
				{this.renderSection()}
			</div>
			
		</div>
	}

	renderSection (){
		const {editMode, focusFeatures, error, match, layer, path, style} = this.props

		let redirect
		if (focusFeatures.length > 0){
			redirect = `${match.url}/features`
		} else if (editMode === 'json'){
			redirect = `${match.url}/json`
		} else {
			redirect = `${match.url}/editor`
		}

		return (
			<Switch>
				<Route path={`${match.url}/actions`} 
					render={(props) => (
						<LayerEditActions 
							error={error} 
							layer={layer} 
							path={path} 
							style={style}
						/>
					)}/>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<LayerEditJson 
							error={error} 
							layer={layer} 
							path={path} 
							style={style}
						/>
					)}/>

				<Route path={`${match.url}/editor`} 
					render={(props) => (
						<LayerEditView 
							error={error} 
							layer={layer} 
							path={path} 
							style={style}
						/>
					)}/>
				<Route path={`${match.url}/features`} 
					render={(props) => (
						<LayerEditFeatures 
							error={error} 
							layer={layer} 
							path={path} 
							style={style}
						/>
					)}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}

	renderTitle (){
		const {focusFeatures, match, layer} = this.props

		const label = layer.getIn(['id'])

		return (
			<h2 className="content-title content-title-sub content-title-light clearfix">
				<span className="text-overflow-ellipsis content-title-label">
					{label}
				</span>
				<div className="content-title-options">
					{focusFeatures.length > 0 && (
						<NavLink to={`${match.url}/features`} className={'content-title-option interactive infotip-trigger'}>
							<Icon className="text-info" icon={'map-focus'} weight={'solid'}/>
							<Infotip direction={'y'} message={'layer features'}/>
						</NavLink>
					)}
					<NavLink to={`${match.url}/editor`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'editor'}/>
						<Infotip direction={'y'} message={'layer editor'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'code'}/>
						<Infotip direction={'y'} message={'layer json'}/>
					</NavLink>
					<NavLink to={`${match.url}/actions`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'action'}/>
						<Infotip direction={'y'} message={'layer actions'}/>
					</NavLink>
				</div>
			</h2>
		)
	}
}

/*
	<span className="content-title-option interactive">
						<Icon icon={'action-drop'}/>
						<div className="content-title-option-hint">
							<span>actions</span>
						</div>
					</span>
					<div className="dropdown-menu" data-boundary="window">
						<div onClick={this.handleClone} className="dropdown-item">clone layer</div>
						<div onClick={()=>this.handleModalSet({modal:'delete'})} className="dropdown-item">delete layer</div>
					</div>
*/

LayerEdit.propTypes = {
	editMode: PropTypes.string,
	error: PropTypes.object, // map
	layer: PropTypes.object,
	layerId: PropTypes.string,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}


const mapStateToProps = (state, props) => {
	const {layerId} = props
	return {
		editMode: modelPreference.selectors.getIn(state, {path:['editMode']}),
		focusFeatures: modelMap.selectors.focusFeaturesByLayerId(state, {layerId}),
		layer: modelStyle.selectors.getIn(state, {path: props.path}),
	}
}
export default connect(
  mapStateToProps,{}
)(LayerEdit)