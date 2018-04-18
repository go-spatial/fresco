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
			deleteShow:false
		};

		this.handle = {
			change:(field)=>{
				console.log('change:',field);
				Mlayer.setIn(layer.get('id'),[field.name],field.value);
			},
			deleteConfirm:()=>{
				handle.route('layer');
				Mlayer.remove(layer.get('id')).then(()=>{

				});
			},
			deleteShow:()=>{
				this.setState({deleteShow:true});
			},
			deleteHide:()=>{
				this.setState({deleteShow:false});
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

		return <div>
			<div className="p-2">
				<Vfield field={{
					type:'select',
					name:'type',	
					label:'Type',
					value:layer.get('type'),
					placeholder:'Type of layer style',
					controlled:false,
					options:typeOptions
				}} key="type" handle={this.handle}/>

				{layer.get('type') !== 'background' && 
					<Vfield field={{
						type:'select',
						name:'source',	
						label:'Source',
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
						label:'Source Layer',
						value:layer.get('source-layer'),
						placeholder:'Source Layer name',
						controlled:false,
						options:sourceLayerOptions
					}} key="source-layer" handle={this.handle}/>
				}

				{this.state.deleteShow ?
					<div className="form-group mt-4 text-right">
						<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm mr-2">
							Delete
						</button>
						<button onClick={this.handle.deleteHide} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">close</i>
						</button>
					</div>
					:
					<div className="form-group mt-4 text-right">
						<button onClick={this.handle.deleteShow} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">delete</i>
						</button>
					</div>
				}
			</div>
		</div>;
	}
};