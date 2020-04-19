export default {
"layers": [
      {
        "id": "background",
        "type": "background",
        "paint": {
          "background-color": "#1565c0"
        }
      },
      {
        "id": "country_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "country_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 0,
        "maxzoom": 10,
        "type": "line",
        "paint": {
          "line-color": "#64b5f6"
        }
      },
      {
        "id": "country_polygons",
        "source": "osm-lambda.tegola.io",
        "source-layer": "country_polygons",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 0,
        "maxzoom": 10,
        "type": "fill",
        "paint": {
          "fill-color": "#fffde7",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "land",
        "source": "osm-lambda.tegola.io",
        "source-layer": "land",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 0,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#f1f8e9",
          "fill-opacity": 1
        }
      },
      {
        "id": "admin_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "admin_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 8,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#00897b",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "landuse_areas",
        "source": "osm-lambda.tegola.io",
        "source-layer": "landuse_areas",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 3,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#ffca28",
          "fill-opacity": 1
        }
      },
      {
        "id": "water_areas",
        "source": "osm-lambda.tegola.io",
        "source-layer": "water_areas",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 3,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#1976d2",
          "fill-opacity": 1
        }
      },
      {
        "id": "water_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "water_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 8,
        "maxzoom": 20,
        "type": "line",
        "paint": {
          "line-color": "#1e88e5"
        }
      },
      {
        "id": "transport_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "transport_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 3,
        "maxzoom": 20,
        "type": "line",
        "paint": {
          "line-color": "#26c6da"
        }
      },
      {
        "id": "transport_areas",
        "source": "osm-lambda.tegola.io",
        "source-layer": "transport_areas",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 12,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#80deea",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "populated_places",
        "source": "osm-lambda.tegola.io",
        "source-layer": "populated_places",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 0,
        "maxzoom": 20,
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#00acc1"
        }
      },
      {
        "id": "transport_points",
        "source": "osm-lambda.tegola.io",
        "source-layer": "transport_points",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#00b8d4"
        }
      },
      {
        "id": "amenity_areas",
        "source": "osm-lambda.tegola.io",
        "source-layer": "amenity_areas",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#80deea",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "amenity_points",
        "source": "osm-lambda.tegola.io",
        "source-layer": "amenity_points",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#fff176"
        }
      },
      {
        "id": "other_points",
        "source": "osm-lambda.tegola.io",
        "source-layer": "other_points",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#dce775"
        }
      },
      {
        "id": "other_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "other_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "line",
        "paint": {
          "line-color": "#42a5f5"
        }
      },
      {
        "id": "country_lines_disputed",
        "source": "osm-lambda.tegola.io",
        "source-layer": "country_lines_disputed",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 3,
        "maxzoom": 10,
        "type": "line",
        "paint": {
          "line-color": "#ab47bc"
        }
      },
      {
        "id": "state_lines",
        "source": "osm-lambda.tegola.io",
        "source-layer": "state_lines",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 0,
        "maxzoom": 10,
        "type": "line",
        "paint": {
          "line-color": "#f57c00"
        }
      },
      {
        "id": "other_areas",
        "source": "osm-lambda.tegola.io",
        "source-layer": "other_areas",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 6,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#90caf9",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "buildings",
        "source": "osm-lambda.tegola.io",
        "source-layer": "buildings",
        "layout": {
          "visibility": "visible"
        },
        "minzoom": 14,
        "maxzoom": 20,
        "type": "fill",
        "paint": {
          "fill-color": "#2196f3",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "country_label_points",
        "source": "osm-lambda.tegola.io",
        "source-layer": "country_label_points",
        "layout": {
          "visibility": "visible",
          "text-field": "{name}",
          "text-size": 16
        },
        "minzoom": 3,
        "maxzoom": 20,
        "type": "symbol",
        "paint": {
          "text-color": "#263238",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1
        }
      },
      {
        "id": "state_label_points",
        "source": "osm-lambda.tegola.io",
        "source-layer": "state_label_points",
        "layout": {
          "visibility": "visible",
          "text-field": "{name}",
          "text-size": 11,
          "text-padding": 2
        },
        "minzoom": 3,
        "maxzoom": 20,
        "type": "symbol",
        "paint": {
          "text-color": "#ffffff",
          "text-halo-color": "#37474f",
          "text-halo-width": 1
        }
      }
    ],
    "name": "OSM-starter",
    "version": 8,
    "sources": {
      "osm-lambda.tegola.io": {
        "type": "vector",
        "url": "https://osm-lambda.tegola.io/v1/capabilities/osm.json"
      }
    },
    "id": "starter",
    "glyphs": "https://go-spatial.github.io/carto-assets/fonts/{fontstack}/{range}.pbf"
}