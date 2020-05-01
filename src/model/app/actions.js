import Store from '../../Store'

const getDevice = ()=>{ // detect device
	if (window.innerWidth < 576 || window.innerHeight < 576){
		return 'mobile'
	}
	return 'desktop'
}

const setError = async (err)=>{
	Store.dispatch({
		type:'APP_ERROR_SET',
		payload:err && err.toString? err.toString(): err,
	})
}
const setLoading = async (loading)=>{
	Store.dispatch({
		type:'APP_LOADING_SET',
		payload: loading,
	})
}

export default {
	getDevice,
	setError,
	setLoading,
}