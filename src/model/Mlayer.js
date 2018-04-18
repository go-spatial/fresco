import Store from '../Store';

import Mstyle from './Mstyle';
//import Model from './Model';

const types = [
	{name:'fill',value:'fill'},
	{name:'line',value:'line'},
	{name:'symbol',value:'symbol'},
	{name:'circle',value:'circle'},
	{name:'heatmap',value:'heatmap'},
	{name:'fill-extrusion',value:'fill-extrusion'},
	{name:'raster',value:'raster'},
	{name:'hillshade',value:'hillshade'},
	{name:'background',value:'background'},
];

export default {

	add:function(layer){

		return new Promise((resolve,reject)=>{
			if (!layer.id) return reject('no layerId');

			Store.dispatch({
				type:'LAYER_ADD',
				payload:layer
			});

			Mstyle.save();
			return resolve(layer);
		});

	},

	set:function(layerId,layer){
		return new Promise((resolve,reject)=>{
			if (!layerId) return reject('no layerId');

			Store.dispatch({
				type:'LAYER_SET',
				layerId:layerId,
				payload:layer
			});

			Mstyle.save();
			return resolve();
		});

	},

	setIn:function(layerId,prop,val){
		return new Promise((resolve,reject)=>{
			if (!layerId) return reject('no layerId');

			Store.dispatch({
				type:'LAYER_SETIN',
				layerId:layerId,
				prop:prop,
				payload:val
			});

			Mstyle.save();
			return resolve();
		});

	},

	visibilityToggle:function(layerId){
		return new Promise((resolve,reject)=>{
			const layer = this.get(layerId);
			const visible = layer.getIn(['layout','visibility']);
			console.log('layer:',layer,visible);
			if (visible === 'none'){
				this.setIn(layerId,['layout','visibility'],'visible');
			} else { //assume visible
				this.setIn(layerId,['layout','visibility'],'none');
			}
		});
	},

	remove:function(layerId){
		return new Promise((resolve,reject)=>{
			if (!layerId) return reject('no layerId');

			Store.dispatch({
				type:'LAYER_REMOVE',
				layerId:layerId
			});

			Mstyle.save();
			return resolve();
		});
	},

	get:function(layerId){
		const ind = Store.getState().style.getIn(['rec','layers']).findIndex((layer)=>{
			//console.log('layer:',layer)
			return layer.get('id') === layerId;
		});
		if (ind === -1) return null;
		return Store.getState().style.getIn(['rec','layers',ind])
	},

	getInd:function(layerId){
		return Store.getState().style.getIn(['rec','layers']).findIndex((layer)=>{
			//console.log('layer:',layer)
			return layer.get('id') === layerId;
		});
	},

	getTypes:function(){
		return types;
	}

};