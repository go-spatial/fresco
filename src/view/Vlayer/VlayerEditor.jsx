import React from 'react';
import PropTypes from 'prop-types';

import Vfield from '../Vfield';

import Mlayer from '../../model/Mlayer';
import Msource from '../../model/Msource';

export default class VlayerEditor extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.state = {

		};

		this.handle = {
			change:(field)=>{
				Mlayer.setIn(layer.get('id'),[field.name],field.value);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style, layer} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();
		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		return <div className="p-2">	
			<Vfield field={{
				type:'select',
				name:'type',
				label:'Type',
				value:layer.get('type'),
				placeholder:'Select a layer type',
				options:typeOptions,
				controlled:false
			}} key="type" handle={this.handle}/>

			<Vfield field={{
				type:'select',
				name:'source',	
				label:'Source',
				value:layer.get('source'),
				placeholder:'Name of the source',
				controlled:false,
				options:sourceOptions
			}} key="source" handle={this.handle}/>
			
		</div>;
	}
};