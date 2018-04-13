export default {
	getKey:(error)=>{
		if (error.message.indexOf(':') === -1) return ['general'];
		// error.message is defined
		const prefix = error.message.split(':')[0];
		const parts = prefix.split('.');
		let key = [];	
		parts.forEach((part)=>{
			let res = part.match(/\[\d+\]/g);
			if (res){
				key.push(part.replace(/\[\d+\]/g,''));
				console.log('search res:',res);
				for (let i=0;i<res.length;i++){
					key.push(Number(res[i].replace(/[\[\]]/g, '')));
				}
				return;
			}
			key.push(part);
		});
		console.log('key:',key);
		return key;
	},
	getMessage:(error)=>{
		if (error.message.indexOf(':') === -1) return error.message;
		return error.message.split(':')[1];
	}
};