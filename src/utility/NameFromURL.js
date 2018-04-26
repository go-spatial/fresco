export default {
	get:(url)=>{
		// find meat
		return url.replace(/(http|https)([.:///]+)/,'').split('/')[0];
	}
};