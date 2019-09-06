import axios from 'axios';

export default {

	load:(sourceUrl, {headers = {}})=>{
		return new Promise((resolve, reject)=>{
			axios.get(sourceUrl, {headers})
			.then(function (response) {
				//if (!response.data.maps) return reject('no maps defined on source');
				return resolve(response.data);
			})
			.catch(function (error){
				return reject('not found');
			});
		});
	}
};