import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'

import React from 'react'

import Alert from '../Alert'
import Icon from '../Icon'
import HomeStyles from './HomeStyles'
import HomeSettings from './HomeSettings'
import Tooltip from '../Tooltip'


/*

import VlayerEditJSON from './VlayerEditJSON'
import VlayerEditor from './VlayerEditor'
import VlayerDelete from './VlayerDelete'
*/

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'

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
		const {error, match} = this.props

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
				{this.renderModal()}
				
			</React.Fragment>
		)
	}

	renderModal (){
		const {errors, style} = this.props,
			{modal} = this.state

		switch (modal){
			case 'delete':
				//return <LayerModalDelete path={path} style={style}/>
			default:
				return <div/>
		}
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
		const {error, match} = this.props

		return (
			<div className="content-title-options">
				<NavLink to={'/styles'} className={'content-title-option tooltip-trigger interactive'}>
					<Icon icon={'style'}/>
					<Tooltip message={'styles'}/>
				</NavLink>
				<NavLink to={'/settings'} className={'content-title-option tooltip-trigger interactive'}>
					<Icon icon={'settings'}/>
					<Tooltip message={'settings'}/>
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