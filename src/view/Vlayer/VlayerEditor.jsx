import React from 'react';
import PropTypes from 'prop-types';

import Vfield from '../Vfield';

import Mlayer from '../../model/Mlayer';

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
				Mlayer.setIn(layer.get('id'),[field.name],field.val);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {layer} = this.props;

		const typeOptions = [
			{name:'fill',value:'fill'},
			{name:'line',value:'line'},
			{name:'symbol',value:'symbol'},
			{name:'circle',value:'circle'},
			{name:'heatmap',value:'heatmap'},
			{name:'fill-extrusion',value:'fill-extrusion'},
			{name:'raster',value:'raster'},
			{name:'hillshade',value:'hillshade'},
			{name:'background',value:'background'},
		];

		// loop through editable layer props and display edit interface for each

		return <div className="p-2">	
			<Vfield field={{
				type:'select',
				name:'type',
				label:'Type',
				value:layer.get('type'),
				placeholder:'Select a layer type',
				options:typeOptions
			}} type="select" handle={{change:val => this.handle.change({name:'select',val:val})}}/>

			<Vfield field={{
				type:'string',
				name:'source',	
				label:'Source',
				value:layer.get('source'),
				placeholder:'Name of the source'
			}} type="string" handle={{change:val => this.handle.change({name:'source',val:val})}}/>
			
		</div>;
	}
};