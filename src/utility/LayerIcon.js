export default {
	getColor:(layer)=>{
		const type = layer.get('type');
		if (type === 'circle'){
			return layer.getIn(['paint','circle-color']);
		}
		if (type === 'fill'){
			return layer.getIn(['paint','fill-color']);
		}
		if (type === 'line'){
			return layer.getIn(['paint','line-color']);
		}
		if (type === 'background'){
			return layer.getIn(['paint','background-color']);
		}
	},
	getIcon:(layer)=>{
		const type = layer.get('type');
		if (type === 'circle'){
			return 'grain';
		}
		if (type === 'fill'){
			return 'stop';
		}
		if (type === 'background'){
			return 'brightness_1';
		}
		if (type === 'line'){
			return 'show_chart';
		}
	}

};