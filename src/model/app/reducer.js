const state = {
	error: null,
	loading: false,
}

export const reducer = (st = state, action)=>{
	switch (action.type){
		case 'APP_ERROR_SET':
			return {...st, error: action.payload}
		case 'APP_LOADING_SET':
			return {...st, loading: action.payload}
		default:
			return st
  }
}