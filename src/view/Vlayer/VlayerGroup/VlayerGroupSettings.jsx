import React from 'react';
import PropTypes from 'prop-types';

import styleSpec from '../../../vendor/style-spec/style-spec';

import Vproperty from '../../Vproperty';
import VpropertyAdd from '../../Vproperty/VpropertyAdd';

import Mlayer from '../../../model/Mlayer';
import Msource from '../../../model/Msource';

export default class VlayerGroupSettings extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.handle = {
			change:(field)=>{
				console.log('change:',field);
				Mlayer.setIn(layer.get('id'),[field.name],field.value);
			},
			focus:handle.focus
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style, layer, focus} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const layerId = layer.get('id');

		let properties = ['type'];
		if (layer.get('type') !== 'background') properties.push('source');
		if (layer.has('source')) properties.push('source-layer');

		const spec = styleSpec.latest.layer;

		console.log('spec:',spec);


		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		return <div className="">
			{properties.map((key)=>{
				return <Vproperty property={{
					name:key,
					label:key,
					spec:spec[key],
					value:layer.get(key),
					error:null,
					required:true
				}} key={key} focus={focus} handle={this.handle}/>
			})}
		</div>;
	}
};