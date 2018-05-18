import Store from '../Store';

import Mstyle from './Mstyle';
//import Model from './Model';

import MaterialColor from '../utility/MaterialColor';

import config from '../config/layer.json';

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

			// add default properties based on layer type
			layer = this.addDefaultProps(layer);
			
			Store.dispatch({
				type:'LAYER_ADD',
				payload:layer
			});

			Mstyle.save();
			return resolve(layer);
		});

	},

	addDefaultProps:function(layer){
		if (!config.types || !config.types[layer.type] || !config.types[layer.type].default) return layer;

		for (let i in config.types[layer.type].default){
			if (!layer[i]) layer[i] = config.types[layer.type].default[i];
		}

		return this.addDefaultColors(layer,layer);
	},

	addDefaultColors:function(layer,part){
		for (let i in part){
			if (part[i] && part[i].color && part[i].color === 'light'){
				part[i] = MaterialColor.getLight(layer.id);
			}
			if (typeof part[i] === 'object' && part[i] !== null){
				part[i] = this.addDefaultColors(layer,part[i]);
			}
		}
		return part;
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

	removeIn:function(layerId,key){
		return new Promise((resolve,reject)=>{
			if (!layerId) return reject('no layerId');

			// clear out key, if is a list (expression), clear out expression

			Store.dispatch({
				type:'LAYER_REMOVEIN',
				layerId:layerId,
				prop:key,
				payload:null
			});

			Mstyle.save();
			return resolve();
		});

	},

	setIn:function(layerId,prop,val){
		return new Promise((resolve,reject)=>{
			if (!layerId) return reject('no layerId');

			// if val is [ turn into a list
			if (typeof val === 'string' && val === '['){
				val = [];
			}

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