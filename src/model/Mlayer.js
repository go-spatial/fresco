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

	add:(layer)=>{

		return new Promise((resolve,reject)=>{
			if (!layer.id) throw new Error('no layerId');

			Store.dispatch({
				type:'LAYER_ADD',
				payload:layer
			});

			Mstyle.save();
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

			Mstyle.save();
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

			Mstyle.save();
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