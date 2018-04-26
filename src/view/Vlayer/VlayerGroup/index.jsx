import React from 'react';
import PropTypes from 'prop-types';

import VlayerGroupPaint from './VlayerGroupPaint';
import VlayerGroupSettings from './VlayerGroupSettings';

export default class VlayerGroup extends React.Component {

	static propTypes = {
		type: PropTypes.string,
		layer: PropTypes.object,
		handle: PropTypes.object,
		focus: PropTypes.string
	}

	constructor (props){
		super(props);

		this.state = {
		};

		this.handle = {

		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

	}

	render (){
		const {type, layer, handle, focus} = this.props;
		
		// get layer group data

		switch (type){
			case 'settings':
				return <VlayerGroupSettings layer={layer} handle={handle} focus={focus}/>;
			case 'paint':
				return <VlayerGroupPaint layer={layer} handle={handle} focus={focus}/>;
		}
	}

}