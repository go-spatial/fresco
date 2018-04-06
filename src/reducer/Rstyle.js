import {Map, List, fromJS} from 'immutable';

const iState = Map({
	loaded:false,
	rec:undefined
});

export default function(state = iState, action){
	//console.log('style reducer:',action);
	// mutate with 
	// state = {...state,, name:action.payload}

	switch (action.type){
		case 'STYLE_DEFINE':{
			const rec = fromJS(action.payload);
			return Map({
				rec:rec,
				loaded:true
			});
		}
		case 'STYLE_SETIN':{
			console.log('style setIn:',action.key,action.payload)
			return state.setIn(action.key,action.payload);
		}
		case 'STYLE_STORE_SETIN':{
			return state.setIn(['rec','_store',...action.key],fromJS(action.payload));
		}
		case 'LAYER_ADD':{
			const layer = fromJS(action.payload);
			if (!state.hasIn(['rec','layers'])){
				return state.setIn(['rec','layers'],List([layer]));
			}
			const layers = state.getIn(['rec','layers']).push(layer);
			return state.setIn(['rec','layers'],layers);
		}
		case 'LAYER_SET':{
			const ind = state.getIn(['rec','layers']).findIndex((layer)=>{
				return layer.get('id') === action.layerId;
			});
			if (ind === -1) throw new Error('layer matching layerId not found');
			const layer = fromJS(action.payload);
			return state.setIn(['rec','layers',ind],layer);
		}
		case 'LAYER_SETIN':{
			const ind = state.getIn(['rec','layers']).findIndex((layer)=>{
				return layer.get('id') === action.layerId;
			});
			if (ind === -1) throw new Error('layer matching layerId not found');
			const val = fromJS(action.payload);
			return state.setIn(['rec','layers',ind, ...action.prop],val);
		}
		case 'SOURCE_ADD':{
			const source = fromJS(action.payload);
			return state.setIn(['rec','sources',source.get('url')],source);
		}
		default:
			return state;
	}
}