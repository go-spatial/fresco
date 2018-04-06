import React from 'react';

import Mstyle from '../../model/Mstyle';

import Valert from '../Valert';
import Vmapbox from './Vmapbox';

export default class Vfield extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			renderer:'mapbox'
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.value});
	}

	render (){

		//get style
		switch (this.state.renderer){
			case 'mapbox':
				const styleJS = Mstyle.getMapStyle();
				return <Vmapbox styleJS={styleJS}/>
		}

		return <Valert message="renderer not found"/>;
	}
};