import PropTypes from 'prop-types'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import React from 'react'

import Alert from '../Alert'
import Icon from '../Icon'
import HomeStyles from './HomeStyles'
import HomeSettings from './HomeSettings'
import Tooltip from '../Tooltip'

class Home extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			modal: null
		}
	}

	handleModalSet = ({modal})=>{
		this.setState({modal})
	}

	render() {
		const {error} = this.props

	//<Map path={[styleId]} style={style.get('current')}/>

		return (
			<React.Fragment>
				
				<div className="clear-fix">
					<div className="content-pill">
						<div className="content-section">
							<div className="content-title content-title-nav-offset content-title-primary">
								<span className="content-title-label">Fresco</span>

								{this.renderOptions()}
							</div>

							{this.renderBody()}
						</div>
					</div>
				</div>

				{error && <Alert message={error}/>}
				
			</React.Fragment>
		)
	}


	renderBody (){
		const {errors, match} = this.props

		return (
			<Switch>
				<Route path={`/styles`} 
					render={(props) => (
						<HomeStyles
							errors={errors} 
							match={match}
						/>
					)}/>
				<Route path={`/settings`} 
					render={(props) => (
						<HomeSettings
							errors={errors} 
							match={match}
						/>
					)}/>

				<Redirect to={`/styles`}/>
			</Switch>
		)
	}

	renderOptions(){
		return (
			<div className="content-title-options">
				<NavLink to={'/styles'} className={'content-title-option tooltip-trigger interactive'}>
					<Icon icon={'style'}/>
					<Tooltip message={'styles'}/>
				</NavLink>
			</div>
		)
	}
}

Home.propTypes = {
	errors: PropTypes.object, // map
	layer: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

export default Home