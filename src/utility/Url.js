const getDomain = (url)=>{
	if (!url) return null
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];
	return domain || null
}

module.exports = {
	getDomain
}