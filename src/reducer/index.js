import {combineReducers} from 'redux';
import Rstyles from './Rstyles';
import Rstyle from './Rstyle';
import RstyleError from './RstyleError';

export default combineReducers({
	styles:Rstyles,
	style:Rstyle,
	styleError:RstyleError
});