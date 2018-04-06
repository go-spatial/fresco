import {applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import error from './error';

export default applyMiddleware(logger,error,thunk); 