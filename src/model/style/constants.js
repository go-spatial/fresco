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

// source: https://tegola-osm-worker.go-spatial.org/v1/capabilities/osm.json

const defaultMaplibreVersion = 8

export default {
	defaultLayers,
	defaultMaplibreVersion,
	localStoragePath,
}