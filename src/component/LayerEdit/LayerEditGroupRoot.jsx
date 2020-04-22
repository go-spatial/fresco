import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'

import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class LayerEditGroupRoot extends React.Component {

	handleIdChange = async ({path, value})=>{
		const {history} = this.props,
			{pathname} = this.props.location

		const pathNew = pathname.replace(/\/layers\/[^/]*/, `/layers/${value}`)
		
		await modelStyle.actions.setIn({
			path,
			value,
		})
		history.replace(pathNew)
	}

	render (){
		const {group, layer, path} = this.props

		const fields = utilMapboxSpec.getRootPropertyFields({layer})

		return (
			<div className="property-content">
				{layer && Map.isMap(layer) && layer.keySeq().map((key)=>{
					if (!fields.includes(key)) return <div key={key}/>
					return this.renderProperty({key, layer})
				})}
				<div className="property">
					<PropertyAdd 
						path={path}
						group={group}
						layer={layer} 
					/>
				</div>
			</div>
		)
	}

	renderProperty ({key}){
		const {error, group, layer, path, style} = this.props
		const pathProp = [...path, key]
		const value = layer.get(key)
		let property = {
			...utilMapboxSpec.getProperties({group, layer, key, value}),
			key: key,
			name: key,
			label: key,
			path: pathProp,
			removeEnabled: true,
			value: value,
			error: error && error.get && error.get(key)
		}
		if (key === 'id'){ // special case because of a routing issue
			property.handle = {
				change: this.handleIdChange
			}
		}
		if (key === 'source'){
			property.options = modelSource.helpers.getOptions({style})
		}
		if (key === 'source-layer'){
			const sourceId = layer.get('source')
			property.options = modelSource.helpers.getLayerOptions({style, sourceId})
		}
		return (
			<Property key={key}
				{...property}
			/>
		)
	}
}

LayerEditGroupRoot.propTypes = {
	error: PropTypes.object,
	group: PropTypes.string,
	history: PropTypes.object,
	layer: PropTypes.object.isRequired,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(LayerEditGroupRoot)