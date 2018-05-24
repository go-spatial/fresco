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
		const {layer, handle, focus, error} = this.props;

		const layerId = layer.get('id');

		const spec = styleSpec.latest.layer;

		let addSpec = {
			//id:spec.id,
			type:spec.type,
			source:spec.source,
			'source-layer':spec['source-layer'],
			filter:spec.filter,
			maxzoom:spec.maxzoom,
			minzoom:spec.minzoom
		};

		if (layer.get('type') === 'background'){
			delete addSpec.source;
			delete addSpec.filter;
			delete addSpec.minzoom;
			delete addSpec.maxzoom;
		}
		if (!layer.has('source')) delete addSpec['source-layer'];

		return <div className="">
			{layer.keySeq().map((key)=>{
				if (!addSpec[key]) return;
			
				return <Vproperty key={key} property={{
					name:key,
					label:key,
					spec:addSpec[key],
					value:layer.get(key),
					error:error && error.get && error.get(key),
					required:addSpec[key].required
				}} focus={focus} handle={handle}/>
			})}

			<div className="property">
				<VpropertyAdd 
					spec={addSpec} 
					layerGroup={layer} 
					focus={focus}
					handle={handle}/>
			</div>
		</div>;
	}
};