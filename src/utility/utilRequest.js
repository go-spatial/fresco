import axios from 'axios'

const get = async ({url, headers = null})=>{
	headers = {
		'accept': 'application/json',
		'content-type': 'application/json',
		// 'x-api-key': config.DEFAULT_API_KEY,
		'accept-language':'en'
	}
	const res = await axios.get(url, {
		headers
	})
	return res.data
}

export default {
	get,
}