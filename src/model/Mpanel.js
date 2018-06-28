import Store from '../Store';

export default {
	add:function(panel){
		return new Promise((resolve,reject)=>{
			if (!panel.float) return reject('no float defined');
			if (!panel.id) return reject('no panel id');

			Store.dispatch({
				type:'PANEL_ADD',
				payload:panel
			});

			return resolve(panel);
		});
	},

	getAll:function(){
		return Store.getState().panel.get('recs');
	},
	get:function(id){
		const panels = this.getAll();
		let res;
		panels.map((panel)=>{
			if (panel.get('id') === id) res = panel;
		});
		return res;
	}
};