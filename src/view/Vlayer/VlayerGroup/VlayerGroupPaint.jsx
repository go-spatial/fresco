import React from 'react';
import PropTypes from 'prop-types';

import styleSpec from '../../../vendor/style-spec/style-spec';

import Mlayer from '../../../model/Mlayer';
import Msource from '../../../model/Msource';

import VlayerProperty from '../VlayerProperty';
import VlayerPropertyAdd from '../VlayerProperty/VlayerPropertyAdd';

const group = 'paint';

export default class VlayerGroupPaint extends React.Component {
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
			open:true,
			spec:styleSpec.latest[group+'_'+layerType]
		};

		this.handle = {
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
		const {layer, handle, focus} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const spec = this.state.spec;

		const layerGroup = layer.get(group);


		if (!this.state.open){
			return <div className="layer-group-heading">
				<button onClick={this.handle.open} type="submit" className="btn btn-light btn-sm mr-2 d-inline-block">
					<i className="material-icons md-18">keyboard_arrow_right</i>
				</button>
				<div className="d-inline-block">
					paint
				</div>
			</div>
		}

		return <div>
			<div className="layer-group-heading">
				<button onClick={this.handle.close} type="submit" className="btn btn-light btn-sm mr-2">
					<i className="material-icons md-18">keyboard_arrow_down</i>
				</button>
				<div className="d-inline-block">
					paint
				</div>
			</div>
			<div className="p-2">
				{layerGroup.keySeq().map((key)=>{
					let name = group+'.'+key;
					return <VlayerProperty property={{
						name:name,
						label:key,
						spec:spec[key],
						value:layerGroup.get(key),
						error:null
					}} key={name} focus={focus} handle={handle}/>
				})}

				<VlayerPropertyAdd 
					spec={spec} 
					groupName={group} 
					layerGroup={layerGroup} 
					focus={focus}
					handle={handle}/>
			</div>

		</div>;
	}
};