import {combineReducers} from 'redux';
import Rconfig from './Rconfig';
import Rstyle from './Rstyle';
import RstyleError from './RstyleError';
import Rstyles from './Rstyles';

export default combineReducers({
	styles:Rstyles,
	style:Rstyle,
	styleError:RstyleError,
	config:Rconfig
});