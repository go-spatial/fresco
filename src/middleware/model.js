// model
import models from '../model';
export default (store) => (next) => (action) => {
	let parts = action.type.split('_');
	if (parts[0] === 'MODEL'){
		let model = parts[1].toLowerCase();
		if (!models[model]) throw new Error('model:'+parts[1]+' not found');
		let action = parts[2].toLowerCase();
		if (!models[model][action]) throw new Error('action:'+action+' not found in:'+model);
		return models[model][action](action).then((res)=>{
			//next(action);
		}).catch((err)=>{
			console.error('error in model:'+model+' action:'+action,err);
		});
	}
	next(action);
}