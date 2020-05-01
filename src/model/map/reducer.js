import {Map} from 'immutable'

const state = {
	accessTokenDeploy: false,
	featureStateDeploy: true,
	featureStates: Map({}),
	focus: null,
	focusFeatures: [],
}

export const reducer = (st = state, action)=>{
	switch (action.type){
		case 'MAP_ACCESS_TOKEN_DEPLOY':{
			const {deploy} = action.payload
			return {
				...st,
				accessTokenDeploy: deploy,
			}
		}
		case 'MAP_FEATURE_STATE_SET':{
			const {featureId, source, sourceLayer, featureState} = action.payload
			const path = [source, sourceLayer, featureId]
			const featureStates = st.featureStates.setIn(path, featureState)

			return {
				...st,
				featureStates,
			}
		}
		case 'MAP_FEATURE_STATE_DEPLOY':{
			const {deploy} = action.payload
			return {
				...st,
				featureStateDeploy: deploy,
			}
		}
		case 'MAP_FOCUS_CLEAR':{
			return {
				...st,
				focus: null,
				focusFeatures: [],
			}
		}
		case 'MAP_FOCUS_SET':{
			const {focus} = action.payload

			return {
				...st,
				focus
			}
		}
		case 'MAP_FOCUS_FEATURES_SET':{
			const {focusFeatures} = action.payload

			return {
				...st,
				focusFeatures
			}
		}
		default:
			return st
  }
}