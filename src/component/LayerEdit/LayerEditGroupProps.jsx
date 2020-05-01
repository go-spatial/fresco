import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'

class LayerEditGroupProps extends React.Component {

	render (){
		const {group, layer, path} = this.props

		const layerGroup = layer.get(group)

		return (
			<div className="property-content">
				{layerGroup && Map.isMap(layerGroup) && layerGroup.keySeq().map((key)=>{
					return this.renderProperty({key})
				})}
				<div className="property">
					<PropertyAdd 
						path={[...path, group]}
						group={group} 
						layer={layer}
					/>
				</div>
			</div>
		)
	}

	renderProperty ({key}){
		const {error, group, layer, path} = this.props
		const pathProp = [...path, group, key]
		const value = layer.getIn([group, key])

		const property = {
			...utilMapboxSpec.getProperties({group, layer, key, value}),
			key: key,
			name: key,
			label: key,
			path: pathProp,
			removeEnabled: true,
			value: value,
			error: error && error.get && error.get(key)
		}

		return (
			<Property key={key}
				{...property}
			/>
		)
	}
}

LayerEditGroupProps.propTypes = {
	group: PropTypes.string,
	error: PropTypes.object,
	layer: PropTypes.object.isRequired,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default LayerEditGroupProps