
import constants from './constants'
import utilColor from '../../utility/utilColor'
import utilMapboxSpec from '../../utility/utilMapboxSpec'

const getColor = ({layer})=>{
	return utilColor.getFromBlock({block: layer})
}

const getType = ({layer})=>{
	return utilMapboxSpec.getLayerType({layer})
}

const getIndexById = ({layerId, style})=>{
	return style.getIn(['current','layers']).findIndex((layer)=>{
		if (!layer) return null
		return layer.get('id') === layerId
	})
}

const getLayerPath = ({layerId, style})=>{
	const index = getIndexById({layerId, style})
	return [style.getIn(['current','id']), 'current', 'layers', index]
}

const getTypeOptions = ()=>{
	const types = Object.keys(constants.layerTypes)
	return types.map(type => {
		return {name:type, value:type}
	})
}

export default {
	getColor,
	getIndexById,
	getLayerPath,
	getType,
	getTypeOptions,
}