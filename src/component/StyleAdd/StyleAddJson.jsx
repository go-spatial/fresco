import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

import Field from '../Field'
import Property from '../Property'
import Alert from '../Alert'

class StyleAddJson extends React.Component {

	constructor(props) {
		super(props)
		const {handle} = props

		this.state = {
			json: {},
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, match, path, style, version} = this.props,
			{json} = this.state

		// generate id for style

		try{
			await modelApp.actions.setLoading(true) 

			const style = await modelStyle.actions.addFromJson({
				json,
			})
			await modelApp.actions.setLoading(false)

			const redirect = `/style/${style.getIn(['id'])}`
			history.push(redirect)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleChange = ({name, value})=>{
		const {type, url} = this.state

		let state = {}
		state[name] = value

		this.setState(state)
	}

	render (){
		const {error, style} = this.props,
			{json} = this.state

		const handle = {
			change: this.handleChange
		}

		const isReady = json? true: false

		return <form className="content-body" onSubmit={this.handleSubmit}>
			<h4 className="content-body-title">
				<span>From JSON</span>
			</h4>
			<div className="property-content">
				<Property 
					handle={handle}
					info={'Mapbox style JSON'}
					key={'json'}
					label={'json'}
					name={'json'}
					path={null}
					required={true}
					type={'json'}
					value={json}
				/>

				<div className="form-group mt-3 text-right">
					<button type="submit" className={`btn btn-primary ${isReady? '': 'disabled'}`}>Add</button>
				</div>
			</div>
		</form>
	}
}

StyleAddJson.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
}

export default withRouter(StyleAddJson)