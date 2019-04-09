export default {
	getKey:(error)=>{

		/*
		error example
		{
			message:'layers[0].paint.background-color: color expected, "#37474" found'
		}
		*/

		if (!error || !error.message || error.message.indexOf(': ') === -1) return ['general'];
		const prefix = error.message.split(': ')[0];
		const parts = prefix.split('.');
		let key = [];	
		parts.forEach((part)=>{
			let res = part.match(/\[\d+\]/g);
			if (res){
				key.push(part.replace(/\[\d+\]/g,''));
				//console.log('search res:',res);
				for (let i=0;i<res.length;i++){
					key.push(Number(res[i].replace(/[\[\]]/g, '')));
				}
				return;
			}
			key.push(part);
		});
		return key;
	},
	getMessage:(error)=>{
		if (!error) return;
		if (!error.message && error.stack) return error.stack;
		if (!error.message && !error.stack) return 'unidentified mapbox error';
		if (error.message.indexOf(': ') === -1) return error.message;
		return error.message.split(': ')[1];
	}
};