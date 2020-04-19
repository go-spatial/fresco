const getRoute = (path)=>{
	return path
}

const getStyleIn = ({path, pathIn})=>{
	// return [styleId, [...pathIn]]
	return [path[0], path[1], [...pathIn]]
}

const getStyleLocation = ({path, pathSub})=>{
	return `/style/${path[0]}/${pathSub}`
}

export default {
	getRoute,
	getStyleIn,
	getStyleLocation,
}