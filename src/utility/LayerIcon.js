import layerConfig from '../config/layer';

export default {
	getColor:(layer)=>{
		const type = layer.get('type'),
			config = layerConfig.types[type];
		if (!config || !config.colorProperty) return null;
		if (config.colorProperty && config.colorProperty.length){
			for (let i=0,len=config.colorProperty.length;i<len;i++){
				const prop = config.colorProperty[i];
				if (layer.hasIn(['paint',prop])) return layer.getIn(['paint',prop]);
			}
		}
		return layer.getIn(['paint',config.colorProperty]);
	},
	getIcon:(layer)=>{
		const type = layer.get('type'),
			config = layerConfig.types[type];
		if (!config) return null;
		return config.icon;
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