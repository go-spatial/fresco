import {combineReducers} from 'redux';
import Rstyles from './Rstyles';
import Rstyle from './Rstyle';

export default combineReducers({
	styles:Rstyles,
	style:Rstyle
});