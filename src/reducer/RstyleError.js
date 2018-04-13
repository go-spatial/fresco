import {Map, List, fromJS} from 'immutable';

const iState = Map({});

export default function(state = iState, action){
	switch (action.type){
		case 'STYLE_ERROR_DEFINE':{
			let errors = Map();
			//console.log('STYLE_ERROR_DEFINE',action.payload);
			action.payload.forEach((error)=>{
				errors = errors.setIn(error.key,error.message);
			});
			return errors;
		}
		case 'STYLE_ERROR_ADD':{
			//console.log('STYLE_ERROR_DEFINE',action.payload);
			return state.setIn(action.payload.key,action.payload.message);
		}
		default:
			return state;
	}


};