import MapboxGlV1 from 'mapbox-gl'
import MapLibreGlV2 from 'maplibre-gl'

export default {
	defaultRenderer: 'mapbox-gl-v1',
	availableRenderers: {
		'mapbox-gl-v1': MapboxGlV1,
		'maplibre-gl-v2': MapLibreGlV2,
	},
}
