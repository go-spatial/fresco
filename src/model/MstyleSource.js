
//import Store from '../Store';
import Mstyle from './Mstyle';
import Msource from './Msource';
import NameFromUrl from '../utility/NameFromUrl';

export default {
	addFromSource:function(sourceUrl){
		return new Promise((resolve,reject)=>{
			const rec = {
				name:NameFromUrl.get(sourceUrl)
			};
			Mstyle.add(rec).then((style)=>{
				Mstyle.define(style);
				console.log('style defined:',style);
				// add source
				Msource.add({
					url:sourceUrl,
					type:'vector'
				}).then((source)=>{
					//console.log('added source:',source);
					const json = Msource.getJson(source.url);
					console.log('added source json:',json);
					const center = [
						json.getIn(['center',0]),
						json.getIn(['center',1])
					];
					if (json.has('center')) Mstyle.setIn(['center'],center);
					if (json.has('maxzoom') && json.has('minzoom')){
						const zoom = json.getIn(['center',2]) || (json.get('maxzoom') - json.get('minzoom'))/2;
						Mstyle.setIn(['zoom'],zoom);
					}
					Mstyle.save();
					return resolve(style);
				});
			}).catch((e)=>{
				reject(e);
			});
		});
	}
}