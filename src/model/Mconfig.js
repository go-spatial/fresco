import Store from '../Store';

import LocalStorage from '../utility/LocalStorage';

const LOCALSTORAGE_KEY = '_config';

export default {

	get:function(){
		return Store.getState().config;
	},

	load:function(){
		return new Promise((resolve,reject)=>{
			let rec = LocalStorage.get(LOCALSTORAGE_KEY) || {};

			Store.dispatch({
				type:'CONFIG_DEFINE',
				payload:rec
			});

			return resolve();
		});
	},

	save:function(){
		return new Promise((resolve,reject)=>{
			const config = this.get();
			console.log('config save:',config);
			LocalStorage.set(LOCALSTORAGE_KEY,config);
			return resolve();
		});
	},

	setIn:function(key,val){
		return new Promise((resolve,reject)=>{
			if (!key) return reject('no key');

			Store.dispatch({
				type:'CONFIG_SETIN',
				key:key,
				payload:val
			});

			this.save();

			return resolve();
		});
	}
};