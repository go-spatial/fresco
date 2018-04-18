import React from 'react';

import Valert from '../Valert';

export default class VsourceLayers extends React.Component {
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
		const {source, sourceLayers} = this.props;

		if (source === undefined){
			return <Valert message="no source defined"/>
		}
		if (sourceLayers === undefined){
			return <Valert message="no source layers defined"/>
		}

		return <div className="">
			<div className="py-1 px-2 m-0">Source Layers ({sourceLayers.size})</div>
			<ul className="">
				{sourceLayers.valueSeq().map((layer)=>{
					return <div className="px-2 py-1 d-block link-list position-relative" key={layer.get('name')}>
						{layer.get('name')}
					</div>
				})}
			</ul>
				
		</div>
	}
};