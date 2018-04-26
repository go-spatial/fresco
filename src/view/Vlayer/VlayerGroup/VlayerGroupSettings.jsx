import React from 'react';
import PropTypes from 'prop-types';

import Vfield from '../../Vfield';

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

		this.state = {
			open:true,
			deleteShow:false
		};

		this.handle = {
			change:(field)=>{
				console.log('change:',field);
				Mlayer.setIn(layer.get('id'),[field.name],field.value);
			},
			open:()=>{
				this.setState({open:true});
			},
			close:()=>{
				this.setState({open:false});
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

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const layerId = layer.get('id');
		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		if (!this.state.open){
			return <div className="layer-group-heading">
				<button onClick={this.handle.open} type="submit" className="btn btn-light btn-sm mr-2 d-inline-block">
					<i className="material-icons md-18">keyboard_arrow_right</i>
				</button>
				<div className="d-inline-block">
					controls
				</div>
			</div>
		}

		return <div>
			<div className="layer-group-heading">
				<button onClick={this.handle.close} type="submit" className="btn btn-light btn-sm mr-2">
					<i className="material-icons md-18">keyboard_arrow_down</i>
				</button>
				<div className="d-inline-block">
					controls
				</div>
			</div>
			<div className="p-2">

				<Vfield field={{
					type:'select',
					name:'type',	
					label:'type',
					value:layer.get('type'),
					placeholder:'Type of layer style',
					controlled:false,
					options:typeOptions
				}} key="type" handle={this.handle}/>

				{layer.get('type') !== 'background' && 
					<Vfield field={{
						type:'select',
						name:'source',	
						label:'source',
						value:layer.get('source'),
						placeholder:'Name of the source',
						controlled:false,
						options:sourceOptions
					}} key="source" handle={this.handle}/>
				}

				{layer.has('source') && 
					<Vfield field={{
						type:'AC',
						name:'source-layer',	
						label:'source-layer',
						value:layer.get('source-layer'),
						placeholder:'Source Layer name',
						controlled:false,
						options:sourceLayerOptions
					}} key="source-layer" handle={this.handle}/>
				}
			</div>
		</div>;
	}
};