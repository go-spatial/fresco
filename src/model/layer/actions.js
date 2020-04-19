import Store from '../../Store'
import {fromJS} from 'immutable'
import actions from '../actions'


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

const clone = async ({layer, path})=>{

	await actions.act('style.cloneInList',{
		layer,
		path
	})
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
	reorder,
}