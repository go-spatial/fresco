import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilUrl from '../../utility/utilUrl'
import utilMaplibreSpec from '../../utility/utilMaplibreSpec'

import modelApp from '../../model/app'
import modelSource from '../../model/source'

import Property from '../Property'

class SourceAdd extends React.Component {

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

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, match, path, style} = this.props,
			{headers, makeLayers, id, type, url} = this.state

		try{
			await modelApp.actions.setLoading(true)
			await modelSource.actions.add({
				headers, 
				makeLayers, 
				id, 
				path,
				style,
				type, 
				url,
			})
			await modelApp.actions.setLoading(false)

			const redirect = match.url.replace('/add', `/${id}`)
			history.push(redirect)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleChange = ({name, value})=>{

		let state = {}

		if (name === 'url'){
			// update name
			state.id = utilUrl.getName(value)
		}

		state[name] = value

		this.setState(state)
	}

	render (){
		const {headers, makeLayers, id, type, url} = this.state

		const options = utilMaplibreSpec.getSourceTypeOptions()

		const handle = {
			change: this.handleChange
		}

		const group = 'source'
		const isReady = id.length > 0 && type.length > 0 && url.length > 0? true: false

		return <form onSubmit={this.handleSubmit}>
			<h2 className="content-title content-title-sub">
				<span className="content-title-label">Add Source</span>
			</h2>
			<div className="property-content">
				<Property {...utilMaplibreSpec.getProperties({group, key: 'url', value: url})}
					handle={handle}
					key={'url'}
					label={'url'}
					name={'url'}
					path={null}
					value={url}
				/>

				<Property
					info={'Unique reference to the source'}
					handle={handle}
					key={'id'}
					label={'id'}
					name={'id'}
					path={null}
					type={'string'}
					value={id}
				/>
				<Property {...utilMaplibreSpec.getProperties({group, key: 'type', value: type})}
					handle={handle}
					key={'type'}
					label={'type'}
					name={'type'}
					options={options}
					path={null}
					value={type}
				/>
				<hr/>
				<Property 
					handle={handle}
					info={'Headers attached to domain requests'}
					key={'headers'}
					label={'headers'}
					name={'headers'}
					options={options}
					path={null}
					type={'metadata'}
					value={headers}
				/>
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
				<hr/>


				<div className="form-group mt-3 text-right">
					<button type="submit" className={`btn btn-primary ${isReady? '': 'disabled'}`}>Add</button>
				</div>
			</div>
		</form>
	}
}

SourceAdd.propTypes = {
	handle: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(SourceAdd)