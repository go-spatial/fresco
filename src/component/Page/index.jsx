import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ErrorC from './Error'
import Loader from './Loader'
import Nav from './Nav'
import Route from './Route'

import modelApp from '../../model/app'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class Page extends React.Component {

	async componentDidMount(){
		try{
			await modelApp.actions.setLoading(true)
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
			<Loader/>
			<Router>
				{this.renderFrame()}
			</Router>
		</React.Fragment>
		)
	}

	renderFrame(){
		const {agentUser, error, loading, notifications} = this.props

		const device = modelApp.helpers.getDevice()

		return (
			<React.Fragment>
				<div className={`page ${device}`}>
					<ErrorC handleClose={this.handleErrorClose} message={error}/>
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