export default {
	agentCanPost: (state) => {
		return state.post.agentCanPost
	},
	rec: (state, postId) => {
		return state.post.recs[postId]
	},
	recById: (state, postId) => {
		return state.post.recs[postId]
	},
	recByHandle: (state, handle) => {for (let i in state.post.recs){
		const rec = state.post.recs[i]
		if (rec.handle === handle) return rec
	}},
}