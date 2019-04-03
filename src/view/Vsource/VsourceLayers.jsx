import PropTypes from 'prop-types';
import React from 'react';

import Valert from '../Valert';
import Msource from '../../model/Msource';

export default class VsourceLayers extends React.Component {
	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		handle: PropTypes.object,
		source: PropTypes.object,
		sourceKey: PropTypes.string,
		sourceLayers: PropTypes.object,
		styleLayers: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.handle = {
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, handle, sourceKey, style, source} = this.props;

		const styleLayers = style.get('layers');
		const sourceLayers = Msource.getLayers(sourceKey);

		if (source === undefined){
			return <Valert message="no source defined"/>
		}
		if (sourceLayers === undefined){
			return <Valert message="no source layers defined"/>
		}

		return <div className="">
			<div className="px-2 m-0 property">
				<label className="mb-0">Source Layers ({sourceLayers.size})</label>
				<div className="float-right">
					<label className="mb-0">Styles</label>
				</div>
			</div>
			<ul className="">
				{sourceLayers.valueSeq().map((layer)=>{
					const layerId = layer.get('name') || layer.get('id')
					let foundStyleLayers = [];
					styleLayers.map((styleLayer)=>{
						//console.log('styleLayer:',styleLayer.get('source'),sourceKey);
						if (styleLayer.get('source') === sourceKey && styleLayer.get('source-layer') === layerId)
							foundStyleLayers.push(styleLayer);
					});
					//console.log('styleLayers:',foundStyleLayers);
					return <div className="px-2 py-1 d-block link-list font-sm position-relative" key={layerId}>
						{layerId}
						<div className="float-right text-right">
							<div className="badge badge-secondary">
								{foundStyleLayers.length}
							</div>
						</div>
					</div>
				})}
			</ul>
				
		</div>
	}
};