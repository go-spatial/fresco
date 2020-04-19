import starter from './starterStyle'

const localStoragePath = 'frescoStylesStore'

const defaultLayers = [
	{
		"id": "background",
		"type": "background",
		"layout": {
			"visibility": "visible"
		},
		"paint": {
			"background-color": "#37474F"
		}
	}
]

const defaultStyles = {
	starter:{
		current:{
			...starter
		}
	}
}
// source: https://osm-lambda.tegola.io/v1/capabilities/osm.json

const defaultMapboxVersion = 8

export default {
	defaultLayers,
	defaultMapboxVersion,
	defaultStyles,
	localStoragePath,
}