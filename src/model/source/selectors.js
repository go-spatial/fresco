export default {
	get: (state)=>{
		return state.source.sources
	},
	getDataByUrl: (state, {url})=>{
		return state.source.sources.getIn([url, 'data'])
	}
}