import {List, Map} from 'immutable'

const state = {
	errors: Map({}),
	focus: null,

	/*
		styles: Map({
			[styleId]: Map({
				current: Map({}),
				when: Map({}),
				focus: Map({
					layers: List({})
					sources:
					sourceLayers:
				})
			})
		})
	*/
	styles: Map({}),
}

const updateStyle = ({st, styles, path})=>{

	const libRoot = path.slice(0,1),
		now = new Date().getTime()
	const updatedPath = [...libRoot, 'when', 'updated']

	return {
		...st,
		styles: styles.setIn(updatedPath, now)
	}
}

export const reducer = (st = state, action)=>{
	switch (action.type){

		case 'STYLE_CHANGE_KEY':{
			const {keyOld, keyNew, path} = action.payload

			const item = st.styles.getIn([...path, keyOld])
			const stylesRemoved = st.styles.removeIn([...path, keyOld])
			const styles = stylesRemoved.setIn([...path, keyNew], item)

			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLE_ERROR_SETIN':{
			const {error, path} = action.payload

			const errors = st.errors.setIn(path, error)
			return {
				...st,
				errors,
			}
		}
		case 'STYLE_FOCUS':{
			const {focus} = action.payload
			return {
				...st,
				focus
			}
		}
		case 'STYLE_LIST_ADD':{
			const {item, path} = action.payload
			if (!st.styles.hasIn(path)){
				const styles = st.styles.setIn(path, List([item]))
				return updateStyle({
					path,
					st,
					styles,
				})
			}
			const list = st.styles.getIn(path).push(item)
			const styles = st.styles.setIn(path, list)
			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLE_LIST_CONCAT':{
			const {list, path} = action.payload

			if (!st.styles.hasIn(path)){
				const styles = st.styles.setIn(path, list)
				return updateStyle({
					path,
					st,
					styles,
				})
			}
			const newList = st.styles.getIn(path).concat(list)
			const styles = st.styles.setIn(path, newList)
			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLE_REORDERINLIST':{
			const {indexOld, indexNew, path} = action.payload

			const item = st.styles.getIn([...path ,indexOld]);
			const list = st.styles.getIn(path).splice(indexOld ,1).splice(indexNew, 0, item);
			const styles = st.styles.setIn([...path], list)

			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLE_REMOVEIN':{
			const {path, value} = action.payload
			const styles = st.styles.removeIn(path)

			if (path.length < 3){ // changed whole style, no updated needed
				return {
					...st,
					styles
				}
			}
			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLE_SETIN':{
			const {path, value} = action.payload
			const styles = st.styles.setIn(path, value)

			if (path.length < 3){ // changed whole style, no updated needed
				return {
					...st,
					styles,
				}
			}

			return updateStyle({
				path,
				st,
				styles,
			})
		}
		case 'STYLES_SET':{
			const {styles} = action.payload
			return {
				...st,
				styles
			}
		}
		default:
			return st
  }
}