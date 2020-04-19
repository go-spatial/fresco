import {List, Map} from 'immutable'

const cssColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]

const isColorStr = ({str})=>{
		if (typeof str !== 'string') return false
		if (/^#[0-9a-fA-F]{3,6}$/.test(str)) return true
		if (/^rgb[a]+\([0-9\,\s]+\)$/.test(str)) return true
		if (/^hsl[a]+\([0-9\,\s%]+\)$/.test(str)) return true
		if (cssColors.indexOf(str) !== -1) return true
		return false
	}

const getFromBlock = ({block})=>{
	let color
	if (Map.isMap(block)){
		const keys = block.keySeq().toArray()
		for (let i=0,len=keys.length;i<len;i++){
			color = getFromBlock({block:block.get(keys[i])})
			if (color) return color
		}
		return
	}
	if (List.isList(block)){
		for (let i=0,len=block.size;i<len;i++){
			color = getFromBlock({block:block.get(i)})
			if (color) return color
		}
		return
	}

	if (isColorStr({str:block})){
		return block
	}
	return
}

export default {
	isColorStr,
	getFromBlock,
}