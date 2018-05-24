import {Map, fromJS} from 'immutable';

const iState = Map({
	loaded:false,
	recs:undefined
});

export default function(state = iState, action){
	//console.log('style reducer:',action);
	// mutate with 
	// state = {...state,, name:action.payload}

	switch (action.type){
		case 'STYLES_DEFINE':{
			const recs = fromJS(action.payload);
			return Map({
				recs:recs,
				loaded:true
			});
		}
		case 'STYLE_ADD':{
			const add = fromJS(action.payload);
			return state.setIn(['recs',action.payload.id],add);
		}
		case 'STYLE_REMOVE':{
			if (!action.styleId) throw new Error('no styleId');
			const recs = {...state.recs};
			delete recs[action.styleId];
			state = {
				...state,
				recs:recs,
				loaded:true
			};
			return state;
		}
		default:
			return state;
	}
}