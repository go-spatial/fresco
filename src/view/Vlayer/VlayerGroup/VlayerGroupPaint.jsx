import React from 'react';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';

import styleSpec from '../../../vendor/style-spec/style-spec';

import Mlayer from '../../../model/Mlayer';
import Msource from '../../../model/Msource';

import Vproperty from '../../Vproperty';
import VpropertyAdd from '../../Vproperty/VpropertyAdd';

const group = 'paint';

export default class VlayerGroupPaint extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object,
		focus: PropTypes.string
	}

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render (){
		const {layer, handle, focus, error} = this.props;

		// if layer has a ref property, we need to find the referenced layer's type

		const layerType = Mlayer.getType(layer.get('id'));
		const spec = styleSpec.latest[group+'_'+layerType];

		const layerGroup = layer.get(group);

		//console.log('paint error:',error);

		return <div className="p-1">
			{layerGroup && Map.isMap(layerGroup) && layerGroup.keySeq().map((key)=>{
				let name = group+'.'+key;
			
				return <Vproperty key={name} property={{
					name:name,
					label:key,
					spec:spec && spec[key],
					value:layerGroup.get(key),
					error:error && error.get && error.get(key)
				}} focus={focus} handle={handle}/>
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