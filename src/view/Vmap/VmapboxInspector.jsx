import React from 'react';
import PropTypes from 'prop-types';

import Mlayer from '../../model/Mlayer';

import Vfeature from '../Vfeature';

import LayerIcon from '../../utility/LayerIcon';

export default class VmapboxInspector extends React.Component {
	static propTypes = {
		features:PropTypes.array,
		handle:PropTypes.object
	}

	constructor (props){
		super(props);
		const {handle} = props;

		this.state = {
			layerSelected:null
		};

		this.handle = {
			layerClick:(layerId)=>{
				const path = 'layer/'+layerId;
				console.log('go path:',path);
				this.setState({
					layerSelected:layerId
				});
				handle.route(path);
			},
			back:()=>{
				this.setState({
					layerSelected:null
				});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {features} = this.props;

		let layers = {};
		features.forEach((feature)=>{
			layers[feature.layer.id] = layers[feature.layer.id] || {count:0};
			layers[feature.layer.id].count++;
		});

		console.log('inspector render!');

		if (!this.state.layerSelected){
			return <ul className="mb-0 mt-1 map-inspect-list inspector-overflow">
					{Object.keys(layers).map((i)=>{
						const layer = Mlayer.get(i);

						return <li key={i} onClick={()=>{this.handle.layerClick(layer.get('id'));}}><a href="javascript://">
							<div className="list-left mr-2 inline-block position-relative">
								<i className="material-icons md-18 md-shadow" style={{color:LayerIcon.getColor(layer)}}>
									{LayerIcon.getIcon(layer)}
								</i>
							</div>
							{i}
							<span className="badge">{layers[i].count}</span>
						</a></li>
					})}
				</ul>;
		}

		//filter out all features not for the selected layer
		let selFeatures = features.filter((feature)=>{
			return feature.layer.id === this.state.layerSelected;
		});

		return <div className="inspector-overflow">
			<div className="inspector-back" onClick={this.handle.back}>
				<i className="material-icons icon-btn md-14">arrow_back</i>
			</div>
			<Vfeature features={selFeatures} handle={this.handle}/>
		</div>
	}

};
