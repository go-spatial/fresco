import { applyMiddleware, combineReducers, createStore } from 'redux'

import {reducer as app} from './model/app/reducer'
import {reducer as map} from './model/map/reducer'
import {reducer as source} from './model/source/reducer'
import {reducer as style} from './model/style/reducer'

export const reducers = combineReducers({
	app,
	map,
	source,
	style,
})


const middleware = applyMiddleware()

export default createStore(reducers, middleware)