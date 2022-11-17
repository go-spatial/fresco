import Store from '../../Store'
import constants from './constants'
import {fromJS, Map} from 'immutable'

import fileDownload from 'js-file-download'

import actions from '../actions'
import stylesDefault from '../../config/stylesDefault'

import utilType from '../../utility/utilType'
import utilFile from '../../utility/utilFile'
import utilLocalStorage from '../../utility/utilLocalStorage'
import utilMapboxErr from '../../utility/utilMapboxErr'
import utilUid from '../../utility/utilUid'
import utilUrl from '../../utility/utilUrl'

const add = async ({makeLayers, name, source, sourceType})=>{
	if (!name) throw new Error('style.add: no style name defined')

	let style = {
		name,
	}
	style.id = utilUid.make()
	style.version = constants.defaultMapboxVersion
	if (source && sourceType){
		const sourceId = utilUrl.getName(source)
		style.sources = {
			[sourceId]: {
				type: sourceType,
				url: source,
			}
		}
		if (makeLayers){
			const sourceData = await actions.act('source.pullData', {url: source})
			const layers = await actions.act('source.makeLayersFromData', {sourceId, sourceData})
			style.layers = layers
		}
	} else {
		style.sources = {}
	}
	style.layers = constants.defaultLayers

	const styleImm = fromJS(style)
	const stylePath = [style.id, 'current']

	await setIn({
		path: stylePath,
		value: styleImm,
	})

	const now = new Date().getTime()
	const createdPath = [style.id, 'when', 'created']
	await setIn({
		path: createdPath,
		value: now,
	})

	return styleImm
}

const addFromJson = async ({json})=>{
	if (!json) throw new Error('style.addFromJson: no json defined')
	if (!json.has('name')) throw new Error('style.addFromJson: name is required')

	let style = {
		...json.toJS()
	}
	//TODO check if ID is unique
	style.id = utilUid.make()
	style.version = json.get('version') || constants.defaultMapboxVersion

	const styleImm = fromJS(style)
	const stylePath = [style.id, 'current']

	await setIn({
		path: stylePath,
		value: styleImm,
	})

	const now = new Date().getTime()
	const createdPath = [style.id, 'when', 'created']
	await setIn({
		path: createdPath,
		value: now,
	})

	return styleImm
}

const addUpload = async ({file})=>{
	let style = await utilFile.readJson({file})

	// TODO: check if id clashes and add with native id
	style.id = utilUid.make()

	const styleImm = fromJS(style)
	const stylePath = [style.id, 'current']

	await setIn({
		path: stylePath,
		value: styleImm,
	})

	const now = new Date().getTime()
	const createdPath = [style.id, 'when', 'created']
	await setIn({
		path: createdPath,
		value: now,
	})

	return styleImm
}

const changeKeyIn = async ({keyOld, keyNew, path})=>{ 

	if (!path) throw new Error('style.changeKeyIn: no path defined')

	Store.dispatch({
		type:'STYLE_CHANGE_KEY',
		payload:{
			keyOld, 
			keyNew, 
			path,
		}
	})

	await localBackup()
}

const download = async ({style})=>{
	const json = style.get('current')
	const name = json.get('name')+'.json';
	const parsed = JSON.stringify(json, null, 2);
	fileDownload(parsed, name);
}

const errorSet = async ({error, path})=>{ 

	const errPath = utilMapboxErr.getKey(error)
	const fullPath = [...path, 'current', ...errPath]
	const errMsg = utilMapboxErr.getMessage(error)

	Store.dispatch({
		type:'STYLE_ERROR_SETIN',
		payload:{
			error: errMsg? errMsg: null,
			path: fullPath,
		}
	})

	await localBackup()
}

const errorClear = async ({path})=>{ 

	Store.dispatch({
		type:'STYLE_ERROR_SETIN',
		payload:{
			error: Map({}),
			path: path,
		}
	})

	await localBackup()
}

const init = async ()=>{
	// load styles from localStorage
	const stylesJs = utilLocalStorage.get(constants.localStoragePath)
	if (stylesJs){
		const stylesImm = fromJS(stylesJs)

		Store.dispatch({
			type:'STYLES_SET',
			payload:{
				styles: stylesImm,
			}
		})

		return
	}

	// get all config styles

	// check if it's an array or obj


	const type = utilType.get(stylesDefault)
	let styles = {}
	if (type === 'ary'){
		stylesDefault.forEach(style => {
			const id = style.id? style.id: utilUid.make()
			styles[id] = {
				current:{
					...style,
					id
				}
			}
		})
	} else if (type === 'obj'){
		const id = stylesDefault.id? stylesDefault.id: utilUid.make()
		styles[id] = {
			current:{
				...stylesDefault,
				id
			}
		}
	} else {
		throw new Error(`style.init: defaultStyles (${type}) is not an array or object`)
	}

	Store.dispatch({
		type:'STYLES_SET',
		payload:{
			styles: fromJS(styles),
		}
	})
}

const listAdd = async ({item, path, pos})=>{ 

	if (!path) throw new Error('style.actions.listAdd: no path defined')

	Store.dispatch({
		type:'STYLE_LIST_ADD',
		payload:{
			pos,
			item,
			path,
		}
	})

	await localBackup()
}

const listAddAt = async ({at, item, path, pos})=>{ 

	if (!path) throw new Error('style.actions.listAddAt: no path defined')

	Store.dispatch({
		type:'STYLE_LIST_ADD_AT',
		payload:{
			at,
			pos,
			item,
			path,
		}
	})

	await localBackup()
}

const listConcat = async ({list, path})=>{ 

	if (!path) throw new Error('style.actions.listConcat: no path defined')

	Store.dispatch({
		type:'STYLE_LIST_CONCAT',
		payload:{
			list,
			path,
		}
	})

	await localBackup()
}

const localBackup = async ()=>{
	const state = Store.getState()
	const js = state.style.styles.toJS()

	utilLocalStorage.set(constants.localStoragePath, js)
}

const removeIn = async ({path})=>{ 
	Store.dispatch({
		type:'STYLE_REMOVEIN',
		payload:{
			path,
		}
	})

	await localBackup()
}

const remove = async ({style})=>{ 
	Store.dispatch({
		type:'STYLE_REMOVEIN',
		payload:{
			path: [style.getIn(['current','id'])],
		}
	})

	await localBackup()
}

const focusIn = async ({path})=>{
	Store.dispatch({
		type:'STYLE_FOCUS',
		payload:{
			focus: path,
		}
	})
}

const reorderInList = async ({indexOld, indexNew, path})=>{
	Store.dispatch({
		type:'STYLE_REORDERINLIST',
		payload:{
			indexOld, indexNew, path,
		}
	})

	await localBackup()
}

const setAccessToken = async ({key, style, token})=>{
	const styleId = style.getIn(['current','id'])

	const path = [styleId, 'accessTokens', key]

	Store.dispatch({
		type:'STYLE_SETIN',
		payload:{
			path,
			value: token
		}
	})

	await localBackup()
}

const setFeatureState = async ({featureId, featureState, source, sourceLayer, style})=>{
	const styleId = style.getIn(['current','id'])

	const path = [styleId, 'featureStates', source, sourceLayer, featureId]
	Store.dispatch({
		type:'STYLE_SETIN',
		payload:{
			path,
			value: featureState
		}
	})

	await localBackup()
}

const setDomainHeader = async ({domain, header, style})=>{
	const styleId = style.getIn(['current','id'])

	const path = [styleId, 'domainHeaders', domain]

	Store.dispatch({
		type:'STYLE_SETIN',
		payload:{
			path,
			value: header
		}
	})

	await localBackup()
}

const setRenderer = async ({renderer, style})=>{
	const styleId = style.getIn(['current','id'])

	const path = [styleId, 'current', 'metadata', 'fresco:renderer']

	await setIn({
	    path,
	    value: renderer,
	})
}

// [{styleId}, 'current', 'layers', 0,  ...]

const setIn = async ({path, value})=>{ 

	if (!path) throw new Error('style.actions.setIn: no path defined')

	Store.dispatch({
		type:'STYLE_SETIN',
		payload:{
			path,
			value,
		}
	})

	await localBackup()
}

const updateFromJson = async ({json, style})=>{
	if (!json) throw new Error('style.updateFromJson: no json defined')
	if (!json.name) throw new Error('style.updateFromJson: name is required')

	let newStyle = {
		...json
	}
	//TODO check if ID is unique
	newStyle.id = style.getIn(['current','id'])

	const styleImm = fromJS(newStyle)
	const stylePath = [newStyle.id, 'current']

	await setIn({
		path: stylePath,
		value: styleImm,
	})

	await localBackup()
}

const updateUpload = async ({file, style})=>{
	let newStyle = await utilFile.readJson({file})

	// TODO: check if id clashes and add with native id
	newStyle.id = style.getIn(['current','id'])

	const styleImm = fromJS(newStyle)
	const stylePath = [newStyle.id, 'current']

	await setIn({
		path: stylePath,
		value: styleImm,
	})

	await localBackup()
}

actions.subscribe('style',{
	changeKeyIn,
	listAdd,
	listAddAt,
	listConcat,
	reorderInList,
	setIn,
})

export default {
	add,
	addFromJson,
	addUpload,
	changeKeyIn,
	download,
	errorClear,
	errorSet,
	focusIn,
	init,
	listAddAt,
	listConcat,
	remove,
	removeIn,
	reorderInList,
	setAccessToken,
	setDomainHeader,
	setFeatureState,
	setIn,
	updateFromJson,
	updateUpload,
}
