
import Store from '../Store';
import LocalStorage from '../utility/LocalStorage';
import {uidMake} from '../utility/Uid';

export default {
	load:function(id){
		return new Promise((resolve,reject)=>{
			let rec = LocalStorage.get(id);
			Store.dispatch({
				type:'STYLE_DEFINE',
				payload:rec
			});
			return resolve();
		});
	},

	define:function(style){
		return new Promise((resolve,reject)=>{
			Store.dispatch({
				type:'STYLE_DEFINE',
				payload:style
			});
			return resolve();
		});
	},
	save:function(){
		const style = this.getJS();

		console.log('style save:',style.rec);
		LocalStorage.set(style.rec.id,style.rec);
	},

	setIn:(key,val)=>{
		return new Promise((resolve,reject)=>{
			if (!key) throw new Error('no key');

			Store.dispatch({
				type:'STYLE_SETIN',
				key:['rec', ...key],
				payload:val
			});
			return resolve();
		});

	},

	isValid:function(){
		//const style = this.getJS();

	},

	get:function(){
		return Store.getState().style;
	},
	getJS:function(){
		return this.get().toJS();
	},

	getMapStyle:function(){
		return this.get().get('rec').delete('_store');
	},

	getJSforMapbox:function(){
		return this.get().get('rec').delete('_store').toJS();
	},

	loadAll:function(){
		return new Promise((resolve,reject)=>{
			let all = LocalStorage.getAll();
			all = all || {};

			Store.dispatch({
				type:'STYLES_DEFINE',
				payload:all
			});
			return resolve();
		});
	},

	add:function(style){
		return new Promise((resolve,reject)=>{
			// generate style id

			if (!style.name) throw new Error('no name');
			style.id = style.id || uidMake();
			style.version = style.version || 8;
			style.sources = style.sources || {};
			style.layers = style.layers || [
				{
					"id": "background",
					"type": "background",
					"layout": {
						"visibility": "visible"
					},
					"paint": {
						"background-color": "#37474F"
					}
				}
			];
			LocalStorage.set(style.id,style);

			Store.dispatch({
				type:'STYLE_ADD',
				payload:style
			});
			return resolve(style);
		});

	},

	






};