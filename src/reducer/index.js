import {combineReducers} from 'redux';
import Rconfig from './Rconfig';
import Rpanel from './Rpanel';
import Rstyle from './Rstyle';
import RstyleError from './RstyleError';
import Rstyles from './Rstyles';

export default combineReducers({
	panel:Rpanel,
	styles:Rstyles,
	style:Rstyle,
	styleError:RstyleError,
	config:Rconfig
});