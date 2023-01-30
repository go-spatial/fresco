import PropTypes from 'prop-types'
import React from 'react'
import {withRouter} from 'react-router-dom'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

import Property from '../Property'

class StyleUpdateJson extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			json: {},
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, style} = this.props,
			{json} = this.state

		// generate id for style

		try{
			await modelApp.actions.setLoading(true) 

			await modelStyle.actions.updateFromJson({
				json,
				style,
			})
			await modelApp.actions.setLoading(false)

			const redirect = `/style/${style.getIn(['current','id'])}`
			history.push(redirect)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleChange = ({name, value})=>{

		let state = {}
		state[name] = value

		this.setState(state)
	}

	render (){
		const {json} = this.state

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
					info={'Maplibre style JSON'}
					key={'json'}
					label={'json'}
					name={'json'}
					path={null}
					required={true}
					type={'json'}
					value={json}
				/>

				<div className="form-group mt-3 text-right">
					<button type="submit" className={`btn btn-primary ${isReady? '': 'disabled'}`}>Update</button>
				</div>
			</div>
		</form>
	}
}

StyleUpdateJson.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
	style: PropTypes.object,
}

export default withRouter(StyleUpdateJson)