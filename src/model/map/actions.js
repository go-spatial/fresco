import Store from '../../Store'
import actions from '../actions'

// map features do not support transformation into immutable, use generics

const setFocusFeatures = async ({features})=>{
	Store.dispatch({
		type:'MAP_FOCUS_FEATURES_SET',
		payload:{
			focusFeatures: features,
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