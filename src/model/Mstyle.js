
import validateStyle from '../vendor/style-spec/validate_style';

import Store from '../Store';

import MapboxError from '../utility/MapboxError';
import LocalStorage from '../utility/LocalStorage';
import Uid from '../utility/Uid';
import Url from '../utility/Url';

const Mstyle = {

	// ***** ACTIONS *****

	add:function(style){
		return new Promise((resolve,reject)=>{
			if (!style.name) return reject('no name');
			style.id = /*style.id ||*/ Uid.make();

			//check if id already exists, if so warn user

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
			const now = new Date().getTime();
			style._store = {
				updated:now
			};
			LocalStorage.set(style.id,style);

			Store.dispatch({
				type:'STYLE_ADD',
				payload:style
			}); 

			return resolve(style);
		});
	},

	load:function(id){
		let rec = LocalStorage.get(id);
		return this.define(rec);
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

	update:function(style){
		return new Promise((resolve,reject)=>{
			Store.dispatch({
				type:'STYLE_DEFINE',
				payload:style
			});

			this.save();

			return resolve();
		});
	},

	save:function(){
		return new Promise((resolve,reject)=>{
			const style = this.getJS();

			LocalStorage.set(style.rec.id,style.rec);
		});
	},

	setIn:function(key,val){
		return new Promise((resolve,reject)=>{
			if (!key) return reject('no key');

			Store.dispatch({
				type:'STYLE_SETIN',
				key:['rec', ...key],
				payload:val
			});

			this.save();

			return resolve();
		});

	},

	get:function(){
		return Store.getState().style;
	},
	getDomains:function(){
		const style = this.get()

		let domains = [];
		const glyphs = style.getIn(['rec','glyphs'])
		const glyphDomain = Url.getDomain(glyphs)
		if (glyphDomain) domains.push(glyphDomain)


		return domains
	},
	getStore:function(){
		return this.get().getIn(['rec','_store'])
	},
	getJS:function(){
		return this.get().toJS();
	},

	getMapStyle:function(){
		return this.get().get('rec').delete('_store');
	},

	getJSforMapbox:function(){

		// apply interactive transformations to style
		


		return this.get().get('rec').delete('_store').toJS();
	},

	loadAll:function(){
		return new Promise((resolve,reject)=>{
			let all = LocalStorage.getAll();
			all = all || {};

			if (all._config) delete all._config;

			Store.dispatch({
				type:'STYLES_DEFINE',
				payload:all
			});
			return resolve();
		});
	},

	errorsSet:function(errors = []){
		return new Promise((resolve,reject)=>{

			let errObjs = [];

			errors.forEach((error)=>{

				const key = MapboxError.getKey(error);
				const message = MapboxError.getMessage(error);

				const err = {
					key:key,
					message:message
				};

				errObjs.push(err);
			});
			
			Store.dispatch({
				type:'STYLE_ERROR_DEFINE',
				payload:errObjs
			});
			return resolve();
		});
	},

	errorAdd:function(error){
		return new Promise((resolve,reject)=>{
			const key = MapboxError.getKey(error);
			const message = MapboxError.getMessage(error);

			const err = {
				key:key,
				message:message,
				error:error,
			};
	
			Store.dispatch({
				type:'STYLE_ERROR_ADD',
				payload:err
			});
			return resolve();
		});
	},

	errorsGet:function(){
		return Store.getState().styleError;
	},

	errorMessagesGet:function(error){
		/*
		let curInd = [];
		error.map((err,ind) => {

			if (typeOf)
		}
		*/
	},

	remove:function(){
		return new Promise((resolve,reject)=>{
			const style = this.get();
			// remove ocalStorage
			LocalStorage.remove(style.getIn(['rec','id']));

			return resolve();
		});
	},

	removeIn:function(prop){
		return new Promise((resolve,reject)=>{
			if (!prop) return reject('no prop');

			Store.dispatch({
				type:'STYLE_REMOVEIN',
				prop:prop,
				payload:null
			});

			Mstyle.save();
			return resolve();
		});
	},

	validate:function(){
		return new Promise((resolve,reject)=>{
			const errors = validateStyle(this.getJSforMapbox());
			this.errorsSet(errors);
			return resolve();
		});
	},

	isValid:function(){
		//console.log('is valid:',this.errorsGet());
		const errors = this.errorsGet();
		return errors && errors.size > 0? false: true;
	},

};

export default Mstyle;

