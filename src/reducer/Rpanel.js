import {Map, List, fromJS} from 'immutable';

const iState = Map({
	recs:List([])
});

export default function(state = iState, action){
	switch (action.type){
		case 'PANEL_ADD':{
			const rec = fromJS(action.payload);
			const recs = state.get('recs').push(rec);
			return state.set('recs',recs);
		}
		default:
			return state;
	}
}