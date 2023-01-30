import PropTypes from 'prop-types'
import React from 'react'
import {withRouter} from 'react-router-dom'

import utilMaplibreSpec from '../../utility/utilMaplibreSpec'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

import Property from '../Property'

class StyleAddScratch extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			makeLayers: false,
			name: '',
			source: '',
			sourceType: '',
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history} = this.props,
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
		let state = {}
		state[name] = value

		this.setState(state)
	}

	render (){
		const {makeLayers, source, name, sourceType} = this.state

		const handle = {
			change: this.handleChange
		}

		const isReady = name.length > 0? true: false
		const options = utilMaplibreSpec.getSourceTypeOptions()

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
						<Property {...utilMaplibreSpec.getProperties({group: 'source', key: 'type', value: sourceType})}
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