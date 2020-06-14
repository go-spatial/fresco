const get  = (val)=>{
	if (val === undefined) return 'und'
	if (val === null) return 'nul'
	if (val === true || val === false) return 'bool'
	var type = typeof val
	if (type === 'string') return 'str'
	if (type === 'number') return 'num'
	if (type === 'function') return 'fun'
	if (Object.prototype.toString.call(val) === '[object Array]') return 'ary'
	return 'obj'
}

export default {
	get,
}