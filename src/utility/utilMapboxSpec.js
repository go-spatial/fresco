import styleSpec from '../vendor/style-spec/style-spec'

import {fromJS, Map, List} from 'immutable'

const typeMap = {
	array: 'json',
	boolean: 'bool',
	color: 'color',
	enum: 'enum',
	number: 'number',
	string: 'string',
	'*': 'metadata',
}

const getExpressionOptions = ({})=>{
	if (!styleSpec.latest.expression_name || !styleSpec.latest.expression_name.values) return []

	return Object.keys(styleSpec.latest.expression_name.values).map(key => {
		return {name: key, value: key}
	})
}

const getLayerType = ({layer})=>{
	if (!layer || !layer.has) return
	if (layer.has('type')) return layer.get('type')
	if (layer.has('ref')){
		const refLayer = this.get(layer.get('ref'))
		if (refLayer.has('type')) return refLayer.get('type')
	}
}

const getProperties = ({group, layer, key, value})=>{
	let properties = {}

	const	groupSpec = getGroupSpec({group, layer})
	const spec = groupSpec[key] || {}

	/*
	spec: PropTypes.shape({
		type: PropTypes.string, // 'enum', 
		values: PropTypes.object, // visible: {doc: "The layer is shown."} none: {doc: "The layer is not shown."}
		default: PropTypes.any, // "visible"
		doc: PropTypes.string, // "Whether this layer is displayed."
		'sdk-support': PropTypes.object, // sdk-support: {basic functionality: {…}}
	}),
	*/

	properties.type = getPropType({key, spec, value})
	properties.casts = getPropCasts({spec})

	if (spec.type === 'enum' && spec.values){
		properties.options = Object.keys(spec.values).map(key => {return {name: key, value: key, helper: spec.values[key].doc}})
	}
	if (spec.doc){
		properties.info = spec.doc
	}
	if (spec.default){
		properties.valueDefault = getPropDefault({group, key})
	}
	return properties
}

const getPropCasts = ({spec})=>{
	if (spec['property-function']){ // property may be an expression or function
		return ['expression', 'function', typeMap[spec.type]]
	}
	if (typeMap[spec.type]){
		return [typeMap[spec.type]]
	}
	return null
}

const getPropDefault = ({group, key, layer})=>{
	const	groupSpec = getGroupSpec({group, layer})
	const spec = groupSpec[key] || {}
	//console.log({spec,group, key, layer})
	return getSpecDefault({spec})
}

const getPropType = ({key, spec, value})=>{
	if (key === 'center'){
		return 'point'
	}
	if (key === 'filter'){
		return 'expression'
	}
	if (spec['property-function']){ // property may be an expression or function
		if (List.isList(value)){
			return 'expression'
		}
		if (Map.isMap(value)){
			return 'function'
		}
	}
	return typeMap[spec.type] || 'string'
}

const getPropertyOptions = ({group, layer})=>{
	if (group === 'root'){
		const props = getRootPropertyFields({layer})

		const propsUnused = props.filter(prop => !layer.has(prop))
		return propsUnused.map(prop => {
			return {name: prop, value: prop}
		})
	}

	const	groupSpec = getGroupSpec({group, layer})
	let propOptions = []
	Object.keys(groupSpec).forEach(prop => {
		if (layer && layer.hasIn([group, prop])) return
		propOptions.push({
			name: prop,
			value: prop
		})
	})
	return propOptions
}

const getGroupSpec = ({group, layer})=>{
	if (group === 'source') return getSourceSpec() || {}
	if (group !== 'root') return styleSpec.latest[group+'_'+getLayerType({layer})] || {}
	return styleSpec.latest.layer || {}
}

const getRootPropertyFields = ({layer})=>{
	if (getLayerType({layer}) === 'background'){
		return ['id', 'type']
	} else if (layer.has('source')){
		return ['id', 'type', 'source', 'source-layer', 'filter', 'maxzoom', 'minzoom']
	} else {
		return ['id', 'type', 'source', 'filter', 'maxzoom', 'minzoom']
	}
}

const getSourceSpec = ()=>{
	return styleSpec.latest['source_vector']
}

const getSourceTypeOptions = ()=>{
	const spec = styleSpec.latest

	let options = []
	Object.keys(spec).forEach(key => {
		if (key.indexOf('source_') === 0){
			const type = key.replace('source_','').replace('_','-')
			if (spec[key].type && spec[key].type.values && spec[key].type.values[type])
				options.push({name: type, value: type, helper: spec[key].type.values[type].doc})
		}
	})
	return options

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

const getSpecDefault = ({spec})=>{
	if (spec.default) return spec.default

	switch (spec.type) {
		case 'array':
			return []
		case 'boolean':
			return false
		case 'color':
			return '#00ACC1'
		case 'enum':
			return null
		case 'number':
			return 0
		case 'string':
			return ''
		case '*':
			return {}
		default:
			return null
	}
}

const getStyleRootPropertyFields = ()=>{
	return [
		'name',
		'center',
		'zoom',
		'bearing',
		'pitch',
		'light',
		'sprite',
		'glyphs',
		'transition',
		'metadata',
	]
}

const getStyleRootPropertyOptions = ()=>{
	const fields = getStyleRootPropertyFields()
	return fields.map(field => {
		return {
			name: field,
			value: field
		}
	})
}

const getStyleProperties = ({key, value})=>{
	let properties = {}

	const	spec = styleSpec.latest.$root[key]

	if (!spec) return {}

	/*
	spec: PropTypes.shape({
		type: PropTypes.string, // 'enum', 
		values: PropTypes.object, // visible: {doc: "The layer is shown."} none: {doc: "The layer is not shown."}
		default: PropTypes.any, // "visible"
		doc: PropTypes.string, // "Whether this layer is displayed."
		'sdk-support': PropTypes.object, // sdk-support: {basic functionality: {…}}
	}),
	*/

	properties.type = getPropType({key, spec, value})
	properties.casts = getPropCasts({spec})

	if (spec.type === 'enum' && spec.values){
		properties.options = Object.keys(spec.values).map(key => {return {name: key, value: key, helper: spec.values[key].doc}})
	}
	if (spec.doc){
		properties.info = spec.doc
	}
	if (spec.default){
		properties.valueDefault = getSpecDefault({spec})
	}
	return properties
}

const getTypeChangeValue = ({type, value, valueDefault})=>{
	switch(type){
		case 'bool':
			if (typeof value === 'boolean') return value
			return valueDefault
		case 'array':
			if (List.isList(value)) return value
			return List([])
		case 'expression':
			if (List.isList(value)) return value
			return List([])
			break
		case 'function':
			if (Map.isMap(value)) return value
			return fromJS({stops:[[6,null],[10,null]]})
			break
		case 'string':
			if (typeof value === 'string') return value
			return valueDefault || ''
			break
		case 'number':
			if (typeof value === 'number') return value
			return valueDefault || 0
			break
		case 'color':
			if (typeof value === 'string') return value
			return valueDefault
		default:
			return null
	}				
}

export default {
	getExpressionOptions,
	getLayerType,
	getProperties,
	getPropertyOptions,
	getPropDefault,
	getRootPropertyFields,
	getSourceSpec,
	getSourceTypeOptions,
	getStyleProperties,
	getStyleRootPropertyFields,
	getStyleRootPropertyOptions,
	getTypeChangeValue,
}

