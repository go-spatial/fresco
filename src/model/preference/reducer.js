import {Map} from 'immutable'

const state = {
	options: Map({}),
}

export const reducer = (st = state, action)=>{
	switch (action.type){
		case 'PREFERENCE_SETIN':{
			const {path, value} = action.payload
			const options = st.options.setIn(path, value)

			return {
				...st,
				options,
			}
		}
		case 'PREFERENCE_SET':{
			const {preference} = action.payload
			return {
				...st,
				options: preference
			}
		}
		default:
			return st
  }
}