import React from 'react';

import Mstyle from '../../model/Mstyle';

import Valert from '../Valert';
import Vmapbox from './Vmapbox';

export default class Vmap extends React.Component {

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
		const {handle, match} = this.props;

		console.log('render map!!!');

		//get style
		switch (this.state.renderer){
			case 'mapbox':
				const styleJS = Mstyle.getMapStyle();
				return <Vmapbox styleJS={styleJS} handle={handle} match={match}/>
		}

		return <Valert message="renderer not found"/>;
	}
};