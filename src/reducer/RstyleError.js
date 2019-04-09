import {Map} from 'immutable';

const iState = Map({});

export default function(state = iState, action){
	switch (action.type){
		case 'STYLE_ERROR_DEFINE':{
			let errors = Map();
			action.payload.forEach((error)=>{
				errors = errors.setIn(error.key,error.message);
			});
			return errors;
		}
		case 'STYLE_ERROR_ADD':{
			return state.setIn(action.payload.key,action.payload.message);
		}
		default:
			return state;
	}


};