import PropTypes from 'prop-types'
import React from 'react'

import utilUrl from '../../utility/utilUrl'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelSource from '../../model/source'

import Alert from '../Alert'
import Property from '../Property'

class LayerAdd extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			rec:{
				id:'',
				source:'',
				'source-layer':'',
				type:''
			},
			error:null
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {path, style} = this.props,
			{rec} = this.state

		try{
			await modelApp.actions.setLoading(true)
			await modelLayer.actions.add({path, rec, style})
			await modelApp.actions.setLoading(false)

			// route user to layer
			// handle.route('layer/'+layer.id)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleChange = ({name, value})=>{
		const {rec} = this.state
		if (name !== 'id'){
			let parts = []
			name === 'source-layer' ? parts.push(utilUrl.getName(value)) :
				rec['source-layer'] && parts.push(utilUrl.getName(rec['source-layer']))

			let id = parts.join('.')

			// TODO: check for layer id collisions

			this.setState({rec:{
				...rec,
				id
			}})
		}
		this.setState({
			rec:{
				...rec,
				[name]:value,
			},
			error:null
		})
	}

	handleChangeId = ()=>{
		let parts = []
		if (this.state.source) parts.push(utilUrl.getName(this.state.source))
		if (this.state['source-layer']) parts.push(this.state['source-layer'])
		if (this.state.type) parts.push(this.state.type)
		const id = parts.join('.')
		this.setState({
			id:id,
			error:null
		})
	}

	render (){
		const {error, style} = this.props,
			{rec} = this.state

		const typeOptions = modelLayer.helpers.getTypeOptions()
		const sourceOptions = modelSource.helpers.getOptions({style})
		const sourceLayerOptions = (this.state.source)? modelSource.helpers.getLayerOptions({style, sourceId:this.state.source}):
			null

		const handle = {
			change: this.handleChange
		}

		return <form onSubmit={this.handleSubmit}>
			<h2 className="content-title">
				<span className="content-title-label">Add Layer</span>
			</h2>
			<div className="property-content">
				<Property 
					handle={handle}
					info={'type of layer to create'}
					label={'type'}
					name={'type'}
					options={typeOptions}
					path={null}
					required={true}
					type={'enum'}
					value={rec.type}
				/>
				
				{rec.type && rec.type !== 'background' && (
					<React.Fragment>
						<Property 
							handle={handle}
							info={'the source of map data for this layer'}
							label={'source'}
							name={'source'}
							options={sourceOptions}
							path={null}
							required={true}
							type={'enum'}
							value={rec.source}
						/>

						{sourceLayerOptions && 
							<Property 
								handle={handle}
								info={'the source data layer'}
								label={'source-layer'}
								name={'source-layer'}
								options={sourceLayerOptions}
								path={null}
								required={true}
								type={'enum'}
								value={rec['source-layer']}
							/>
						}
					</React.Fragment>
				)}

				<Property 
					handle={handle}
					info={'unique id for this layer'}
					label={'id'}
					name={'id'}
					path={null}
					required={true}
					type={'string'}
					value={rec.id}
				/>

				<div className="form-group mt-3 text-right">
					<button type="submit" className="btn btn-primary">Add</button>
				</div>

				<div className="mt-3">
					<Alert message={error}/>
				</div>
			</div>
		</form>
	}
}

LayerAdd.propTypes = {
	handle: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default LayerAdd