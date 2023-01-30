import {latest} from '@maplibre/maplibre-gl-style-spec'
import Store from '../../Store'


const getLayerOptions = ({style, sourceId})=>{

	const state = Store.getState()

	if (!state.source || !state.source.sources) return []

	const sourceUrl = style.getIn(['current', 'sources', sourceId, 'url'])
	if (!sourceUrl) return []

	const sourceLayers = state.source.sources.getIn([sourceUrl, 'data', 'vector_layers'])
	if (!sourceLayers) return []

	return sourceLayers.map((layer)=>{
		return {
			name:layer.get('id'),
			value:layer.get('id')
		}
	}).toJS()
}

const getOptions = ({style})=>{
	if (!style.hasIn(['current','sources'])) return []

	const sources = style.getIn(['current','sources'])

	return sources.keySeq().map((key)=>{
		return {
			name:key,
			value:key
		}
	}).toJS()
}

const getLayerTypeFromSourceLayer = ({layer})=>{
	switch(layer.get('geometry_type')){
		case 'line':
			return 'line'
		case 'polygon':
			return 'fill'
		case 'point':
			return 'symbol'
		default:
			return 'fill'
	}
}

const getTypeOptions = ()=>{
	const spec = latest
	let values = {}
	for (let i in spec){
		if (i.indexOf('source_') === 0){
			const type = i.replace('source_','').replace('_','-')
			if (spec[i].type && spec[i].type.values && spec[i].type.values[type])
				values[type] = {doc:spec[i].type.values[type].doc}
		}
	}
	return values
}

const getLayersFromData = ({data})=>{
	if (data.has('vector_layers')) return data.get('vector_layers')
}

export default {
	getLayerOptions,
	getLayersFromData,
	getLayerTypeFromSourceLayer,
	getOptions,
	getTypeOptions,
}