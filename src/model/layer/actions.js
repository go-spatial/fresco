import {fromJS} from 'immutable'
import actions from '../actions'
import helpers from './helpers'

const add = async ({afterLayerInd = 0, rec, path})=>{

	if (!rec.id || rec.id.length < 1) throw new Error('no id defined')
	if (!rec.type || rec.type.length < 1) throw new Error('no type selected')
		
	let add = {
		...rec
	}
	const optProps = ['source', 'source-layer']
	optProps.forEach(prop => {
		if (!rec[prop] || rec[prop].length < 1) delete add[prop]
	})

	await actions.act('style.listAdd',{
		item: fromJS(add),
		path,
	})
}

const clone = async ({cloneId, layer, path, placement, style})=>{

	const clone = layer.setIn(['id'], cloneId)
	const layersPath = path.slice(0,-1)

	if (placement === 'after'){
		let pos = helpers.getIndexById({layerId: layer.get('id'), style})
		await actions.act('style.listAddAt',{
			at: pos+1,
			item: clone,
			path: layersPath,
		})
	} else {
		await actions.act('style.listAdd',{
			item: clone,
			path: layersPath,
		})
	}
	return clone
}

const reorder = async ({indexOld, indexNew, path})=>{

	await actions.act('style.reorderInList',{
		indexOld,
		indexNew,
		path
	})
}

actions.subscribe('layer',{
	add,
})

export default {
	add,
	clone,
	reorder,
}