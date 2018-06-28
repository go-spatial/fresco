import layerConfig from '../config/layer';
import {List, Map} from 'immutable';
import Mlayer from '../model/Mlayer';

const CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

export default {
	getColor:function(data){

		let color;
		if (Map.isMap(data)){
			const keys = data.keySeq().toArray();
			for (let i=0,len=keys.length;i<len;i++){
				color = this.getColor(data.get(keys[i]));
				if (color) return color;
			}
			return;
		}
		if (List.isList(data)){
			for (let i=0,len=data.size;i<len;i++){
				color = this.getColor(data.get(i));
				if (color) return color;
			}
			return;
		}
		if (this.isColor(data)){
			return data;
		}
		return;

		/*
		const type = layer.get('type'),
			config = layerConfig.types[type];
		if (!config || !config.colorProperty) return null;
		let paintVal;
		if (config.colorProperty && config.colorProperty.length){
			for (let i=0,len=config.colorProperty.length;i<len;i++){
				const prop = config.colorProperty[i];
				if (layer.hasIn(['paint',prop])){
					paintVal = layer.getIn(['paint',prop]);
					break;
				}
			}
		}
		paintVal = layer.getIn(['paint',config.colorProperty]);
		if (map.isMap(paintVal)){
			// look for a color inside properties

		}

		return paintVal;
		*/
	},
	getIcon:function(layer){
		const type = Mlayer.getType(layer.get('id')),
			config = layerConfig.types[type];
		if (!config) return null;
		return config.icon;
	},
	isColor:function(str){
		if (typeof str !== 'string') return false;
		if (/^#[0-9a-fA-F]{3,6}$/.test(str)) return true;
		if (/^rgb[a]+\([0-9\,\s]+\)$/.test(str)) return true;
		if (/^hsl[a]+\([0-9\,\s%]+\)$/.test(str)) return true;
		if (CSS_COLOR_NAMES.indexOf(str) !== -1) return true;
		return false;
	}

/*
	getLightDark:


	function getContrastYIQ(hexcolor){
	if (hexcolor.length == 3) hexcolor = hexcolor.substr(0,1)+hexcolor.substr(0,1)+hexcolor.substr(1,1)+hexcolor.substr(1,1)+hexcolor.substr(2,1)+hexcolor.substr(2,1);
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}
*/

};