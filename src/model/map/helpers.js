
const queryMapFeatures = ({map, point})=>{

	const pointProj = map.project(point)

	const margin = 2
	const bbox = [
		{x:pointProj.x-margin,y:pointProj.y+margin},
		{x:pointProj.x+margin,y:pointProj.y-margin}
	]

	const features = map.queryRenderedFeatures(bbox)
	return features || []
}

const getFeatureLayers = ({features})=>{
	let layers = []
	features.forEach((feature)=>{
		if (feature.layer && feature.layer.id && 
			!layers.includes(feature.layer.id)){ 

			layers.push(feature.layer.id)
		}
	})
	return layers
}

const getFeaturesByLayerId = ({features, layerId})=>{
	return features.filter((feature)=>{
		return feature.layer && feature.layer.id && 
			feature.layer.id === layerId
	})
}

const getFeatureSources = ({features})=>{
	let sources = []
	features.forEach((feature)=>{
		if (feature.layer && feature.source && 
			!sources.includes(feature.source)){ 

			sources.push(feature.source)
		}
	})
	return sources
}

const getFeatureSourceLayers = ({features})=>{
	let sourceLayers = []
	features.forEach((feature)=>{
		if (feature.layer && feature.sourceLayer && 
			!sourceLayers.includes(feature.sourceLayer)){ 

			sourceLayers.push(feature.sourceLayer)
		}
	})
	return sourceLayers
}

export default {
	getFeatureLayers,
	getFeatureSources,
	getFeatureSourceLayers,
	getFeaturesByLayerId,
	queryMapFeatures,
}