
import Msource from './Msource';
import Mstyle from './Mstyle';

import NameFromURL from '../utility/NameFromURL';
import SourceReader from '../utility/SourceReader';

export default {
	addFromSource:function(sourceUrl){
		return new Promise((resolve,reject)=>{
			SourceReader.load(sourceUrl).then(()=>{
				const rec = {
					name:NameFromURL.get(sourceUrl)
				};
				Mstyle.add(rec).then((style)=>{
					Mstyle.define(style);
					//console.log('style defined:',style);
					// add source
					Msource.add({
						url:sourceUrl,
						type:'vector'
					},NameFromURL(sourceUrl),true).then((source)=>{
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
					}).catch((e)=>{
						reject({message:'source not found'});
					});
				}).catch((e)=>{
					reject(e);
				});
			}).catch((e)=>{
				reject({message:'source not found'});
			});
		});
	},

	setStyleSourceJSON:function(style){
		console.log('style',style);
		if (!style.has('sources') || style.get('sources').size < 1) return;

		style.get('sources').keySeq().map((key)=>{
			Msource.setJSON(key,style.getIn(['sources','key']));
		});
	}
}