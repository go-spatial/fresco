import React from 'react';
import PropTypes from 'prop-types';

import VlayerGroupLayout from './VlayerGroupLayout';
import VlayerGroupPaint from './VlayerGroupPaint';
import VlayerGroupSettings from './VlayerGroupSettings';

export default class VlayerGroup extends React.Component {

	static propTypes = {
		type: PropTypes.string,
		layer: PropTypes.object,
		handle: PropTypes.object,
		focus: PropTypes.string,
		open: PropTypes.bool
	}

	constructor (props){
		super(props);

		const {open} = props;

		this.state = {
			open:open
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
		const {type, layer, handle, focus, error} = this.props;
		
		// get layer group data

		if (!this.state.open){
			return <div className="layer-group-heading mt-1">
				<button onClick={this.handle.open} type="submit" className="btn btn-dark btn-sm mr-2 btn-block text-left font-med">
					{type}
				</button>
			</div>
		}

		let content;
		switch (type){
			case 'settings':
				content = <VlayerGroupSettings layer={layer} handle={handle} focus={focus} error={error}/>;
				break;
			case 'paint':
				content = <VlayerGroupPaint layer={layer} handle={handle} focus={focus} error={error && error.get && error.get('paint')}/>;
				break;
			case 'layout':
				content = <VlayerGroupLayout layer={layer} handle={handle} focus={focus} error={error && error.get && error.get('paint')}/>;
				break;
		}

		return <div>
			<div className="layer-group-heading open mt-1">
				<button onClick={this.handle.close} type="submit" className="btn btn-dark btn-sm mr-2 btn-block text-left font-med">
					{type}
				</button>
			</div>
			<div className="p-2">
				{content}
			</div>
		</div>;
	}

}