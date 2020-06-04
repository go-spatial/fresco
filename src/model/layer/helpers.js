
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

const getLayerCloneId = ({layer, style})=>{
	const layers = style.getIn(['current','layers'])
	const id = layer.getIn(['id'])
	const idBase = id.replace(/_[0-9]*$/, '')

	let cloneId, inc = 1
	while (!cloneId){
		inc++
		const testId = `${idBase}_${inc}`
		if (!layers.find(layer=>layer.get('id') === testId)){
			cloneId = testId
		}
	}

	return cloneId
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
	getLayerCloneId,
	getLayerPath,
	getType,
	getTypeOptions,
}