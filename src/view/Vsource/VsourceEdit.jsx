import React from 'react';

import NameFromUrl from '../../utility/NameFromUrl';

import Valert from '../Valert';
import VsourceLayers from './VsourceLayers';
import VsourceAdd from './VsourceAdd';

import Msource from '../../model/Msource';

export default class Vsource extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			path:null,
			source:null,
			sourceLayers:null
		};

		this.setSourceFromPath();
	}

	componentWillReceiveProps (){
		this.setSourceFromPath();
	}

	setSourceFromPath (){
		const {match} = this.props;

		const path = decodeURIComponent(match.params.path);

		if (this.state.path === path) return;

		const source = Msource.get(path);

		this.setState({
			path:path,
			source:source,
			sourceLayers:Msource.getLayers(path)
		});

		Msource.setJSON(path,source);
	}

	render (){
		const {style, handle} = this.props;

		// change map mode to show_hidden source layers

		if (this.state.source === null){
			return <div/>;
		}
		return <div>
			<h2 className="px-2 py-1 m-0 text-nav bg-light">
				{NameFromUrl.get(this.state.path)}
			</h2>
			<div className="py-3 px-2">
				<VsourceLayers source={this.state.source} sourceLayers={this.state.sourceLayers}/>
			</div>
		</div>;
	}
};