import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '../Alert'
import Loader from './Loader'
import Nav from './Nav'
import Route from './Route'

import config from '../../config'
import modelApp from '../../model/app'
import modelPreference from '../../model/preference'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class Page extends React.Component {

	async componentDidMount(){
		try{
			await modelApp.actions.setLoading(true)
			await modelPreference.actions.init()
			await modelStyle.actions.init()
			await modelSource.actions.init()
			await modelApp.actions.setLoading(false)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleErrorClose = ()=>{
		modelApp.actions.setError(null)
	}

	render(){
		return (
		<React.Fragment>
			<Router basename={config.homepage}>
				{this.renderFrame()}
			</Router>
		</React.Fragment>
		)
	}

	renderFrame(){
		const {error, loading} = this.props

		const device = modelApp.helpers.getDevice()

		return (
			<React.Fragment>
				<div className={`page ${device}`}>
					<Alert handleClose={this.handleErrorClose} message={error}/>
					<Nav/>
					<Route/>
					{loading && <Loader/>}
				</div>
			</React.Fragment>
		)
	}
}

Page.propTypes = {
	error: PropTypes.string,
	loading: PropTypes.bool,
}

const mapStateToProps = state => {
	return {
		error: modelApp.selectors.error(state),
		loading: modelApp.selectors.loading(state),
	}
}
export default connect(
  mapStateToProps,{}
)(Page)