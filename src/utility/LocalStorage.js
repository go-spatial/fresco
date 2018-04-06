export default {
	get:(key)=>{
		return JSON.parse(window.localStorage.getItem(key));
	},

	getAll:()=>{
		let items = {};
		//console.log('localStorage:',window.localStorage);
		for (var i=0,len=window.localStorage.length;i<len;i++){
			//console.log('item:',window.localStorage.getItem(window.localStorage.key(i)));
		   items[window.localStorage.key(i)] = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
		}
		console.log('items:',items);
		return items;
	},

	set:(key,val)=>{
		window.localStorage.setItem(key, JSON.stringify(val));
	},

	remove:(key)=>{
		window.localStorage.removeItem(key);
	}
};