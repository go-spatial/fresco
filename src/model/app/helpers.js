const getDevice = ()=>{ // detect device
	if (window.innerWidth < 576 || window.innerHeight < 576){
		return 'mobile'
	}
	return 'desktop'
}

export default {
	getDevice,
}