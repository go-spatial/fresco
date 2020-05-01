const read = ({file})=>{
	return new Promise((resolve, reject)=>{
		try {
			const reader = new FileReader()
			reader.onloadend = (e)=>{
				return resolve(e.target.result)
			}
			reader.readAsText(file)
		} catch(e){
			return reject(e)
		}
	})
}

const readJson = async ({file, done})=>{
	const content = await read({file})
	return JSON.parse(content)
}

export default {
	read,
	readJson,
}