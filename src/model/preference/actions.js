
import {fromJS} from 'immutable'

import Store from '../../Store'
import actions from '../actions'
import constants from './constants'
import utilLocalStorage from '../../utility/utilLocalStorage'

const init = async ()=>{
	// load preference from localStorage
	const preferenceJs = utilLocalStorage.get(constants.localStoragePath)
	if (preferenceJs){
		const preferenceImm = fromJS(preferenceJs)

		Store.dispatch({
			type:'PREFERENCE_SET',
			payload:{
				preference: preferenceImm,
			}
		})

		return
	}
}

const localBackup = async ()=>{
	const state = Store.getState()
	const js = state.preference.options.toJS()

	utilLocalStorage.set(constants.localStoragePath, js)
}

const setIn = async({path, value})=>{
	if (!path) throw new Error('preference.actions.setIn: no path defined')

	Store.dispatch({
		type:'PREFERENCE_SETIN',
		payload:{
			path,
			value,
		}
	})

	await localBackup()
}

actions.subscribe('preference',{
	setIn,
})

export default {
	init,
	setIn,
}