import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'

import modelMap from '../../model/map'
import modelStyle from '../../model/style'
import Alert from '../Alert'
import Map from '../Map'
import Icon from '../Icon'
import StyleCode from './StyleCode'
import StyleFocus from './StyleFocus'
import StyleLayers from './StyleLayers'
import StyleSources from './StyleSources'
import StyleSettings from './StyleSettings'
import Tooltip from '../Tooltip'

class Style extends React.Component {
	render() {
		const {error, match, style, styleId} = this.props

		if (!style) return <div/>

		const title = style.getIn(['current','name']) || style.getIn(['current','id'])

		return (
			<React.Fragment>
				<Map path={[styleId]} style={style.get('current')}/>
				<div className="clear-fix">
					<div className="content-pill">
						<div className="content-section">
							<div className="content-title content-title-nav-offset content-title-primary clearfix">
								<span className="content-title-label">{title}</span>

								{this.renderOptions()}
							</div>

							{this.renderBody()}
						</div>
					</div>
				</div>

				{error && typeof error.get('current') === 'string' && <Alert message={error.get('current')}/>}
				
			</React.Fragment>
		)
	}

	renderBody(){
		const {error, match, style, styleId} = this.props

		const path = [styleId]
		let redirect = `${match.url}/layers`
		if (!style.hasIn(['current','layers'])) redirect = `${match.url}/sources`
		return (
			<Switch>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<StyleCode 
							error={error} 
							handle={this.handle} 
							path={path} 
							style={style} 
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/layers`} 
					render={(props) => (
						<StyleLayers 
							error={error && error.has && error.getIn(['current','layers'])} 
							handle={this.handle} 
							match={match} 
							path={path} 
							style={style} 
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/sources`} 
					render={(props) => (
						<StyleSources 
							error={error && error.has && error.getIn(['current','sources'])} 
							handle={this.handle} 
							match={match} 
							path={path} 
							style={style} 
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/settings`} 
					render={(props) => (
						<StyleSettings
							error={error && error.has && error.getIn(['current','settings'])} 
							handle={this.handle} 
							path={path} 
							style={style} 
							{...props}
						/>
					)}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}

	renderOptions(){
		const {error, focusLayers, match} = this.props

		return (
			<div className="content-title-options">
				<NavLink className={`content-title-option interactive tooltip-trigger ${error && error.hasIn(['current','settings'])? 'error': ''}`} to={`${match.url}/settings`}>
					<Icon icon={'settings'}/>
					<Tooltip message={'style settings'}/>
				</NavLink>
				<NavLink className={`content-title-option interactive tooltip-trigger ${error && error.hasIn(['current','sources'])? 'error': ''}`} to={`${match.url}/sources`}>
					<Icon icon={'source'}/>
					<Tooltip message={'sources'}/>
				</NavLink>
				<NavLink className={`content-title-option interactive tooltip-trigger ${error && error.hasIn(['current','layers'])? 'error': ''}`} to={`${match.url}/layers`}>
					{focusLayers && focusLayers.length > 0 && (
						<Icon className="text-info content-title-option-super" icon={'map-focus'} weight={'solid'}/>
					)}
					<Icon icon={'layer'}/>
					<Tooltip message={'layers'}/>
				</NavLink>
				<NavLink className={`content-title-option interactive tooltip-trigger ${error && error.hasIn(['current','json'])? 'error': ''}`} to={`${match.url}/json`}>
					<Icon icon={'code'}/>
					<Tooltip message={'json'}/>
				</NavLink>
			</div>
		)
	}
}

Style.propTypes = {
	error: PropTypes.object,
	match: PropTypes.object,
	style: PropTypes.object,
	styleId: PropTypes.string,
}

const mapStateToProps = (state, props) => {
	return {
		error: modelStyle.selectors.error(state, {path: [props.styleId]}),
		focusLayers: modelMap.selectors.focusLayers(state),
		style: modelStyle.selectors.getIn(state, {path: [props.styleId]}),
	}
}
export default connect(
  mapStateToProps,{}
)(Style)