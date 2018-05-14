import React from 'react';
import PropTypes from 'prop-types';

import styleSpec from '../../../vendor/style-spec/style-spec';

import Mlayer from '../../../model/Mlayer';
import Msource from '../../../model/Msource';

import Vproperty from '../../Vproperty';
import VpropertyAdd from '../../Vproperty/VpropertyAdd';

const group = 'layout';

export default class VlayerGroupLayout extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object,
		focus: PropTypes.string
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		const layerType = layer.get('type');

		this.state = {
			spec:styleSpec.latest[group+'_'+layerType],
			addShow:false
		};

		this.handle = {
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {layer, handle, focus, error} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const spec = this.state.spec;

		const layerGroup = layer.get(group);

		//console.log('layout error:',error);

		return <div className="p-1">
			{layerGroup && layerGroup.keySeq().map((key)=>{
				let name = group+'.'+key;
			
				return <Vproperty property={{
					name:name,
					label:key,
					spec:spec[key],
					value:layerGroup.get(key),
					error:error && error.get && error.get(key)
				}} key={name} focus={focus} handle={handle}/>
			})}
			<div className="property">
				<VpropertyAdd 
					spec={spec} 
					groupName={group} 
					layerGroup={layerGroup} 
					focus={focus}
					handle={handle}/>
			</div>
		</div>;
	}
};