import Store from '../../Store'
import actions from '../actions'

// map features do not support transformation into immutable, use generics

const setFocusFeatures = async ({features})=>{

	// dedupe features by id
	let found = [], deduped = []
	features.forEach(feature => {
		const key = `${feature.source}~${feature.sourceLayer}~${feature.layer.id}~${feature.id}`
		if (!found.includes(key)){
			found.push(key)
			deduped.push(feature)
		}
	})

	Store.dispatch({
		type:'MAP_FOCUS_FEATURES_SET',
		payload:{
			focusFeatures: deduped,
		}
	})
}

const setFeatureStateDeploy = async ({deploy})=>{
	Store.dispatch({
		type:'MAP_FEATURE_STATE_DEPLOY',
		payload:{deploy}
	})
}


const setAccessTokenDeploy = async ({deploy})=>{
	Store.dispatch({
		type:'MAP_ACCESS_TOKEN_DEPLOY',
		payload:{deploy}
	})
}

const setFocus = async ({point})=>{
	Store.dispatch({
		type:'MAP_FOCUS_SET',
		payload:{
			focus: point,
		}
	})
}

const clearFocus = async ()=>{
	Store.dispatch({
		type:'MAP_FOCUS_CLEAR',
		payload:{}
	})
}

actions.subscribe('map',{
	setFocus,
})

export default {
	clearFocus,
	setAccessTokenDeploy,
	setFeatureStateDeploy,
	setFocusFeatures,
	setFocus,
}