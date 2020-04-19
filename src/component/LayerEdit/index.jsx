import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'

import React from 'react'

import Alert from '../Alert'
import Icon from '../Icon'
import LayerEditActions from './LayerEditActions'
import LayerEditFeatures from './LayerEditFeatures'
import LayerEditModalRemove from './LayerEditModalRemove'
import LayerEditJson from './LayerEditJson'
import LayerEditView from './LayerEditView'
import Tooltip from '../Tooltip'
import modelApp from '../../model/app'
import modelMap from '../../model/map'
import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'

class LayerEdit extends React.Component {

	render (){
		const {error, layer, match, path, style} = this.props

		if (!layer) return <div/>

		return <div>
			{this.renderTitle()}
			<div className="position-relative">
				{this.renderSection()}
			</div>
			
		</div>
	}

	renderSection (){
		const {focusFeatures, error, match, layer, path, style} = this.props

		const redirect = (focusFeatures.length > 0)? `${match.url}/features` :`${match.url}/editor`
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
		const {focusFeatures, match, path, layer, style} = this.props

		const label = layer.getIn(['id'])

		return (
			<h2 className="content-title content-title-sub content-title-light clearfix">
				<span className="text-overflow-ellipsis content-title-label">
					{label}
				</span>
				<div className="content-title-options">
					{focusFeatures.length > 0 && (
						<NavLink to={`${match.url}/features`} className={'content-title-option interactive tooltip-trigger'}>
							<Icon className="text-info" icon={'map-focus'} weight={'solid'}/>
							<Tooltip message={'layer features'}/>
						</NavLink>
					)}
					<NavLink to={`${match.url}/editor`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'editor'}/>
						<Tooltip message={'editor'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'code'}/>
						<Tooltip message={'json'}/>
					</NavLink>
					<NavLink to={`${match.url}/actions`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'action'}/>
						<Tooltip message={'actions'}/>
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
		focusFeatures: modelMap.selectors.focusFeaturesByLayerId(state, {layerId}),
		layer: modelStyle.selectors.getIn(state, {path: props.path}),
	}
}
export default connect(
  mapStateToProps,{}
)(LayerEdit)