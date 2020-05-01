export default {
	getIn: (state, {path})=>{
		return state.preference.options.getIn(path)
	},
}