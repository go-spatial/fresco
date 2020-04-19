export default {
	domainHeaders: (state, {styleId})=>{
		const path = [styleId, 'domainHeaders']
		return state.style.styles.getIn(path)
	},
	error: (state, {path})=>{
		return state.style.errors.getIn(path)
	},
	listIds: (state)=>{
		return state.style.styles.keySeq().map(styleId => {
			return styleId
		})
	},
	get: (state)=>{
		return state.style.styles
	},
	getIn: (state, {path})=>{
		return state.style.styles.getIn(path)
	},
	accessTokens: (state, {styleId})=>{
		const path = [styleId, 'accessTokens']
		return state.style.styles.getIn(path)
	},
	featureStates: (state, {styleId})=>{
		const path = [styleId, 'featureStates']
		return state.style.styles.getIn(path)
	},
}