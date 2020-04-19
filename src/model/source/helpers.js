import styleSpec from '../../vendor/style-spec/style-spec'


const getLayerOptions = ({style, sourceId})=>{
	if (!style.hasIn(['sources', sourceId, 'layers'])) return []

	const sourceLayers = style.getIn(['sources', sourceId, 'layers'])
	return sourceLayers.map((layer)=>{
		return {
			name:layer.get('id'),
			value:layer.get('id')
		}
	})
}

const getOptions = ({style})=>{
	if (!style.hasIn(['current','sources'])) return []

	let options = []
	const sources = style.getIn(['current','sources'])

	return sources.keySeq().map((key)=>{
		return {
			name:key,
			value:key
		}
	})
}

const getTypeOptions = ()=>{
	const spec = styleSpec.latest
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
	getOptions,
	getTypeOptions,
}