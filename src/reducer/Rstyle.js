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
			const style = Map({
				rec:rec,
				_store:Map()
			});
			return setUpdated(style);
		}
		case 'STYLE_SETIN':{
			//console.log('style setIn:',action.key,action.payload);
			const style = state.setIn(action.key,action.payload);
			return setUpdated(style);
		}
		case 'STYLE_STORE_SETIN':{
			const style = state.setIn(['rec','_store',...action.key],fromJS(action.payload));
			return setUpdated(style);
		}
		case 'LAYER_ADD':{
			const layer = fromJS(action.payload);
			if (!state.hasIn(['rec','layers'])){
				const style = state.setIn(['rec','layers'],List([layer]));
				return setUpdated(style);
			}
			const layers = state.getIn(['rec','layers']).push(layer);
			const style = state.setIn(['rec','layers'],layers);
			return setUpdated(style);
		}
		case 'LAYER_SET':{
			const ind = state.getIn(['rec','layers']).findIndex((layer)=>{
				return layer.get('id') === action.layerId;
			});
			if (ind === -1) throw new Error('layer matching layerId not found');
			const layer = fromJS(action.payload);
			const style = state.setIn(['rec','layers',ind],layer);
			return setUpdated(style);
		}
		case 'LAYER_SETIN':{
			const ind = state.getIn(['rec','layers']).findIndex((layer)=>{
				return layer.get('id') === action.layerId;
			});
			if (ind === -1) throw new Error('layer matching layerId not found');
			const val = fromJS(action.payload);
			const style = state.setIn(['rec','layers',ind, ...action.prop],val);
			return setUpdated(style);
		}
		case 'LAYER_REMOVE':{
			const ind = state.getIn(['rec','layers']).findIndex((layer)=>{
				return layer.get('id') === action.layerId;
			});
			if (ind === -1) throw new Error('layer matching layerId not found');
			const layers = state.getIn(['rec','layers']).filter((layer)=>{ 
				return layer.get('id') !== action.layerId;
			});
			const style = state.setIn(['rec','layers'],layers);
			return setUpdated(style);
		}
		case 'SOURCE_ADD':{
			const source = fromJS(action.payload);
			const style = state.setIn(['rec','sources',source.get('url')],source);
			return setUpdated(style);
		}
		default:
			return state;
	}
}

const setUpdated = (state)=>{
	const now = new Date().getTime();
	return state.setIn(['rec','_store','updated'],now);
};