import Store from '../../Store'
import {fromJS} from 'immutable'
import actions from '../actions'
import constants from './constants'
import helpers from './helpers'
import utilLocalStorage from '../../utility/utilLocalStorage'
import utilMaterialColor from '../../utility/utilMaterialColors'
import utilPath from '../../utility/utilPath'
import utilRequest from '../../utility/utilRequest'

const add = async ({headers, makeLayers, id, path, style, type, url})=>{

	if (!id || id.length < 1) throw new Error('source.add: no id defined')
	if (!type || type.length < 1) throw new Error('source.add: no type selected')
	//if (!url || url.length < 1) throw new Error('source.add: no url defined')

	// TODO: check for source id duplicates

	// add source to style
	let add = {
		type,
		url
	}
	
	await actions.act('style.setIn',{
		path: [...path, id],
		value: fromJS(add),
	})

	if (!url) return

	const sourceData = await pullData({url, headers})

	if (makeLayers){
		const layers = await makeLayersFromData({sourceId: id, sourceData})

		const pathLayers = utilPath.getStyleIn({path, pathIn: ['layers']})

		await actions.act('style.listConcat', {
			path: pathLayers,
			list: fromJS(layers),
		})
	}
}

const pullData = async ({url, headers})=>{
	// make request to source and get data

	// get headers from domain settings

	let data
	try {
		data = await utilRequest.get({url, headers})
	} catch(e){
		console.error(e)
		throw new Error('source.add: source not found', e)
	}

	const dataImm = fromJS(data)
		
	Store.dispatch({
		type:'SOURCE_ADD',
		payload:{
			url,
			data: dataImm,
		}
	})

	const state = Store.getState()
	const js = state.source.sources.toJS()
	//store source data in localstorage
	utilLocalStorage.set(constants.localStoragePath, js)

	return dataImm
}

const changeId = async ({path, idOld, idNew})=>{
	if (!idNew || idNew.length < 1) throw new Error('source.changeId: no id defined')
		
	await actions.act('style.changeKeyIn',{
		keyOld: idOld,
		keyNew: idNew,
		path,
	})
}

const init = async ()=>{
	// load sources from localStorage
	const sourcesJs = utilLocalStorage.get(constants.localStoragePath)
	if (sourcesJs){
		const sourcesImm = fromJS(sourcesJs)

		Store.dispatch({
			type:'SOURCES_SET',
			payload:{
				sources: sourcesImm,
			}
		})
	}
}

const makeLayersFromData = async ({sourceId, sourceData})=>{
	let layers = []

	const sourceLayers = helpers.getLayersFromData({data: sourceData})

	sourceLayers.forEach((sourceLayer)=>{
		const color = utilMaterialColor.getBright(sourceLayer.get('id'))

		let layer = {
			id: sourceLayer.get('id'),
			source: sourceId,
			'source-layer': sourceLayer.get('name') || sourceLayer.get('id'),
			layout: {
				visibility: 'visible'
			},
			'minzoom': sourceLayer.get('minzoom') || constants.defaultMinZoom,
			'maxzoom': sourceLayer.get('maxzoom') || constants.defaultMaxZoom,
		}

		if (sourceLayer.get('geometry_type') === 'point'){
			layer.type = 'circle'
			layer.paint = {
				'circle-radius': 3,
				'circle-color': color
			}
		} else if (sourceLayer.get('geometry_type') === 'line'){
			layer.type = 'line'
			layer.paint = {
				'line-color': color
			}
		} else {
			layer.type = 'fill'
			layer.paint = {
				'fill-color': color,
				'fill-opacity': 0.2
			}
		}
		if (!layer.type) return null

		layers.push(layer)
	})

	return layers
}

actions.subscribe('source',{
	add,
	makeLayersFromData,
	pullData,
})

export default {
	add,
	changeId,
	init,
	makeLayersFromData,
	pullData,
}