import {List, Map} from 'immutable'

const state = {
	sources: Map({}),
}

export const reducer = (st = state, action)=>{
	switch (action.type){
		case 'SOURCE_ADD':{
			const {url, data} = action.payload

			const sources = st.sources.setIn([url], Map({data}))
			return {
				...st,
				sources,
			}
		}
		case 'SOURCES_SET':{
			const {sources} = action.payload
			return {
				...st,
				sources
			}
		}
		default:
			return st
  }
}