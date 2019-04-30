export default {
	get:(key)=>{
		return JSON.parse(window.localStorage.getItem(key));
	},

	getAll:()=>{
		let items = {};
		//console.log('localStorage:',window.localStorage);
		try{
			for (var i=0,len=window.localStorage.length;i<len;i++){
				//console.log('item:',window.localStorage.getItem(window.localStorage.key(i)));
			   items[window.localStorage.key(i)] = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
			}
		} catch(e){
			console.error('localstorage json parse error:',e);
		}
		return items;
	},

	set:(key,val)=>{
		window.localStorage.setItem(key, JSON.stringify(val));
	},

	remove:(key)=>{
		window.localStorage.removeItem(key);
	}
};