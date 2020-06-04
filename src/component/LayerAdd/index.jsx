import PropTypes from 'prop-types'
import React from 'react'
import {withRouter} from 'react-router-dom'

import utilUrl from '../../utility/utilUrl'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

import Alert from '../Alert'
import Property from '../Property'

class LayerAdd extends React.Component {

	constructor(props) {
		super(props)

		// check for query params
		const query = new URLSearchParams(window.location.search)

		this.state = {
			rec:{
				id:query.has('source-layer')? query.get('source-layer'): '',
				source:query.has('source')? query.get('source'): '',
				'source-layer':query.has('source-layer')? query.get('source-layer'): '',
				type:query.has('type')? query.get('type'): '',
			},
			error:null
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, path, style} = this.props,
			{rec} = this.state

		try{

			if (style.getIn(['current','layers']).find(layer => layer.get('id') === rec.id)){
				throw new Error(`LayerAdd.submit: layerId already exists`)
			}
			await modelApp.actions.setLoading(true)
			await modelLayer.actions.add({path, rec, style})
			await modelApp.actions.setLoading(false)

			const route = `layers/${rec.id}`
      history.push(modelStyle.helpers.getRouteFromPath({path, route}))
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
		const sourceOptions = modelSource.helpers.getOptions({style}) || []
		const sourceLayerOptions = rec.source? modelSource.helpers.getLayerOptions({style, sourceId:rec.source}):
			[]

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
	history: PropTypes.object,
	handle: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(LayerAdd)