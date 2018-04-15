import Store from '../Store';
import SourceReader from '../utility/SourceReader';
import MaterialColor from '../utility/MaterialColor';

import Mstyle from './Mstyle';

export default {

	add:function(source){
		return new Promise((resolve,reject)=>{
			if (!source.url) throw new Error('no source.url');
			if (!source.type) throw new Error('no source.type');

			SourceReader.load(source.url).then((sourceJson)=>{
				
				Store.dispatch({
					type:'SOURCE_ADD',
					payload:source
				});
				Store.dispatch({
					type:'STYLE_STORE_SETIN',
					key:['sourceJson',source.url],
					payload:sourceJson
				});

				const sourceLayers = sourceJson.vector_layers;
				this.setupInitialLayers(source, sourceLayers);

				Mstyle.save();
				return resolve(source);
			}).catch((e)=>{
				return reject(e);
			});	
		});

	},

	setJSON:function(key,source){
		//console.log('setJSON source:',source);
		return new Promise((resolve,reject)=>{
			SourceReader.load(source.get('url')).then((sourceJson)=>{
				Store.dispatch({
					type:'STYLE_STORE_SETIN',
					key:['sourceJson',key],
					payload:sourceJson
				});
			}).catch((e)=>{
				return reject(e);
			});
		});
	},

	setupInitialLayers:function(source, sourceLayers){
		return new Promise((resolve,reject)=>{
			sourceLayers.map((sourceLayer)=>{
				const color = MaterialColor.getBright(sourceLayer.id);
				let layer = {
					id:sourceLayer.id,
					source:source.url,
					'source-layer':sourceLayer.name,
					layout: {
						visibility: 'visible'
					},
					'minzoom':sourceLayer.minzoom,
					'maxzoom':sourceLayer.maxzoom,
				};
				if (sourceLayer.geometry_type === 'point'){
					layer.type = 'circle';
					layer.paint = {
						'circle-radius': 3,
						'circle-color': color
					}
				} else if (sourceLayer.geometry_type === 'line'){
					layer.type = 'line';
					layer.paint = {
						'line-color': color
					}
				} else if (sourceLayer.geometry_type === 'polygon'){
					layer.type = 'fill';
					layer.paint = {
						'fill-color': color,
						'fill-opacity': 0.2
					}
				}
				if (!layer.type) return null;

				Store.dispatch({
					type:'LAYER_ADD',
					payload:layer
				});
				return null;
			});

			Mstyle.save();

			return resolve();
		});
	},
	get:function(key){
		if (key === undefined) return Store.getState().style.getIn(['rec','sources']);
		return Store.getState().style.getIn(['rec','sources',key]);
	},
	getOptions:function(){
		let options = [];
		const sources = this.get();

		//console.log('sources:',sources);
		sources.keySeq().toArray().forEach((key)=>{
			//console.log('sources key:',key);
			//const source = sources.get(key);
			options.push({
				name:key,
				value:key
			});
			return;
		});
		return options;
	},
	getLayers:function(key){
		return Store.getState().style.getIn(['rec','_store','sourceJson',key,'vector_layers']);
	},
	getJson:function(key){
		return Store.getState().style.getIn(['rec','_store','sourceJson',key]);
	}

};