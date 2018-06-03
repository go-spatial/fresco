import PropTypes from 'prop-types';
import React from 'react';

import Valert from '../Valert';

export default class VsourceLayers extends React.Component {
	static propTypes = {
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
		const {source, sourceKey, sourceLayers, styleLayers} = this.props;

		if (source === undefined){
			return <Valert message="no source defined"/>
		}
		if (sourceLayers === undefined){
			return <Valert message="no source layers defined"/>
		}

		//console.log('sourceKey:',sourceKey,styleLayers);

		return <div className="">
			<div className="px-2 m-0 property">
				<label className="mb-0">Source Layers ({sourceLayers.size})</label>
				<div className="float-right">
					<label className="mb-0">Styles</label>
				</div>
			</div>
			<ul className="">
				{sourceLayers.valueSeq().map((layer)=>{
					let foundStyleLayers = [];
					styleLayers.map((styleLayer)=>{
						//console.log('styleLayer:',styleLayer.get('source'),sourceKey);
						if (styleLayer.get('source') === sourceKey && styleLayer.get('source-layer') === layer.get('name'))
							foundStyleLayers.push(styleLayer);
					});
					//console.log('styleLayers:',foundStyleLayers);
					return <div className="px-2 py-1 d-block link-list position-relative" key={layer.get('name')}>
						{layer.get('name')}
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