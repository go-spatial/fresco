import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {NavLink, Link, Redirect, Route, Switch} from 'react-router-dom'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import {List} from 'immutable'

import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'
import StyleSettingsActions from './StyleSettingsActions'
import StyleSettingsDomains from './StyleSettingsDomains'
import StyleSettingsRoot from './StyleSettingsRoot'
import StyleSettingsTokens from './StyleSettingsTokens'
import StyleUpdate from '../StyleUpdate'

class StyleRoot extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			layerAddShown:false,
			searchShow:false,
			search:null
		}
	}

	handleChange = ()=>{

	}
	handleOnDragEnd = ()=>{

	}

	handleSearchChange = ({value})=>{
		this.setState({
			search: value,
		})
	}

	handleSearchShowSet = ({show})=>{
		this.setState({
			searchShow: show,
		})
	}

	handleVisibility = async ({e, layerId, show})=>{
		//e.stopPropagation();

		const {style} = this.props
		// get layer path
		const layerPath = modelLayer.helpers.getLayerPath({layerId, style})
		const visibilityPath = [...layerPath, 'layout', 'visibility']
		await modelStyle.actions.setIn({
			path: visibilityPath,
			value: show? 'visible': 'none'
		})
	}

	render (){
		const {error, layers, match, path, style} = this.props,
			{search, searchShow} = this.state

		return (
			<div className="content-body content-body-flex">
				<div className="content-body-left">
					<div className="">
						<NavLink to={`${match.url}/root`} className="content-body-left-row row-icons">
							<div className="row-icon-left">
								<Icon className="md-shadow" icon={'root'} weight={'regular'}/>
							</div>
							root
						</NavLink>
						<NavLink to={`${match.url}/tokens`} className="content-body-left-row row-icons">
							<div className="row-icon-left">
								<Icon className="md-shadow" icon={'root'} weight={'regular'}/>
							</div>
							access tokens
						</NavLink>
						<NavLink to={`${match.url}/actions`} className="content-body-left-row row-icons">
							<div className="row-icon-left">
								<Icon className="md-shadow" icon={'action'} weight={'regular'}/>
							</div>
							actions
						</NavLink>
						<NavLink to={`${match.url}/domains`} className="content-body-left-row row-icons">
							<div className="row-icon-left">
								<Icon className="md-shadow" icon={'domain'} weight={'regular'}/>
							</div>
							domains
						</NavLink>
					</div>
				</div>
				{this.renderRight()}
			</div>
		)
	}

	renderRight (){
		const {error, match, path, style} = this.props

		const currentPath = [...path, 'current']

		let redirect = `${match.url}/root`

		return (
			<div className="content-body-right">
				<Switch>
					<Route path={`${match.url}/actions/update`} 
						render={(props) => <StyleUpdate path={currentPath} style={style} {...props}/>}/>
					<Route path={`${match.url}/actions`} 
						render={(props) => <StyleSettingsActions path={currentPath} style={style} {...props}/>}/>
					<Route path={`${match.url}/root`} 
						render={(props) => <StyleSettingsRoot path={currentPath} style={style} {...props}/>}/>
					<Route path={`${match.url}/domains`} 
						render={(props) => <StyleSettingsDomains path={path} style={style} {...props}/>}/>
					<Route path={`${match.url}/tokens`} 
						render={(props) => <StyleSettingsTokens path={currentPath} style={style} {...props}/>}/>

					<Redirect to={redirect}/>
				</Switch>
			</div>
		)
	}
}


StyleRoot.propTypes = {
	error: PropTypes.object,
	layers: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
	styleId: PropTypes.string,
}

const mapStateToProps = (state, props) => {
	return {
		layers: modelStyle.selectors.getIn(state, {path: [...props.path, 'current', 'layers']}),
	}
}
export default connect(
  mapStateToProps,{}
)(StyleRoot)
