let listeners = {}
const act = async (action, payload)=>{
	if (!listeners[action]) throw new Error(`actions.act: no action subscribed for ${action}`)
	return await listeners[action](payload)
}
const subscribe = async (model, actions = {})=>{
	if (!model) throw new Error('subscribe no model')
	for (let i in actions){
		listeners[`${model}.${i}`] = actions[i]
	}
}

export default {
	act,
	subscribe,
}