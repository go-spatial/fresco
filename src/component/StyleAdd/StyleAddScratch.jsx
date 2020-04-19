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

class StyleAddScratch extends React.Component {

	constructor(props) {
		super(props)
		const {handle} = props

		this.state = {
			makeLayers: false,
			name: '',
			source: '',
			sourceType: '',
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, match, path, style, version} = this.props,
			{makeLayers, name, source, sourceType} = this.state

		// generate id for style

		try{
			await modelApp.actions.setLoading(true) 

			const style = await modelStyle.actions.add({
				makeLayers, 
				name,
				source,
				sourceType,
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
			{makeLayers, source, name, sourceType} = this.state

		const handle = {
			change: this.handleChange
		}

		const isReady = name.length > 0? true: false
		const options = utilMapboxSpec.getSourceTypeOptions()

		return <form className="content-body" onSubmit={this.handleSubmit}>
			<h4 className="content-body-title">
				<span>From Scratch</span>
			</h4>
			<div className="property-content">
				<Property 
					handle={handle}
					info={'name for this style'}
					key={'name'}
					label={'name'}
					name={'name'}
					path={null}
					required={true}
					type={'string'}
					value={name}
				/>
				<Property 
					handle={handle}
					info={'source map data link (if available)'}
					key={'source'}
					label={'source link'}
					name={'source'}
					path={null}
					type={'string'}
					value={source}
				/>
				{source && (
					<React.Fragment>
						<Property 
							handle={handle}
							info={'Automatically make style layers for each source layer'}
							key={'makeLayers'}
							label={'auto-generate layers'}
							name={'makeLayers'}
							options={options}
							path={null}
							type={'bool'}
							value={makeLayers}
						/>
						<Property {...utilMapboxSpec.getProperties({group: 'source', key: 'type', value: sourceType})}
							handle={handle}
							key={'sourceType'}
							label={'source type'}
							name={'sourceType'}
							options={options}
							path={null}
							value={sourceType}
						/>
					</React.Fragment>
				)}

				<div className="form-group mt-3 text-right">
					<button type="submit" className={`btn btn-primary ${isReady? '': 'disabled'}`}>Add</button>
				</div>
			</div>
		</form>
	}
}

StyleAddScratch.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
}

export default withRouter(StyleAddScratch)