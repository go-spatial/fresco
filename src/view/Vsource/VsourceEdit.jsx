import React from 'react';

import NameFromUrl from '../../utility/NameFromUrl';

import Valert from '../Valert';
import VsourceLayers from './VsourceLayers';
import VsourceAdd from './VsourceAdd';

import Msource from '../../model/Msource';

export default class Vsource extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render (){
		const {match, style, handle, path} = this.props;

		this.path = path || decodeURIComponent(match.params.path);
		if (this.path === 'add'){
			return <VsourceAdd handle={handle} style={style}/>;
		}
		const source = Msource.get(this.path);
		const sourceLayers = Msource.getLayers(this.path);

		console.log('sourceLayers:',sourceLayers);

		// change map mode to show_hidden source layers

		if (source === undefined){
			return <Valert message="no source found" className="container"/>;
		}
		return <div>
			<h2 className="px-2 py-1 m-0 text-nav bg-light">{NameFromUrl.get(source.get('url'))}</h2>
			<div className="py-3 px-2">
				<VsourceLayers source={source} sourceLayers={sourceLayers}/>
			</div>
		</div>;
	}
};