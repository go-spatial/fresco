import helpers from './helpers'

export default {
	accessTokenDeploy: (state)=>{
		return state.map.accessTokenDeploy
	},
	featureStateDeploy: (state)=>{
		return state.map.featureStateDeploy
	},
	focus: (state)=>{
		return state.map.focus
	},
	focusFeatures: (state)=>{
		return state.map.focusFeatures
	},
	focusFeaturesByLayerId: (state, {layerId})=>{
		return helpers.getFeaturesByLayerId({features: state.map.focusFeatures, layerId})
	},
	focusLayers: (state)=>{
		return helpers.getFeatureLayers({features: state.map.focusFeatures})
	},
	focusSources: (state)=>{
		return helpers.getFeatureSources({features: state.map.focusFeatures})
	},
	focusSourceLayers: (state)=>{
		return helpers.getFeatureSourceLayers({features: state.map.focusFeatures})
	},
}