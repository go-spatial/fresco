import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom'

import Icon from '../Icon'
import StyleUpdateJson from './StyleUpdateJson'
import StyleUpdateUpload from './StyleUpdateUpload'
import Tooltip from '../Tooltip'

class StyleUpdate extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			headers: Map({}),
			id: '',
			makeLayers: false,
			type: '',
			url: '',
		}
	}

	render (){
		const {match} = this.props

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Update Style</span>

				<div className="content-title-options">
					<NavLink to={`${match.url}/upload`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'upload'}/>
						<Tooltip message={'from upload'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'code'}/>
						<Tooltip message={'from json'}/>
					</NavLink>
				</div>
			</h2>

			{this.renderBody()}
		</div>
	}

	renderBody(){
		const {match, style} = this.props

		const redirect = `${match.url}/upload`

		return (
			<Switch>
				<Route path={`${match.url}/upload`} 
					render={(props) => (
						<StyleUpdateUpload 
							{...props}
							style={style}
						/>
					)}/>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<StyleUpdateJson 
							{...props}
							style={style}
						/>
					)}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}
}

StyleUpdate.propTypes = {
	handle: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleUpdate)