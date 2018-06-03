import {Map, fromJS} from 'immutable';

const iState = Map({
	loaded:false
});

export default function(state = iState, action){
	//console.log('style reducer:',action);
	// mutate with 
	// state = {...state,, name:action.payload}

	switch (action.type){
		case 'CONFIG_DEFINE':{
			const rec = fromJS(action.payload);
			return rec;
		}
		case 'CONFIG_SETIN':{
			const rec = state.setIn(action.key,action.payload);
			return rec;
		}
		default:
			return state;
	}
}