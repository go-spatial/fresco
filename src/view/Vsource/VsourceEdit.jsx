import PropTypes from 'prop-types';
import React from 'react';
import {Map} from 'immutable';

import styleSpec from '../../vendor/style-spec/style-spec';

import Valert from '../Valert';
import Vproperty from '../Vproperty';
import VpropertyAdd from '../Vproperty/VpropertyAdd';

import Msource from '../../model/Msource';
import Mstyle from '../../model/Mstyle';

export default class VsourceEdit extends React.Component {
	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		handle: PropTypes.object,
		sourceKey: PropTypes.string,
		style: PropTypes.object,
		source: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle, sourceKey} = this.props;

		this.state = {
			focus:null
		};

		this.handle = {
			...handle,
			focus:(pos)=>{
				//console.log('focus:',pos);
				this.setState({focus:pos});
			},
			
			change:(field)=>{
				//console.log('change:',field);
				Mstyle.setIn(['sources',sourceKey,field.name],field.value);
			},

			removeIn:(pos)=>{
				Mstyle.removeIn(['sources',sourceKey,...pos]);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, handle, sourceKey, style, source} = this.props;

		const spec = styleSpec.latest['source_'+source.get('type')] || {};

		//console.log('add spec:',spec);

		return <div className="p-2">
			{source && Map.isMap(source) && source.keySeq().map((k)=>{
				let name = k;

				//if (name === 'type') return;
			
				return <Vproperty key={name} property={{
					name:name,
					label:k,
					spec:spec[k],
					value:source.get(k),
					error:error && error.get && error.get(k)
				}} focus={this.state.focus} handle={this.handle}/>
			})}

			<div className="property">
				<VpropertyAdd 
					spec={spec} 
					layerGroup={source} 
					focus={this.state.focus}
					handle={this.handle}/>
			</div>
		</div>;

	}
};