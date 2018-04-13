(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('fs'), require('path')) :
	typeof define === 'function' && define.amd ? define(['exports', 'fs', 'path'], factory) :
	(factory((global.mapboxGlStyleSpecification = {}),global.fs,global.path));
}(this, (function (exports,fs,path) {
    'use strict';

    fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
    path = path && path.hasOwnProperty('default') ? path['default'] : path;

    var $version = 8;
    var $root = {"version":{"required":true,"type":"enum","values":[8]},"name":{"type":"string"},"metadata":{"type":"*"},"center":{"type":"array","value":"number"},"zoom":{"type":"number"},"bearing":{"type":"number","default":0,"period":360,"units":"degrees"},"pitch":{"type":"number","default":0,"units":"degrees"},"light":{"type":"light"},"sources":{"required":true,"type":"sources"},"sprite":{"type":"string"},"glyphs":{"type":"string"},"transition":{"type":"transition"},"layers":{"required":true,"type":"array","value":"layer"}};
    var sources = {"*":{"type":"source"}};
    var source = ["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image","source_canvas"];
    var source_vector = {"type":{"required":true,"type":"enum","values":{"vector":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.0511,180,85.0511]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"attribution":{"type":"string"},"*":{"type":"*"}};
    var source_raster = {"type":{"required":true,"type":"enum","values":{"raster":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.0511,180,85.0511]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"attribution":{"type":"string"},"*":{"type":"*"}};
    var source_raster_dem = {"type":{"required":true,"type":"enum","values":{"raster-dem":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.0511,180,85.0511]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"attribution":{"type":"string"},"encoding":{"type":"enum","values":{"terrarium":{},"mapbox":{}},"default":"mapbox"},"*":{"type":"*"}};
    var source_geojson = {"type":{"required":true,"type":"enum","values":{"geojson":{}}},"data":{"type":"*"},"maxzoom":{"type":"number","default":18},"buffer":{"type":"number","default":128,"maximum":512,"minimum":0},"tolerance":{"type":"number","default":0.375},"cluster":{"type":"boolean","default":false},"clusterRadius":{"type":"number","default":50,"minimum":0},"clusterMaxZoom":{"type":"number"}};
    var source_video = {"type":{"required":true,"type":"enum","values":{"video":{}}},"urls":{"required":true,"type":"array","value":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}};
    var source_image = {"type":{"required":true,"type":"enum","values":{"image":{}}},"url":{"required":true,"type":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}};
    var source_canvas = {"type":{"required":true,"type":"enum","values":{"canvas":{}}},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}},"animate":{"type":"boolean","default":"true"},"canvas":{"type":"string","required":true}};
    var layer = {"id":{"type":"string","required":true},"type":{"type":"enum","values":{"fill":{},"line":{},"symbol":{},"circle":{},"heatmap":{},"fill-extrusion":{},"raster":{},"hillshade":{},"background":{}},"required":true},"metadata":{"type":"*"},"source":{"type":"string"},"source-layer":{"type":"string"},"minzoom":{"type":"number","minimum":0,"maximum":24},"maxzoom":{"type":"number","minimum":0,"maximum":24},"filter":{"type":"filter"},"layout":{"type":"layout"},"paint":{"type":"paint"}};
    var layout = ["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background"];
    var layout_background = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_fill = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_circle = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_heatmap = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_line = {"line-cap":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"butt":{},"round":{},"square":{}},"default":"butt"},"line-join":{"type":"enum","function":"piecewise-constant","zoom-function":true,"property-function":true,"values":{"bevel":{},"round":{},"miter":{}},"default":"miter"},"line-miter-limit":{"type":"number","default":2,"function":"interpolated","zoom-function":true,"requires":[{"line-join":"miter"}]},"line-round-limit":{"type":"number","default":1.05,"function":"interpolated","zoom-function":true,"requires":[{"line-join":"round"}]},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_symbol = {"symbol-placement":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"point":{},"line":{}},"default":"point"},"symbol-spacing":{"type":"number","default":250,"minimum":1,"function":"interpolated","zoom-function":true,"units":"pixels","requires":[{"symbol-placement":"line"}]},"symbol-avoid-edges":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false},"icon-allow-overlap":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["icon-image"]},"icon-ignore-placement":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["icon-image"]},"icon-optional":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["icon-image","text-field"]},"icon-rotation-alignment":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"]},"icon-size":{"type":"number","default":1,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"units":"factor of the original icon size","requires":["icon-image"]},"icon-text-fit":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"none":{},"width":{},"height":{},"both":{}},"default":"none","requires":["icon-image","text-field"]},"icon-text-fit-padding":{"type":"array","value":"number","length":4,"default":[0,0,0,0],"units":"pixels","function":"interpolated","zoom-function":true,"requires":["icon-image","text-field",{"icon-text-fit":["both","width","height"]}]},"icon-image":{"type":"string","function":"piecewise-constant","zoom-function":true,"property-function":true,"tokens":true},"icon-rotate":{"type":"number","default":0,"period":360,"function":"interpolated","zoom-function":true,"property-function":true,"units":"degrees","requires":["icon-image"]},"icon-padding":{"type":"number","default":2,"minimum":0,"function":"interpolated","zoom-function":true,"units":"pixels","requires":["icon-image"]},"icon-keep-upright":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":"line"}]},"icon-offset":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"property-function":true,"requires":["icon-image"]},"icon-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"property-function":true,"values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["icon-image"]},"icon-pitch-alignment":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"]},"text-pitch-alignment":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"]},"text-rotation-alignment":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"]},"text-field":{"type":"string","function":"piecewise-constant","zoom-function":true,"property-function":true,"default":"","tokens":true},"text-font":{"type":"array","value":"string","function":"piecewise-constant","zoom-function":true,"property-function":true,"default":["Open Sans Regular","Arial Unicode MS Regular"],"requires":["text-field"]},"text-size":{"type":"number","default":16,"minimum":0,"units":"pixels","function":"interpolated","zoom-function":true,"property-function":true,"requires":["text-field"]},"text-max-width":{"type":"number","default":10,"minimum":0,"units":"ems","function":"interpolated","zoom-function":true,"property-function":true,"requires":["text-field"]},"text-line-height":{"type":"number","default":1.2,"units":"ems","function":"interpolated","zoom-function":true,"requires":["text-field"]},"text-letter-spacing":{"type":"number","default":0,"units":"ems","function":"interpolated","zoom-function":true,"property-function":true,"requires":["text-field"]},"text-justify":{"type":"enum","function":"piecewise-constant","zoom-function":true,"property-function":true,"values":{"left":{},"center":{},"right":{}},"default":"center","requires":["text-field"]},"text-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"property-function":true,"values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["text-field"]},"text-max-angle":{"type":"number","default":45,"units":"degrees","function":"interpolated","zoom-function":true,"requires":["text-field",{"symbol-placement":"line"}]},"text-rotate":{"type":"number","default":0,"period":360,"units":"degrees","function":"interpolated","zoom-function":true,"property-function":true,"requires":["text-field"]},"text-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","function":"interpolated","zoom-function":true,"requires":["text-field"]},"text-keep-upright":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":true,"requires":["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":"line"}]},"text-transform":{"type":"enum","function":"piecewise-constant","zoom-function":true,"property-function":true,"values":{"none":{},"uppercase":{},"lowercase":{}},"default":"none","requires":["text-field"]},"text-offset":{"type":"array","value":"number","units":"ems","function":"interpolated","zoom-function":true,"property-function":true,"length":2,"default":[0,0],"requires":["text-field"]},"text-allow-overlap":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["text-field"]},"text-ignore-placement":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["text-field"]},"text-optional":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":false,"requires":["text-field","icon-image"]},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_raster = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var layout_hillshade = {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}};
    var filter = {"type":"array","value":"*"};
    var filter_operator = {"type":"enum","values":{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},"in":{},"!in":{},"all":{},"any":{},"none":{},"has":{},"!has":{}}};
    var geometry_type = {"type":"enum","values":{"Point":{},"LineString":{},"Polygon":{}}};
    var function_stop = {"type":"array","minimum":0,"maximum":22,"value":["number","color"],"length":2};
    var expression = {"type":"array","value":"*","minimum":1};
    var expression_name = {"type":"enum","values":{"let":{"group":"Variable binding"},"var":{"group":"Variable binding"},"literal":{"group":"Types"},"array":{"group":"Types"},"at":{"group":"Lookup"},"case":{"group":"Decision"},"match":{"group":"Decision"},"coalesce":{"group":"Decision"},"step":{"group":"Ramps, scales, curves"},"interpolate":{"group":"Ramps, scales, curves"},"ln2":{"group":"Math"},"pi":{"group":"Math"},"e":{"group":"Math"},"typeof":{"group":"Types"},"string":{"group":"Types"},"number":{"group":"Types"},"boolean":{"group":"Types"},"object":{"group":"Types"},"to-string":{"group":"Types"},"to-number":{"group":"Types"},"to-boolean":{"group":"Types"},"to-rgba":{"group":"Color"},"to-color":{"group":"Types"},"rgb":{"group":"Color"},"rgba":{"group":"Color"},"get":{"group":"Lookup"},"has":{"group":"Lookup"},"length":{"group":"Lookup"},"properties":{"group":"Feature data"},"geometry-type":{"group":"Feature data"},"id":{"group":"Feature data"},"zoom":{"group":"Zoom"},"heatmap-density":{"group":"Heatmap"},"+":{"group":"Math"},"*":{"group":"Math"},"-":{"group":"Math"},"/":{"group":"Math"},"%":{"group":"Math"},"^":{"group":"Math"},"sqrt":{"group":"Math"},"log10":{"group":"Math"},"ln":{"group":"Math"},"log2":{"group":"Math"},"sin":{"group":"Math"},"cos":{"group":"Math"},"tan":{"group":"Math"},"asin":{"group":"Math"},"acos":{"group":"Math"},"atan":{"group":"Math"},"min":{"group":"Math"},"max":{"group":"Math"},"==":{"group":"Decision"},"!=":{"group":"Decision"},">":{"group":"Decision"},"<":{"group":"Decision"},">=":{"group":"Decision"},"<=":{"group":"Decision"},"all":{"group":"Decision"},"any":{"group":"Decision"},"!":{"group":"Decision"},"upcase":{"group":"String"},"downcase":{"group":"String"},"concat":{"group":"String"}}};
    var light = {"anchor":{"type":"enum","default":"viewport","values":{"map":{},"viewport":{}},"transition":false,"zoom-function":true,"property-function":false,"function":"piecewise-constant"},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","transition":true,"function":"interpolated","zoom-function":true,"property-function":false},"color":{"type":"color","default":"#ffffff","function":"interpolated","zoom-function":true,"property-function":false,"transition":true},"intensity":{"type":"number","default":0.5,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":false,"transition":true}};
    var paint = ["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background"];
    var paint_fill = {"fill-antialias":{"type":"boolean","function":"piecewise-constant","zoom-function":true,"default":true},"fill-opacity":{"type":"number","function":"interpolated","zoom-function":true,"property-function":true,"default":1,"minimum":0,"maximum":1,"transition":true},"fill-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":[{"!":"fill-pattern"}]},"fill-outline-color":{"type":"color","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":[{"!":"fill-pattern"},{"fill-antialias":true}]},"fill-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels"},"fill-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["fill-translate"]},"fill-pattern":{"type":"string","function":"piecewise-constant","zoom-function":true,"transition":true}};
    var paint_line = {"line-opacity":{"type":"number","function":"interpolated","zoom-function":true,"property-function":true,"default":1,"minimum":0,"maximum":1,"transition":true},"line-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":[{"!":"line-pattern"}]},"line-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels"},"line-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["line-translate"]},"line-width":{"type":"number","default":1,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"line-gap-width":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"line-offset":{"type":"number","default":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"line-blur":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"line-dasharray":{"type":"array","value":"number","function":"piecewise-constant","zoom-function":true,"minimum":0,"transition":true,"units":"line widths","requires":[{"!":"line-pattern"}]},"line-pattern":{"type":"string","function":"piecewise-constant","zoom-function":true,"transition":true}};
    var paint_circle = {"circle-radius":{"type":"number","default":5,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"circle-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true},"circle-blur":{"type":"number","default":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true},"circle-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true},"circle-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels"},"circle-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["circle-translate"]},"circle-pitch-scale":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map"},"circle-pitch-alignment":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"viewport"},"circle-stroke-width":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"circle-stroke-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true},"circle-stroke-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true}};
    var paint_heatmap = {"heatmap-radius":{"type":"number","default":30,"minimum":1,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels"},"heatmap-weight":{"type":"number","default":1,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":false},"heatmap-intensity":{"type":"number","default":1,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":false,"transition":true},"heatmap-color":{"type":"color","default":["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"],"function":"interpolated","zoom-function":false,"property-function":false,"transition":false},"heatmap-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":false,"transition":true}};
    var paint_symbol = {"icon-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["icon-image"]},"icon-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["icon-image"]},"icon-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["icon-image"]},"icon-halo-width":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels","requires":["icon-image"]},"icon-halo-blur":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels","requires":["icon-image"]},"icon-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels","requires":["icon-image"]},"icon-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["icon-image","icon-translate"]},"text-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["text-field"]},"text-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["text-field"]},"text-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":["text-field"]},"text-halo-width":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels","requires":["text-field"]},"text-halo-blur":{"type":"number","default":0,"minimum":0,"function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"units":"pixels","requires":["text-field"]},"text-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels","requires":["text-field"]},"text-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["text-field","text-translate"]}};
    var paint_raster = {"raster-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"transition":true},"raster-hue-rotate":{"type":"number","default":0,"period":360,"function":"interpolated","zoom-function":true,"transition":true,"units":"degrees"},"raster-brightness-min":{"type":"number","function":"interpolated","zoom-function":true,"default":0,"minimum":0,"maximum":1,"transition":true},"raster-brightness-max":{"type":"number","function":"interpolated","zoom-function":true,"default":1,"minimum":0,"maximum":1,"transition":true},"raster-saturation":{"type":"number","default":0,"minimum":-1,"maximum":1,"function":"interpolated","zoom-function":true,"transition":true},"raster-contrast":{"type":"number","default":0,"minimum":-1,"maximum":1,"function":"interpolated","zoom-function":true,"transition":true},"raster-fade-duration":{"type":"number","default":300,"minimum":0,"function":"interpolated","zoom-function":true,"transition":false,"units":"milliseconds"}};
    var paint_hillshade = {"hillshade-illumination-direction":{"type":"number","default":335,"minimum":0,"maximum":359,"function":"interpolated","zoom-function":true,"transition":false},"hillshade-illumination-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"viewport"},"hillshade-exaggeration":{"type":"number","default":0.5,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"transition":true},"hillshade-shadow-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"transition":true},"hillshade-highlight-color":{"type":"color","default":"#FFFFFF","function":"interpolated","zoom-function":true,"transition":true},"hillshade-accent-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"transition":true}};
    var paint_background = {"background-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"transition":true,"requires":[{"!":"background-pattern"}]},"background-pattern":{"type":"string","function":"piecewise-constant","zoom-function":true,"transition":true},"background-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"function":"interpolated","zoom-function":true,"transition":true}};
    var transition = {"duration":{"type":"number","default":300,"minimum":0,"units":"milliseconds"},"delay":{"type":"number","default":0,"minimum":0,"units":"milliseconds"}};
    var latestStyleSpec = {
        $version: $version,
        $root: $root,
        sources: sources,
        source: source,
        source_vector: source_vector,
        source_raster: source_raster,
        source_raster_dem: source_raster_dem,
        source_geojson: source_geojson,
        source_video: source_video,
        source_image: source_image,
        source_canvas: source_canvas,
        layer: layer,
        layout: layout,
        layout_background: layout_background,
        layout_fill: layout_fill,
        layout_circle: layout_circle,
        layout_heatmap: layout_heatmap,
        layout_line: layout_line,
        layout_symbol: layout_symbol,
        layout_raster: layout_raster,
        layout_hillshade: layout_hillshade,
        filter: filter,
        filter_operator: filter_operator,
        geometry_type: geometry_type,
        function_stop: function_stop,
        expression: expression,
        expression_name: expression_name,
        light: light,
        paint: paint,
        paint_fill: paint_fill,
        paint_line: paint_line,
        paint_circle: paint_circle,
        paint_heatmap: paint_heatmap,
        paint_symbol: paint_symbol,
        paint_raster: paint_raster,
        paint_hillshade: paint_hillshade,
        paint_background: paint_background,
        transition: transition,
        "layout_fill-extrusion": {"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible"}},
        "function": {"expression":{"type":"expression"},"stops":{"type":"array","value":"function_stop"},"base":{"type":"number","default":1,"minimum":0},"property":{"type":"string","default":"$zoom"},"type":{"type":"enum","values":{"identity":{},"exponential":{},"interval":{},"categorical":{}},"default":"exponential"},"colorSpace":{"type":"enum","values":{"rgb":{},"lab":{},"hcl":{}},"default":"rgb"},"default":{"type":"*","required":false}},
        "paint_fill-extrusion": {"fill-extrusion-opacity":{"type":"number","function":"interpolated","zoom-function":true,"property-function":false,"default":1,"minimum":0,"maximum":1,"transition":true},"fill-extrusion-color":{"type":"color","default":"#000000","function":"interpolated","zoom-function":true,"property-function":true,"transition":true,"requires":[{"!":"fill-extrusion-pattern"}]},"fill-extrusion-translate":{"type":"array","value":"number","length":2,"default":[0,0],"function":"interpolated","zoom-function":true,"transition":true,"units":"pixels"},"fill-extrusion-translate-anchor":{"type":"enum","function":"piecewise-constant","zoom-function":true,"values":{"map":{},"viewport":{}},"default":"map","requires":["fill-extrusion-translate"]},"fill-extrusion-pattern":{"type":"string","function":"piecewise-constant","zoom-function":true,"transition":true},"fill-extrusion-height":{"type":"number","function":"interpolated","zoom-function":true,"property-function":true,"default":0,"minimum":0,"units":"meters","transition":true},"fill-extrusion-base":{"type":"number","function":"interpolated","zoom-function":true,"property-function":true,"default":0,"minimum":0,"units":"meters","transition":true,"requires":["fill-extrusion-height"]}}
    };

    /*!
     * sort-desc <https://github.com/helpers/sort-desc>
     *
     * Copyright (c) 2014 Jon Schlinkert, contributors.
     * Licensed under the MIT License
     */

    var sortDesc = function (a, b) {
      return a < b ? -1 : 1;
    };

    /*!
     * sort-asc <https://github.com/helpers/sort-asc>
     *
     * Copyright (c) 2014 Jon Schlinkert, contributors.
     * Licensed under the MIT License
     */

    var sortAsc = function (a, b) {
      return b < a ? -1 : 1;
    };

    var sortObject = function (obj, options) {
      var sort = {desc: sortDesc, asc: sortAsc};
      var fn, opts = {}, keys = Object.keys(obj);

      // if `options` is an array, assume it's keys
      if (Array.isArray(options)) {
        opts.keys = options;
        options = {};

      // if `options` is a function, assume it's a sorting function
      } else if (typeof options === 'function') {
        fn = options;
      } else {
        for (var opt in options) {
          if (options.hasOwnProperty(opt)) {
            opts[opt] = options[opt];
          }
        }
      }

      // Default sort order is descending
      fn = opts.sort || sortDesc;

      if (Boolean(opts.sortOrder)) {
        fn = sort[opts.sortOrder.toLowerCase()];
      }

      if (Boolean(opts.sortBy)) {
        keys = opts.sortBy(obj);
        fn = null;
      }

      if (Boolean(opts.keys)) {
        keys = opts.keys;
        if (!opts.sort && !opts.sortOrder && !opts.sortBy) {
          fn = null;
        }
      }

      if (fn) {
        keys = keys.sort(fn);
      }

      var o = {};
      var len = keys.length;
      var i = -1;

      while (++i < len) {
        o[keys[i]] = obj[keys[i]];
      }

      return o;
    };

    function sameOrderAs(reference) {
        var keyOrder = {};

        Object.keys(reference).forEach(function (k, i) {
            keyOrder[k] = i + 1;
        });

        return {
            sort: function (a, b) {
                return (keyOrder[a] || Infinity) -
                       (keyOrder[b] || Infinity);
            }
        };
    }

    /**
     * Format a Mapbox GL Style.  Returns a stringified style with its keys
     * sorted in the same order as the reference style.
     *
     * The optional `space` argument is passed to
     * [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
     * to generate formatted output.
     *
     * If `space` is unspecified, a default of `2` spaces will be used.
     *
     * @private
     * @param {Object} style a Mapbox GL Style
     * @param {number} [space] space argument to pass to `JSON.stringify`
     * @returns {string} stringified formatted JSON
     * @example
     * var fs = require('fs');
     * var format = require('mapbox-gl-style-spec').format;
     * var style = fs.readFileSync('./source.json', 'utf8');
     * fs.writeFileSync('./dest.json', format(style));
     * fs.writeFileSync('./dest.min.json', format(style, 0));
     */
    function format(style, space) {
        if (space === undefined) { space = 2; }
        style = sortObject(style, sameOrderAs(latestStyleSpec.$root));

        if (style.layers) {
            style.layers = style.layers.map(function (layer) {
                return sortObject(layer, sameOrderAs(latestStyleSpec.layer));
            });
        }

        return JSON.stringify(style, null, space);
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var punycode = createCommonjsModule(function (module, exports) {
    (function(root) {

        /** Detect free variables */
        var freeExports = 'object' == 'object' && exports &&
            !exports.nodeType && exports;
        var freeModule = 'object' == 'object' && module &&
            !module.nodeType && module;
        var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
        if (
            freeGlobal.global === freeGlobal ||
            freeGlobal.window === freeGlobal ||
            freeGlobal.self === freeGlobal
        ) {
            root = freeGlobal;
        }

        /**
         * The `punycode` object.
         * @name punycode
         * @type Object
         */
        var punycode,

        /** Highest positive signed 32-bit float value */
        maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

        /** Bootstring parameters */
        base = 36,
        tMin = 1,
        tMax = 26,
        skew = 38,
        damp = 700,
        initialBias = 72,
        initialN = 128, // 0x80
        delimiter = '-', // '\x2D'

        /** Regular expressions */
        regexPunycode = /^xn--/,
        regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
        regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

        /** Error messages */
        errors = {
            'overflow': 'Overflow: input needs wider integers to process',
            'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
            'invalid-input': 'Invalid input'
        },

        /** Convenience shortcuts */
        baseMinusTMin = base - tMin,
        floor = Math.floor,
        stringFromCharCode = String.fromCharCode,

        /** Temporary variable */
        key;

        /*--------------------------------------------------------------------------*/

        /**
         * A generic error utility function.
         * @private
         * @param {String} type The error type.
         * @returns {Error} Throws a `RangeError` with the applicable error message.
         */
        function error(type) {
            throw RangeError(errors[type]);
        }

        /**
         * A generic `Array#map` utility function.
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} callback The function that gets called for every array
         * item.
         * @returns {Array} A new array of values returned by the callback function.
         */
        function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
                result[length] = fn(array[length]);
            }
            return result;
        }

        /**
         * A simple `Array#map`-like wrapper to work with domain name strings or email
         * addresses.
         * @private
         * @param {String} domain The domain name or email address.
         * @param {Function} callback The function that gets called for every
         * character.
         * @returns {Array} A new string of characters returned by the callback
         * function.
         */
        function mapDomain(string, fn) {
            var parts = string.split('@');
            var result = '';
            if (parts.length > 1) {
                // In email addresses, only the domain name should be punycoded. Leave
                // the local part (i.e. everything up to `@`) intact.
                result = parts[0] + '@';
                string = parts[1];
            }
            // Avoid `split(regex)` for IE8 compatibility. See #17.
            string = string.replace(regexSeparators, '\x2E');
            var labels = string.split('.');
            var encoded = map(labels, fn).join('.');
            return result + encoded;
        }

        /**
         * Creates an array containing the numeric code points of each Unicode
         * character in the string. While JavaScript uses UCS-2 internally,
         * this function will convert a pair of surrogate halves (each of which
         * UCS-2 exposes as separate characters) into a single code point,
         * matching UTF-16.
         * @see `punycode.ucs2.encode`
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode.ucs2
         * @name decode
         * @param {String} string The Unicode input string (UCS-2).
         * @returns {Array} The new array of code points.
         */
        function ucs2decode(string) {
            var output = [],
                counter = 0,
                length = string.length,
                value,
                extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                    // high surrogate, and there is a next character
                    extra = string.charCodeAt(counter++);
                    if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                    } else {
                        // unmatched surrogate; only append this code unit, in case the next
                        // code unit is the high surrogate of a surrogate pair
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }

        /**
         * Creates a string based on an array of numeric code points.
         * @see `punycode.ucs2.decode`
         * @memberOf punycode.ucs2
         * @name encode
         * @param {Array} codePoints The array of numeric code points.
         * @returns {String} The new Unicode string (UCS-2).
         */
        function ucs2encode(array) {
            return map(array, function(value) {
                var output = '';
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                    value = 0xDC00 | value & 0x3FF;
                }
                output += stringFromCharCode(value);
                return output;
            }).join('');
        }

        /**
         * Converts a basic code point into a digit/integer.
         * @see `digitToBasic()`
         * @private
         * @param {Number} codePoint The basic numeric code point value.
         * @returns {Number} The numeric value of a basic code point (for use in
         * representing integers) in the range `0` to `base - 1`, or `base` if
         * the code point does not represent a value.
         */
        function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
                return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
                return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
                return codePoint - 97;
            }
            return base;
        }

        /**
         * Converts a digit/integer into a basic code point.
         * @see `basicToDigit()`
         * @private
         * @param {Number} digit The numeric value of a basic code point.
         * @returns {Number} The basic code point whose value (when used for
         * representing integers) is `digit`, which needs to be in the range
         * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
         * used; else, the lowercase form is used. The behavior is undefined
         * if `flag` is non-zero and `digit` has no uppercase form.
         */
        function digitToBasic(digit, flag) {
            //  0..25 map to ASCII a..z or A..Z
            // 26..35 map to ASCII 0..9
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }

        /**
         * Bias adaptation function as per section 3.4 of RFC 3492.
         * http://tools.ietf.org/html/rfc3492#section-3.4
         * @private
         */
        function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }

        /**
         * Converts a Punycode string of ASCII-only symbols to a string of Unicode
         * symbols.
         * @memberOf punycode
         * @param {String} input The Punycode string of ASCII-only symbols.
         * @returns {String} The resulting string of Unicode symbols.
         */
        function decode(input) {
            // Don't use UCS-2
            var output = [],
                inputLength = input.length,
                out,
                i = 0,
                n = initialN,
                bias = initialBias,
                basic,
                j,
                index,
                oldi,
                w,
                k,
                digit,
                t,
                /** Cached calculation results */
                baseMinusT;

            // Handle the basic code points: let `basic` be the number of input code
            // points before the last delimiter, or `0` if there is none, then copy
            // the first basic code points to the output.

            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
                basic = 0;
            }

            for (j = 0; j < basic; ++j) {
                // if it's not a basic code point
                if (input.charCodeAt(j) >= 0x80) {
                    error('not-basic');
                }
                output.push(input.charCodeAt(j));
            }

            // Main decoding loop: start just after the last delimiter if any basic code
            // points were copied; start at the beginning otherwise.

            for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

                // `index` is the index of the next character to be consumed.
                // Decode a generalized variable-length integer into `delta`,
                // which gets added to `i`. The overflow checking is easier
                // if we increase `i` as we go, then subtract off its starting
                // value at the end to obtain `delta`.
                for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                    if (index >= inputLength) {
                        error('invalid-input');
                    }

                    digit = basicToDigit(input.charCodeAt(index++));

                    if (digit >= base || digit > floor((maxInt - i) / w)) {
                        error('overflow');
                    }

                    i += digit * w;
                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                    if (digit < t) {
                        break;
                    }

                    baseMinusT = base - t;
                    if (w > floor(maxInt / baseMinusT)) {
                        error('overflow');
                    }

                    w *= baseMinusT;

                }

                out = output.length + 1;
                bias = adapt(i - oldi, out, oldi == 0);

                // `i` was supposed to wrap around from `out` to `0`,
                // incrementing `n` each time, so we'll fix that now:
                if (floor(i / out) > maxInt - n) {
                    error('overflow');
                }

                n += floor(i / out);
                i %= out;

                // Insert `n` at position `i` of the output
                output.splice(i++, 0, n);

            }

            return ucs2encode(output);
        }

        /**
         * Converts a string of Unicode symbols (e.g. a domain name label) to a
         * Punycode string of ASCII-only symbols.
         * @memberOf punycode
         * @param {String} input The string of Unicode symbols.
         * @returns {String} The resulting Punycode string of ASCII-only symbols.
         */
        function encode(input) {
            var n,
                delta,
                handledCPCount,
                basicLength,
                bias,
                j,
                m,
                q,
                k,
                t,
                currentValue,
                output = [],
                /** `inputLength` will hold the number of code points in `input`. */
                inputLength,
                /** Cached calculation results */
                handledCPCountPlusOne,
                baseMinusT,
                qMinusT;

            // Convert the input in UCS-2 to Unicode
            input = ucs2decode(input);

            // Cache the length
            inputLength = input.length;

            // Initialize the state
            n = initialN;
            delta = 0;
            bias = initialBias;

            // Handle the basic code points
            for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < 0x80) {
                    output.push(stringFromCharCode(currentValue));
                }
            }

            handledCPCount = basicLength = output.length;

            // `handledCPCount` is the number of code points that have been handled;
            // `basicLength` is the number of basic code points.

            // Finish the basic string - if it is not empty - with a delimiter
            if (basicLength) {
                output.push(delimiter);
            }

            // Main encoding loop:
            while (handledCPCount < inputLength) {

                // All non-basic code points < n have been handled already. Find the next
                // larger one:
                for (m = maxInt, j = 0; j < inputLength; ++j) {
                    currentValue = input[j];
                    if (currentValue >= n && currentValue < m) {
                        m = currentValue;
                    }
                }

                // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                // but guard against overflow
                handledCPCountPlusOne = handledCPCount + 1;
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                    error('overflow');
                }

                delta += (m - n) * handledCPCountPlusOne;
                n = m;

                for (j = 0; j < inputLength; ++j) {
                    currentValue = input[j];

                    if (currentValue < n && ++delta > maxInt) {
                        error('overflow');
                    }

                    if (currentValue == n) {
                        // Represent delta as a generalized variable-length integer
                        for (q = delta, k = base; /* no condition */; k += base) {
                            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                            if (q < t) {
                                break;
                            }
                            qMinusT = q - t;
                            baseMinusT = base - t;
                            output.push(
                                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                            );
                            q = floor(qMinusT / baseMinusT);
                        }

                        output.push(stringFromCharCode(digitToBasic(q, 0)));
                        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                        delta = 0;
                        ++handledCPCount;
                    }
                }

                ++delta;
                ++n;

            }
            return output.join('');
        }

        /**
         * Converts a Punycode string representing a domain name or an email address
         * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
         * it doesn't matter if you call it on a string that has already been
         * converted to Unicode.
         * @memberOf punycode
         * @param {String} input The Punycoded domain name or email address to
         * convert to Unicode.
         * @returns {String} The Unicode representation of the given Punycode
         * string.
         */
        function toUnicode(input) {
            return mapDomain(input, function(string) {
                return regexPunycode.test(string)
                    ? decode(string.slice(4).toLowerCase())
                    : string;
            });
        }

        /**
         * Converts a Unicode string representing a domain name or an email address to
         * Punycode. Only the non-ASCII parts of the domain name will be converted,
         * i.e. it doesn't matter if you call it with a domain that's already in
         * ASCII.
         * @memberOf punycode
         * @param {String} input The domain name or email address to convert, as a
         * Unicode string.
         * @returns {String} The Punycode representation of the given domain name or
         * email address.
         */
        function toASCII(input) {
            return mapDomain(input, function(string) {
                return regexNonASCII.test(string)
                    ? 'xn--' + encode(string)
                    : string;
            });
        }

        /*--------------------------------------------------------------------------*/

        /** Define the public API */
        punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            'version': '1.3.2',
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            'ucs2': {
                'decode': ucs2decode,
                'encode': ucs2encode
            },
            'decode': decode,
            'encode': encode,
            'toASCII': toASCII,
            'toUnicode': toUnicode
        };

        /** Expose `punycode` */
        // Some AMD build optimizers, like r.js, check for specific condition patterns
        // like the following:
        if (
            typeof undefined == 'function' &&
            typeof undefined.amd == 'object' &&
            undefined.amd
        ) {
            undefined('punycode', function() {
                return punycode;
            });
        } else if (freeExports && freeModule) {
            if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
                freeModule.exports = punycode;
            } else { // in Narwhal or RingoJS v0.7.0-
                for (key in punycode) {
                    punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                }
            }
        } else { // in Rhino or a web browser
            root.punycode = punycode;
        }

    }(commonjsGlobal));
    });

    var util = {
      isString: function(arg) {
        return typeof(arg) === 'string';
      },
      isObject: function(arg) {
        return typeof(arg) === 'object' && arg !== null;
      },
      isNull: function(arg) {
        return arg === null;
      },
      isNullOrUndefined: function(arg) {
        return arg == null;
      }
    };

    // Copyright Joyent, Inc. and other Node contributors.

    // If obj.hasOwnProperty has been overridden, then calling
    // obj.hasOwnProperty(prop) will break.
    // See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var decode = function(qs, sep, eq, options) {
      sep = sep || '&';
      eq = eq || '=';
      var obj = {};

      if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
      }

      var regexp = /\+/g;
      qs = qs.split(sep);

      var maxKeys = 1000;
      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
      }

      var len = qs.length;
      // maxKeys <= 0 means that we should not limit keys count
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }

      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr, vstr, k, v;

        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = '';
        }

        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);

        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (Array.isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }

      return obj;
    };

    // Copyright Joyent, Inc. and other Node contributors.

    var stringifyPrimitive = function(v) {
      switch (typeof v) {
        case 'string':
          return v;

        case 'boolean':
          return v ? 'true' : 'false';

        case 'number':
          return isFinite(v) ? v : '';

        default:
          return '';
      }
    };

    var encode = function(obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';
      if (obj === null) {
        obj = undefined;
      }

      if (typeof obj === 'object') {
        return Object.keys(obj).map(function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k].map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).join(sep);

      }

      if (!name) { return ''; }
      return encodeURIComponent(stringifyPrimitive(name)) + eq +
             encodeURIComponent(stringifyPrimitive(obj));
    };

    var querystring = createCommonjsModule(function (module, exports) {
        export const decode = exports.parse = decode;
        export const encode = exports.stringify = encode;
    });
    var querystring_1 = querystring.decode;
    var querystring_2 = querystring.parse;
    var querystring_3 = querystring.encode;
    var querystring_4 = querystring.stringify;

    var parse = urlParse;
    var resolve = urlResolve;
    var resolveObject = urlResolveObject;
    var format$1 = urlFormat;

    var Url_1 = Url;

    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.host = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.query = null;
      this.pathname = null;
      this.path = null;
      this.href = null;
    }

    // Reference: RFC 3986, RFC 1808, RFC 2396

    // define these here so at least they only have to be
    // compiled once on the first module load.
    var protocolPattern = /^([a-z0-9.+-]+:)/i,
        portPattern = /:[0-9]*$/,

        // Special case for a simple path URL
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

        // RFC 2396: characters reserved for delimiting URLs.
        // We actually just auto-escape these.
        delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

        // RFC 2396: characters not allowed for various reasons.
        unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

        // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
        autoEscape = ['\''].concat(unwise),
        // Characters that are never ever allowed in a hostname.
        // Note that any invalid chars are also handled, but these
        // are the ones that are *expected* to be seen, so we fast-path
        // them.
        nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
        hostEndingChars = ['/', '?', '#'],
        hostnameMaxLen = 255,
        hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
        hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        // protocols that can allow "unsafe" and "unwise" chars.
        unsafeProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that never have a hostname.
        hostlessProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that always contain a // bit.
        slashedProtocol = {
          'http': true,
          'https': true,
          'ftp': true,
          'gopher': true,
          'file': true,
          'http:': true,
          'https:': true,
          'ftp:': true,
          'gopher:': true,
          'file:': true
        };

    function urlParse(url, parseQueryString, slashesDenoteHost) {
      if (url && util.isObject(url) && url instanceof Url) { return url; }

      var u = new Url;
      u.parse(url, parseQueryString, slashesDenoteHost);
      return u;
    }

    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      var this$1 = this;

      if (!util.isString(url)) {
        throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
      }

      // Copy chrome, IE, opera backslash-handling behavior.
      // Back slashes before the query string get converted to forward slashes
      // See: https://code.google.com/p/chromium/issues/detail?id=25916
      var queryIndex = url.indexOf('?'),
          splitter =
              (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
          uSplit = url.split(splitter),
          slashRegex = /\\/g;
      uSplit[0] = uSplit[0].replace(slashRegex, '/');
      url = uSplit.join(splitter);

      var rest = url;

      // trim before proceeding.
      // This is to support parse stuff like "  http://foo.com  \n"
      rest = rest.trim();

      if (!slashesDenoteHost && url.split('#').length === 1) {
        // Try fast path regexp
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.path = rest;
          this.href = rest;
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
            if (parseQueryString) {
              this.query = querystring.parse(this.search.substr(1));
            } else {
              this.query = this.search.substr(1);
            }
          } else if (parseQueryString) {
            this.search = '';
            this.query = {};
          }
          return this;
        }
      }

      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
      }

      // figure out if it's got a host
      // user@server is *always* interpreted as a hostname, and url
      // resolution will treat //foo/bar as host=foo,path=bar because that's
      // how the browser resolves relative URLs.
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === '//';
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }

      if (!hostlessProtocol[proto] &&
          (slashes || (proto && !slashedProtocol[proto]))) {

        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        //
        // If there is an @ in the hostname, then non-host chars *are* allowed
        // to the left of the last @ sign, unless some host-ending character
        // comes *before* the @-sign.
        // URLs are obnoxious.
        //
        // ex:
        // http://a@b@c/ => user:a@b host:c
        // http://a@b?@c => user:a host:c path:/?@c

        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
        // Review our test case against browsers more comprehensively.

        // find the first instance of any hostEndingChars
        var hostEnd = -1;
        for (var i = 0; i < hostEndingChars.length; i++) {
          var hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            { hostEnd = hec; }
        }

        // at this point, either we have an explicit point where the
        // auth portion cannot go past, or the last @ char is the decider.
        var auth, atSign;
        if (hostEnd === -1) {
          // atSign can be anywhere.
          atSign = rest.lastIndexOf('@');
        } else {
          // atSign must be in auth portion.
          // http://a@b/c@d => host:b auth:a path:/c@d
          atSign = rest.lastIndexOf('@', hostEnd);
        }

        // Now we have a portion which is definitely the auth.
        // Pull that off.
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = decodeURIComponent(auth);
        }

        // the host is the remaining to the left of the first non-host char
        hostEnd = -1;
        for (var i = 0; i < nonHostChars.length; i++) {
          var hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            { hostEnd = hec; }
        }
        // if we still have not hit it, then the entire thing is a host.
        if (hostEnd === -1)
          { hostEnd = rest.length; }

        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);

        // pull out port.
        this.parseHost();

        // we've indicated that there is a hostname,
        // so even if it's empty, it has to be present.
        this.hostname = this.hostname || '';

        // if hostname begins with [ and ends with ]
        // assume that it's an IPv6 address.
        var ipv6Hostname = this.hostname[0] === '[' &&
            this.hostname[this.hostname.length - 1] === ']';

        // validate a little.
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (var i = 0, l = hostparts.length; i < l; i++) {
            var part = hostparts[i];
            if (!part) { continue; }
            if (!part.match(hostnamePartPattern)) {
              var newpart = '';
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  // we replace non-ASCII char with a temporary placeholder
                  // we need this to make sure size of hostname is not
                  // broken by replacing non-ASCII by nothing
                  newpart += 'x';
                } else {
                  newpart += part[j];
                }
              }
              // we test again with ASCII char only
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i);
                var notHost = hostparts.slice(i + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = '/' + notHost.join('.') + rest;
                }
                this$1.hostname = validParts.join('.');
                break;
              }
            }
          }
        }

        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = '';
        } else {
          // hostnames are always lower case.
          this.hostname = this.hostname.toLowerCase();
        }

        if (!ipv6Hostname) {
          // IDNA Support: Returns a punycoded representation of "domain".
          // It only converts parts of the domain name that
          // have non-ASCII characters, i.e. it doesn't matter if
          // you call it with a domain that already is ASCII-only.
          this.hostname = punycode.toASCII(this.hostname);
        }

        var p = this.port ? ':' + this.port : '';
        var h = this.hostname || '';
        this.host = h + p;
        this.href += this.host;

        // strip [ and ] from the hostname
        // the host field still retains them, though
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
          if (rest[0] !== '/') {
            rest = '/' + rest;
          }
        }
      }

      // now rest is set to the post-host stuff.
      // chop off any delim chars.
      if (!unsafeProtocol[lowerProto]) {

        // First, make 100% sure that any "autoEscape" chars get
        // escaped, even if encodeURIComponent doesn't think they
        // need to be.
        for (var i = 0, l = autoEscape.length; i < l; i++) {
          var ae = autoEscape[i];
          if (rest.indexOf(ae) === -1)
            { continue; }
          var esc = encodeURIComponent(ae);
          if (esc === ae) {
            esc = escape(ae);
          }
          rest = rest.split(ae).join(esc);
        }
      }


      // chop off from the tail first.
      var hash = rest.indexOf('#');
      if (hash !== -1) {
        // got a fragment string.
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf('?');
      if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) {
          this.query = querystring.parse(this.query);
        }
        rest = rest.slice(0, qm);
      } else if (parseQueryString) {
        // no query string, but parseQueryString still requested
        this.search = '';
        this.query = {};
      }
      if (rest) { this.pathname = rest; }
      if (slashedProtocol[lowerProto] &&
          this.hostname && !this.pathname) {
        this.pathname = '/';
      }

      //to support http.request
      if (this.pathname || this.search) {
        var p = this.pathname || '';
        var s = this.search || '';
        this.path = p + s;
      }

      // finally, reconstruct the href based on what has been validated.
      this.href = this.format();
      return this;
    };

    // format a parsed object into a url string
    function urlFormat(obj) {
      // ensure it's an object, and not a string url.
      // If it's an obj, this is a no-op.
      // this way, you can call url_format() on strings
      // to clean up potentially wonky urls.
      if (util.isString(obj)) { obj = urlParse(obj); }
      if (!(obj instanceof Url)) { return Url.prototype.format.call(obj); }
      return obj.format();
    }

    Url.prototype.format = function() {
      var auth = this.auth || '';
      if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ':');
        auth += '@';
      }

      var protocol = this.protocol || '',
          pathname = this.pathname || '',
          hash = this.hash || '',
          host = false,
          query = '';

      if (this.host) {
        host = auth + this.host;
      } else if (this.hostname) {
        host = auth + (this.hostname.indexOf(':') === -1 ?
            this.hostname :
            '[' + this.hostname + ']');
        if (this.port) {
          host += ':' + this.port;
        }
      }

      if (this.query &&
          util.isObject(this.query) &&
          Object.keys(this.query).length) {
        query = querystring.stringify(this.query);
      }

      var search = this.search || (query && ('?' + query)) || '';

      if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; }

      // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
      // unless they had them to begin with.
      if (this.slashes ||
          (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
      } else if (!host) {
        host = '';
      }

      if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
      if (search && search.charAt(0) !== '?') { search = '?' + search; }

      pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
      });
      search = search.replace('#', '%23');

      return protocol + host + pathname + search + hash;
    };

    function urlResolve(source, relative) {
      return urlParse(source, false, true).resolve(relative);
    }

    Url.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };

    function urlResolveObject(source, relative) {
      if (!source) { return relative; }
      return urlParse(source, false, true).resolveObject(relative);
    }

    Url.prototype.resolveObject = function(relative) {
      var this$1 = this;

      if (util.isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
      }

      var result = new Url();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this$1[tkey];
      }

      // hash is always overridden, no matter what.
      // even href="" will remove it.
      result.hash = relative.hash;

      // if the relative url is empty, then there's nothing left to do here.
      if (relative.href === '') {
        result.href = result.format();
        return result;
      }

      // hrefs like //foo/bar always cut to the protocol.
      if (relative.slashes && !relative.protocol) {
        // take everything except the protocol from relative
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== 'protocol')
            { result[rkey] = relative[rkey]; }
        }

        //urlParse appends trailing / to urls like http://www.example.com
        if (slashedProtocol[result.protocol] &&
            result.hostname && !result.pathname) {
          result.path = result.pathname = '/';
        }

        result.href = result.format();
        return result;
      }

      if (relative.protocol && relative.protocol !== result.protocol) {
        // if it's a known url protocol, then changing
        // the protocol does weird things
        // first, if it's not file:, then we MUST have a host,
        // and if there was a path
        // to begin with, then we MUST have a path.
        // if it is file:, then the host is dropped,
        // because that's known to be hostless.
        // anything else is assumed to be absolute.
        if (!slashedProtocol[relative.protocol]) {
          var keys = Object.keys(relative);
          for (var v = 0; v < keys.length; v++) {
            var k = keys[v];
            result[k] = relative[k];
          }
          result.href = result.format();
          return result;
        }

        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          var relPath = (relative.pathname || '').split('/');
          while (relPath.length && !(relative.host = relPath.shift())){ }
          if (!relative.host) { relative.host = ''; }
          if (!relative.hostname) { relative.hostname = ''; }
          if (relPath[0] !== '') { relPath.unshift(''); }
          if (relPath.length < 2) { relPath.unshift(''); }
          result.pathname = relPath.join('/');
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || '';
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        // to support http.request
        if (result.pathname || result.search) {
          var p = result.pathname || '';
          var s = result.search || '';
          result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }

      var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
          isRelAbs = (
              relative.host ||
              relative.pathname && relative.pathname.charAt(0) === '/'
          ),
          mustEndAbs = (isRelAbs || isSourceAbs ||
                        (result.host && relative.pathname)),
          removeAllDots = mustEndAbs,
          srcPath = result.pathname && result.pathname.split('/') || [],
          relPath = relative.pathname && relative.pathname.split('/') || [],
          psychotic = result.protocol && !slashedProtocol[result.protocol];

      // if the url is a non-slashed url, then relative
      // links like ../.. should be able
      // to crawl up to the hostname, as well.  This is strange.
      // result.protocol has already been set by now.
      // Later on, put the first path part into the host field.
      if (psychotic) {
        result.hostname = '';
        result.port = null;
        if (result.host) {
          if (srcPath[0] === '') { srcPath[0] = result.host; }
          else { srcPath.unshift(result.host); }
        }
        result.host = '';
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === '') { relPath[0] = relative.host; }
            else { relPath.unshift(relative.host); }
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
      }

      if (isRelAbs) {
        // it's absolute.
        result.host = (relative.host || relative.host === '') ?
                      relative.host : result.host;
        result.hostname = (relative.hostname || relative.hostname === '') ?
                          relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
        // fall through to the dot-handling below.
      } else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath) { srcPath = []; }
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!util.isNullOrUndefined(relative.search)) {
        // just pull out the search.
        // like href='?foo'.
        // Put this after the other two cases because it simplifies the booleans
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          //occationaly the auth can get stuck only in host
          //this especially happens in cases like
          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
          var authInHost = result.host && result.host.indexOf('@') > 0 ?
                           result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        //to support http.request
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
        }
        result.href = result.format();
        return result;
      }

      if (!srcPath.length) {
        // no path at all.  easy.
        // we've already handled the other stuff above.
        result.pathname = null;
        //to support http.request
        if (result.search) {
          result.path = '/' + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }

      // if a url ENDs in . or .., then it must get a trailing slash.
      // however, if it ends in anything else non-slashy,
      // then it must NOT get a trailing slash.
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (
          (result.host || relative.host || srcPath.length > 1) &&
          (last === '.' || last === '..') || last === '');

      // strip single dots, resolve double dots to parent dir
      // if the path tries to go above the root, `up` ends up > 0
      var up = 0;
      for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === '.') {
          srcPath.splice(i, 1);
        } else if (last === '..') {
          srcPath.splice(i, 1);
          up++;
        } else if (up) {
          srcPath.splice(i, 1);
          up--;
        }
      }

      // if the path is allowed to go above the root, restore leading ..s
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift('..');
        }
      }

      if (mustEndAbs && srcPath[0] !== '' &&
          (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
        srcPath.unshift('');
      }

      if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
        srcPath.push('');
      }

      var isAbsolute = srcPath[0] === '' ||
          (srcPath[0] && srcPath[0].charAt(0) === '/');

      // put the host back
      if (psychotic) {
        result.hostname = result.host = isAbsolute ? '' :
                                        srcPath.length ? srcPath.shift() : '';
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }

      mustEndAbs = mustEndAbs || (result.host && srcPath.length);

      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift('');
      }

      if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
      } else {
        result.pathname = srcPath.join('/');
      }

      //to support request.http
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };

    Url.prototype.parseHost = function() {
      var host = this.host;
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ':') {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) { this.hostname = host; }
    };

    var url = {
        parse: parse,
        resolve: resolve,
        resolveObject: resolveObject,
        format: format$1,
        Url: Url_1
    };

    function getPropertyReference(propertyName) {
        for (var i = 0; i < latestStyleSpec.layout.length; i++) {
            for (var key in latestStyleSpec[latestStyleSpec.layout[i]]) {
                if (key === propertyName) { return latestStyleSpec[latestStyleSpec.layout[i]][key]; }
            }
        }
        for (var i$1 = 0; i$1 < latestStyleSpec.paint.length; i$1++) {
            for (var key$1 in latestStyleSpec[latestStyleSpec.paint[i$1]]) {
                if (key$1 === propertyName) { return latestStyleSpec[latestStyleSpec.paint[i$1]][key$1]; }
            }
        }
    }

    function eachSource(style, callback) {
        for (var k in style.sources) {
            callback(style.sources[k]);
        }
    }

    function eachLayer(style, callback) {
        for (var k in style.layers) {
            callback(style.layers[k]);
            eachLayer(style.layers[k], callback);
        }
    }

    function eachLayout(layer$$1, callback) {
        for (var k in layer$$1) {
            if (k.indexOf('layout') === 0) {
                callback(layer$$1[k], k);
            }
        }
    }

    function eachPaint(layer$$1, callback) {
        for (var k in layer$$1) {
            if (k.indexOf('paint') === 0) {
                callback(layer$$1[k], k);
            }
        }
    }

    function resolveConstant(style, value) {
        if (typeof value === 'string' && value[0] === '@') {
            return resolveConstant(style, style.constants[value]);
        } else {
            return value;
        }
    }

    function eachProperty(style, options, callback) {
        if (arguments.length === 2) {
            callback = options;
            options = {};
        }

        options.layout = options.layout === undefined ? true : options.layout;
        options.paint = options.paint === undefined ? true : options.paint;

        function inner(layer$$1, properties) {
            Object.keys(properties).forEach(function (key) {
                callback({
                    key: key,
                    value: properties[key],
                    reference: getPropertyReference(key),
                    set: function(x) {
                        properties[key] = x;
                    }
                });
            });
        }

        eachLayer(style, function (layer$$1) {
            if (options.paint) {
                eachPaint(layer$$1, function (paint$$1) {
                    inner(layer$$1, paint$$1);
                });
            }
            if (options.layout) {
                eachLayout(layer$$1, function (layout$$1) {
                    inner(layer$$1, layout$$1);
                });
            }
        });
    }

    function isFunction(value) {
        return Array.isArray(value.stops);
    }

    function renameProperty(obj, from, to) {
        obj[to] = obj[from]; delete obj[from];
    }

    function migrateToV8(style) {
        style.version = 8;

        // Rename properties, reverse coordinates in source and layers
        eachSource(style, function (source$$1) {
            if (source$$1.type === 'video' && source$$1.url !== undefined) {
                renameProperty(source$$1, 'url', 'urls');
            }
            if (source$$1.type === 'video') {
                source$$1.coordinates.forEach(function (coord) {
                    return coord.reverse();
                });
            }
        });

        eachLayer(style, function (layer$$1) {
            eachLayout(layer$$1, function (layout$$1) {
                if (layout$$1['symbol-min-distance'] !== undefined) {
                    renameProperty(layout$$1, 'symbol-min-distance', 'symbol-spacing');
                }
            });

            eachPaint(layer$$1, function (paint$$1) {
                if (paint$$1['background-image'] !== undefined) {
                    renameProperty(paint$$1, 'background-image', 'background-pattern');
                }
                if (paint$$1['line-image'] !== undefined) {
                    renameProperty(paint$$1, 'line-image', 'line-pattern');
                }
                if (paint$$1['fill-image'] !== undefined) {
                    renameProperty(paint$$1, 'fill-image', 'fill-pattern');
                }
            });
        });

        // Inline Constants
        eachProperty(style, function (property) {
            var value = resolveConstant(style, property.value);

            if (isFunction(value)) {
                value.stops.forEach(function (stop) {
                    stop[1] = resolveConstant(style, stop[1]);
                });
            }

            property.set(value);
        });
        delete style.constants;

        eachLayer(style, function (layer$$1) {
            // get rid of text-max-size, icon-max-size
            // turn text-size, icon-size into layout properties
            // https://github.com/mapbox/mapbox-gl-style-spec/issues/255

            eachLayout(layer$$1, function (layout$$1) {
                delete layout$$1['text-max-size'];
                delete layout$$1['icon-max-size'];
            });

            eachPaint(layer$$1, function (paint$$1) {
                if (paint$$1['text-size']) {
                    if (!layer$$1.layout) { layer$$1.layout = {}; }
                    layer$$1.layout['text-size'] = paint$$1['text-size'];
                    delete paint$$1['text-size'];
                }

                if (paint$$1['icon-size']) {
                    if (!layer$$1.layout) { layer$$1.layout = {}; }
                    layer$$1.layout['icon-size'] = paint$$1['icon-size'];
                    delete paint$$1['icon-size'];
                }
            });
        });

        function migrateFontstackURL(input) {
            var inputParsed = url.parse(input);
            var inputPathnameParts = inputParsed.pathname.split('/');

            if (inputParsed.protocol !== 'mapbox:') {
                return input;

            } else if (inputParsed.hostname === 'fontstack') {
                assert(decodeURI(inputParsed.pathname) === '/{fontstack}/{range}.pbf');
                return 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf';

            } else if (inputParsed.hostname === 'fonts') {
                assert(inputPathnameParts[1] === 'v1');
                assert(decodeURI(inputPathnameParts[3]) === '{fontstack}');
                assert(decodeURI(inputPathnameParts[4]) === '{range}.pbf');
                return ("mapbox://fonts/" + (inputPathnameParts[2]) + "/{fontstack}/{range}.pbf");

            } else {
                assert(false);
            }

            function assert(predicate) {
                if (!predicate) {
                    throw new Error(("Invalid font url: \"" + input + "\""));
                }
            }
        }

        if (style.glyphs) {
            style.glyphs = migrateFontstackURL(style.glyphs);
        }

        function migrateFontStack(font) {
            function splitAndTrim(string) {
                return string.split(',').map(function (s) {
                    return s.trim();
                });
            }

            if (Array.isArray(font)) {
                // Assume it's a previously migrated font-array.
                return font;

            } else if (typeof font === 'string') {
                return splitAndTrim(font);

            } else if (typeof font === 'object') {
                font.stops.forEach(function (stop) {
                    stop[1] = splitAndTrim(stop[1]);
                });
                return font;

            } else {
                throw new Error("unexpected font value");
            }
        }

        eachLayer(style, function (layer$$1) {
            eachLayout(layer$$1, function (layout$$1) {
                if (layout$$1['text-font']) {
                    layout$$1['text-font'] = migrateFontStack(layout$$1['text-font']);
                }
            });
        });

        // Reverse order of symbol layers. This is an imperfect migration.
        //
        // The order of a symbol layer in the layers list affects two things:
        // - how it is drawn relative to other layers (like oneway arrows below bridges)
        // - the placement priority compared to other layers
        //
        // It's impossible to reverse the placement priority without breaking the draw order
        // in some cases. This migration only reverses the order of symbol layers that
        // are above all other types of layers.
        //
        // Symbol layers that are at the top of the map preserve their priority.
        // Symbol layers that are below another type (line, fill) of layer preserve their draw order.

        var firstSymbolLayer = 0;
        for (var i = style.layers.length - 1; i >= 0; i--) {
            var layer$$1 = style.layers[i];
            if (layer$$1.type !== 'symbol') {
                firstSymbolLayer = i + 1;
                break;
            }
        }

        var symbolLayers = style.layers.splice(firstSymbolLayer);
        symbolLayers.reverse();
        style.layers = style.layers.concat(symbolLayers);

        return style;
    }

    function migrate(style) {
        var migrated = false;

        if (style.version === 7 || style.version === 8) {
            style = migrateToV8(style);
            migrated = true;
        }

        if (!migrated) {
            throw new Error('cannot migrate from', style.version);
        }

        return style;
    }

    function composite (style) {
        var styleIDs = [];
        var sourceIDs = [];
        var compositedSourceLayers = [];

        for (var id in style.sources) {
            var source = style.sources[id];

            if (source.type !== "vector")
                { continue; }

            var match = /^mapbox:\/\/(.*)/.exec(source.url);
            if (!match)
                { continue; }

            styleIDs.push(id);
            sourceIDs.push(match[1]);
        }

        if (styleIDs.length < 2)
            { return style; }

        styleIDs.forEach(function (id) {
            delete style.sources[id];
        });

        var compositeID = sourceIDs.join(",");

        style.sources[compositeID] = {
            "type": "vector",
            "url": ("mapbox://" + compositeID)
        };

        style.layers.forEach(function (layer) {
            if (styleIDs.indexOf(layer.source) >= 0) {
                layer.source = compositeID;

                if ('source-layer' in layer) {
                    if (compositedSourceLayers.indexOf(layer['source-layer']) >= 0) {
                        throw new Error('Conflicting source layer names');
                    } else {
                        compositedSourceLayers.push(layer['source-layer']);
                    }
                }
            }
        });

        return style;
    }

    //      

    /**
     * Deeply compares two object literals.
     *
     * @private
     */
    function deepEqual(a        , b        )          {
        if (Array.isArray(a)) {
            if (!Array.isArray(b) || a.length !== b.length) { return false; }
            for (var i = 0; i < a.length; i++) {
                if (!deepEqual(a[i], b[i])) { return false; }
            }
            return true;
        }
        if (typeof a === 'object' && a !== null && b !== null) {
            if (!(typeof b === 'object')) { return false; }
            var keys = Object.keys(a);
            if (keys.length !== Object.keys(b).length) { return false; }
            for (var key in a) {
                if (!deepEqual(a[key], b[key])) { return false; }
            }
            return true;
        }
        return a === b;
    }

    var operations = {

        /*
         * { command: 'setStyle', args: [stylesheet] }
         */
        setStyle: 'setStyle',

        /*
         * { command: 'addLayer', args: [layer, 'beforeLayerId'] }
         */
        addLayer: 'addLayer',

        /*
         * { command: 'removeLayer', args: ['layerId'] }
         */
        removeLayer: 'removeLayer',

        /*
         * { command: 'setPaintProperty', args: ['layerId', 'prop', value] }
         */
        setPaintProperty: 'setPaintProperty',

        /*
         * { command: 'setLayoutProperty', args: ['layerId', 'prop', value] }
         */
        setLayoutProperty: 'setLayoutProperty',

        /*
         * { command: 'setFilter', args: ['layerId', filter] }
         */
        setFilter: 'setFilter',

        /*
         * { command: 'addSource', args: ['sourceId', source] }
         */
        addSource: 'addSource',

        /*
         * { command: 'removeSource', args: ['sourceId'] }
         */
        removeSource: 'removeSource',

        /*
         * { command: 'setGeoJSONSourceData', args: ['sourceId', data] }
         */
        setGeoJSONSourceData: 'setGeoJSONSourceData',

        /*
         * { command: 'setLayerZoomRange', args: ['layerId', 0, 22] }
         */
        setLayerZoomRange: 'setLayerZoomRange',

        /*
         * { command: 'setLayerProperty', args: ['layerId', 'prop', value] }
         */
        setLayerProperty: 'setLayerProperty',

        /*
         * { command: 'setCenter', args: [[lon, lat]] }
         */
        setCenter: 'setCenter',

        /*
         * { command: 'setZoom', args: [zoom] }
         */
        setZoom: 'setZoom',

        /*
         * { command: 'setBearing', args: [bearing] }
         */
        setBearing: 'setBearing',

        /*
         * { command: 'setPitch', args: [pitch] }
         */
        setPitch: 'setPitch',

        /*
         * { command: 'setSprite', args: ['spriteUrl'] }
         */
        setSprite: 'setSprite',

        /*
         * { command: 'setGlyphs', args: ['glyphsUrl'] }
         */
        setGlyphs: 'setGlyphs',

        /*
         * { command: 'setTransition', args: [transition] }
         */
        setTransition: 'setTransition',

        /*
         * { command: 'setLighting', args: [lightProperties] }
         */
        setLight: 'setLight'

    };

    function addSource(sourceId, after, commands) {
        commands.push({ command: operations.addSource, args: [sourceId, after[sourceId]] });
    }

    function removeSource(sourceId, commands, sourcesRemoved) {
        commands.push({ command: operations.removeSource, args: [sourceId] });
        sourcesRemoved[sourceId] = true;
    }

    function updateSource(sourceId, after, commands, sourcesRemoved) {
        removeSource(sourceId, commands, sourcesRemoved);
        addSource(sourceId, after, commands);
    }

    function canUpdateGeoJSON(before, after, sourceId) {
        var prop;
        for (prop in before[sourceId]) {
            if (!before[sourceId].hasOwnProperty(prop)) { continue; }
            if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
                return false;
            }
        }
        for (prop in after[sourceId]) {
            if (!after[sourceId].hasOwnProperty(prop)) { continue; }
            if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
                return false;
            }
        }
        return true;
    }

    function diffSources(before, after, commands, sourcesRemoved) {
        before = before || {};
        after = after || {};

        var sourceId;

        // look for sources to remove
        for (sourceId in before) {
            if (!before.hasOwnProperty(sourceId)) { continue; }
            if (!after.hasOwnProperty(sourceId)) {
                removeSource(sourceId, commands, sourcesRemoved);
            }
        }

        // look for sources to add/update
        for (sourceId in after) {
            if (!after.hasOwnProperty(sourceId)) { continue; }
            if (!before.hasOwnProperty(sourceId)) {
                addSource(sourceId, after, commands);
            } else if (!deepEqual(before[sourceId], after[sourceId])) {
                if (before[sourceId].type === 'geojson' && after[sourceId].type === 'geojson' && canUpdateGeoJSON(before, after, sourceId)) {
                    commands.push({ command: operations.setGeoJSONSourceData, args: [sourceId, after[sourceId].data] });
                } else {
                    // no update command, must remove then add
                    updateSource(sourceId, after, commands, sourcesRemoved);
                }
            }
        }
    }

    function diffLayerPropertyChanges(before, after, commands, layerId, klass, command) {
        before = before || {};
        after = after || {};

        var prop;

        for (prop in before) {
            if (!before.hasOwnProperty(prop)) { continue; }
            if (!deepEqual(before[prop], after[prop])) {
                commands.push({ command: command, args: [layerId, prop, after[prop], klass] });
            }
        }
        for (prop in after) {
            if (!after.hasOwnProperty(prop) || before.hasOwnProperty(prop)) { continue; }
            if (!deepEqual(before[prop], after[prop])) {
                commands.push({ command: command, args: [layerId, prop, after[prop], klass] });
            }
        }
    }

    function pluckId(layer) {
        return layer.id;
    }
    function indexById(group, layer) {
        group[layer.id] = layer;
        return group;
    }

    function diffLayers(before, after, commands) {
        before = before || [];
        after = after || [];

        // order of layers by id
        var beforeOrder = before.map(pluckId);
        var afterOrder = after.map(pluckId);

        // index of layer by id
        var beforeIndex = before.reduce(indexById, {});
        var afterIndex = after.reduce(indexById, {});

        // track order of layers as if they have been mutated
        var tracker = beforeOrder.slice();

        // layers that have been added do not need to be diffed
        var clean = Object.create(null);

        var i, d, layerId, beforeLayer, afterLayer, insertBeforeLayerId, prop;

        // remove layers
        for (i = 0, d = 0; i < beforeOrder.length; i++) {
            layerId = beforeOrder[i];
            if (!afterIndex.hasOwnProperty(layerId)) {
                commands.push({ command: operations.removeLayer, args: [layerId] });
                tracker.splice(tracker.indexOf(layerId, d), 1);
            } else {
                // limit where in tracker we need to look for a match
                d++;
            }
        }

        // add/reorder layers
        for (i = 0, d = 0; i < afterOrder.length; i++) {
            // work backwards as insert is before an existing layer
            layerId = afterOrder[afterOrder.length - 1 - i];

            if (tracker[tracker.length - 1 - i] === layerId) { continue; }

            if (beforeIndex.hasOwnProperty(layerId)) {
                // remove the layer before we insert at the correct position
                commands.push({ command: operations.removeLayer, args: [layerId] });
                tracker.splice(tracker.lastIndexOf(layerId, tracker.length - d), 1);
            } else {
                // limit where in tracker we need to look for a match
                d++;
            }

            // add layer at correct position
            insertBeforeLayerId = tracker[tracker.length - i];
            commands.push({ command: operations.addLayer, args: [afterIndex[layerId], insertBeforeLayerId] });
            tracker.splice(tracker.length - i, 0, layerId);
            clean[layerId] = true;
        }

        // update layers
        for (i = 0; i < afterOrder.length; i++) {
            layerId = afterOrder[i];
            beforeLayer = beforeIndex[layerId];
            afterLayer = afterIndex[layerId];

            // no need to update if previously added (new or moved)
            if (clean[layerId] || deepEqual(beforeLayer, afterLayer)) { continue; }

            // If source, source-layer, or type have changes, then remove the layer
            // and add it back 'from scratch'.
            if (!deepEqual(beforeLayer.source, afterLayer.source) || !deepEqual(beforeLayer['source-layer'], afterLayer['source-layer']) || !deepEqual(beforeLayer.type, afterLayer.type)) {
                commands.push({ command: operations.removeLayer, args: [layerId] });
                // we add the layer back at the same position it was already in, so
                // there's no need to update the `tracker`
                insertBeforeLayerId = tracker[tracker.lastIndexOf(layerId) + 1];
                commands.push({ command: operations.addLayer, args: [afterLayer, insertBeforeLayerId] });
                continue;
            }

            // layout, paint, filter, minzoom, maxzoom
            diffLayerPropertyChanges(beforeLayer.layout, afterLayer.layout, commands, layerId, null, operations.setLayoutProperty);
            diffLayerPropertyChanges(beforeLayer.paint, afterLayer.paint, commands, layerId, null, operations.setPaintProperty);
            if (!deepEqual(beforeLayer.filter, afterLayer.filter)) {
                commands.push({ command: operations.setFilter, args: [layerId, afterLayer.filter] });
            }
            if (!deepEqual(beforeLayer.minzoom, afterLayer.minzoom) || !deepEqual(beforeLayer.maxzoom, afterLayer.maxzoom)) {
                commands.push({ command: operations.setLayerZoomRange, args: [layerId, afterLayer.minzoom, afterLayer.maxzoom] });
            }

            // handle all other layer props, including paint.*
            for (prop in beforeLayer) {
                if (!beforeLayer.hasOwnProperty(prop)) { continue; }
                if (prop === 'layout' || prop === 'paint' || prop === 'filter' ||
                    prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom') { continue; }
                if (prop.indexOf('paint.') === 0) {
                    diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
                } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                    commands.push({ command: operations.setLayerProperty, args: [layerId, prop, afterLayer[prop]] });
                }
            }
            for (prop in afterLayer) {
                if (!afterLayer.hasOwnProperty(prop) || beforeLayer.hasOwnProperty(prop)) { continue; }
                if (prop === 'layout' || prop === 'paint' || prop === 'filter' ||
                    prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom') { continue; }
                if (prop.indexOf('paint.') === 0) {
                    diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
                } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                    commands.push({ command: operations.setLayerProperty, args: [layerId, prop, afterLayer[prop]] });
                }
            }
        }
    }

    /**
     * Diff two stylesheet
     *
     * Creates semanticly aware diffs that can easily be applied at runtime.
     * Operations produced by the diff closely resemble the mapbox-gl-js API. Any
     * error creating the diff will fall back to the 'setStyle' operation.
     *
     * Example diff:
     * [
     *     { command: 'setConstant', args: ['@water', '#0000FF'] },
     *     { command: 'setPaintProperty', args: ['background', 'background-color', 'black'] }
     * ]
     *
     * @private
     * @param {*} [before] stylesheet to compare from
     * @param {*} after stylesheet to compare to
     * @returns Array list of changes
     */
    function diffStyles(before, after) {
        if (!before) { return [{ command: operations.setStyle, args: [after] }]; }

        var commands = [];

        try {
            // Handle changes to top-level properties
            if (!deepEqual(before.version, after.version)) {
                return [{ command: operations.setStyle, args: [after] }];
            }
            if (!deepEqual(before.center, after.center)) {
                commands.push({ command: operations.setCenter, args: [after.center] });
            }
            if (!deepEqual(before.zoom, after.zoom)) {
                commands.push({ command: operations.setZoom, args: [after.zoom] });
            }
            if (!deepEqual(before.bearing, after.bearing)) {
                commands.push({ command: operations.setBearing, args: [after.bearing] });
            }
            if (!deepEqual(before.pitch, after.pitch)) {
                commands.push({ command: operations.setPitch, args: [after.pitch] });
            }
            if (!deepEqual(before.sprite, after.sprite)) {
                commands.push({ command: operations.setSprite, args: [after.sprite] });
            }
            if (!deepEqual(before.glyphs, after.glyphs)) {
                commands.push({ command: operations.setGlyphs, args: [after.glyphs] });
            }
            if (!deepEqual(before.transition, after.transition)) {
                commands.push({ command: operations.setTransition, args: [after.transition] });
            }
            if (!deepEqual(before.light, after.light)) {
                commands.push({ command: operations.setLight, args: [after.light] });
            }

            // Handle changes to `sources`
            // If a source is to be removed, we also--before the removeSource
            // command--need to remove all the style layers that depend on it.
            var sourcesRemoved = {};

            // First collect the {add,remove}Source commands
            var removeOrAddSourceCommands = [];
            diffSources(before.sources, after.sources, removeOrAddSourceCommands, sourcesRemoved);

            // Push a removeLayer command for each style layer that depends on a
            // source that's being removed.
            // Also, exclude any such layers them from the input to `diffLayers`
            // below, so that diffLayers produces the appropriate `addLayers`
            // command
            var beforeLayers = [];
            if (before.layers) {
                before.layers.forEach(function (layer) {
                    if (sourcesRemoved[layer.source]) {
                        commands.push({ command: operations.removeLayer, args: [layer.id] });
                    } else {
                        beforeLayers.push(layer);
                    }
                });
            }
            commands = commands.concat(removeOrAddSourceCommands);

            // Handle changes to `layers`
            diffLayers(beforeLayers, after.layers, commands);

        } catch (e) {
            // fall back to setStyle
            console.warn('Unable to compute style diff:', e);
            commands = [{ command: operations.setStyle, args: [after] }];
        }

        return commands;
    }

    function ValidationError(key, value, message) {
        this.message = (key ? (key + ": ") : '') + message;

        if (value !== null && value !== undefined && value.__line__) {
            this.line = value.__line__;
        }
    }

    function ParsingError(error) {
        this.error = error;
        this.message = error.message;
        var match = error.message.match(/line (\d+)/);
        this.line = match ? parseInt(match[1], 10) : 0;
    }

    var isBufferBrowser = function isBuffer(arg) {
      return arg && typeof arg === 'object'
        && typeof arg.copy === 'function'
        && typeof arg.fill === 'function'
        && typeof arg.readUInt8 === 'function';
    };

    var inherits_browser = createCommonjsModule(function (module) {
    if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        export default function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
    } else {
        // old school shim for old browsers
        export default function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
    }
    });

    var util$1 = createCommonjsModule(function (module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var formatRegExp = /%[sdj%]/g;

        export const format = function(f) {
          var arguments$1 = arguments;

          if (!isString(f)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments$1[i]));
            }
            return objects.join(' ');
          }

          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f).replace(formatRegExp, function(x) {
            if (x === '%%') { return '%'; }
            if (i >= len) { return x; }
            switch (x) {
              case '%s': return String(args[i++]);
              case '%d': return Number(args[i++]);
              case '%j':
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return '[Circular]';
                }
              default:
                return x;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += ' ' + x;
            } else {
              str += ' ' + inspect(x);
            }
          }
          return str;
        };

        // Mark that a method should not be used.
        // Returns a modified function which warns once by default.
        // If --no-deprecation is set, then it is a no-op.
        export const deprecate = function(fn, msg) {
          // Allow for deprecating things in the process of starting up.
          if (isUndefined(commonjsGlobal.process)) {
            return function() {
              return deprecate(fn, msg).apply(this, arguments);
            };
          }

          if (process.noDeprecation === true) {
            return fn;
          }

          var warned = false;
          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }

          return deprecated;
        };


        var debugs = {};
        var debugEnviron;

        export const debuglog = function(set) {
          if (isUndefined(debugEnviron))
            { debugEnviron = process.env.NODE_DEBUG || ''; }
          set = set.toUpperCase();
          if (!debugs[set]) {
            if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
              var pid = process.pid;
              debugs[set] = function() {
                var msg = exports.format.apply(exports, arguments);
                console.error('%s %d: %s', set, pid, msg);
              };
            } else {
              debugs[set] = function() {};
            }
          }
          return debugs[set];
        };


        /**
         * Echos the value of a value. Trys to print the value out
         * in the best way possible given the different types.
         *
         * @param {Object} obj The object to print out.
         * @param {Object} opts Optional options object that alters the output.
         */
        /* legacy: obj, showHidden, depth, colors*/
        function inspect(obj, opts) {
          // default options
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          // legacy...
          if (arguments.length >= 3) { ctx.depth = arguments[2]; }
          if (arguments.length >= 4) { ctx.colors = arguments[3]; }
          if (isBoolean(opts)) {
            // legacy...
            ctx.showHidden = opts;
          } else if (opts) {
            // got an "options" object
            _extend(ctx, opts);
          }
          // set default options
          if (isUndefined(ctx.showHidden)) { ctx.showHidden = false; }
          if (isUndefined(ctx.depth)) { ctx.depth = 2; }
          if (isUndefined(ctx.colors)) { ctx.colors = false; }
          if (isUndefined(ctx.customInspect)) { ctx.customInspect = true; }
          if (ctx.colors) { ctx.stylize = stylizeWithColor; }
          return formatValue(ctx, obj, ctx.depth);
        }


        // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
        inspect.colors = {
          'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39]
        };

        // Don't use 'blue' not visible on cmd.exe
        inspect.styles = {
          'special': 'cyan',
          'number': 'yellow',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red'
        };


        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];

          if (style) {
            return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                   '\u001b[' + inspect.colors[style][1] + 'm';
          } else {
            return str;
          }
        }


        function stylizeNoColor(str, styleType) {
          return str;
        }


        function arrayToHash(array) {
          var hash = {};

          array.forEach(function(val, idx) {
            hash[val] = true;
          });

          return hash;
        }


        function formatValue(ctx, value, recurseTimes) {
          // Provide a hook for user-specified inspect functions.
          // Check that value is an object with an inspect function on it
          if (ctx.customInspect &&
              value &&
              isFunction(value.inspect) &&
              // Filter out the util module, it's inspect function is special
              value.inspect !== exports.inspect &&
              // Also filter out any prototype objects using the circular check.
              !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }

          // Primitive types cannot have properties
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }

          // Look up the keys of the object.
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);

          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }

          // IE doesn't make error fields non-enumerable
          // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
          if (isError(value)
              && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
            return formatError(value);
          }

          // Some type of object without properties can be shortcutted.
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ': ' + value.name : '';
              return ctx.stylize('[Function' + name + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }

          var base = '', array = false, braces = ['{', '}'];

          // Make Array say that they are Array
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }

          // Make functions say that they are functions
          if (isFunction(value)) {
            var n = value.name ? ': ' + value.name : '';
            base = ' [Function' + n + ']';
          }

          // Make RegExps say that they are RegExps
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }

          // Make dates with properties first say the date
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }

          // Make error with message first say the error
          if (isError(value)) {
            base = ' ' + formatError(value);
          }

          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }

          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            } else {
              return ctx.stylize('[Object]', 'special');
            }
          }

          ctx.seen.push(value);

          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function(key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }

          ctx.seen.pop();

          return reduceToSingleString(output, base, braces);
        }


        function formatPrimitive(ctx, value) {
          if (isUndefined(value))
            { return ctx.stylize('undefined', 'undefined'); }
          if (isString(value)) {
            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                     .replace(/'/g, "\\'")
                                                     .replace(/\\"/g, '"') + '\'';
            return ctx.stylize(simple, 'string');
          }
          if (isNumber(value))
            { return ctx.stylize('' + value, 'number'); }
          if (isBoolean(value))
            { return ctx.stylize('' + value, 'boolean'); }
          // For some reason typeof null is "object", so special case here.
          if (isNull(value))
            { return ctx.stylize('null', 'null'); }
        }


        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }


        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                  String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                  key, true));
            }
          });
          return output;
        }


        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize('[Getter/Setter]', 'special');
            } else {
              str = ctx.stylize('[Getter]', 'special');
            }
          } else {
            if (desc.set) {
              str = ctx.stylize('[Setter]', 'special');
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function(line) {
                    return '  ' + line;
                  }).join('\n').substr(2);
                } else {
                  str = '\n' + str.split('\n').map(function(line) {
                    return '   ' + line;
                  }).join('\n');
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special');
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'")
                         .replace(/\\"/g, '"')
                         .replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }

          return name + ': ' + str;
        }


        function reduceToSingleString(output, base, braces) {
          var length = output.reduce(function(prev, cur) {
            if (cur.indexOf('\n') >= 0) { }
            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
          }, 0);

          if (length > 60) {
            return braces[0] +
                   (base === '' ? '' : base + '\n ') +
                   ' ' +
                   output.join(',\n  ') +
                   ' ' +
                   braces[1];
          }

          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }


        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.
        function isArray(ar) {
          return Array.isArray(ar);
        }

        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }

        function isNull(arg) {
          return arg === null;
        }

        function isNullOrUndefined(arg) {
          return arg == null;
        }

        function isNumber(arg) {
          return typeof arg === 'number';
        }

        function isString(arg) {
          return typeof arg === 'string';
        }

        function isSymbol(arg) {
          return typeof arg === 'symbol';
        }

        function isUndefined(arg) {
          return arg === void 0;
        }

        function isRegExp(re) {
          return isObject(re) && objectToString(re) === '[object RegExp]';
        }

        function isObject(arg) {
          return typeof arg === 'object' && arg !== null;
        }

        function isDate(d) {
          return isObject(d) && objectToString(d) === '[object Date]';
        }

        function isError(e) {
          return isObject(e) &&
              (objectToString(e) === '[object Error]' || e instanceof Error);
        }

        function isFunction(arg) {
          return typeof arg === 'function';
        }

        function isPrimitive(arg) {
          return arg === null ||
                 typeof arg === 'boolean' ||
                 typeof arg === 'number' ||
                 typeof arg === 'string' ||
                 typeof arg === 'symbol' ||  // ES6 symbol
                 typeof arg === 'undefined';
        }
        export const isBuffer = isBufferBrowser;

        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }


        function pad(n) {
          return n < 10 ? '0' + n.toString(10) : n.toString(10);
        }


        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                      'Oct', 'Nov', 'Dec'];

        // 26 Feb 16:19:34
        function timestamp() {
          var d = new Date();
          var time = [pad(d.getHours()),
                      pad(d.getMinutes()),
                      pad(d.getSeconds())].join(':');
          return [d.getDate(), months[d.getMonth()], time].join(' ');
        }


        // log is just a thin wrapper to console.log that prepends a timestamp
        export const log = function() {
          console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
        };

        /**
         * Inherit the prototype methods from one constructor into another.
         *
         * The Function.prototype.inherits from lang.js rewritten as a standalone
         * function (not on Function.prototype). NOTE: If this file is to be loaded
         * during bootstrapping this function needs to be rewritten using some native
         * functions as prototype setup using normal JavaScript does not work as
         * expected during bootstrapping (see mirror.js in r114903).
         *
         * @param {function} ctor Constructor function which needs to inherit the
         *     prototype.
         * @param {function} superCtor Constructor function to inherit prototype from.
         */
        export const inherits = inherits_browser;

        export const _extend = function(origin, add) {
          // Don't do anything if add isn't an object
          if (!add || !isObject(add)) { return origin; }

          var keys = Object.keys(add);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add[keys[i]];
          }
          return origin;
        };

        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
    });
    var util_1$1 = util$1.format;
    var util_2$1 = util$1.deprecate;
    var util_3$1 = util$1.debuglog;
    var util_4$1 = util$1.inspect;
    var util_5 = util$1.isArray;
    var util_6 = util$1.isBoolean;
    var util_7 = util$1.isNull;
    var util_8 = util$1.isNullOrUndefined;
    var util_9 = util$1.isNumber;
    var util_10 = util$1.isString;
    var util_11 = util$1.isSymbol;
    var util_12 = util$1.isUndefined;
    var util_13 = util$1.isRegExp;
    var util_14 = util$1.isObject;
    var util_15 = util$1.isDate;
    var util_16 = util$1.isError;
    var util_17 = util$1.isFunction;
    var util_18 = util$1.isPrimitive;
    var util_19 = util$1.isBuffer;
    var util_20 = util$1.log;
    var util_21 = util$1.inherits;
    var util_22 = util$1._extend;

    var assert_1 = createCommonjsModule(function (module) {
        // compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
        // original notice:

        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
         * @license  MIT
         */
        function compare(a, b) {
          if (a === b) {
            return 0;
          }

          var x = a.length;
          var y = b.length;

          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }

          if (x < y) {
            return -1;
          }
          if (y < x) {
            return 1;
          }
          return 0;
        }
        function isBuffer(b) {
          if (commonjsGlobal.Buffer && typeof commonjsGlobal.Buffer.isBuffer === 'function') {
            return commonjsGlobal.Buffer.isBuffer(b);
          }
          return !!(b != null && b._isBuffer);
        }

        // based on node assert, original notice:

        // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
        //
        // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
        //
        // Originally from narwhal.js (http://narwhaljs.org)
        // Copyright (c) 2009 Thomas Robinson <280north.com>
        //
        // Permission is hereby granted, free of charge, to any person obtaining a copy
        // of this software and associated documentation files (the 'Software'), to
        // deal in the Software without restriction, including without limitation the
        // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        // sell copies of the Software, and to permit persons to whom the Software is
        // furnished to do so, subject to the following conditions:
        //
        // The above copyright notice and this permission notice shall be included in
        // all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
        // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
        // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


        var hasOwn = Object.prototype.hasOwnProperty;
        var pSlice = Array.prototype.slice;
        var functionsHaveNames = (function () {
          return function foo() {}.name === 'foo';
        }());
        function pToString (obj) {
          return Object.prototype.toString.call(obj);
        }
        function isView(arrbuf) {
          if (isBuffer(arrbuf)) {
            return false;
          }
          if (typeof commonjsGlobal.ArrayBuffer !== 'function') {
            return false;
          }
          if (typeof ArrayBuffer.isView === 'function') {
            return ArrayBuffer.isView(arrbuf);
          }
          if (!arrbuf) {
            return false;
          }
          if (arrbuf instanceof DataView) {
            return true;
          }
          if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
            return true;
          }
          return false;
        }
        // 1. The assert module provides functions that throw
        // AssertionError's when particular conditions are not met. The
        // assert module must conform to the following interface.

        var assert = ok;

        export default assert;

        // 2. The AssertionError is defined in assert.
        // new assert.AssertionError({ message: message,
        //                             actual: actual,
        //                             expected: expected })

        var regex = /\s*function\s+([^\(\s]*)\s*/;
        // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
        function getName(func) {
          if (!util$1.isFunction(func)) {
            return;
          }
          if (functionsHaveNames) {
            return func.name;
          }
          var str = func.toString();
          var match = str.match(regex);
          return match && match[1];
        }
        assert.AssertionError = function AssertionError(options) {
          this.name = 'AssertionError';
          this.actual = options.actual;
          this.expected = options.expected;
          this.operator = options.operator;
          if (options.message) {
            this.message = options.message;
            this.generatedMessage = false;
          } else {
            this.message = getMessage(this);
            this.generatedMessage = true;
          }
          var stackStartFunction = options.stackStartFunction || fail;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, stackStartFunction);
          } else {
            // non v8 browsers so we can have a stacktrace
            var err = new Error();
            if (err.stack) {
              var out = err.stack;

              // try to strip useless frames
              var fn_name = getName(stackStartFunction);
              var idx = out.indexOf('\n' + fn_name);
              if (idx >= 0) {
                // once we have located the function frame
                // we need to strip out everything before it (and its line)
                var next_line = out.indexOf('\n', idx + 1);
                out = out.substring(next_line + 1);
              }

              this.stack = out;
            }
          }
        };

        // assert.AssertionError instanceof Error
        util$1.inherits(assert.AssertionError, Error);

        function truncate(s, n) {
          if (typeof s === 'string') {
            return s.length < n ? s : s.slice(0, n);
          } else {
            return s;
          }
        }
        function inspect(something) {
          if (functionsHaveNames || !util$1.isFunction(something)) {
            return util$1.inspect(something);
          }
          var rawname = getName(something);
          var name = rawname ? ': ' + rawname : '';
          return '[Function' +  name + ']';
        }
        function getMessage(self) {
          return truncate(inspect(self.actual), 128) + ' ' +
                 self.operator + ' ' +
                 truncate(inspect(self.expected), 128);
        }

        // At present only the three keys mentioned above are used and
        // understood by the spec. Implementations or sub modules can pass
        // other keys to the AssertionError's constructor - they will be
        // ignored.

        // 3. All of the following functions must throw an AssertionError
        // when a corresponding condition is not met, with a message that
        // may be undefined if not provided.  All assertion methods provide
        // both the actual and expected values to the assertion error for
        // display purposes.

        function fail(actual, expected, message, operator, stackStartFunction) {
          throw new assert.AssertionError({
            message: message,
            actual: actual,
            expected: expected,
            operator: operator,
            stackStartFunction: stackStartFunction
          });
        }

        // EXTENSION! allows for well behaved errors defined elsewhere.
        assert.fail = fail;

        // 4. Pure assertion tests whether a value is truthy, as determined
        // by !!guard.
        // assert.ok(guard, message_opt);
        // This statement is equivalent to assert.equal(true, !!guard,
        // message_opt);. To test strictly for the value true, use
        // assert.strictEqual(true, guard, message_opt);.

        function ok(value, message) {
          if (!value) { fail(value, true, message, '==', assert.ok); }
        }
        assert.ok = ok;

        // 5. The equality assertion tests shallow, coercive equality with
        // ==.
        // assert.equal(actual, expected, message_opt);

        assert.equal = function equal(actual, expected, message) {
          if (actual != expected) { fail(actual, expected, message, '==', assert.equal); }
        };

        // 6. The non-equality assertion tests for whether two objects are not equal
        // with != assert.notEqual(actual, expected, message_opt);

        assert.notEqual = function notEqual(actual, expected, message) {
          if (actual == expected) {
            fail(actual, expected, message, '!=', assert.notEqual);
          }
        };

        // 7. The equivalence assertion tests a deep equality relation.
        // assert.deepEqual(actual, expected, message_opt);

        assert.deepEqual = function deepEqual(actual, expected, message) {
          if (!_deepEqual(actual, expected, false)) {
            fail(actual, expected, message, 'deepEqual', assert.deepEqual);
          }
        };

        assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
          if (!_deepEqual(actual, expected, true)) {
            fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
          }
        };

        function _deepEqual(actual, expected, strict, memos) {
          // 7.1. All identical values are equivalent, as determined by ===.
          if (actual === expected) {
            return true;
          } else if (isBuffer(actual) && isBuffer(expected)) {
            return compare(actual, expected) === 0;

          // 7.2. If the expected value is a Date object, the actual value is
          // equivalent if it is also a Date object that refers to the same time.
          } else if (util$1.isDate(actual) && util$1.isDate(expected)) {
            return actual.getTime() === expected.getTime();

          // 7.3 If the expected value is a RegExp object, the actual value is
          // equivalent if it is also a RegExp object with the same source and
          // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
          } else if (util$1.isRegExp(actual) && util$1.isRegExp(expected)) {
            return actual.source === expected.source &&
                   actual.global === expected.global &&
                   actual.multiline === expected.multiline &&
                   actual.lastIndex === expected.lastIndex &&
                   actual.ignoreCase === expected.ignoreCase;

          // 7.4. Other pairs that do not both pass typeof value == 'object',
          // equivalence is determined by ==.
          } else if ((actual === null || typeof actual !== 'object') &&
                     (expected === null || typeof expected !== 'object')) {
            return strict ? actual === expected : actual == expected;

          // If both values are instances of typed arrays, wrap their underlying
          // ArrayBuffers in a Buffer each to increase performance
          // This optimization requires the arrays to have the same type as checked by
          // Object.prototype.toString (aka pToString). Never perform binary
          // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
          // bit patterns are not identical.
          } else if (isView(actual) && isView(expected) &&
                     pToString(actual) === pToString(expected) &&
                     !(actual instanceof Float32Array ||
                       actual instanceof Float64Array)) {
            return compare(new Uint8Array(actual.buffer),
                           new Uint8Array(expected.buffer)) === 0;

          // 7.5 For all other Object pairs, including Array objects, equivalence is
          // determined by having the same number of owned properties (as verified
          // with Object.prototype.hasOwnProperty.call), the same set of keys
          // (although not necessarily the same order), equivalent values for every
          // corresponding key, and an identical 'prototype' property. Note: this
          // accounts for both named and indexed properties on Arrays.
          } else if (isBuffer(actual) !== isBuffer(expected)) {
            return false;
          } else {
            memos = memos || {actual: [], expected: []};

            var actualIndex = memos.actual.indexOf(actual);
            if (actualIndex !== -1) {
              if (actualIndex === memos.expected.indexOf(expected)) {
                return true;
              }
            }

            memos.actual.push(actual);
            memos.expected.push(expected);

            return objEquiv(actual, expected, strict, memos);
          }
        }

        function isArguments(object) {
          return Object.prototype.toString.call(object) == '[object Arguments]';
        }

        function objEquiv(a, b, strict, actualVisitedObjects) {
          if (a === null || a === undefined || b === null || b === undefined)
            { return false; }
          // if one is a primitive, the other must be same
          if (util$1.isPrimitive(a) || util$1.isPrimitive(b))
            { return a === b; }
          if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            { return false; }
          var aIsArgs = isArguments(a);
          var bIsArgs = isArguments(b);
          if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
            { return false; }
          if (aIsArgs) {
            a = pSlice.call(a);
            b = pSlice.call(b);
            return _deepEqual(a, b, strict);
          }
          var ka = objectKeys(a);
          var kb = objectKeys(b);
          var key, i;
          // having the same number of owned properties (keys incorporates
          // hasOwnProperty)
          if (ka.length !== kb.length)
            { return false; }
          //the same set of keys (although not necessarily the same order),
          ka.sort();
          kb.sort();
          //~~~cheap key test
          for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] !== kb[i])
              { return false; }
          }
          //equivalent values for every corresponding key, and
          //~~~possibly expensive deep test
          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
              { return false; }
          }
          return true;
        }

        // 8. The non-equivalence assertion tests for any deep inequality.
        // assert.notDeepEqual(actual, expected, message_opt);

        assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
          if (_deepEqual(actual, expected, false)) {
            fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
          }
        };

        assert.notDeepStrictEqual = notDeepStrictEqual;
        function notDeepStrictEqual(actual, expected, message) {
          if (_deepEqual(actual, expected, true)) {
            fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
          }
        }


        // 9. The strict equality assertion tests strict equality, as determined by ===.
        // assert.strictEqual(actual, expected, message_opt);

        assert.strictEqual = function strictEqual(actual, expected, message) {
          if (actual !== expected) {
            fail(actual, expected, message, '===', assert.strictEqual);
          }
        };

        // 10. The strict non-equality assertion tests for strict inequality, as
        // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

        assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
          if (actual === expected) {
            fail(actual, expected, message, '!==', assert.notStrictEqual);
          }
        };

        function expectedException(actual, expected) {
          if (!actual || !expected) {
            return false;
          }

          if (Object.prototype.toString.call(expected) == '[object RegExp]') {
            return expected.test(actual);
          }

          try {
            if (actual instanceof expected) {
              return true;
            }
          } catch (e) {
            // Ignore.  The instanceof check doesn't work for arrow functions.
          }

          if (Error.isPrototypeOf(expected)) {
            return false;
          }

          return expected.call({}, actual) === true;
        }

        function _tryBlock(block) {
          var error;
          try {
            block();
          } catch (e) {
            error = e;
          }
          return error;
        }

        function _throws(shouldThrow, block, expected, message) {
          var actual;

          if (typeof block !== 'function') {
            throw new TypeError('"block" argument must be a function');
          }

          if (typeof expected === 'string') {
            message = expected;
            expected = null;
          }

          actual = _tryBlock(block);

          message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
                    (message ? ' ' + message : '.');

          if (shouldThrow && !actual) {
            fail(actual, expected, 'Missing expected exception' + message);
          }

          var userProvidedMessage = typeof message === 'string';
          var isUnwantedException = !shouldThrow && util$1.isError(actual);
          var isUnexpectedException = !shouldThrow && actual && !expected;

          if ((isUnwantedException &&
              userProvidedMessage &&
              expectedException(actual, expected)) ||
              isUnexpectedException) {
            fail(actual, expected, 'Got unwanted exception' + message);
          }

          if ((shouldThrow && actual && expected &&
              !expectedException(actual, expected)) || (!shouldThrow && actual)) {
            throw actual;
          }
        }

        // 11. Expected to throw an error:
        // assert.throws(block, Error_opt, message_opt);

        assert.throws = function(block, /*optional*/error, /*optional*/message) {
          _throws(true, block, error, message);
        };

        // EXTENSION! This is annoying to write outside this module.
        assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
          _throws(false, block, error, message);
        };

        assert.ifError = function(err) { if (err) { throw err; } };

        var objectKeys = Object.keys || function (obj) {
          var keys = [];
          for (var key in obj) {
            if (hasOwn.call(obj, key)) { keys.push(key); }
          }
          return keys;
        };
    });

    function extend (output) {
        var inputs = [], len = arguments.length - 1;
        while ( len-- > 0 ) inputs[ len ] = arguments[ len + 1 ];

        for (var i = 0, list = inputs; i < list.length; i += 1) {
            var input = list[i];

            for (var k in input) {
                output[k] = input[k];
            }
        }
        return output;
    }

    //      

    var ParsingError$1 = (function (Error) {
        function ParsingError(key        , message        ) {
            Error.call(this, message);
            this.message = message;
            this.key = key;
        }

        if ( Error ) ParsingError.__proto__ = Error;
        ParsingError.prototype = Object.create( Error && Error.prototype );
        ParsingError.prototype.constructor = ParsingError;

        return ParsingError;
    }(Error));

    //      



    /**
     * Tracks `let` bindings during expression parsing.
     * @private
     */
    var Scope = function Scope(parent    , bindings) {
        var this$1 = this;
        if ( bindings === void 0 ) bindings                          = [];

        this.parent = parent;
        this.bindings = {};
        for (var i = 0, list = bindings; i < list.length; i += 1) {
            var ref = list[i];
            var name = ref[0];
            var expression = ref[1];

            this$1.bindings[name] = expression;
        }
    };

    Scope.prototype.concat = function concat (bindings                         ) {
        return new Scope(this, bindings);
    };

    Scope.prototype.get = function get (name    )         {
        if (this.bindings[name]) { return this.bindings[name]; }
        if (this.parent) { return this.parent.get(name); }
        throw new Error((name + " not found in scope."));
    };

    Scope.prototype.has = function has (name    )      {
        if (this.bindings[name]) { return true; }
        return this.parent ? this.parent.has(name) : false;
    };

    //      



























    var NullType = { kind: 'null' };
    var NumberType = { kind: 'number' };
    var StringType = { kind: 'string' };
    var BooleanType = { kind: 'boolean' };
    var ColorType = { kind: 'color' };
    var ObjectType = { kind: 'object' };
    var ValueType = { kind: 'value' };
    var ErrorType = { kind: 'error' };

    function array(itemType      , N         )            {
        return {
            kind: 'array',
            itemType: itemType,
            N: N
        };
    }

    function toString(type      )         {
        if (type.kind === 'array') {
            var itemType = toString(type.itemType);
            return typeof type.N === 'number' ?
                ("array<" + itemType + ", " + (type.N) + ">") :
                type.itemType.kind === 'value' ? 'array' : ("array<" + itemType + ">");
        } else {
            return type.kind;
        }
    }

    var valueMemberTypes = [
        NullType,
        NumberType,
        StringType,
        BooleanType,
        ColorType,
        ObjectType,
        array(ValueType)
    ];

    /**
     * Returns null if `t` is a subtype of `expected`; otherwise returns an
     * error message.
     * @private
     */
    function checkSubtype(expected      , t      )          {
        if (t.kind === 'error') {
            // Error is a subtype of every type
            return null;
        } else if (expected.kind === 'array') {
            if (t.kind === 'array' &&
                !checkSubtype(expected.itemType, t.itemType) &&
                (typeof expected.N !== 'number' || expected.N === t.N)) {
                return null;
            }
        } else if (expected.kind === t.kind) {
            return null;
        } else if (expected.kind === 'value') {
            for (var i = 0, list = valueMemberTypes; i < list.length; i += 1) {
                var memberType = list[i];

                if (!checkSubtype(memberType, t)) {
                    return null;
                }
            }
        }

        return ("Expected " + (toString(expected)) + " but found " + (toString(t)) + " instead.");
    }

    var csscolorparser = createCommonjsModule(function (module, exports) {
    // (c) Dean McNamee <dean@gmail.com>, 2012.
    //
    // https://github.com/deanm/css-color-parser-js
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to
    // deal in the Software without restriction, including without limitation the
    // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    // sell copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    // FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    // IN THE SOFTWARE.

    // http://www.w3.org/TR/css3-color/
    var kCSSColorTable = {
      "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
      "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
      "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
      "beige": [245,245,220,1], "bisque": [255,228,196,1],
      "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
      "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
      "brown": [165,42,42,1], "burlywood": [222,184,135,1],
      "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
      "chocolate": [210,105,30,1], "coral": [255,127,80,1],
      "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
      "crimson": [220,20,60,1], "cyan": [0,255,255,1],
      "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
      "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
      "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
      "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
      "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
      "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
      "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
      "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
      "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
      "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
      "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
      "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
      "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
      "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
      "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
      "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
      "gray": [128,128,128,1], "green": [0,128,0,1],
      "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
      "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
      "indianred": [205,92,92,1], "indigo": [75,0,130,1],
      "ivory": [255,255,240,1], "khaki": [240,230,140,1],
      "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
      "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
      "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
      "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
      "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
      "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
      "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
      "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
      "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
      "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
      "limegreen": [50,205,50,1], "linen": [250,240,230,1],
      "magenta": [255,0,255,1], "maroon": [128,0,0,1],
      "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
      "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
      "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
      "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
      "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
      "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
      "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
      "navy": [0,0,128,1], "oldlace": [253,245,230,1],
      "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
      "orange": [255,165,0,1], "orangered": [255,69,0,1],
      "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
      "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
      "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
      "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
      "pink": [255,192,203,1], "plum": [221,160,221,1],
      "powderblue": [176,224,230,1], "purple": [128,0,128,1],
      "rebeccapurple": [102,51,153,1],
      "red": [255,0,0,1], "rosybrown": [188,143,143,1],
      "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
      "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
      "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
      "sienna": [160,82,45,1], "silver": [192,192,192,1],
      "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
      "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
      "snow": [255,250,250,1], "springgreen": [0,255,127,1],
      "steelblue": [70,130,180,1], "tan": [210,180,140,1],
      "teal": [0,128,128,1], "thistle": [216,191,216,1],
      "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
      "violet": [238,130,238,1], "wheat": [245,222,179,1],
      "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
      "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]};

    function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
      i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
      return i < 0 ? 0 : i > 255 ? 255 : i;
    }

    function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
      return f < 0 ? 0 : f > 1 ? 1 : f;
    }

    function parse_css_int(str) {  // int or percentage.
      if (str[str.length - 1] === '%')
        { return clamp_css_byte(parseFloat(str) / 100 * 255); }
      return clamp_css_byte(parseInt(str));
    }

    function parse_css_float(str) {  // float or percentage.
      if (str[str.length - 1] === '%')
        { return clamp_css_float(parseFloat(str) / 100); }
      return clamp_css_float(parseFloat(str));
    }

    function css_hue_to_rgb(m1, m2, h) {
      if (h < 0) { h += 1; }
      else if (h > 1) { h -= 1; }

      if (h * 6 < 1) { return m1 + (m2 - m1) * h * 6; }
      if (h * 2 < 1) { return m2; }
      if (h * 3 < 2) { return m1 + (m2 - m1) * (2/3 - h) * 6; }
      return m1;
    }

    function parseCSSColor(css_str) {
      // Remove all whitespace, not compliant, but should just be more accepting.
      var str = css_str.replace(/ /g, '').toLowerCase();

      // Color keywords (and transparent) lookup.
      if (str in kCSSColorTable) { return kCSSColorTable[str].slice(); }  // dup.

      // #abc and #abc123 syntax.
      if (str[0] === '#') {
        if (str.length === 4) {
          var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
          if (!(iv >= 0 && iv <= 0xfff)) { return null; }  // Covers NaN.
          return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                  (iv & 0xf0) | ((iv & 0xf0) >> 4),
                  (iv & 0xf) | ((iv & 0xf) << 4),
                  1];
        } else if (str.length === 7) {
          var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
          if (!(iv >= 0 && iv <= 0xffffff)) { return null; }  // Covers NaN.
          return [(iv & 0xff0000) >> 16,
                  (iv & 0xff00) >> 8,
                  iv & 0xff,
                  1];
        }

        return null;
      }

      var op = str.indexOf('('), ep = str.indexOf(')');
      if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op+1, ep-(op+1)).split(',');
        var alpha = 1;  // To allow case fallthrough.
        switch (fname) {
          case 'rgba':
            if (params.length !== 4) { return null; }
            alpha = parse_css_float(params.pop());
            // Fall through.
          case 'rgb':
            if (params.length !== 3) { return null; }
            return [parse_css_int(params[0]),
                    parse_css_int(params[1]),
                    parse_css_int(params[2]),
                    alpha];
          case 'hsla':
            if (params.length !== 4) { return null; }
            alpha = parse_css_float(params.pop());
            // Fall through.
          case 'hsl':
            if (params.length !== 3) { return null; }
            var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
            // NOTE(deanm): According to the CSS spec s/l should only be
            // percentages, but we don't bother and let float or percentage.
            var s = parse_css_float(params[1]);
            var l = parse_css_float(params[2]);
            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            var m1 = l * 2 - m2;
            return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
                    clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
                    clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
                    alpha];
          default:
            return null;
        }
      }

      return null;
    }

    try {} catch(e) { }
    });
    var csscolorparser_1 = csscolorparser.parseCSSColor;

    //      

    /**
     * An RGBA color value. Create instances from color strings using the static
     * method `Color.parse`. The constructor accepts RGB channel values in the range
     * `[0, 1]`, premultiplied by A.
     *
     * @param {number} r The red channel.
     * @param {number} g The green channel.
     * @param {number} b The blue channel.
     * @param {number} a The alpha channel.
     * @private
     */
    var Color = function Color(r    , g    , b    , a) {
        if ( a === void 0 ) a     = 1;

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };





    /**
     * Parses valid CSS color strings and returns a `Color` instance.
     * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
     */
    Color.parse = function parse (input     )           {
        if (!input) {
            return undefined;
        }

        if (input instanceof Color) {
            return input;
        }

        if (typeof input !== 'string') {
            return undefined;
        }

        var rgba = csscolorparser_1(input);
        if (!rgba) {
            return undefined;
        }

        return new Color(
            rgba[0] / 255 * rgba[3],
            rgba[1] / 255 * rgba[3],
            rgba[2] / 255 * rgba[3],
            rgba[3]
        );
    };

    /**
     * Returns an RGBA string representing the color value.
     *
     * @returns An RGBA string.
     * @example
     * var purple = new Color.parse('purple');
     * purple.toString; // = "rgba(128,0,128,1)"
     * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
     * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
     */
    Color.prototype.toString = function toString ()     {
            var this$1 = this;

        var transformRgb = function (value    ) { return Math.round(value * 255 / this$1.a); };
        var rgb = [this.r, this.g, this.b].map(transformRgb);
        return ("rgba(" + (rgb.concat(this.a).join(',')) + ")");
    };

    Color.black = new Color(0, 0, 0, 1);
    Color.white = new Color(1, 1, 1, 1);
    Color.transparent = new Color(0, 0, 0, 0);

    //      



    function validateRGBA(r       , g       , b       , a        )          {
        if (!(
            typeof r === 'number' && r >= 0 && r <= 255 &&
            typeof g === 'number' && g >= 0 && g <= 255 &&
            typeof b === 'number' && b >= 0 && b <= 255
        )) {
            var value = typeof a === 'number' ? [r, g, b, a] : [r, g, b];
            return ("Invalid rgba value [" + (value.join(', ')) + "]: 'r', 'g', and 'b' must be between 0 and 255.");
        }

        if (!(
            typeof a === 'undefined' || (typeof a === 'number' && a >= 0 && a <= 1)
        )) {
            return ("Invalid rgba value [" + ([r, g, b, a].join(', ')) + "]: 'a' must be between 0 and 1.");
        }

        return null;
    }



    function isValue(mixed       )          {
        if (mixed === null) {
            return true;
        } else if (typeof mixed === 'string') {
            return true;
        } else if (typeof mixed === 'boolean') {
            return true;
        } else if (typeof mixed === 'number') {
            return true;
        } else if (mixed instanceof Color) {
            return true;
        } else if (Array.isArray(mixed)) {
            for (var i = 0, list = mixed; i < list.length; i += 1) {
                var item = list[i];

                if (!isValue(item)) {
                    return false;
                }
            }
            return true;
        } else if (typeof mixed === 'object') {
            for (var key in mixed) {
                if (!isValue(mixed[key])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    function typeOf(value       )       {
        if (value === null) {
            return NullType;
        } else if (typeof value === 'string') {
            return StringType;
        } else if (typeof value === 'boolean') {
            return BooleanType;
        } else if (typeof value === 'number') {
            return NumberType;
        } else if (value instanceof Color) {
            return ColorType;
        } else if (Array.isArray(value)) {
            var length = value.length;
            var itemType       ;

            for (var i = 0, list = value; i < list.length; i += 1) {
                var item = list[i];

                var t = typeOf(item);
                if (!itemType) {
                    itemType = t;
                } else if (itemType === t) {
                    continue;
                } else {
                    itemType = ValueType;
                    break;
                }
            }

            return array(itemType || ValueType, length);
        } else {
            assert_1(typeof value === 'object');
            return ObjectType;
        }
    }

    //      






    var Literal = function Literal(type  , value   ) {
        this.type = type;
        this.value = value;
    };

    Literal.parse = function parse (args          , context            ) {
        if (args.length !== 2)
            { return context.error(("'literal' expression requires exactly one argument, but found " + (args.length - 1) + " instead.")); }

        if (!isValue(args[1]))
            { return context.error("invalid value"); }

        var value = (args[1] );
        var type = typeOf(value);

        // special case: infer the item type if possible for zero-length arrays
        var expected = context.expectedType;
        if (
            type.kind === 'array' &&
            type.N === 0 &&
            expected &&
            expected.kind === 'array' &&
            (typeof expected.N !== 'number' || expected.N === 0)
        ) {
            type = expected;
        }

        return new Literal(type, value);
    };

    Literal.prototype.evaluate = function evaluate () {
        return this.value;
    };

    Literal.prototype.eachChild = function eachChild () {};

    Literal.prototype.possibleOutputs = function possibleOutputs () {
        return [this.value];
    };

    //      

    var RuntimeError = function RuntimeError(message    ) {
        this.name = 'ExpressionEvaluationError';
        this.message = message;
    };

    RuntimeError.prototype.toJSON = function toJSON () {
        return this.message;
    };

    //      






    var types = {
        string: StringType,
        number: NumberType,
        boolean: BooleanType,
        object: ObjectType
    };

    var Assertion = function Assertion(type  , args               ) {
        this.type = type;
        this.args = args;
    };

    Assertion.parse = function parse (args          , context            )          {
        if (args.length < 2)
            { return context.error("Expected at least one argument."); }

        var name     = (args[0] );
        assert_1(types[name], name);

        var type = types[name];

        var parsed = [];
        for (var i = 1; i < args.length; i++) {
            var input = context.parse(args[i], i, ValueType);
            if (!input) { return null; }
            parsed.push(input);
        }

        return new Assertion(type, parsed);
    };

    Assertion.prototype.evaluate = function evaluate (ctx               ) {
            var this$1 = this;

        for (var i = 0; i < this.args.length; i++) {
            var value = this$1.args[i].evaluate(ctx);
            var error = checkSubtype(this$1.type, typeOf(value));
            if (!error) {
                return value;
            } else if (i === this$1.args.length - 1) {
                throw new RuntimeError(("Expected value to be of type " + (toString(this$1.type)) + ", but found " + (toString(typeOf(value))) + " instead."));
            }
        }

        assert_1(false);
        return null;
    };

    Assertion.prototype.eachChild = function eachChild (fn                  ) {
        this.args.forEach(fn);
    };

    Assertion.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = []).concat.apply(ref, this.args.map(function (arg) { return arg.possibleOutputs(); }));
            var ref;
    };

    //      






    var types$1 = {
        string: StringType,
        number: NumberType,
        boolean: BooleanType
    };

    var ArrayAssertion = function ArrayAssertion(type       , input        ) {
        this.type = type;
        this.input = input;
    };

    ArrayAssertion.parse = function parse (args          , context            )          {
        if (args.length < 2 || args.length > 4)
            { return context.error(("Expected 1, 2, or 3 arguments, but found " + (args.length - 1) + " instead.")); }

        var itemType;
        var N;
        if (args.length > 2) {
            var type$1 = args[1];
            if (typeof type$1 !== 'string' || !(type$1 in types$1))
                { return context.error('The item type argument of "array" must be one of string, number, boolean', 1); }
            itemType = types$1[type$1];
        } else {
            itemType = ValueType;
        }

        if (args.length > 3) {
            if (
                typeof args[2] !== 'number' ||
                args[2] < 0 ||
                args[2] !== Math.floor(args[2])
            ) {
                return context.error('The length argument to "array" must be a positive integer literal', 2);
            }
            N = args[2];
        }

        var type = array(itemType, N);

        var input = context.parse(args[args.length - 1], args.length - 1, ValueType);
        if (!input) { return null; }

        return new ArrayAssertion(type, input);
    };

    ArrayAssertion.prototype.evaluate = function evaluate (ctx               ) {
        var value = this.input.evaluate(ctx);
        var error = checkSubtype(this.type, typeOf(value));
        if (error) {
            throw new RuntimeError(("Expected value to be of type " + (toString(this.type)) + ", but found " + (toString(typeOf(value))) + " instead."));
        }
        return value;
    };

    ArrayAssertion.prototype.eachChild = function eachChild (fn                  ) {
        fn(this.input);
    };

    ArrayAssertion.prototype.possibleOutputs = function possibleOutputs () {
        return this.input.possibleOutputs();
    };

    //      






    var types$2 = {
        'to-number': NumberType,
        'to-color': ColorType
    };

    /**
     * Special form for error-coalescing coercion expressions "to-number",
     * "to-color".  Since these coercions can fail at runtime, they accept multiple
     * arguments, only evaluating one at a time until one succeeds.
     *
     * @private
     */
    var Coercion = function Coercion(type  , args               ) {
        this.type = type;
        this.args = args;
    };

    Coercion.parse = function parse (args          , context            )          {
        if (args.length < 2)
            { return context.error("Expected at least one argument."); }

        var name     = (args[0] );
        assert_1(types$2[name], name);

        var type = types$2[name];

        var parsed = [];
        for (var i = 1; i < args.length; i++) {
            var input = context.parse(args[i], i, ValueType);
            if (!input) { return null; }
            parsed.push(input);
        }

        return new Coercion(type, parsed);
    };

    Coercion.prototype.evaluate = function evaluate (ctx               ) {
            var this$1 = this;

        if (this.type.kind === 'color') {
            var input;
            var error;
            for (var i = 0, list = this$1.args; i < list.length; i += 1) {
                var arg = list[i];

                    input = arg.evaluate(ctx);
                error = null;
                if (typeof input === 'string') {
                    var c = ctx.parseColor(input);
                    if (c) { return c; }
                } else if (Array.isArray(input)) {
                    if (input.length < 3 || input.length > 4) {
                        error = "Invalid rbga value " + (JSON.stringify(input)) + ": expected an array containing either three or four numeric values.";
                    } else {
                        error = validateRGBA(input[0], input[1], input[2], input[3]);
                    }
                    if (!error) {
                        return new Color((input[0] ) / 255, (input[1] ) / 255, (input[2] ) / 255, (input[3] ));
                    }
                }
            }
            throw new RuntimeError(error || ("Could not parse color from value '" + (typeof input === 'string' ? input : JSON.stringify(input)) + "'"));
        } else {
            var value = null;
            for (var i$1 = 0, list$1 = this$1.args; i$1 < list$1.length; i$1 += 1) {
                var arg$1 = list$1[i$1];

                    value = arg$1.evaluate(ctx);
                if (value === null) { continue; }
                var num = Number(value);
                if (isNaN(num)) { continue; }
                return num;
            }
            throw new RuntimeError(("Could not convert " + (JSON.stringify(value)) + " to number."));
        }
    };

    Coercion.prototype.eachChild = function eachChild (fn                  ) {
        this.args.forEach(fn);
    };

    Coercion.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = []).concat.apply(ref, this.args.map(function (arg) { return arg.possibleOutputs(); }));
            var ref;
    };

    //      




    var geometryTypes = ['Unknown', 'Point', 'LineString', 'Polygon'];

    var EvaluationContext = function EvaluationContext() {
        this.scope = new Scope();
        this._parseColorCache = {};
    };

    EvaluationContext.prototype.id = function id () {
        return this.feature && 'id' in this.feature ? this.feature.id : null;
    };

    EvaluationContext.prototype.geometryType = function geometryType () {
        return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
    };

    EvaluationContext.prototype.properties = function properties () {
        return this.feature && this.feature.properties || {};
    };

    EvaluationContext.prototype.pushScope = function pushScope (bindings                         ) {
        this.scope = this.scope.concat(bindings);
    };

    EvaluationContext.prototype.popScope = function popScope () {
        assert_1(this.scope.parent);
        this.scope = (this.scope.parent );
    };

    EvaluationContext.prototype.parseColor = function parseColor (input    )     {
        var cached = this._parseColorCache[input];
        if (!cached) {
            cached = this._parseColorCache[input] = Color.parse(input);
        }
        return cached;
    };

    //      











    var CompoundExpression = function CompoundExpression(name    , type  , evaluate      , args               ) {
        this.name = name;
        this.type = type;
        this._evaluate = evaluate;
        this.args = args;
    };

    CompoundExpression.prototype.evaluate = function evaluate (ctx               ) {
        return this._evaluate(ctx, this.args);
    };

    CompoundExpression.prototype.eachChild = function eachChild (fn                  ) {
        this.args.forEach(fn);
    };

    CompoundExpression.prototype.possibleOutputs = function possibleOutputs () {
        return [undefined];
    };

    CompoundExpression.parse = function parse (args          , context            )          {
        var op     = (args[0] );
        var definition = CompoundExpression.definitions[op];
        if (!definition) {
            return context.error(("Unknown expression \"" + op + "\". If you wanted a literal array, use [\"literal\", [...]]."), 0);
        }

        // Now check argument types against each signature
        var type = Array.isArray(definition) ?
            definition[0] : definition.type;

        var availableOverloads = Array.isArray(definition) ?
            [[definition[1], definition[2]]] :
            definition.overloads;

        var overloads = availableOverloads.filter(function (ref) {
                var signature = ref[0];

                return (
            !Array.isArray(signature) || // varags
            signature.length === args.length - 1 // correct param count
        );
            });

        // First parse all the args
        var parsedArgs                = [];
        for (var i = 1; i < args.length; i++) {
            var arg = args[i];
            var expected = (void 0);
            if (overloads.length === 1) {
                var params = overloads[0][0];
                expected = Array.isArray(params) ?
                    params[i - 1] :
                    params.type;
            }
            var parsed = context.parse(arg, 1 + parsedArgs.length, expected);
            if (!parsed) { return null; }
            parsedArgs.push(parsed);
        }

        var signatureContext             = (null );

        for (var i$2 = 0, list = overloads; i$2 < list.length; i$2 += 1) {
            // Use a fresh context for each attempted signature so that, if
            // we eventually succeed, we haven't polluted `context.errors`.
            var ref = list[i$2];
                var params$1 = ref[0];
                var evaluate = ref[1];

                signatureContext = new ParsingContext(context.registry, context.path, null, context.scope);

            if (Array.isArray(params$1)) {
                if (params$1.length !== parsedArgs.length) {
                    signatureContext.error(("Expected " + (params$1.length) + " arguments, but found " + (parsedArgs.length) + " instead."));
                    continue;
                }
            }

            for (var i$1 = 0; i$1 < parsedArgs.length; i$1++) {
                var expected$1 = Array.isArray(params$1) ? params$1[i$1] : params$1.type;
                var arg$1 = parsedArgs[i$1];
                signatureContext.concat(i$1 + 1).checkSubtype(expected$1, arg$1.type);
            }

            if (signatureContext.errors.length === 0) {
                return new CompoundExpression(op, type, evaluate, parsedArgs);
            }
        }

        assert_1(!signatureContext || signatureContext.errors.length > 0);

        if (overloads.length === 1) {
            context.errors.push.apply(context.errors, signatureContext.errors);
        } else {
            var expected$2 = overloads.length ? overloads : availableOverloads;
            var signatures = expected$2
                .map(function (ref) {
                        var params = ref[0];

                        return stringifySignature(params);
                })
                .join(' | ');
            var actualTypes = parsedArgs
                .map(function (arg) { return toString(arg.type); })
                .join(', ');
            context.error(("Expected arguments of type " + signatures + ", but found (" + actualTypes + ") instead."));
        }

        return null;
    };

    CompoundExpression.register = function register (
        registry                ,
        definitions                          
    ) {
        assert_1(!CompoundExpression.definitions);
        CompoundExpression.definitions = definitions;
        for (var name in definitions) {
            registry[name] = CompoundExpression;
        }
    };

    function varargs(type      )          {
        return { type: type };
    }

    function stringifySignature(signature           )         {
        if (Array.isArray(signature)) {
            return ("(" + (signature.map(toString).join(', ')) + ")");
        } else {
            return ("(" + (toString(signature.type)) + "...)");
        }
    }

    //      



    function isFeatureConstant(e            ) {
        if (e instanceof CompoundExpression) {
            if (e.name === 'get' && e.args.length === 1) {
                return false;
            } else if (e.name === 'has' && e.args.length === 1) {
                return false;
            } else if (
                e.name === 'properties' ||
                e.name === 'geometry-type' ||
                e.name === 'id'
            ) {
                return false;
            } else if (/^filter-/.test(e.name)) {
                return false;
            }
        }

        var result = true;
        e.eachChild(function (arg) {
            if (result && !isFeatureConstant(arg)) { result = false; }
        });
        return result;
    }

    function isGlobalPropertyConstant(e            , properties               ) {
        if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) { return false; }
        var result = true;
        e.eachChild(function (arg) {
            if (result && !isGlobalPropertyConstant(arg, properties)) { result = false; }
        });
        return result;
    }

    var exported$3 = {
        isFeatureConstant: isFeatureConstant,
        isGlobalPropertyConstant: isGlobalPropertyConstant
    };

    //      






    var Var = function Var(name    , type  ) {
        this.type = type;
        this.name = name;
    };

    Var.parse = function parse (args          , context            ) {
        if (args.length !== 2 || typeof args[1] !== 'string')
            { return context.error("'var' expression requires exactly one string literal argument."); }

        var name = args[1];
        if (!context.scope.has(name)) {
            return context.error(("Unknown variable \"" + name + "\". Make sure \"" + name + "\" has been bound in an enclosing \"let\" expression before using it."), 1);
        }

        return new Var(name, context.scope.get(name).type);
    };

    Var.prototype.evaluate = function evaluate (ctx               ) {
        return ctx.scope.get(this.name).evaluate(ctx);
    };

    Var.prototype.eachChild = function eachChild () {};

    Var.prototype.possibleOutputs = function possibleOutputs () {
        return [undefined];
    };

    //      





    /**
     * State associated parsing at a given point in an expression tree.
     * @private
     */
    var ParsingContext = function ParsingContext(
        registry                ,
        path$$1,
        expectedType   ,
        scope,
        errors
    ) {
        if ( path$$1 === void 0 ) path$$1            = [];
        if ( scope === void 0 ) scope    = new Scope();
        if ( errors === void 0 ) errors                  = [];

        this.registry = registry;
        this.path = path$$1;
        this.key = path$$1.map(function (part) { return ("[" + part + "]"); }).join('');
        this.scope = scope;
        this.errors = errors;
        this.expectedType = expectedType;
    };

    /**
     * @param expr the JSON expression to parse
     * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
     * @param options
     * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
     * @private
     */
    ParsingContext.prototype.parse = function parse (
        expr   ,
        index     ,
        expectedType    ,
        bindings                          ,
        options
    )          {
            if ( options === void 0 ) options                              = {};

        var context = this;
        if (index) {
            context = context.concat(index, expectedType, bindings);
        }

        if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
            expr = ['literal', expr];
        }

        if (Array.isArray(expr)) {
            if (expr.length === 0) {
                return context.error("Expected an array with at least one element. If you wanted a literal array, use [\"literal\", []].");
            }

            var op = expr[0];
            if (typeof op !== 'string') {
                context.error(("Expression name must be a string, but found " + (typeof op) + " instead. If you wanted a literal array, use [\"literal\", [...]]."), 0);
                return null;
            }

            var Expr = context.registry[op];
            if (Expr) {
                var parsed = Expr.parse(expr, context);
                if (!parsed) { return null; }

                if (context.expectedType) {
                    var expected = context.expectedType;
                    var actual = parsed.type;

                    // When we expect a number, string, boolean, or array but
                    // have a Value, we can wrap it in a refining assertion.
                    // When we expect a Color but have a String or Value, we
                    // can wrap it in "to-color" coercion.
                    // Otherwise, we do static type-checking.
                    if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean') && actual.kind === 'value') {
                        if (!options.omitTypeAnnotations) {
                            parsed = new Assertion(expected, [parsed]);
                        }
                    } else if (expected.kind === 'array' && actual.kind === 'value') {
                        if (!options.omitTypeAnnotations) {
                            parsed = new ArrayAssertion(expected, parsed);
                        }
                    } else if (expected.kind === 'color' && (actual.kind === 'value' || actual.kind === 'string')) {
                        if (!options.omitTypeAnnotations) {
                            parsed = new Coercion(expected, [parsed]);
                        }
                    } else if (context.checkSubtype(context.expectedType, parsed.type)) {
                        return null;
                    }
                }

                // If an expression's arguments are all literals, we can evaluate
                // it immediately and replace it with a literal value in the
                // parsed/compiled result.
                if (!(parsed instanceof Literal) && isConstant(parsed)) {
                    var ec = new EvaluationContext();
                    try {
                        parsed = new Literal(parsed.type, parsed.evaluate(ec));
                    } catch (e) {
                        context.error(e.message);
                        return null;
                    }
                }

                return parsed;
            }

            return context.error(("Unknown expression \"" + op + "\". If you wanted a literal array, use [\"literal\", [...]]."), 0);
        } else if (typeof expr === 'undefined') {
            return context.error("'undefined' value invalid. Use null instead.");
        } else if (typeof expr === 'object') {
            return context.error("Bare objects invalid. Use [\"literal\", {...}] instead.");
        } else {
            return context.error(("Expected an array, but found " + (typeof expr) + " instead."));
        }
    };

    /**
     * Returns a copy of this context suitable for parsing the subexpression at
     * index `index`, optionally appending to 'let' binding map.
     *
     * Note that `errors` property, intended for collecting errors while
     * parsing, is copied by reference rather than cloned.
     * @private
     */
    ParsingContext.prototype.concat = function concat (index    , expectedType    , bindings                          ) {
        var path$$1 = typeof index === 'number' ? this.path.concat(index) : this.path;
        var scope = bindings ? this.scope.concat(bindings) : this.scope;
        return new ParsingContext(
            this.registry,
            path$$1,
            expectedType || null,
            scope,
            this.errors
        );
    };

    /**
     * Push a parsing (or type checking) error into the `this.errors`
     * @param error The message
     * @param keys Optionally specify the source of the error at a child
     * of the current expression at `this.key`.
     * @private
     */
    ParsingContext.prototype.error = function error (error$1           ) {
            var keys = [], len = arguments.length - 1;
            while ( len-- > 0 ) keys[ len ] = arguments[ len + 1 ];

        var key = "" + (this.key) + (keys.map(function (k) { return ("[" + k + "]"); }).join(''));
        this.errors.push(new ParsingError$1(key, error$1));
    };

    /**
     * Returns null if `t` is a subtype of `expected`; otherwise returns an
     * error message and also pushes it to `this.errors`.
     */
    ParsingContext.prototype.checkSubtype = function checkSubtype$1 (expected  , t  )      {
        var error = checkSubtype(expected, t);
        if (error) { this.error(error); }
        return error;
    };

    function isConstant(expression            ) {
        // requires within function body to workaround circular dependency
        if (expression instanceof Var) {
            return false;
        } else if (expression instanceof CompoundExpression && expression.name === 'error') {
            return false;
        }

        var literalArgs = true;
        expression.eachChild(function (arg) {
            if (!(arg instanceof Literal)) { literalArgs = false; }
        });
        if (!literalArgs) {
            return false;
        }

        return isFeatureConstant(expression) &&
            isGlobalPropertyConstant(expression, ['zoom', 'heatmap-density']);
    }

    //      





    /**
     * Returns the index of the last stop <= input, or 0 if it doesn't exist.
     * @private
     */
    function findStopLessThanOrEqualTo(stops               , input        ) {
        var n = stops.length;
        var lowerIndex = 0;
        var upperIndex = n - 1;
        var currentIndex = 0;
        var currentValue, upperValue;

        while (lowerIndex <= upperIndex) {
            currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
            currentValue = stops[currentIndex];
            upperValue = stops[currentIndex + 1];
            if (input === currentValue || input > currentValue && input < upperValue) { // Search complete
                return currentIndex;
            } else if (currentValue < input) {
                lowerIndex = currentIndex + 1;
            } else if (currentValue > input) {
                upperIndex = currentIndex - 1;
            } else {
                throw new RuntimeError('Input is not a number.');
            }
        }

        return Math.max(currentIndex - 1, 0);
    }

    //      







    var Step = function Step(type  , input        , stops   ) {
        var this$1 = this;

        this.type = type;
        this.input = input;

        this.labels = [];
        this.outputs = [];
        for (var i = 0, list = stops; i < list.length; i += 1) {
            var ref = list[i];
            var label = ref[0];
            var expression = ref[1];

            this$1.labels.push(label);
            this$1.outputs.push(expression);
        }
    };

    Step.parse = function parse (args          , context            ) {
        var input = args[1];
            var rest = args.slice(2);

        if (args.length - 1 < 4) {
            return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + "."));
        }

        if ((args.length - 1) % 2 !== 0) {
            return context.error("Expected an even number of arguments.");
        }

        input = context.parse(input, 1, NumberType);
        if (!input) { return null; }

        var stops    = [];

        var outputType   = (null );
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }

        rest.unshift(-Infinity);

        for (var i = 0; i < rest.length; i += 2) {
            var label = rest[i];
            var value = rest[i + 1];

            var labelKey = i + 1;
            var valueKey = i + 2;

            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }

            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }

            var parsed = context.parse(value, valueKey, outputType);
            if (!parsed) { return null; }
            outputType = outputType || parsed.type;
            stops.push([label, parsed]);
        }

        return new Step(outputType, input, stops);
    };

    Step.prototype.evaluate = function evaluate (ctx               ) {
        var labels = this.labels;
        var outputs = this.outputs;

        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }

        var value = ((this.input.evaluate(ctx) )    );
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }

        var stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }

        var index = findStopLessThanOrEqualTo(labels, value);
        return outputs[index].evaluate(ctx);
    };

    Step.prototype.eachChild = function eachChild (fn                  ) {
            var this$1 = this;

        fn(this.input);
        for (var i = 0, list = this$1.outputs; i < list.length; i += 1) {
            var expression = list[i];

                fn(expression);
        }
    };

    Step.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = []).concat.apply(ref, this.outputs.map(function (output) { return output.possibleOutputs(); }));
            var ref;
    };

    /*
     * Copyright (C) 2008 Apple Inc. All Rights Reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     * 1. Redistributions of source code must retain the above copyright
     *    notice, this list of conditions and the following disclaimer.
     * 2. Redistributions in binary form must reproduce the above copyright
     *    notice, this list of conditions and the following disclaimer in the
     *    documentation and/or other materials provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
     * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
     * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     * Ported from Webkit
     * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
     */

    var unitbezier = UnitBezier;

    function UnitBezier(p1x, p1y, p2x, p2y) {
        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx - this.bx;

        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;

        this.p1x = p1x;
        this.p1y = p2y;
        this.p2x = p2x;
        this.p2y = p2y;
    }

    UnitBezier.prototype.sampleCurveX = function(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    };

    UnitBezier.prototype.sampleCurveY = function(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    };

    UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    };

    UnitBezier.prototype.solveCurveX = function(x, epsilon) {
        var this$1 = this;

        if (typeof epsilon === 'undefined') { epsilon = 1e-6; }

        var t0, t1, t2, x2, i;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {

            x2 = this$1.sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon) { return t2; }

            var d2 = this$1.sampleCurveDerivativeX(t2);
            if (Math.abs(d2) < 1e-6) { break; }

            t2 = t2 - x2 / d2;
        }

        // Fall back to the bisection method for reliability.
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;

        if (t2 < t0) { return t0; }
        if (t2 > t1) { return t1; }

        while (t0 < t1) {

            x2 = this$1.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon) { return t2; }

            if (x > x2) {
                t0 = t2;
            } else {
                t1 = t2;
            }

            t2 = (t1 - t0) * 0.5 + t0;
        }

        // Failure.
        return t2;
    };

    UnitBezier.prototype.solve = function(x, epsilon) {
        return this.sampleCurveY(this.solveCurveX(x, epsilon));
    };

    //      

    var exported$5 = {
        number: number,
        color: color,
        array: array$1
    };

    function number(a        , b        , t        ) {
        return (a * (1 - t)) + (b * t);
    }

    function color(from       , to       , t        ) {
        return new Color(
            number(from.r, to.r, t),
            number(from.g, to.g, t),
            number(from.b, to.b, t),
            number(from.a, to.a, t)
        );
    }

    function array$1(from               , to               , t        ) {
        return from.map(function (d, i) {
            return number(d, to[i], t);
        });
    }

    //      












    var Interpolate = function Interpolate(type  , interpolation               , input        , stops   ) {
        var this$1 = this;

        this.type = type;
        this.interpolation = interpolation;
        this.input = input;

        this.labels = [];
        this.outputs = [];
        for (var i = 0, list = stops; i < list.length; i += 1) {
            var ref = list[i];
            var label = ref[0];
            var expression = ref[1];

            this$1.labels.push(label);
            this$1.outputs.push(expression);
        }
    };

    Interpolate.interpolationFactor = function interpolationFactor (interpolation               , input    , lower    , upper    ) {
        var t = 0;
        if (interpolation.name === 'exponential') {
            t = exponentialInterpolation(input, interpolation.base, lower, upper);
        } else if (interpolation.name === 'linear') {
            t = exponentialInterpolation(input, 1, lower, upper);
        } else if (interpolation.name === 'cubic-bezier') {
            var c = interpolation.controlPoints;
            var ub = new unitbezier(c[0], c[1], c[2], c[3]);
            t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
        }
        return t;
    };

    Interpolate.parse = function parse (args          , context            ) {
        var interpolation = args[1];
            var input = args[2];
            var rest = args.slice(3);

        if (!Array.isArray(interpolation) || interpolation.length === 0) {
            return context.error("Expected an interpolation type expression.", 1);
        }

        if (interpolation[0] === 'linear') {
            interpolation = { name: 'linear' };
        } else if (interpolation[0] === 'exponential') {
            var base = interpolation[1];
            if (typeof base !== 'number')
                { return context.error("Exponential interpolation requires a numeric base.", 1, 1); }
            interpolation = {
                name: 'exponential',
                base: base
            };
        } else if (interpolation[0] === 'cubic-bezier') {
            var controlPoints = interpolation.slice(1);
            if (
                controlPoints.length !== 4 ||
                controlPoints.some(function (t) { return typeof t !== 'number' || t < 0 || t > 1; })
            ) {
                return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
            }

            interpolation = {
                name: 'cubic-bezier',
                controlPoints: (controlPoints )
            };
        } else {
            return context.error(("Unknown interpolation type " + (String(interpolation[0]))), 1, 0);
        }

        if (args.length - 1 < 4) {
            return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + "."));
        }

        if ((args.length - 1) % 2 !== 0) {
            return context.error("Expected an even number of arguments.");
        }

        input = context.parse(input, 2, NumberType);
        if (!input) { return null; }

        var stops    = [];

        var outputType   = (null );
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }

        for (var i = 0; i < rest.length; i += 2) {
            var label = rest[i];
            var value = rest[i + 1];

            var labelKey = i + 3;
            var valueKey = i + 4;

            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }

            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }

            var parsed = context.parse(value, valueKey, outputType);
            if (!parsed) { return null; }
            outputType = outputType || parsed.type;
            stops.push([label, parsed]);
        }

        if (outputType.kind !== 'number' &&
            outputType.kind !== 'color' &&
            !(
                outputType.kind === 'array' &&
                outputType.itemType.kind === 'number' &&
                typeof outputType.N === 'number'
            )
        ) {
            return context.error(("Type " + (toString(outputType)) + " is not interpolatable."));
        }

        return new Interpolate(outputType, interpolation, input, stops);
    };

    Interpolate.prototype.evaluate = function evaluate (ctx               ) {
        var labels = this.labels;
        var outputs = this.outputs;

        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }

        var value = ((this.input.evaluate(ctx) )    );
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }

        var stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }

        var index = findStopLessThanOrEqualTo(labels, value);
        var lower = labels[index];
        var upper = labels[index + 1];
        var t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);

        var outputLower = outputs[index].evaluate(ctx);
        var outputUpper = outputs[index + 1].evaluate(ctx);

        return (exported$5[this.type.kind.toLowerCase()] )(outputLower, outputUpper, t);
    };

    Interpolate.prototype.eachChild = function eachChild (fn                  ) {
            var this$1 = this;

        fn(this.input);
        for (var i = 0, list = this$1.outputs; i < list.length; i += 1) {
            var expression = list[i];

                fn(expression);
        }
    };

    Interpolate.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = []).concat.apply(ref, this.outputs.map(function (output) { return output.possibleOutputs(); }));
            var ref;
    };

    /**
     * Returns a ratio that can be used to interpolate between exponential function
     * stops.
     * How it works: Two consecutive stop values define a (scaled and shifted) exponential function `f(x) = a * base^x + b`, where `base` is the user-specified base,
     * and `a` and `b` are constants affording sufficient degrees of freedom to fit
     * the function to the given stops.
     *
     * Here's a bit of algebra that lets us compute `f(x)` directly from the stop
     * values without explicitly solving for `a` and `b`:
     *
     * First stop value: `f(x0) = y0 = a * base^x0 + b`
     * Second stop value: `f(x1) = y1 = a * base^x1 + b`
     * => `y1 - y0 = a(base^x1 - base^x0)`
     * => `a = (y1 - y0)/(base^x1 - base^x0)`
     *
     * Desired value: `f(x) = y = a * base^x + b`
     * => `f(x) = y0 + a * (base^x - base^x0)`
     *
     * From the above, we can replace the `a` in `a * (base^x - base^x0)` and do a
     * little algebra:
     * ```
     * a * (base^x - base^x0) = (y1 - y0)/(base^x1 - base^x0) * (base^x - base^x0)
     *                     = (y1 - y0) * (base^x - base^x0) / (base^x1 - base^x0)
     * ```
     *
     * If we let `(base^x - base^x0) / (base^x1 base^x0)`, then we have
     * `f(x) = y0 + (y1 - y0) * ratio`.  In other words, `ratio` may be treated as
     * an interpolation factor between the two stops' output values.
     *
     * (Note: a slightly different form for `ratio`,
     * `(base^(x-x0) - 1) / (base^(x1-x0) - 1) `, is equivalent, but requires fewer
     * expensive `Math.pow()` operations.)
     *
     * @private
    */
    function exponentialInterpolation(input, base, lowerValue, upperValue) {
        var difference = upperValue - lowerValue;
        var progress = input - lowerValue;

        if (difference === 0) {
            return 0;
        } else if (base === 1) {
            return progress / difference;
        } else {
            return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
        }
    }

    //      






    var Coalesce = function Coalesce(type  , args               ) {
        this.type = type;
        this.args = args;
    };

    Coalesce.parse = function parse (args          , context            ) {
        if (args.length < 2) {
            return context.error("Expectected at least one argument.");
        }
        var outputType   = (null );
        var expectedType = context.expectedType;
        if (expectedType && expectedType.kind !== 'value') {
            outputType = expectedType;
        }
        var parsedArgs = [];

        for (var i = 0, list = args.slice(1); i < list.length; i += 1) {
            var arg = list[i];

                var parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, {omitTypeAnnotations: true});
            if (!parsed) { return null; }
            outputType = outputType || parsed.type;
            parsedArgs.push(parsed);
        }
        assert_1(outputType);

        // Above, we parse arguments without inferred type annotation so that
        // they don't produce a runtime error for `null` input, which would
        // preempt the desired null-coalescing behavior.
        // Thus, if any of our arguments would have needed an annotation, we
        // need to wrap the enclosing coalesce expression with it instead.
        var needsAnnotation = expectedType &&
            parsedArgs.some(function (arg) { return checkSubtype(expectedType, arg.type); });

        return needsAnnotation ?
            new Coalesce(ValueType, parsedArgs) :
            new Coalesce((outputType ), parsedArgs);
    };

    Coalesce.prototype.evaluate = function evaluate (ctx               ) {
            var this$1 = this;

        var result = null;
        for (var i = 0, list = this$1.args; i < list.length; i += 1) {
            var arg = list[i];

                result = arg.evaluate(ctx);
            if (result !== null) { break; }
        }
        return result;
    };

    Coalesce.prototype.eachChild = function eachChild (fn                  ) {
        this.args.forEach(fn);
    };

    Coalesce.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = []).concat.apply(ref, this.args.map(function (arg) { return arg.possibleOutputs(); }));
            var ref;
    };

    //      






    var Let = function Let(bindings                         , result        ) {
        this.type = result.type;
        this.bindings = [].concat(bindings);
        this.result = result;
    };

    Let.prototype.evaluate = function evaluate (ctx               ) {
        ctx.pushScope(this.bindings);
        var result = this.result.evaluate(ctx);
        ctx.popScope();
        return result;
    };

    Let.prototype.eachChild = function eachChild (fn                  ) {
            var this$1 = this;

        for (var i = 0, list = this$1.bindings; i < list.length; i += 1) {
            var binding = list[i];

                fn(binding[1]);
        }
        fn(this.result);
    };

    Let.parse = function parse (args          , context            ) {
        if (args.length < 4)
            { return context.error(("Expected at least 3 arguments, but found " + (args.length - 1) + " instead.")); }

        var bindings                          = [];
        for (var i = 1; i < args.length - 1; i += 2) {
            var name = args[i];

            if (typeof name !== 'string') {
                return context.error(("Expected string, but found " + (typeof name) + " instead."), i);
            }

            if (/[^a-zA-Z0-9_]/.test(name)) {
                return context.error("Variable names must contain only alphanumeric characters or '_'.", i);
            }

            var value = context.parse(args[i + 1], i + 1);
            if (!value) { return null; }

            bindings.push([name, value]);
        }

        var result = context.parse(args[args.length - 1], args.length - 1, undefined, bindings);
        if (!result) { return null; }

        return new Let(bindings, result);
    };

    Let.prototype.possibleOutputs = function possibleOutputs () {
        return this.result.possibleOutputs();
    };

    //      







    var At = function At(type  , index        , input        ) {
        this.type = type;
        this.index = index;
        this.input = input;
    };

    At.parse = function parse (args          , context            ) {
        if (args.length !== 3)
            { return context.error(("Expected 2 arguments, but found " + (args.length - 1) + " instead.")); }

        var index = context.parse(args[1], 1, NumberType);
        var input = context.parse(args[2], 2, array(context.expectedType || ValueType));

        if (!index || !input) { return null; }

        var t        = (input.type );
        return new At(t.itemType, index, input);
    };

    At.prototype.evaluate = function evaluate (ctx               ) {
        var index = ((this.index.evaluate(ctx) )    );
        var array$$1 = ((this.input.evaluate(ctx) )          );

        if (index < 0 || index >= array$$1.length) {
            throw new RuntimeError(("Array index out of bounds: " + index + " > " + (array$$1.length) + "."));
        }

        if (index !== Math.floor(index)) {
            throw new RuntimeError(("Array index must be an integer, but found " + index + " instead."));
        }

        return array$$1[index];
    };

    At.prototype.eachChild = function eachChild (fn                  ) {
        fn(this.index);
        fn(this.input);
    };

    At.prototype.possibleOutputs = function possibleOutputs () {
        return [undefined];
    };

    //      






    // Map input label values to output expression index


    var Match = function Match(inputType  , outputType  , input        , cases   , outputs               , otherwise        ) {
        this.inputType = inputType;
        this.type = outputType;
        this.input = input;
        this.cases = cases;
        this.outputs = outputs;
        this.otherwise = otherwise;
    };

    Match.parse = function parse (args          , context            ) {
        if (args.length < 5)
            { return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + ".")); }
        if (args.length % 2 !== 1)
            { return context.error("Expected an even number of arguments."); }

        var inputType;
        var outputType;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        var cases = {};
        var outputs = [];
        for (var i = 2; i < args.length - 1; i += 2) {
            var labels = args[i];
            var value = args[i + 1];

            if (!Array.isArray(labels)) {
                labels = [labels];
            }

            var labelContext = context.concat(i);
            if (labels.length === 0) {
                return labelContext.error('Expected at least one branch label.');
            }

            for (var i$1 = 0, list = labels; i$1 < list.length; i$1 += 1) {
                var label = list[i$1];

                    if (typeof label !== 'number' && typeof label !== 'string') {
                    return labelContext.error("Branch labels must be numbers or strings.");
                } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                    return labelContext.error(("Branch labels must be integers no larger than " + (Number.MAX_SAFE_INTEGER) + "."));

                } else if (typeof label === 'number' && Math.floor(label) !== label) {
                    return labelContext.error("Numeric branch labels must be integer values.");

                } else if (!inputType) {
                    inputType = typeOf(label);
                } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
                    return null;
                }

                if (typeof cases[String(label)] !== 'undefined') {
                    return labelContext.error('Branch labels must be unique.');
                }

                cases[String(label)] = outputs.length;
            }

            var result = context.parse(value, i, outputType);
            if (!result) { return null; }
            outputType = outputType || result.type;
            outputs.push(result);
        }

        var input = context.parse(args[1], 1, inputType);
        if (!input) { return null; }

        var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise) { return null; }

        assert_1(inputType && outputType);
        return new Match((inputType ), (outputType ), input, cases, outputs, otherwise);
    };

    Match.prototype.evaluate = function evaluate (ctx               ) {
        var input = (this.input.evaluate(ctx) );
        return (this.outputs[this.cases[input]] || this.otherwise).evaluate(ctx);
    };

    Match.prototype.eachChild = function eachChild (fn                  ) {
        fn(this.input);
        this.outputs.forEach(fn);
        fn(this.otherwise);
    };

    Match.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = [])
            .concat.apply(ref, this.outputs.map(function (out) { return out.possibleOutputs(); }))
            .concat(this.otherwise.possibleOutputs());
            var ref;
    };

    //      








    var Case = function Case(type  , branches      , otherwise        ) {
        this.type = type;
        this.branches = branches;
        this.otherwise = otherwise;
    };

    Case.parse = function parse (args          , context            ) {
        if (args.length < 4)
            { return context.error(("Expected at least 3 arguments, but found only " + (args.length - 1) + ".")); }
        if (args.length % 2 !== 0)
            { return context.error("Expected an odd number of arguments."); }

        var outputType   ;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }

        var branches = [];
        for (var i = 1; i < args.length - 1; i += 2) {
            var test = context.parse(args[i], i, BooleanType);
            if (!test) { return null; }

            var result = context.parse(args[i + 1], i + 1, outputType);
            if (!result) { return null; }

            branches.push([test, result]);

            outputType = outputType || result.type;
        }

        var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise) { return null; }

        assert_1(outputType);
        return new Case((outputType ), branches, otherwise);
    };

    Case.prototype.evaluate = function evaluate (ctx               ) {
            var this$1 = this;

        for (var i = 0, list = this$1.branches; i < list.length; i += 1) {
            var ref = list[i];
                var test = ref[0];
                var expression = ref[1];

                if (test.evaluate(ctx)) {
                return expression.evaluate(ctx);
            }
        }
        return this.otherwise.evaluate(ctx);
    };

    Case.prototype.eachChild = function eachChild (fn                  ) {
            var this$1 = this;

        for (var i = 0, list = this$1.branches; i < list.length; i += 1) {
            var ref = list[i];
                var test = ref[0];
                var expression = ref[1];

                fn(test);
            fn(expression);
        }
        fn(this.otherwise);
    };

    Case.prototype.possibleOutputs = function possibleOutputs () {
        return (ref = [])
            .concat.apply(ref, this.branches.map(function (ref) {
                    var _ = ref[0];
                    var out = ref[1];

                    return out.possibleOutputs();
            }))
            .concat(this.otherwise.possibleOutputs());
            var ref;
    };

    //      






    function isComparableType(type      ) {
        return type.kind === 'string' ||
            type.kind === 'number' ||
            type.kind === 'boolean' ||
            type.kind === 'null';
    }

    /**
     * Special form for ==, !=, implementing the following signatures:
     * - (T1: Comparable, T2: Comparable) => boolean { T1 == T2 }
     * - (Comparable, value) => boolean
     * - (value, Comparable) => boolean
     *
     * Where Comparable = string | number | boolean | null.
     *
     * Evaluation semantics for the value cases are equivalent to Javascript's
     * strict equality (===/!==) -- i.e., when the value argument's type doesn't
     * match that of the Comparable argument, == evaluates to false, != to true.
     *
     * @private
     */
    function makeComparison(compare) {
        return (function () {
            function Comparison(lhs            , rhs            ) {
                this.type = BooleanType;
                this.lhs = lhs;
                this.rhs = rhs;
            }

            Comparison.parse = function parse (args              , context                )              {
                if (args.length !== 3)
                    { return context.error("Expected two arguments."); }

                var lhs = context.parse(args[1], 1, ValueType);
                if (!lhs) { return null; }
                var rhs = context.parse(args[2], 2, ValueType);
                if (!rhs) { return null; }

                if (!isComparableType(lhs.type) && !isComparableType(rhs.type)) {
                    return context.error(("Expected at least one argument to be a string, number, boolean, or null, but found (" + (toString(lhs.type)) + ", " + (toString(rhs.type)) + ") instead."));
                }

                if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                    return context.error(("Cannot compare " + (toString(lhs.type)) + " and " + (toString(rhs.type)) + "."));
                }

                return new Comparison(lhs, rhs);
            };

            Comparison.prototype.evaluate = function evaluate (ctx                   ) {
                return compare(this.lhs.evaluate(ctx), this.rhs.evaluate(ctx));
            };

            Comparison.prototype.eachChild = function eachChild (fn                      ) {
                fn(this.lhs);
                fn(this.rhs);
            };

            Comparison.prototype.possibleOutputs = function possibleOutputs () {
                return [true, false];
            };

            return Comparison;
        }());
    }

    var Equals = makeComparison(function (lhs, rhs) { return lhs === rhs; });
    var NotEquals = makeComparison(function (lhs, rhs) { return lhs !== rhs; });

    //      



    var expressions                     = {
        // special forms
        '==': Equals,
        '!=': NotEquals,
        'array': ArrayAssertion,
        'at': At,
        'boolean': Assertion,
        'case': Case,
        'coalesce': Coalesce,
        'interpolate': Interpolate,
        'let': Let,
        'literal': Literal,
        'match': Match,
        'number': Assertion,
        'object': Assertion,
        'step': Step,
        'string': Assertion,
        'to-color': Coercion,
        'to-number': Coercion,
        'var': Var
    };

    function rgba(ctx, ref) {
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];

        r = r.evaluate(ctx);
        g = g.evaluate(ctx);
        b = b.evaluate(ctx);
        var alpha = a ? a.evaluate(ctx) : 1;
        var error = validateRGBA(r, g, b, alpha);
        if (error) { throw new RuntimeError(error); }
        return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
    }

    function has(key, obj) {
        return key in obj;
    }

    function get(key, obj) {
        var v = obj[key];
        return typeof v === 'undefined' ? null : v;
    }

    function length(ctx, ref) {
        var v = ref[0];

        return v.evaluate(ctx).length;
    }

    function lt(ctx, ref) {
    var a = ref[0];
    var b = ref[1];
     return a.evaluate(ctx) < b.evaluate(ctx); }
    function gt(ctx, ref) {
    var a = ref[0];
    var b = ref[1];
     return a.evaluate(ctx) > b.evaluate(ctx); }
    function lteq(ctx, ref) {
    var a = ref[0];
    var b = ref[1];
     return a.evaluate(ctx) <= b.evaluate(ctx); }
    function gteq(ctx, ref) {
    var a = ref[0];
    var b = ref[1];
     return a.evaluate(ctx) >= b.evaluate(ctx); }

    function binarySearch(v, a, i, j) {
        while (i <= j) {
            var m = (i + j) >> 1;
            if (a[m] === v)
                { return true; }
            if (a[m] > v)
                { j = m - 1; }
            else
                { i = m + 1; }
        }
        return false;
    }


    CompoundExpression.register(expressions, {
        'error': [
            ErrorType,
            [StringType],
            function (ctx, ref) {
            var v = ref[0];
     throw new RuntimeError(v.evaluate(ctx)); }
        ],
        'typeof': [
            StringType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                return toString(typeOf(v.evaluate(ctx)));
    }
        ],
        'to-string': [
            StringType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                v = v.evaluate(ctx);
                var type = typeof v;
                if (v === null || type === 'string' || type === 'number' || type === 'boolean') {
                    return String(v);
                } else if (v instanceof Color) {
                    return v.toString();
                } else {
                    return JSON.stringify(v);
                }
            }
        ],
        'to-boolean': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                return Boolean(v.evaluate(ctx));
    }
        ],
        'to-rgba': [
            array(NumberType, 4),
            [ColorType],
            function (ctx, ref) {
                var v = ref[0];

                var ref$1 = v.evaluate(ctx);
                var r = ref$1.r;
                var g = ref$1.g;
                var b = ref$1.b;
                var a = ref$1.a;
                return [255 * r / a, 255 * g / a, 255 * b / a, a];
            }
        ],
        'rgb': [
            ColorType,
            [NumberType, NumberType, NumberType],
            rgba
        ],
        'rgba': [
            ColorType,
            [NumberType, NumberType, NumberType, NumberType],
            rgba
        ],
        'length': {
            type: NumberType,
            overloads: [
                [
                    [StringType],
                    length
                ], [
                    [array(ValueType)],
                    length
                ]
            ]
        },
        'has': {
            type: BooleanType,
            overloads: [
                [
                    [StringType],
                    function (ctx, ref) {
                        var key = ref[0];

                        return has(key.evaluate(ctx), ctx.properties());
    }
                ], [
                    [StringType, ObjectType],
                    function (ctx, ref) {
                        var key = ref[0];
                        var obj = ref[1];

                        return has(key.evaluate(ctx), obj.evaluate(ctx));
    }
                ]
            ]
        },
        'get': {
            type: ValueType,
            overloads: [
                [
                    [StringType],
                    function (ctx, ref) {
                        var key = ref[0];

                        return get(key.evaluate(ctx), ctx.properties());
    }
                ], [
                    [StringType, ObjectType],
                    function (ctx, ref) {
                        var key = ref[0];
                        var obj = ref[1];

                        return get(key.evaluate(ctx), obj.evaluate(ctx));
    }
                ]
            ]
        },
        'properties': [
            ObjectType,
            [],
            function (ctx) { return ctx.properties(); }
        ],
        'geometry-type': [
            StringType,
            [],
            function (ctx) { return ctx.geometryType(); }
        ],
        'id': [
            ValueType,
            [],
            function (ctx) { return ctx.id(); }
        ],
        'zoom': [
            NumberType,
            [],
            function (ctx) { return ctx.globals.zoom; }
        ],
        'heatmap-density': [
            NumberType,
            [],
            function (ctx) { return ctx.globals.heatmapDensity || 0; }
        ],
        '+': [
            NumberType,
            varargs(NumberType),
            function (ctx, args) {
                var result = 0;
                for (var i = 0, list = args; i < list.length; i += 1) {
                    var arg = list[i];

                    result += arg.evaluate(ctx);
                }
                return result;
            }
        ],
        '*': [
            NumberType,
            varargs(NumberType),
            function (ctx, args) {
                var result = 1;
                for (var i = 0, list = args; i < list.length; i += 1) {
                    var arg = list[i];

                    result *= arg.evaluate(ctx);
                }
                return result;
            }
        ],
        '-': {
            type: NumberType,
            overloads: [
                [
                    [NumberType, NumberType],
                    function (ctx, ref) {
                        var a = ref[0];
                        var b = ref[1];

                        return a.evaluate(ctx) - b.evaluate(ctx);
    }
                ], [
                    [NumberType],
                    function (ctx, ref) {
                        var a = ref[0];

                        return -a.evaluate(ctx);
    }
                ]
            ]
        },
        '/': [
            NumberType,
            [NumberType, NumberType],
            function (ctx, ref) {
                var a = ref[0];
                var b = ref[1];

                return a.evaluate(ctx) / b.evaluate(ctx);
    }
        ],
        '%': [
            NumberType,
            [NumberType, NumberType],
            function (ctx, ref) {
                var a = ref[0];
                var b = ref[1];

                return a.evaluate(ctx) % b.evaluate(ctx);
    }
        ],
        'ln2': [
            NumberType,
            [],
            function () { return Math.LN2; }
        ],
        'pi': [
            NumberType,
            [],
            function () { return Math.PI; }
        ],
        'e': [
            NumberType,
            [],
            function () { return Math.E; }
        ],
        '^': [
            NumberType,
            [NumberType, NumberType],
            function (ctx, ref) {
                var b = ref[0];
                var e = ref[1];

                return Math.pow(b.evaluate(ctx), e.evaluate(ctx));
    }
        ],
        'sqrt': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var x = ref[0];

                return Math.sqrt(x.evaluate(ctx));
    }
        ],
        'log10': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.log10(n.evaluate(ctx));
    }
        ],
        'ln': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.log(n.evaluate(ctx));
    }
        ],
        'log2': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.log2(n.evaluate(ctx));
    }
        ],
        'sin': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.sin(n.evaluate(ctx));
    }
        ],
        'cos': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.cos(n.evaluate(ctx));
    }
        ],
        'tan': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.tan(n.evaluate(ctx));
    }
        ],
        'asin': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.asin(n.evaluate(ctx));
    }
        ],
        'acos': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.acos(n.evaluate(ctx));
    }
        ],
        'atan': [
            NumberType,
            [NumberType],
            function (ctx, ref) {
                var n = ref[0];

                return Math.atan(n.evaluate(ctx));
    }
        ],
        'min': [
            NumberType,
            varargs(NumberType),
            function (ctx, args) { return Math.min.apply(Math, args.map(function (arg) { return arg.evaluate(ctx); })); }
        ],
        'max': [
            NumberType,
            varargs(NumberType),
            function (ctx, args) { return Math.max.apply(Math, args.map(function (arg) { return arg.evaluate(ctx); })); }
        ],
        'filter-==': [
            BooleanType,
            [StringType, ValueType],
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                return ctx.properties()[(k     ).value] === (v     ).value;
    }
        ],
        'filter-id-==': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                return ctx.id() === (v     ).value;
    }
        ],
        'filter-type-==': [
            BooleanType,
            [StringType],
            function (ctx, ref) {
                var v = ref[0];

                return ctx.geometryType() === (v     ).value;
    }
        ],
        'filter-<': [
            BooleanType,
            [StringType, ValueType],
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                var a = ctx.properties()[(k     ).value];
                var b = (v     ).value;
                return typeof a === typeof b && a < b;
            }
        ],
        'filter-id-<': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                var a = ctx.id();
                var b = (v     ).value;
                return typeof a === typeof b && a < b;
            }
        ],
        'filter->': [
            BooleanType,
            [StringType, ValueType],
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                var a = ctx.properties()[(k     ).value];
                var b = (v     ).value;
                return typeof a === typeof b && a > b;
            }
        ],
        'filter-id->': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                var a = ctx.id();
                var b = (v     ).value;
                return typeof a === typeof b && a > b;
            }
        ],
        'filter-<=': [
            BooleanType,
            [StringType, ValueType],
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                var a = ctx.properties()[(k     ).value];
                var b = (v     ).value;
                return typeof a === typeof b && a <= b;
            }
        ],
        'filter-id-<=': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                var a = ctx.id();
                var b = (v     ).value;
                return typeof a === typeof b && a <= b;
            }
        ],
        'filter->=': [
            BooleanType,
            [StringType, ValueType],
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                var a = ctx.properties()[(k     ).value];
                var b = (v     ).value;
                return typeof a === typeof b && a >= b;
            }
        ],
        'filter-id->=': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var v = ref[0];

                var a = ctx.id();
                var b = (v     ).value;
                return typeof a === typeof b && a >= b;
            }
        ],
        'filter-has': [
            BooleanType,
            [ValueType],
            function (ctx, ref) {
                var k = ref[0];

                return (k     ).value in ctx.properties();
    }
        ],
        'filter-has-id': [
            BooleanType,
            [],
            function (ctx) { return ctx.id() !== null; }
        ],
        'filter-type-in': [
            BooleanType,
            [array(StringType)],
            function (ctx, ref) {
                var v = ref[0];

                return (v     ).value.indexOf(ctx.geometryType()) >= 0;
    }
        ],
        'filter-id-in': [
            BooleanType,
            [array(ValueType)],
            function (ctx, ref) {
                var v = ref[0];

                return (v     ).value.indexOf(ctx.id()) >= 0;
    }
        ],
        'filter-in-small': [
            BooleanType,
            [StringType, array(ValueType)],
            // assumes v is an array literal
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                return (v     ).value.indexOf(ctx.properties()[(k     ).value]) >= 0;
    }
        ],
        'filter-in-large': [
            BooleanType,
            [StringType, array(ValueType)],
            // assumes v is a array literal with values sorted in ascending order and of a single type
            function (ctx, ref) {
                var k = ref[0];
                var v = ref[1];

                return binarySearch(ctx.properties()[(k     ).value], (v     ).value, 0, (v     ).value.length - 1);
    }
        ],
        '>': {
            type: BooleanType,
            overloads: [
                [[NumberType, NumberType], gt],
                [[StringType, StringType], gt]
            ]
        },
        '<': {
            type: BooleanType,
            overloads: [
                [[NumberType, NumberType], lt],
                [[StringType, StringType], lt]
            ]
        },
        '>=': {
            type: BooleanType,
            overloads: [
                [[NumberType, NumberType], gteq],
                [[StringType, StringType], gteq]
            ]
        },
        '<=': {
            type: BooleanType,
            overloads: [
                [[NumberType, NumberType], lteq],
                [[StringType, StringType], lteq]
            ]
        },
        'all': {
            type: BooleanType,
            overloads: [
                [
                    [BooleanType, BooleanType],
                    function (ctx, ref) {
                        var a = ref[0];
                        var b = ref[1];

                        return a.evaluate(ctx) && b.evaluate(ctx);
    }
                ],
                [
                    varargs(BooleanType),
                    function (ctx, args) {
                        for (var i = 0, list = args; i < list.length; i += 1) {
                            var arg = list[i];

                            if (!arg.evaluate(ctx))
                                { return false; }
                        }
                        return true;
                    }
                ]
            ]
        },
        'any': {
            type: BooleanType,
            overloads: [
                [
                    [BooleanType, BooleanType],
                    function (ctx, ref) {
                        var a = ref[0];
                        var b = ref[1];

                        return a.evaluate(ctx) || b.evaluate(ctx);
    }
                ],
                [
                    varargs(BooleanType),
                    function (ctx, args) {
                        for (var i = 0, list = args; i < list.length; i += 1) {
                            var arg = list[i];

                            if (arg.evaluate(ctx))
                                { return true; }
                        }
                        return false;
                    }
                ]
            ]
        },
        '!': [
            BooleanType,
            [BooleanType],
            function (ctx, ref) {
                var b = ref[0];

                return !b.evaluate(ctx);
    }
        ],
        'upcase': [
            StringType,
            [StringType],
            function (ctx, ref) {
                var s = ref[0];

                return s.evaluate(ctx).toUpperCase();
    }
        ],
        'downcase': [
            StringType,
            [StringType],
            function (ctx, ref) {
                var s = ref[0];

                return s.evaluate(ctx).toLowerCase();
    }
        ],
        'concat': [
            StringType,
            varargs(StringType),
            function (ctx, args) { return args.map(function (arg) { return arg.evaluate(ctx); }).join(''); }
        ]
    });

    //      

    /**
     * A type used for returning and propagating errors. The first element of the union
     * represents success and contains a value, and the second represents an error and
     * contains an error value.
     * @private
     */




    function success      (value   )               {
        return { result: 'success', value: value };
    }

    function error      (value   )               {
        return { result: 'error', value: value };
    }

    //      















    // Constants
    var Xn = 0.950470, // D65 standard referent
        Yn = 1,
        Zn = 1.088830,
        t0 = 4 / 29,
        t1 = 6 / 29,
        t2 = 3 * t1 * t1,
        t3 = t1 * t1 * t1,
        deg2rad = Math.PI / 180,
        rad2deg = 180 / Math.PI;

    // Utilities
    function xyz2lab(t) {
        return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
    }

    function lab2xyz(t) {
        return t > t1 ? t * t * t : t2 * (t - t0);
    }

    function xyz2rgb(x) {
        return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
    }

    function rgb2xyz(x) {
        x /= 255;
        return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }

    // LAB
    function rgbToLab(rgbColor       )           {
        var b = rgb2xyz(rgbColor.r),
            a = rgb2xyz(rgbColor.g),
            l = rgb2xyz(rgbColor.b),
            x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
            y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
            z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);

        return {
            l: 116 * y - 16,
            a: 500 * (x - y),
            b: 200 * (y - z),
            alpha: rgbColor.a
        };
    }

    function labToRgb(labColor          )        {
        var y = (labColor.l + 16) / 116,
            x = isNaN(labColor.a) ? y : y + labColor.a / 500,
            z = isNaN(labColor.b) ? y : y - labColor.b / 200;
        y = Yn * lab2xyz(y);
        x = Xn * lab2xyz(x);
        z = Zn * lab2xyz(z);
        return new Color(
            xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
            xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
            xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
            labColor.alpha
        );
    }

    function interpolateLab(from          , to          , t        ) {
        return {
            l: number(from.l, to.l, t),
            a: number(from.a, to.a, t),
            b: number(from.b, to.b, t),
            alpha: number(from.alpha, to.alpha, t)
        };
    }

    // HCL
    function rgbToHcl(rgbColor       )           {
        var ref = rgbToLab(rgbColor);
        var l = ref.l;
        var a = ref.a;
        var b = ref.b;
        var h = Math.atan2(b, a) * rad2deg;
        return {
            h: h < 0 ? h + 360 : h,
            c: Math.sqrt(a * a + b * b),
            l: l,
            alpha: rgbColor.a
        };
    }

    function hclToRgb(hclColor          )        {
        var h = hclColor.h * deg2rad,
            c = hclColor.c,
            l = hclColor.l;
        return labToRgb({
            l: l,
            a: Math.cos(h) * c,
            b: Math.sin(h) * c,
            alpha: hclColor.alpha
        });
    }

    function interpolateHue(a        , b        , t        ) {
        var d = b - a;
        return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
    }

    function interpolateHcl(from          , to          , t        ) {
        return {
            h: interpolateHue(from.h, to.h, t),
            c: number(from.c, to.c, t),
            l: number(from.l, to.l, t),
            alpha: number(from.alpha, to.alpha, t)
        };
    }

    var exported$7 = {
        lab: {
            forward: rgbToLab,
            reverse: labToRgb,
            interpolate: interpolateLab
        },

        hcl: {
            forward: rgbToHcl,
            reverse: hclToRgb,
            interpolate: interpolateHcl
        }
    };

    function getType(val) {
        if (val instanceof Number) {
            return 'number';
        } else if (val instanceof String) {
            return 'string';
        } else if (val instanceof Boolean) {
            return 'boolean';
        } else if (Array.isArray(val)) {
            return 'array';
        } else if (val === null) {
            return 'null';
        } else {
            return typeof val;
        }
    }

    function isFunction$1(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    function identityFunction(x) {
        return x;
    }

    function createFunction(parameters, propertySpec) {
        var isColor = propertySpec.type === 'color';
        var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
        var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
        var zoomDependent = zoomAndFeatureDependent || !featureDependent;
        var type = parameters.type || (propertySpec.function === 'interpolated' ? 'exponential' : 'interval');

        if (isColor) {
            parameters = extend({}, parameters);

            if (parameters.stops) {
                parameters.stops = parameters.stops.map(function (stop) {
                    return [stop[0], Color.parse(stop[1])];
                });
            }

            if (parameters.default) {
                parameters.default = Color.parse(parameters.default);
            } else {
                parameters.default = Color.parse(propertySpec.default);
            }
        }

        if (parameters.colorSpace && parameters.colorSpace !== 'rgb' && !exported$7[parameters.colorSpace]) {
            throw new Error(("Unknown color space: " + (parameters.colorSpace)));
        }

        var innerFun;
        var hashedStops;
        var categoricalKeyType;
        if (type === 'exponential') {
            innerFun = evaluateExponentialFunction;
        } else if (type === 'interval') {
            innerFun = evaluateIntervalFunction;
        } else if (type === 'categorical') {
            innerFun = evaluateCategoricalFunction;

            // For categorical functions, generate an Object as a hashmap of the stops for fast searching
            hashedStops = Object.create(null);
            for (var i = 0, list = parameters.stops; i < list.length; i += 1) {
                var stop = list[i];

                hashedStops[stop[0]] = stop[1];
            }

            // Infer key type based on first stop key-- used to encforce strict type checking later
            categoricalKeyType = typeof parameters.stops[0][0];

        } else if (type === 'identity') {
            innerFun = evaluateIdentityFunction;
        } else {
            throw new Error(("Unknown function type \"" + type + "\""));
        }

        if (zoomAndFeatureDependent) {
            var featureFunctions = {};
            var zoomStops = [];
            for (var s = 0; s < parameters.stops.length; s++) {
                var stop$1 = parameters.stops[s];
                var zoom = stop$1[0].zoom;
                if (featureFunctions[zoom] === undefined) {
                    featureFunctions[zoom] = {
                        zoom: zoom,
                        type: parameters.type,
                        property: parameters.property,
                        default: parameters.default,
                        stops: []
                    };
                    zoomStops.push(zoom);
                }
                featureFunctions[zoom].stops.push([stop$1[0].value, stop$1[1]]);
            }

            var featureFunctionStops = [];
            for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
                var z = list$1[i$1];

                featureFunctionStops.push([featureFunctions[z].zoom, createFunction(featureFunctions[z], propertySpec)]);
            }

            return {
                kind: 'composite',
                interpolationFactor: Interpolate.interpolationFactor.bind(undefined, {name: 'linear'}),
                zoomStops: featureFunctionStops.map(function (s) { return s[0]; }),
                evaluate: function evaluate(ref, properties) {
                    var zoom = ref.zoom;

                    return evaluateExponentialFunction({
                        stops: featureFunctionStops,
                        base: parameters.base
                    }, propertySpec, zoom).evaluate(zoom, properties);
                }
            };
        } else if (zoomDependent) {
            return {
                kind: 'camera',
                interpolationFactor: type === 'exponential' ?
                    Interpolate.interpolationFactor.bind(undefined, {name: 'exponential', base: parameters.base !== undefined ? parameters.base : 1}) :
                    function () { return 0; },
                zoomStops: parameters.stops.map(function (s) { return s[0]; }),
                evaluate: function (ref) {
                    var zoom = ref.zoom;

                    return innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType);
            }
            };
        } else {
            return {
                kind: 'source',
                evaluate: function evaluate(_, feature) {
                    var value = feature && feature.properties ? feature.properties[parameters.property] : undefined;
                    if (value === undefined) {
                        return coalesce(parameters.default, propertySpec.default);
                    }
                    return innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType);
                }
            };
        }
    }

    function coalesce(a, b, c) {
        if (a !== undefined) { return a; }
        if (b !== undefined) { return b; }
        if (c !== undefined) { return c; }
    }

    function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
        var evaluated = typeof input === keyType ? hashedStops[input] : undefined; // Enforce strict typing on input
        return coalesce(evaluated, parameters.default, propertySpec.default);
    }

    function evaluateIntervalFunction(parameters, propertySpec, input) {
        // Edge cases
        if (getType(input) !== 'number') { return coalesce(parameters.default, propertySpec.default); }
        var n = parameters.stops.length;
        if (n === 1) { return parameters.stops[0][1]; }
        if (input <= parameters.stops[0][0]) { return parameters.stops[0][1]; }
        if (input >= parameters.stops[n - 1][0]) { return parameters.stops[n - 1][1]; }

        var index = findStopLessThanOrEqualTo$1(parameters.stops, input);

        return parameters.stops[index][1];
    }

    function evaluateExponentialFunction(parameters, propertySpec, input) {
        var base = parameters.base !== undefined ? parameters.base : 1;

        // Edge cases
        if (getType(input) !== 'number') { return coalesce(parameters.default, propertySpec.default); }
        var n = parameters.stops.length;
        if (n === 1) { return parameters.stops[0][1]; }
        if (input <= parameters.stops[0][0]) { return parameters.stops[0][1]; }
        if (input >= parameters.stops[n - 1][0]) { return parameters.stops[n - 1][1]; }

        var index = findStopLessThanOrEqualTo$1(parameters.stops, input);
        var t = interpolationFactor(
            input, base,
            parameters.stops[index][0],
            parameters.stops[index + 1][0]);

        var outputLower = parameters.stops[index][1];
        var outputUpper = parameters.stops[index + 1][1];
        var interp = exported$5[propertySpec.type] || identityFunction;

        if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
            var colorspace = exported$7[parameters.colorSpace];
            interp = function (a, b) { return colorspace.reverse(colorspace.interpolate(colorspace.forward(a), colorspace.forward(b), t)); };
        }

        if (typeof outputLower.evaluate === 'function') {
            return {
                evaluate: function evaluate() {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    var evaluatedLower = outputLower.evaluate.apply(undefined, args);
                    var evaluatedUpper = outputUpper.evaluate.apply(undefined, args);
                    // Special case for fill-outline-color, which has no spec default.
                    if (evaluatedLower === undefined || evaluatedUpper === undefined) {
                        return undefined;
                    }
                    return interp(evaluatedLower, evaluatedUpper, t);
                }
            };
        }

        return interp(outputLower, outputUpper, t);
    }

    function evaluateIdentityFunction(parameters, propertySpec, input) {
        if (propertySpec.type === 'color') {
            input = Color.parse(input);
        } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
            input = undefined;
        }
        return coalesce(input, parameters.default, propertySpec.default);
    }

    /**
     * Returns the index of the last stop <= input, or 0 if it doesn't exist.
     *
     * @private
     */
    function findStopLessThanOrEqualTo$1(stops, input) {
        var n = stops.length;
        var lowerIndex = 0;
        var upperIndex = n - 1;
        var currentIndex = 0;
        var currentValue, upperValue;

        while (lowerIndex <= upperIndex) {
            currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
            currentValue = stops[currentIndex][0];
            upperValue = stops[currentIndex + 1][0];
            if (input === currentValue || input > currentValue && input < upperValue) { // Search complete
                return currentIndex;
            } else if (currentValue < input) {
                lowerIndex = currentIndex + 1;
            } else if (currentValue > input) {
                upperIndex = currentIndex - 1;
            }
        }

        return Math.max(currentIndex - 1, 0);
    }

    /**
     * Returns a ratio that can be used to interpolate between exponential function
     * stops.
     *
     * How it works:
     * Two consecutive stop values define a (scaled and shifted) exponential
     * function `f(x) = a * base^x + b`, where `base` is the user-specified base,
     * and `a` and `b` are constants affording sufficient degrees of freedom to fit
     * the function to the given stops.
     *
     * Here's a bit of algebra that lets us compute `f(x)` directly from the stop
     * values without explicitly solving for `a` and `b`:
     *
     * First stop value: `f(x0) = y0 = a * base^x0 + b`
     * Second stop value: `f(x1) = y1 = a * base^x1 + b`
     * => `y1 - y0 = a(base^x1 - base^x0)`
     * => `a = (y1 - y0)/(base^x1 - base^x0)`
     *
     * Desired value: `f(x) = y = a * base^x + b`
     * => `f(x) = y0 + a * (base^x - base^x0)`
     *
     * From the above, we can replace the `a` in `a * (base^x - base^x0)` and do a
     * little algebra:
     * ```
     * a * (base^x - base^x0) = (y1 - y0)/(base^x1 - base^x0) * (base^x - base^x0)
     *                     = (y1 - y0) * (base^x - base^x0) / (base^x1 - base^x0)
     * ```
     *
     * If we let `(base^x - base^x0) / (base^x1 base^x0)`, then we have
     * `f(x) = y0 + (y1 - y0) * ratio`.  In other words, `ratio` may be treated as
     * an interpolation factor between the two stops' output values.
     *
     * (Note: a slightly different form for `ratio`,
     * `(base^(x-x0) - 1) / (base^(x1-x0) - 1) `, is equivalent, but requires fewer
     * expensive `Math.pow()` operations.)
     *
     * @private
     */
    function interpolationFactor(input, base, lowerValue, upperValue) {
        var difference = upperValue - lowerValue;
        var progress = input - lowerValue;

        if (difference === 0) {
            return 0;
        } else if (base === 1) {
            return progress / difference;
        } else {
            return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
        }
    }

    var exported$8 = {
        createFunction: createFunction,
        isFunction: isFunction$1
    };

    //      



















    var StyleExpression = function StyleExpression(expression          ) {
          this.expression = expression;
      };

    StyleExpression.prototype.evaluate = function evaluate (globals                , feature        )    {
        if (!this._evaluator) {
            this._evaluator = new EvaluationContext();
        }

        this._evaluator.globals = globals;
        this._evaluator.feature = feature;
        return this.expression.evaluate(this._evaluator);
    };

    var StyleExpressionWithErrorHandling = (function (StyleExpression) {
      function StyleExpressionWithErrorHandling(expression            , propertySpec                            ) {
            StyleExpression.call(this, expression);
            this._warningHistory = {};
            this._defaultValue = getDefaultValue(propertySpec);
            if (propertySpec.type === 'enum') {
                this._enumValues = propertySpec.values;
            }
        }

      if ( StyleExpression ) StyleExpressionWithErrorHandling.__proto__ = StyleExpression;
      StyleExpressionWithErrorHandling.prototype = Object.create( StyleExpression && StyleExpression.prototype );
      StyleExpressionWithErrorHandling.prototype.constructor = StyleExpressionWithErrorHandling;

        StyleExpressionWithErrorHandling.prototype.evaluate = function evaluate (globals                  , feature          ) {
            if (!this._evaluator) {
                this._evaluator = new EvaluationContext();
            }

            this._evaluator.globals = globals;
            this._evaluator.feature = feature;

            try {
                var val = this.expression.evaluate(this._evaluator);
                if (val === null || val === undefined) {
                    return this._defaultValue;
                }
                if (this._enumValues && !(val in this._enumValues)) {
                    throw new RuntimeError(("Expected value to be one of " + (Object.keys(this._enumValues).map(function (v) { return JSON.stringify(v); }).join(', ')) + ", but found " + (JSON.stringify(val)) + " instead."));
                }
                return val;
            } catch (e) {
                if (!this._warningHistory[e.message]) {
                    this._warningHistory[e.message] = true;
                    if (typeof console !== 'undefined') {
                        console.warn(e.message);
                    }
                }
                return this._defaultValue;
            }
        };

      return StyleExpressionWithErrorHandling;
    }(StyleExpression));

    function isExpression(expression       ) {
        return Array.isArray(expression) && expression.length > 0 &&
            typeof expression[0] === 'string' && expression[0] in expressions;
    }

    /**
     * Parse and typecheck the given style spec JSON expression.  If
     * options.defaultValue is provided, then the resulting StyleExpression's
     * `evaluate()` method will handle errors by logging a warning (once per
     * message) and returning the default value.  Otherwise, it will throw
     * evaluation errors.
     *
     * @private
     */
    function createExpression(expression       ,
                              propertySpec                            ,
                              options)                                               {
        if ( options === void 0 ) options                           = {};

        var parser = new ParsingContext(expressions, [], getExpectedType(propertySpec));
        var parsed = parser.parse(expression);
        if (!parsed) {
            assert_1(parser.errors.length > 0);
            return error(parser.errors);
        }

        if (options.handleErrors === false) {
            return success(new StyleExpression(parsed));
        } else {
            return success(new StyleExpressionWithErrorHandling(parsed, propertySpec));
        }
    }

    var ZoomConstantExpression = function ZoomConstantExpression(kind    , expression               ) {
          this.kind = kind;
          this._styleExpression = expression;
      };
    ZoomConstantExpression.prototype.evaluate = function evaluate (globals                , feature        )    {
        return this._styleExpression.evaluate(globals, feature);
    };

    var ZoomDependentExpression = function ZoomDependentExpression(kind    , expression               , zoomCurve                  ) {
          this.kind = kind;
          this.zoomStops = zoomCurve.labels;
          this._styleExpression = expression;
          if (zoomCurve instanceof Interpolate) {
              this._interpolationType = zoomCurve.interpolation;
          }
      };

    ZoomDependentExpression.prototype.evaluate = function evaluate (globals                , feature        )    {
        return this._styleExpression.evaluate(globals, feature);
    };

    ZoomDependentExpression.prototype.interpolationFactor = function interpolationFactor (input      , lower      , upper      )       {
        if (this._interpolationType) {
            return Interpolate.interpolationFactor(this._interpolationType, input, lower, upper);
        } else {
            return 0;
        }
    };































    function createPropertyExpression(expression       ,
                                      propertySpec                            ,
                                      options)                                                       {
        if ( options === void 0 ) options                           = {};

        expression = createExpression(expression, propertySpec, options);
        if (expression.result === 'error') {
            return expression;
        }

        var parsed = expression.value.expression;

        var isFeatureConstant$$1 = exported$3.isFeatureConstant(parsed);
        if (!isFeatureConstant$$1 && !propertySpec['property-function']) {
            return error([new ParsingError$1('', 'property expressions not supported')]);
        }

        var isZoomConstant = exported$3.isGlobalPropertyConstant(parsed, ['zoom']);
        if (!isZoomConstant && propertySpec['zoom-function'] === false) {
            return error([new ParsingError$1('', 'zoom expressions not supported')]);
        }

        var zoomCurve = findZoomCurve(parsed);
        if (!zoomCurve && !isZoomConstant) {
            return error([new ParsingError$1('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
        } else if (zoomCurve instanceof ParsingError$1) {
            return error([zoomCurve]);
        } else if (zoomCurve instanceof Interpolate && propertySpec['function'] === 'piecewise-constant') {
            return error([new ParsingError$1('', '"interpolate" expressions cannot be used with this property')]);
        }

        if (!zoomCurve) {
            return success(isFeatureConstant$$1 ?
                (new ZoomConstantExpression('constant', expression.value)                    ) :
                (new ZoomConstantExpression('source', expression.value)                  ));
        }

        return success(isFeatureConstant$$1 ?
            (new ZoomDependentExpression('camera', expression.value, zoomCurve)                  ) :
            (new ZoomDependentExpression('composite', expression.value, zoomCurve)                     ));
    }

    // serialization wrapper for old-style stop functions normalized to the
    // expression interface
    var StylePropertyFunction = function StylePropertyFunction(parameters                             , specification                          ) {
          this._parameters = parameters;
          this._specification = specification;
          extend(this, createFunction(this._parameters, this._specification));
      };

    StylePropertyFunction.deserialize = function deserialize (serialized                                                                                        ) {
        return ((new StylePropertyFunction(serialized._parameters, serialized._specification))                        );
    };

    StylePropertyFunction.serialize = function serialize (input                        ) {
        return {
            _parameters: input._parameters,
            _specification: input._specification
        };
    };

    function normalizePropertyExpression   (value                               , specification                            )                          {
        if (isFunction$1(value)) {
            return (new StylePropertyFunction(value, specification)     );

        } else if (isExpression(value)) {
            var expression = createPropertyExpression(value, specification);
            if (expression.result === 'error') {
                // this should have been caught in validation
                throw new Error(expression.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
            }
            return expression.value;

        } else {
            var constant      = value;
            if (typeof value === 'string' && specification.type === 'color') {
                constant = Color.parse(value);
            }
            return {
                kind: 'constant',
                evaluate: function () { return constant; }
            };
        }
    }

    var exported$9 = {
        StyleExpression: StyleExpression,
        StyleExpressionWithErrorHandling: StyleExpressionWithErrorHandling,
        isExpression: isExpression,
        createExpression: createExpression,
        createPropertyExpression: createPropertyExpression,
        normalizePropertyExpression: normalizePropertyExpression,
        ZoomConstantExpression: ZoomConstantExpression,
        ZoomDependentExpression: ZoomDependentExpression,
        StylePropertyFunction: StylePropertyFunction
    };

    // Zoom-dependent expressions may only use ["zoom"] as the input to a top-level "step" or "interpolate"
    // expression (collectively referred to as a "curve"). The curve may be wrapped in one or more "let" or
    // "coalesce" expressions.
    function findZoomCurve(expression            )                                           {
        var result = null;
        if (expression instanceof Let) {
            result = findZoomCurve(expression.result);

        } else if (expression instanceof Coalesce) {
            for (var i = 0, list = expression.args; i < list.length; i += 1) {
                var arg = list[i];

              result = findZoomCurve(arg);
                if (result) {
                    break;
                }
            }

        } else if ((expression instanceof Step || expression instanceof Interpolate) &&
            expression.input instanceof CompoundExpression &&
            expression.input.name === 'zoom') {

            result = expression;
        }

        if (result instanceof ParsingError$1) {
            return result;
        }

        expression.eachChild(function (child) {
            var childResult = findZoomCurve(child);
            if (childResult instanceof ParsingError$1) {
                result = childResult;
            } else if (!result && childResult) {
                result = new ParsingError$1('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
            } else if (result && childResult && result !== childResult) {
                result = new ParsingError$1('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
            }
        });

        return result;
    }

    function getExpectedType(spec                            )              {
        var types = {
            color: ColorType,
            string: StringType,
            number: NumberType,
            enum: StringType,
            boolean: BooleanType
        };

        if (spec.type === 'array') {
            return array(types[spec.value] || ValueType, spec.length);
        }

        return types[spec.type] || null;
    }

    function getDefaultValue(spec                            )        {
        if (spec.type === 'color' && isFunction$1(spec.default)) {
            // Special case for heatmap-color: it uses the 'default:' to define a
            // default color ramp, but createExpression expects a simple value to fall
            // back to in case of runtime errors
            return new Color(0, 0, 0, 0);
        } else if (spec.type === 'color') {
            return Color.parse(spec.default) || null;
        } else if (spec.default === undefined) {
            return null;
        } else {
            return spec.default;
        }
    }

    //      

    function isExpressionFilter(filter     ) {
        if (!Array.isArray(filter) || filter.length === 0) {
            return false;
        }
        switch (filter[0]) {
        case 'has':
            return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';

        case 'in':
        case '!in':
        case '!has':
        case 'none':
            return false;

        case '==':
        case '!=':
        case '>':
        case '>=':
        case '<':
        case '<=':
            return filter.length === 3 && (Array.isArray(filter[1]) || Array.isArray(filter[2]));

        case 'any':
        case 'all':
            for (var i = 0, list = filter.slice(1); i < list.length; i += 1) {
                var f = list[i];

            if (!isExpressionFilter(f) && typeof f !== 'boolean') {
                    return false;
                }
            }
            return true;

        default:
            return true;
        }
    }

    var filterSpec = {
        'type': 'boolean',
        'default': false,
        'function': true,
        'property-function': true,
        'zoom-function': true
    };

    /**
     * Given a filter expressed as nested arrays, return a new function
     * that evaluates whether a given feature (with a .properties or .tags property)
     * passes its test.
     *
     * @private
     * @param {Array} filter mapbox gl filter
     * @returns {Function} filter-evaluating function
     */
    function createFilter(filter     )                {
        if (!filter) {
            return function () { return true; };
        }

        if (!isExpressionFilter(filter)) {
            filter = convertFilter(filter);
        }

        var compiled = createExpression(filter, filterSpec);
        if (compiled.result === 'error') {
            throw new Error(compiled.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
        } else {
            return function (globalProperties                  , feature                   ) { return compiled.value.evaluate(globalProperties, feature); };
        }
    }

    // Comparison function to sort numbers and strings
    function compare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    function convertFilter(filter             )        {
        if (!filter) { return true; }
        var op = filter[0];
        if (filter.length <= 1) { return (op !== 'any'); }
        var converted =
            op === '==' ? convertComparisonOp(filter[1], filter[2], '==') :
            op === '!=' ? convertNegation(convertComparisonOp(filter[1], filter[2], '==')) :
            op === '<' ||
            op === '>' ||
            op === '<=' ||
            op === '>=' ? convertComparisonOp(filter[1], filter[2], op) :
            op === 'any' ? convertDisjunctionOp(filter.slice(1)) :
            op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter)) :
            op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter).map(convertNegation)) :
            op === 'in' ? convertInOp(filter[1], filter.slice(2)) :
            op === '!in' ? convertNegation(convertInOp(filter[1], filter.slice(2))) :
            op === 'has' ? convertHasOp(filter[1]) :
            op === '!has' ? convertNegation(convertHasOp(filter[1])) :
            true;
        return converted;
    }

    function convertComparisonOp(property        , value     , op        ) {
        switch (property) {
        case '$type':
            return [("filter-type-" + op), value];
        case '$id':
            return [("filter-id-" + op), value];
        default:
            return [("filter-" + op), property, value];
        }
    }

    function convertDisjunctionOp(filters                   ) {
        return ['any'].concat(filters.map(convertFilter));
    }

    function convertInOp(property        , values            ) {
        if (values.length === 0) { return false; }
        switch (property) {
        case '$type':
            return ["filter-type-in", ['literal', values]];
        case '$id':
            return ["filter-id-in", ['literal', values]];
        default:
            if (values.length > 200 && !values.some(function (v) { return typeof v !== typeof values[0]; })) {
                return ['filter-in-large', property, ['literal', values.sort(compare)]];
            } else {
                return ['filter-in-small', property, ['literal', values]];
            }
        }
    }

    function convertHasOp(property        ) {
        switch (property) {
        case '$type':
            return true;
        case '$id':
            return ["filter-has-id"];
        default:
            return ["filter-has", property];
        }
    }

    function convertNegation(filter       ) {
        return ['!', filter];
    }

    //      

    function convertFunction(parameters                                 , propertySpec                            ) {
        var expression;

        parameters = extend({}, parameters);
        var defaultExpression;
        if (typeof parameters.default !== 'undefined') {
            defaultExpression = convertValue(parameters.default, propertySpec);
        } else {
            defaultExpression = convertValue(propertySpec.default, propertySpec);
            if (defaultExpression === null) {
                defaultExpression = ['error', 'No default property value available.'];
            }
        }

        if (parameters.stops) {
            var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
            var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
            var zoomDependent = zoomAndFeatureDependent || !featureDependent;

            var stops = parameters.stops.map(function (stop) {
                if (!featureDependent && propertySpec.tokens && typeof stop[1] === 'string') {
                    return [stop[0], convertTokenString(stop[1])];

                }
                return [stop[0], convertValue(stop[1], propertySpec)];
            });

            if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
                throw new Error('Unimplemented');
            }

            if (zoomAndFeatureDependent) {
                expression = convertZoomAndPropertyFunction(parameters, propertySpec, stops, defaultExpression);
            } else if (zoomDependent) {
                expression = convertZoomFunction(parameters, propertySpec, stops);
            } else {
                expression = convertPropertyFunction(parameters, propertySpec, stops, defaultExpression);
            }
        } else {
            // identity function
            expression = convertIdentityFunction(parameters, propertySpec, defaultExpression);
        }

        return expression;
    }

    function convertIdentityFunction(parameters, propertySpec, defaultExpression) {
        var get = ['get', parameters.property];

        if (propertySpec.type === 'color') {
            return parameters.default === undefined ? get : ['to-color', get, parameters.default];
        } else if (propertySpec.type === 'array' && typeof propertySpec.length === 'number') {
            return ['array', propertySpec.value, propertySpec.length, get];
        } else if (propertySpec.type === 'array') {
            return ['array', propertySpec.value, get];
        } else if (propertySpec.type === 'enum') {
            return [
                'let',
                'property_value', ['string', get],
                [
                    'match',
                    ['var', 'property_value'],
                    Object.keys(propertySpec.values), ['var', 'property_value'],
                    defaultExpression
                ]
            ];
        } else {
            return parameters.default === undefined ? get : [propertySpec.type, get, parameters.default];
        }
    }

    function convertValue(value, spec) {
        if (typeof value === 'undefined' || value === null) { return null; }
        if (spec.type === 'color') {
            return value;
        } else if (spec.type === 'array') {
            return ['literal', value];
        } else {
            return value;
        }
    }

    function convertZoomAndPropertyFunction(parameters, propertySpec, stops, defaultExpression) {
        var featureFunctionParameters = {};
        var featureFunctionStops = {};
        var zoomStops = [];
        for (var s = 0; s < stops.length; s++) {
            var stop = stops[s];
            var zoom = stop[0].zoom;
            if (featureFunctionParameters[zoom] === undefined) {
                featureFunctionParameters[zoom] = {
                    zoom: zoom,
                    type: parameters.type,
                    property: parameters.property,
                    default: parameters.default,
                };
                featureFunctionStops[zoom] = [];
                zoomStops.push(zoom);
            }
            featureFunctionStops[zoom].push([stop[0].value, stop[1]]);
        }

        // the interpolation type for the zoom dimension of a zoom-and-property
        // function is determined directly from the style property specification
        // for which it's being used: linear for interpolatable properties, step
        // otherwise.
        var functionType = getFunctionType({}, propertySpec);
        if (functionType === 'exponential') {
            var expression = ['interpolate', ['linear'], ['zoom']];

            for (var i = 0, list = zoomStops; i < list.length; i += 1) {
                var z = list[i];

                var output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z], defaultExpression);
                appendStopPair(expression, z, output, false);
            }

            return expression;
        } else {
            var expression$1 = ['step', ['zoom']];

            for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
                var z$1 = list$1[i$1];

                var output$1 = convertPropertyFunction(featureFunctionParameters[z$1], propertySpec, featureFunctionStops[z$1], defaultExpression);
                appendStopPair(expression$1, z$1, output$1, true);
            }

            fixupDegenerateStepCurve(expression$1);

            return expression$1;
        }
    }

    function convertPropertyFunction(parameters, propertySpec, stops, defaultExpression) {
        var type = getFunctionType(parameters, propertySpec);

        var inputType = typeof stops[0][0];
        assert_1(
            inputType === 'string' ||
            inputType === 'number' ||
            inputType === 'boolean'
        );

        var input = [inputType, ['get', parameters.property]];

        var expression;
        var isStep = false;
        if (type === 'categorical' && inputType === 'boolean') {
            assert_1(parameters.stops.length > 0 && parameters.stops.length <= 2);
            if (parameters.stops[0][0] === false) {
                input = ['!', input];
            }
            expression = [ 'case', input, parameters.stops[0][1] ];
            if (parameters.stops.length > 1) {
                expression.push(parameters.stops[1][1]);
            } else {
                expression.push(defaultExpression);
            }
            return expression;
        } else if (type === 'categorical') {
            expression = ['match', input];
        } else if (type === 'interval') {
            expression = ['step', input];
            isStep = true;
        } else if (type === 'exponential') {
            var base = parameters.base !== undefined ? parameters.base : 1;
            expression = ['interpolate', ['exponential', base], input];
        } else {
            throw new Error(("Unknown property function type " + type));
        }

        for (var i = 0, list = stops; i < list.length; i += 1) {
            var stop = list[i];

            appendStopPair(expression, stop[0], stop[1], isStep);
        }

        if (expression[0] === 'match') {
            expression.push(defaultExpression);
        }

        fixupDegenerateStepCurve(expression);

        return expression;
    }

    function convertZoomFunction(parameters, propertySpec, stops, input) {
        if ( input === void 0 ) input = ['zoom'];

        var type = getFunctionType(parameters, propertySpec);
        var expression;
        var isStep = false;
        if (type === 'interval') {
            expression = ['step', input];
            isStep = true;
        } else if (type === 'exponential') {
            var base = parameters.base !== undefined ? parameters.base : 1;
            expression = ['interpolate', ['exponential', base], input];
        } else {
            throw new Error(("Unknown zoom function type \"" + type + "\""));
        }

        for (var i = 0, list = stops; i < list.length; i += 1) {
            var stop = list[i];

            appendStopPair(expression, stop[0], stop[1], isStep);
        }

        fixupDegenerateStepCurve(expression);

        return expression;
    }

    function fixupDegenerateStepCurve(expression) {
        // degenerate step curve (i.e. a constant function): add a noop stop
        if (expression[0] === 'step' && expression.length === 3) {
            expression.push(0);
            expression.push(expression[3]);
        }
    }

    function appendStopPair(curve, input, output, isStep) {
        // Skip duplicate stop values. They were not validated for functions, but they are for expressions.
        // https://github.com/mapbox/mapbox-gl-js/issues/4107
        if (curve.length > 3 && input === curve[curve.length - 2]) {
            return;
        }
        // step curves don't get the first input value, as it is redundant.
        if (!(isStep && curve.length === 2)) {
            curve.push(input);
        }
        curve.push(output);
    }

    function getFunctionType(parameters, propertySpec) {
        if (parameters.type) {
            return parameters.type;
        } else if (propertySpec.function) {
            return propertySpec.function === 'interpolated' ? 'exponential' : 'interval';
        } else {
            return 'exponential';
        }
    }

    // "String with {name} token" => ["concat", "String with ", ["get", "name"], " token"]
    function convertTokenString(s) {
        var result = ['concat'];
        var re = /{([^{}]+)}/g;
        var pos = 0;
        var match;
        while ((match = re.exec(s)) !== null) {
            var literal = s.slice(pos, re.lastIndex - match[0].length);
            pos = re.lastIndex;
            if (literal.length > 0) { result.push(literal); }
            result.push(['to-string', ['get', match[1]]]);
        }

        if (result.length === 1) {
            return s;
        }

        if (pos < s.length) {
            result.push(s.slice(pos));
        } else if (result.length === 2) {
            return result[1];
        }

        return result;
    }

    function validateConstants(options) {
        var key = options.key;
        var constants = options.value;

        if (constants) {
            return [new ValidationError(key, constants, 'constants have been deprecated as of v8')];
        } else {
            return [];
        }
    }

    // Turn jsonlint-lines-primitives objects into primitive objects
    function unbundle(value) {
        if (value instanceof Number || value instanceof String || value instanceof Boolean) {
            return value.valueOf();
        } else {
            return value;
        }
    }

    // Main recursive validation function. Tracks:
    //
    // - key: string representing location of validation in style tree. Used only
    //   for more informative error reporting.
    // - value: current value from style being evaluated. May be anything from a
    //   high level object that needs to be descended into deeper or a simple
    //   scalar value.
    // - valueSpec: current spec being evaluated. Tracks value.
    // - styleSpec: current full spec being evaluated.

    function validate(options) {

        var validateFunction = require('./validate_function');
        var validateExpression = require('./validate_expression');
        var validateObject = require('./validate_object');
        var VALIDATORS = {
            '*': function() {
                return [];
            },
            'array': require('./validate_array'),
            'boolean': require('./validate_boolean'),
            'number': require('./validate_number'),
            'color': require('./validate_color'),
            'constants': require('./validate_constants'),
            'enum': require('./validate_enum'),
            'filter': require('./validate_filter'),
            'function': require('./validate_function'),
            'layer': require('./validate_layer'),
            'object': require('./validate_object'),
            'source': require('./validate_source'),
            'light': require('./validate_light'),
            'string': require('./validate_string')
        };

        var value = options.value;
        var valueSpec = options.valueSpec;
        var styleSpec = options.styleSpec;

        if (valueSpec.function && isFunction$1(unbundle(value))) {
            return validateFunction(options);

        } else if (valueSpec.function && isExpression(unbundle.deep(value))) {
            return validateExpression(options);

        } else if (valueSpec.type && VALIDATORS[valueSpec.type]) {
            return VALIDATORS[valueSpec.type](options);

        } else {
            return validateObject(extend({}, options, {
                valueSpec: valueSpec.type ? styleSpec[valueSpec.type] : valueSpec
            }));
        }
    }

    function validateString(options) {
        var value = options.value;
        var key = options.key;
        var type = getType(value);

        if (type !== 'string') {
            return [new ValidationError(key, value, ("string expected, " + type + " found"))];
        }

        return [];
    }

    function validateGlyphsURL(options) {
        var value = options.value;
        var key = options.key;

        var errors = validateString(options);
        if (errors.length) { return errors; }

        if (value.indexOf('{fontstack}') === -1) {
            errors.push(new ValidationError(key, value, '"glyphs" url must include a "{fontstack}" token'));
        }

        if (value.indexOf('{range}') === -1) {
            errors.push(new ValidationError(key, value, '"glyphs" url must include a "{range}" token'));
        }

        return errors;
    }

    function validateObject(options) {
        var key = options.key;
        var object = options.value;
        var elementSpecs = options.valueSpec || {};
        var elementValidators = options.objectElementValidators || {};
        var style = options.style;
        var styleSpec = options.styleSpec;
        var errors = [];

        var type = getType(object);
        if (type !== 'object') {
            return [new ValidationError(key, object, ("object expected, " + type + " found"))];
        }

        for (var objectKey in object) {
            var elementSpecKey = objectKey.split('.')[0]; // treat 'paint.*' as 'paint'
            var elementSpec = elementSpecs[elementSpecKey] || elementSpecs['*'];

            var validateElement = (void 0);
            if (elementValidators[elementSpecKey]) {
                validateElement = elementValidators[elementSpecKey];
            } else if (elementSpecs[elementSpecKey]) {
                validateElement = validate;
            } else if (elementValidators['*']) {
                validateElement = elementValidators['*'];
            } else if (elementSpecs['*']) {
                validateElement = validate;
            } else {
                errors.push(new ValidationError(key, object[objectKey], ("unknown property \"" + objectKey + "\"")));
                continue;
            }

            errors = errors.concat(validateElement({
                key: (key ? (key + ".") : key) + objectKey,
                value: object[objectKey],
                valueSpec: elementSpec,
                style: style,
                styleSpec: styleSpec,
                object: object,
                objectKey: objectKey
            }, object));
        }

        for (var elementSpecKey$1 in elementSpecs) {
            // Don't check `required` when there's a custom validator for that property.
            if (elementValidators[elementSpecKey$1]) {
                continue;
            }

            if (elementSpecs[elementSpecKey$1].required && elementSpecs[elementSpecKey$1]['default'] === undefined && object[elementSpecKey$1] === undefined) {
                errors.push(new ValidationError(key, object, ("missing required property \"" + elementSpecKey$1 + "\"")));
            }
        }

        return errors;
    }

    function validateEnum(options) {
        var key = options.key;
        var value = options.value;
        var valueSpec = options.valueSpec;
        var errors = [];

        if (Array.isArray(valueSpec.values)) { // <=v7
            if (valueSpec.values.indexOf(unbundle(value)) === -1) {
                errors.push(new ValidationError(key, value, ("expected one of [" + (valueSpec.values.join(', ')) + "], " + (JSON.stringify(value)) + " found")));
            }
        } else { // >=v8
            if (Object.keys(valueSpec.values).indexOf(unbundle(value)) === -1) {
                errors.push(new ValidationError(key, value, ("expected one of [" + (Object.keys(valueSpec.values).join(', ')) + "], " + (JSON.stringify(value)) + " found")));
            }
        }
        return errors;
    }

    function validateSource(options) {
        var value = options.value;
        var key = options.key;
        var styleSpec = options.styleSpec;
        var style = options.style;

        if (!value.type) {
            return [new ValidationError(key, value, '"type" is required')];
        }

        var type = unbundle(value.type);
        var errors = [];

        switch (type) {
        case 'vector':
        case 'raster':
        case 'raster-dem':
            errors = errors.concat(validateObject({
                key: key,
                value: value,
                valueSpec: styleSpec[("source_" + (type.replace('-', '_')))],
                style: options.style,
                styleSpec: styleSpec
            }));
            if ('url' in value) {
                for (var prop in value) {
                    if (['type', 'url', 'tileSize'].indexOf(prop) < 0) {
                        errors.push(new ValidationError((key + "." + prop), value[prop], ("a source with a \"url\" property may not include a \"" + prop + "\" property")));
                    }
                }
            }
            return errors;

        case 'geojson':
            return validateObject({
                key: key,
                value: value,
                valueSpec: styleSpec.source_geojson,
                style: style,
                styleSpec: styleSpec
            });

        case 'video':
            return validateObject({
                key: key,
                value: value,
                valueSpec: styleSpec.source_video,
                style: style,
                styleSpec: styleSpec
            });

        case 'image':
            return validateObject({
                key: key,
                value: value,
                valueSpec: styleSpec.source_image,
                style: style,
                styleSpec: styleSpec
            });

        case 'canvas':
            return validateObject({
                key: key,
                value: value,
                valueSpec: styleSpec.source_canvas,
                style: style,
                styleSpec: styleSpec
            });

        default:
            return validateEnum({
                key: (key + ".type"),
                value: value.type,
                valueSpec: {values: ['vector', 'raster', 'raster-dem', 'geojson', 'video', 'image', 'canvas']},
                style: style,
                styleSpec: styleSpec
            });
        }
    }

    function validateLight(options) {
        var light = options.value;
        var styleSpec = options.styleSpec;
        var lightSpec = styleSpec.light;
        var style = options.style;

        var errors = [];

        var rootType = getType(light);
        if (light === undefined) {
            return errors;
        } else if (rootType !== 'object') {
            errors = errors.concat([new ValidationError('light', light, ("object expected, " + rootType + " found"))]);
            return errors;
        }

        for (var key in light) {
            var transitionMatch = key.match(/^(.*)-transition$/);

            if (transitionMatch && lightSpec[transitionMatch[1]] && lightSpec[transitionMatch[1]].transition) {
                errors = errors.concat(validate({
                    key: key,
                    value: light[key],
                    valueSpec: styleSpec.transition,
                    style: style,
                    styleSpec: styleSpec
                }));
            } else if (lightSpec[key]) {
                errors = errors.concat(validate({
                    key: key,
                    value: light[key],
                    valueSpec: lightSpec[key],
                    style: style,
                    styleSpec: styleSpec
                }));
            } else {
                errors = errors.concat([new ValidationError(key, light[key], ("unknown property \"" + key + "\""))]);
            }
        }

        return errors;
    }

    //      

    function validateExpression(options     ) {
        var expression = (options.expressionContext === 'property' ? createPropertyExpression : createExpression)(unbundle.deep(options.value), options.valueSpec);
        if (expression.result === 'error') {
            return expression.value.map(function (error) {
                return new ValidationError(("" + (options.key) + (error.key)), options.value, error.message);
            });
        }

        if (options.expressionContext === 'property' && options.propertyKey === 'text-font' &&
            (expression.value     )._styleExpression.expression.possibleOutputs().indexOf(undefined) !== -1) {
            return [new ValidationError(options.key, options.value, 'Invalid data expression for "text-font". Output values must be contained as literals within the expression.')];
        }

        return [];
    }

    function validateFilter(options) {
        if (isExpressionFilter(unbundle.deep(options.value))) {
            return validateExpression(extend({}, options, {
                expressionContext: 'filter',
                valueSpec: { value: 'boolean' }
            }));
        } else {
            return validateNonExpressionFilter(options);
        }
    }
    function validateNonExpressionFilter(options) {
        var value = options.value;
        var key = options.key;

        if (getType(value) !== 'array') {
            return [new ValidationError(key, value, ("array expected, " + (getType(value)) + " found"))];
        }

        var styleSpec = options.styleSpec;
        var type;

        var errors = [];

        if (value.length < 1) {
            return [new ValidationError(key, value, 'filter array must have at least 1 element')];
        }

        errors = errors.concat(validateEnum({
            key: (key + "[0]"),
            value: value[0],
            valueSpec: styleSpec.filter_operator,
            style: options.style,
            styleSpec: options.styleSpec
        }));

        switch (unbundle(value[0])) {
        case '<':
        case '<=':
        case '>':
        case '>=':
            if (value.length >= 2 && unbundle(value[1]) === '$type') {
                errors.push(new ValidationError(key, value, ("\"$type\" cannot be use with operator \"" + (value[0]) + "\"")));
            }
            /* falls through */
        case '==':
        case '!=':
            if (value.length !== 3) {
                errors.push(new ValidationError(key, value, ("filter array for operator \"" + (value[0]) + "\" must have 3 elements")));
            }
            /* falls through */
        case 'in':
        case '!in':
            if (value.length >= 2) {
                type = getType(value[1]);
                if (type !== 'string') {
                    errors.push(new ValidationError((key + "[1]"), value[1], ("string expected, " + type + " found")));
                }
            }
            for (var i = 2; i < value.length; i++) {
                type = getType(value[i]);
                if (unbundle(value[1]) === '$type') {
                    errors = errors.concat(validateEnum({
                        key: (key + "[" + i + "]"),
                        value: value[i],
                        valueSpec: styleSpec.geometry_type,
                        style: options.style,
                        styleSpec: options.styleSpec
                    }));
                } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
                    errors.push(new ValidationError((key + "[" + i + "]"), value[i], ("string, number, or boolean expected, " + type + " found")));
                }
            }
            break;

        case 'any':
        case 'all':
        case 'none':
            for (var i$1 = 1; i$1 < value.length; i$1++) {
                errors = errors.concat(validateNonExpressionFilter({
                    key: (key + "[" + i$1 + "]"),
                    value: value[i$1],
                    style: options.style,
                    styleSpec: options.styleSpec
                }));
            }
            break;

        case 'has':
        case '!has':
            type = getType(value[1]);
            if (value.length !== 2) {
                errors.push(new ValidationError(key, value, ("filter array for \"" + (value[0]) + "\" operator must have 2 elements")));
            } else if (type !== 'string') {
                errors.push(new ValidationError((key + "[1]"), value[1], ("string expected, " + type + " found")));
            }
            break;

        }

        return errors;
    }

    function validateProperty(options, propertyType) {
        var key = options.key;
        var style = options.style;
        var styleSpec = options.styleSpec;
        var value = options.value;
        var propertyKey = options.objectKey;
        var layerSpec = styleSpec[(propertyType + "_" + (options.layerType))];

        if (!layerSpec) { return []; }

        var transitionMatch = propertyKey.match(/^(.*)-transition$/);
        if (propertyType === 'paint' && transitionMatch && layerSpec[transitionMatch[1]] && layerSpec[transitionMatch[1]].transition) {
            return validate({
                key: key,
                value: value,
                valueSpec: styleSpec.transition,
                style: style,
                styleSpec: styleSpec
            });
        }

        var valueSpec = options.valueSpec || layerSpec[propertyKey];
        if (!valueSpec) {
            return [new ValidationError(key, value, ("unknown property \"" + propertyKey + "\""))];
        }

        var tokenMatch;
        if (getType(value) === 'string' && valueSpec['property-function'] && !valueSpec.tokens && (tokenMatch = /^{([^}]+)}$/.exec(value))) {
            return [new ValidationError(
                key, value,
                "\"" + propertyKey + "\" does not support interpolation syntax\n" +
                    "Use an identity property function instead: `{ \"type\": \"identity\", \"property\": " + (JSON.stringify(tokenMatch[1])) + " }`.")];
        }

        var errors = [];

        if (options.layerType === 'symbol') {
            if (propertyKey === 'text-field' && style && !style.glyphs) {
                errors.push(new ValidationError(key, value, 'use of "text-field" requires a style "glyphs" property'));
            }
            if (propertyKey === 'text-font' && isFunction$1(unbundle.deep(value)) && unbundle(value.type) === 'identity') {
                errors.push(new ValidationError(key, value, '"text-font" does not support identity functions'));
            }
        }

        return errors.concat(validate({
            key: options.key,
            value: value,
            valueSpec: valueSpec,
            style: style,
            styleSpec: styleSpec,
            expressionContext: 'property',
            propertyKey: propertyKey
        }));
    }

    function validatePaintProperty(options) {
        return validateProperty(options, 'paint');
    }

    function validateLayoutProperty(options) {
        return validateProperty(options, 'layout');
    }

    function validateLayer(options) {
        var errors = [];

        var layer = options.value;
        var key = options.key;
        var style = options.style;
        var styleSpec = options.styleSpec;

        if (!layer.type && !layer.ref) {
            errors.push(new ValidationError(key, layer, 'either "type" or "ref" is required'));
        }
        var type = unbundle(layer.type);
        var ref = unbundle(layer.ref);

        if (layer.id) {
            var layerId = unbundle(layer.id);
            for (var i = 0; i < options.arrayIndex; i++) {
                var otherLayer = style.layers[i];
                if (unbundle(otherLayer.id) === layerId) {
                    errors.push(new ValidationError(key, layer.id, ("duplicate layer id \"" + (layer.id) + "\", previously used at line " + (otherLayer.id.__line__))));
                }
            }
        }

        if ('ref' in layer) {
            ['type', 'source', 'source-layer', 'filter', 'layout'].forEach(function (p) {
                if (p in layer) {
                    errors.push(new ValidationError(key, layer[p], ("\"" + p + "\" is prohibited for ref layers")));
                }
            });

            var parent;

            style.layers.forEach(function (layer) {
                if (unbundle(layer.id) === ref) { parent = layer; }
            });

            if (!parent) {
                errors.push(new ValidationError(key, layer.ref, ("ref layer \"" + ref + "\" not found")));
            } else if (parent.ref) {
                errors.push(new ValidationError(key, layer.ref, 'ref cannot reference another ref layer'));
            } else {
                type = unbundle(parent.type);
            }
        } else if (type !== 'background') {
            if (!layer.source) {
                errors.push(new ValidationError(key, layer, 'missing required property "source"'));
            } else {
                var source = style.sources && style.sources[layer.source];
                var sourceType = source && unbundle(source.type);
                if (!source) {
                    errors.push(new ValidationError(key, layer.source, ("source \"" + (layer.source) + "\" not found")));
                } else if (sourceType === 'vector' && type === 'raster') {
                    errors.push(new ValidationError(key, layer.source, ("layer \"" + (layer.id) + "\" requires a raster source")));
                } else if (sourceType === 'raster' && type !== 'raster') {
                    errors.push(new ValidationError(key, layer.source, ("layer \"" + (layer.id) + "\" requires a vector source")));
                } else if (sourceType === 'vector' && !layer['source-layer']) {
                    errors.push(new ValidationError(key, layer, ("layer \"" + (layer.id) + "\" must specify a \"source-layer\"")));
                } else if (sourceType === 'raster-dem' && type !== 'hillshade') {
                    errors.push(new ValidationError(key, layer.source, 'raster-dem source can only be used with layer type \'hillshade\'.'));
                }
            }
        }

        errors = errors.concat(validateObject({
            key: key,
            value: layer,
            valueSpec: styleSpec.layer,
            style: options.style,
            styleSpec: options.styleSpec,
            objectElementValidators: {
                '*': function() {
                    return [];
                },
                // We don't want to enforce the spec's `"requires": true` for backward compatibility with refs;
                // the actual requirement is validated above. See https://github.com/mapbox/mapbox-gl-js/issues/5772.
                type: function() {
                    return validate({
                        key: (key + ".type"),
                        value: layer.type,
                        valueSpec: styleSpec.layer.type,
                        style: options.style,
                        styleSpec: options.styleSpec,
                        object: layer,
                        objectKey: 'type'
                    });
                },
                filter: validateFilter,
                layout: function(options) {
                    return validateObject({
                        layer: layer,
                        key: options.key,
                        value: options.value,
                        style: options.style,
                        styleSpec: options.styleSpec,
                        objectElementValidators: {
                            '*': function(options) {
                                return validateLayoutProperty(extend({layerType: type}, options));
                            }
                        }
                    });
                },
                paint: function(options) {
                    return validateObject({
                        layer: layer,
                        key: options.key,
                        value: options.value,
                        style: options.style,
                        styleSpec: options.styleSpec,
                        objectElementValidators: {
                            '*': function(options) {
                                return validatePaintProperty(extend({layerType: type}, options));
                            }
                        }
                    });
                }
            }
        }));

        return errors;
    }

    /**
     * Validate a Mapbox GL style against the style specification. This entrypoint,
     * `mapbox-gl-style-spec/lib/validate_style.min`, is designed to produce as
     * small a browserify bundle as possible by omitting unnecessary functionality
     * and legacy style specifications.
     *
     * @private
     * @param {Object} style The style to be validated.
     * @param {Object} [styleSpec] The style specification to validate against.
     *     If omitted, the latest style spec is used.
     * @returns {Array<ValidationError>}
     * @example
     *   var validate = require('mapbox-gl-style-spec/lib/validate_style.min');
     *   var errors = validate(style);
     */
    function validateStyleMin(style, styleSpec) {
        styleSpec = styleSpec || latestStyleSpec;

        var errors = [];

        errors = errors.concat(validate({
            key: '',
            value: style,
            valueSpec: styleSpec.$root,
            styleSpec: styleSpec,
            style: style,
            objectElementValidators: {
                glyphs: validateGlyphsURL,
                '*': function() {
                    return [];
                }
            }
        }));

        if (style.constants) {
            errors = errors.concat(validateConstants({
                key: 'constants',
                value: style.constants,
                style: style,
                styleSpec: styleSpec
            }));
        }

        return sortErrors(errors);
    }

    validateStyleMin.source = wrapCleanErrors(validateSource);
    validateStyleMin.light = wrapCleanErrors(validateLight);
    validateStyleMin.layer = wrapCleanErrors(validateLayer);
    validateStyleMin.filter = wrapCleanErrors(validateFilter);
    validateStyleMin.paintProperty = wrapCleanErrors(validatePaintProperty);
    validateStyleMin.layoutProperty = wrapCleanErrors(validateLayoutProperty);

    function sortErrors(errors) {
        return [].concat(errors).sort(function (a, b) {
            return a.line - b.line;
        });
    }

    function wrapCleanErrors(inner) {
        return function() {
            return sortErrors(inner.apply(this, arguments));
        };
    }

    var jsonlint = createCommonjsModule(function (module, exports) {
    /* parser generated by jison 0.4.15 */
    /*
      Returns a Parser object of the following structure:

      Parser: {
        yy: {}
      }

      Parser.prototype: {
        yy: {},
        trace: function(),
        symbols_: {associative list: name ==> number},
        terminals_: {associative list: number ==> name},
        productions_: [...],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
        table: [...],
        defaultActions: {...},
        parseError: function(str, hash),
        parse: function(input),

        lexer: {
            EOF: 1,
            parseError: function(str, hash),
            setInput: function(input),
            input: function(),
            unput: function(str),
            more: function(),
            less: function(n),
            pastInput: function(),
            upcomingInput: function(),
            showPosition: function(),
            test_match: function(regex_match_array, rule_index),
            next: function(),
            lex: function(),
            begin: function(condition),
            popState: function(),
            _currentRules: function(),
            topState: function(),
            pushState: function(condition),

            options: {
                ranges: boolean           (optional: true ==> token location info will include a .range[] member)
                flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
                backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
            },

            performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
            rules: [...],
            conditions: {associative list: name ==> set},
        }
      }


      token location info (@$, _$, etc.): {
        first_line: n,
        last_line: n,
        first_column: n,
        last_column: n,
        range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
      }


      the parseError function receives a 'hash' object with these members for lexer and parser errors: {
        text:        (matched text)
        token:       (the produced terminal token, if any)
        line:        (yylineno)
      }
      while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
        loc:         (yylloc)
        expected:    (string describing the set of expected tokens)
        recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
      }
    */
    var parser = (function(){
    var o=function(k,v,o,l){for(o=o||{}, l=k.length;l--;o[k[l]]=v){ }return o},$V0=[1,12],$V1=[1,13],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,14],$V6=[1,15],$V7=[14,18,22,24],$V8=[18,22],$V9=[22,24];
    var parser = {trace: function trace() { },
    yy: {},
    symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
    terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
    productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
    /* this == yyval */

    var $0 = $$.length - 1;
    switch (yystate) {
    case 1:
     // replace escaped characters with actual character
              this.$ = new String(yytext.replace(/\\(\\|")/g, "$"+"1")
                         .replace(/\\n/g,'\n')
                         .replace(/\\r/g,'\r')
                         .replace(/\\t/g,'\t')
                         .replace(/\\v/g,'\v')
                         .replace(/\\f/g,'\f')
                         .replace(/\\b/g,'\b'));
              this.$.__line__ =  this._$.first_line;
            
    break;
    case 2:

                this.$ = new Number(yytext);
                this.$.__line__ =  this._$.first_line;
            
    break;
    case 3:

                this.$ = null;
            
    break;
    case 4:

                this.$ = new Boolean(true);
                this.$.__line__ = this._$.first_line;
            
    break;
    case 5:

                this.$ = new Boolean(false);
                this.$.__line__ = this._$.first_line;
            
    break;
    case 6:
    return this.$ = $$[$0-1];
    break;
    case 13:
    this.$ = {}; Object.defineProperty(this.$, '__line__', {
                value: this._$.first_line,
                enumerable: false
            });
    break;
    case 14: case 19:
    this.$ = $$[$0-1]; Object.defineProperty(this.$, '__line__', {
                value: this._$.first_line,
                enumerable: false
            });
    break;
    case 15:
    this.$ = [$$[$0-2], $$[$0]];
    break;
    case 16:
    this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
    break;
    case 17:
    this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
    break;
    case 18:
    this.$ = []; Object.defineProperty(this.$, '__line__', {
                value: this._$.first_line,
                enumerable: false
            });
    break;
    case 20:
    this.$ = [$$[$0]];
    break;
    case 21:
    this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
    break;
    }
    },
    table: [{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,12:1,13:2,15:7,16:8,17:$V5,23:$V6},{1:[3]},{14:[1,16]},o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),o([14,18,21,22,24],[2,1]),o($V7,[2,2]),{3:20,4:$V0,18:[1,17],19:18,20:19},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:23,15:7,16:8,17:$V5,23:$V6,24:[1,21],25:22},{1:[2,6]},o($V7,[2,13]),{18:[1,24],22:[1,25]},o($V8,[2,16]),{21:[1,26]},o($V7,[2,18]),{22:[1,28],24:[1,27]},o($V9,[2,20]),o($V7,[2,14]),{3:20,4:$V0,20:29},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:30,15:7,16:8,17:$V5,23:$V6},o($V7,[2,19]),{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:31,15:7,16:8,17:$V5,23:$V6},o($V8,[2,17]),o($V8,[2,15]),o($V9,[2,21])],
    defaultActions: {16:[2,6]},
    parseError: function parseError(str, hash) {
        if (hash.recoverable) {
            this.trace(str);
        } else {
            throw new Error(str);
        }
    },
    parse: function parse(input) {
        var this$1 = this;

        var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
        var args = lstack.slice.call(arguments, 1);
        var lexer = Object.create(this.lexer);
        var sharedState = { yy: {} };
        for (var k in this$1.yy) {
            if (Object.prototype.hasOwnProperty.call(this$1.yy, k)) {
                sharedState.yy[k] = this$1.yy[k];
            }
        }
        lexer.setInput(input, sharedState.yy);
        sharedState.yy.lexer = lexer;
        sharedState.yy.parser = this;
        if (typeof lexer.yylloc == 'undefined') {
            lexer.yylloc = {};
        }
        var yyloc = lexer.yylloc;
        lstack.push(yyloc);
        var ranges = lexer.options && lexer.options.ranges;
        if (typeof sharedState.yy.parseError === 'function') {
            this.parseError = sharedState.yy.parseError;
        } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
        }
        
            function lex() {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
        var symbol, preErrorSymbol, state, action, r, yyval = {}, p, len, newState, expected;
        while (true) {
            state = stack[stack.length - 1];
            if (this$1.defaultActions[state]) {
                action = this$1.defaultActions[state];
            } else {
                if (symbol === null || typeof symbol == 'undefined') {
                    symbol = lex();
                }
                action = table[state] && table[state][symbol];
            }
                        if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this$1.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this$1.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this$1.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this$1.terminals_[symbol] || symbol) + '\'');
                    }
                    this$1.parseError(errStr, {
                        text: lexer.match,
                        token: this$1.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
            if (action[0] instanceof Array && action.length > 1) {
                throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
            }
            switch (action[0]) {
            case 1:
                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                } else {
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;
            case 2:
                len = this$1.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                    first_line: lstack[lstack.length - (len || 1)].first_line,
                    last_line: lstack[lstack.length - 1].last_line,
                    first_column: lstack[lstack.length - (len || 1)].first_column,
                    last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                    yyval._$.range = [
                        lstack[lstack.length - (len || 1)].range[0],
                        lstack[lstack.length - 1].range[1]
                    ];
                }
                r = this$1.performAction.apply(yyval, [
                    yytext,
                    yyleng,
                    yylineno,
                    sharedState.yy,
                    action[1],
                    vstack,
                    lstack
                ].concat(args));
                if (typeof r !== 'undefined') {
                    return r;
                }
                if (len) {
                    stack = stack.slice(0, -1 * len * 2);
                    vstack = vstack.slice(0, -1 * len);
                    lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this$1.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
            case 3:
                return true;
            }
        }
        return true;
    }};
    /* generated by jison-lex 0.3.4 */
    var lexer = (function(){
    var lexer = ({

    EOF:1,

    parseError:function parseError(str, hash) {
            if (this.yy.parser) {
                this.yy.parser.parseError(str, hash);
            } else {
                throw new Error(str);
            }
        },

    // resets the lexer, sets new input
    setInput:function (input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = '';
            this.conditionStack = ['INITIAL'];
            this.yylloc = {
                first_line: 1,
                first_column: 0,
                last_line: 1,
                last_column: 0
            };
            if (this.options.ranges) {
                this.yylloc.range = [0,0];
            }
            this.offset = 0;
            return this;
        },

    // consumes and returns one char from the input
    input:function () {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
                this.yylineno++;
                this.yylloc.last_line++;
            } else {
                this.yylloc.last_column++;
            }
            if (this.options.ranges) {
                this.yylloc.range[1]++;
            }

            this._input = this._input.slice(1);
            return ch;
        },

    // unshifts one char (or a string) into the input
    unput:function (ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);

            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            //this.yyleng -= len;
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);

            if (lines.length - 1) {
                this.yylineno -= lines.length - 1;
            }
            var r = this.yylloc.range;

            this.yylloc = {
                first_line: this.yylloc.first_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.first_column,
                last_column: lines ?
                    (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                     + oldLines[oldLines.length - lines.length].length - lines[0].length :
                  this.yylloc.first_column - len
            };

            if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
        },

    // When called from action, caches matched text and appends it on next action
    more:function () {
            this._more = true;
            return this;
        },

    // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
    reject:function () {
            if (this.options.backtrack_lexer) {
                this._backtrack = true;
            } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });

            }
            return this;
        },

    // retain first n characters of the match
    less:function (n) {
            this.unput(this.match.slice(n));
        },

    // displays already matched input, i.e. for error messages
    pastInput:function () {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
        },

    // displays upcoming input, i.e. for error messages
    upcomingInput:function () {
            var next = this.match;
            if (next.length < 20) {
                next += this._input.substr(0, 20-next.length);
            }
            return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },

    // displays the character position where the lexing error occurred, i.e. for error messages
    showPosition:function () {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
        },

    // test the lexed token: return FALSE when not a match, otherwise return token
    test_match:function (match, indexed_rule) {
            var this$1 = this;

            var token,
                lines,
                backup;

            if (this.options.backtrack_lexer) {
                // save context
                backup = {
                    yylineno: this.yylineno,
                    yylloc: {
                        first_line: this.yylloc.first_line,
                        last_line: this.last_line,
                        first_column: this.yylloc.first_column,
                        last_column: this.yylloc.last_column
                    },
                    yytext: this.yytext,
                    match: this.match,
                    matches: this.matches,
                    matched: this.matched,
                    yyleng: this.yyleng,
                    offset: this.offset,
                    _more: this._more,
                    _input: this._input,
                    yy: this.yy,
                    conditionStack: this.conditionStack.slice(0),
                    done: this.done
                };
                if (this.options.ranges) {
                    backup.yylloc.range = this.yylloc.range.slice(0);
                }
            }

            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
                this.yylineno += lines.length;
            }
            this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ?
                             lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                             this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
                this.done = false;
            }
            if (token) {
                return token;
            } else if (this._backtrack) {
                // recover context
                for (var k in backup) {
                    this$1[k] = backup[k];
                }
                return false; // rule action called reject() implying the next rule should be tested instead.
            }
            return false;
        },

    // return next match in input
    next:function () {
            var this$1 = this;

            if (this.done) {
                return this.EOF;
            }
            if (!this._input) {
                this.done = true;
            }

            var token,
                match,
                tempMatch,
                index;
            if (!this._more) {
                this.yytext = '';
                this.match = '';
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
                tempMatch = this$1._input.match(this$1.rules[rules[i]]);
                if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    match = tempMatch;
                    index = i;
                    if (this$1.options.backtrack_lexer) {
                        token = this$1.test_match(tempMatch, rules[i]);
                        if (token !== false) {
                            return token;
                        } else if (this$1._backtrack) {
                            match = false;
                            continue; // rule action called reject() implying a rule MISmatch.
                        } else {
                            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                            return false;
                        }
                    } else if (!this$1.options.flex) {
                        break;
                    }
                }
            }
            if (match) {
                token = this.test_match(match, rules[index]);
                if (token !== false) {
                    return token;
                }
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
            }
            if (this._input === "") {
                return this.EOF;
            } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });
            }
        },

    // return next match that has a token
    lex:function lex() {
            var r = this.next();
            if (r) {
                return r;
            } else {
                return this.lex();
            }
        },

    // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
    begin:function begin(condition) {
            this.conditionStack.push(condition);
        },

    // pop the previously active lexer condition state off the condition stack
    popState:function popState() {
            var n = this.conditionStack.length - 1;
            if (n > 0) {
                return this.conditionStack.pop();
            } else {
                return this.conditionStack[0];
            }
        },

    // produce the lexer rule set which is active for the currently active lexer condition state
    _currentRules:function _currentRules() {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
                return this.conditions["INITIAL"].rules;
            }
        },

    // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
    topState:function topState(n) {
            n = this.conditionStack.length - 1 - Math.abs(n || 0);
            if (n >= 0) {
                return this.conditionStack[n];
            } else {
                return "INITIAL";
            }
        },

    // alias for begin(condition)
    pushState:function pushState(condition) {
            this.begin(condition);
        },

    // return the number of states currently on the stack
    stateStackSize:function stateStackSize() {
            return this.conditionStack.length;
        },
    options: {},
    performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    switch($avoiding_name_collisions) {
    case 0:/* skip whitespace */
    break;
    case 1:return 6
    break;
    case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
    break;
    case 3:return 17
    break;
    case 4:return 18
    break;
    case 5:return 23
    break;
    case 6:return 24
    break;
    case 7:return 22
    break;
    case 8:return 21
    break;
    case 9:return 10
    break;
    case 10:return 11
    break;
    case 11:return 8
    break;
    case 12:return 14
    break;
    case 13:return 'INVALID'
    break;
    }
    },
    rules: [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
    conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
    });
    return lexer;
    })();
    parser.lexer = lexer;
    function Parser () {
      this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser;
    })();


    if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
        export { inspect, isArray, isBoolean, isNull, isNullOrUndefined, isNumber, isString, isSymbol, isUndefined, isRegExp, isObject, isDate, isError, isFunction, isPrimitive, parseCSSColor, parser };
        export const Parser = parser.Parser;
        export const parse = function () { return parser.parse.apply(parser, arguments); };

        export const main = function commonjsMain(args) {
            if (!args[1]) {
                console.log('Usage: '+args[0]+' FILE');
                process.exit(1);
            }
            var source = fs.readFileSync(path.normalize(args[1]), "utf8");
            return exports.parser.parse(source);
        };

        if ('object' !== 'undefined' && commonjsRequire.main === module) {
          main(process.argv.slice(1));
        }
    }
    });
    var jsonlint_1 = jsonlint.parser;
    var jsonlint_2 = jsonlint.Parser;
    var jsonlint_3 = jsonlint.parse;
    var jsonlint_4 = jsonlint.main;

    /**
     * Validate a Mapbox GL style against the style specification.
     *
     * @private
     * @alias validate
     * @param {Object|String|Buffer} style The style to be validated. If a `String`
     *     or `Buffer` is provided, the returned errors will contain line numbers.
     * @param {Object} [styleSpec] The style specification to validate against.
     *     If omitted, the spec version is inferred from the stylesheet.
     * @returns {Array<ValidationError|ParsingError>}
     * @example
     *   var validate = require('mapbox-gl-style-spec').validate;
     *   var style = fs.readFileSync('./style.json', 'utf8');
     *   var errors = validate(style);
     */

    function validateStyle(style, styleSpec) {
        if (style instanceof String || typeof style === 'string' || style instanceof Buffer) {
            try {
                style = jsonlint.parse(style.toString());
            } catch (e) {
                return [new ParsingError(e)];
            }
        }

        styleSpec = styleSpec || latestStyleSpec;

        return validateStyleMin(style, styleSpec);
    }

    //      

    var exported$10 = {
        latest: latestStyleSpec,
        format: format,
        migrate: migrate,
        composite: composite,
        diff: diffStyles,
        ValidationError: ValidationError,
        ParsingError: ParsingError,
        expression: exported$9,
        featureFilter: createFilter,
        Color: Color,
        function: exported$8,
        validate: validateStyle
    };

    exported$10.function.convertFunction = convertFunction;

    validateStyle.parsed = validateStyle;
    validateStyle.latest = validateStyle;

    export const v8 = latestStyleSpec;
    export const exported = exported$10;

    Object.defineProperty(exports, '__esModule', { value: true });
})));
//# sourceMappingURL=index.js.map
