import Store from '../Store';
//import Model from './Model';

export default {

	add:(layer)=>{
		return new Promise((resolve,reject)=>{
			if (!layer.id) throw new Error('no layerId');

			Store.dispatch({
				type:'LAYER_ADD',
				payload:layer
			});
			return resolve();
		});

	},

	set:(layerId,layer)=>{
		return new Promise((resolve,reject)=>{
			if (!layerId) throw new Error('no layerId');

			Store.dispatch({
				type:'LAYER_SET',
				layerId:layerId,
				payload:layer
			});
			return resolve();
		});

	},

	setIn:(layerId,prop,val)=>{
		return new Promise((resolve,reject)=>{
			if (!layerId) throw new Error('no layerId');

			Store.dispatch({
				type:'LAYER_SETIN',
				layerId:layerId,
				prop:prop,
				payload:val
			});
			return resolve();
		});

	},

	get:function(layerId){
		const ind = Store.getState().style.getIn(['rec','layers']).findIndex((layer)=>{
			//console.log('layer:',layer)
			return layer.get('id') === layerId;
		});
		return Store.getState().style.getIn(['rec','layers',ind])
	},

};