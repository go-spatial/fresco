const getDomain = (url)=>{
	if (!url) return null
	var matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
	var domain = matches && matches[1]
	return domain || null
}

const getName = (url)=>{
	// find meat
	const str = url.replace(/(http|https)([.:///]+)/,'').split('/')[0]
	return str
}

module.exports = {
	getDomain,
	getName
}