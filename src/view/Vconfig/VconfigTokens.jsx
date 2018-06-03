import PropTypes from 'prop-types';
import React from 'react';

import Mconfig from '../../model/Mconfig';

import Vproperty from '../Vproperty';

export default class VconfigTokens extends React.Component {

	static propTypes = {
		config:PropTypes.object,
		handle: PropTypes.object,
		match: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {focus:'mapboxToken'};

		this.handle = {
			...handle,
			change:(field)=>{
				Mconfig.setIn([field.name],field.value);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {config, error, handle} = this.props;

		return <div className="p-1">
			<h2 className="px-2 py-1 m-0 text-nav bg-light">
				API Access Tokens
				<div className="float-right">
					
				</div>
			</h2>
			<div className="p-2">
				<div className="row">
					<div className="col-sm-6">
						<Vproperty property={{
							name:'mapboxToken',
							label:'mapbox token',
							spec:{doc:'token used to authenticate with Mapbox'},
							value:config.get('mapboxToken'),
							error:error && error.get && error.get('mapboxToken'),
							hideOptions:true
						}} focus={this.state.focus} handle={this.handle}/>
					</div>
					<div className="col-sm-6">
						<Vproperty property={{
							name:'olToken',
							label:'open layers token',
							spec:{doc:'token used to authenticate with Open Layers'},
							value:config.get('olToken'),
							error:error && error.get && error.get('olToken'),
							hideOptions:true
						}} focus={this.state.focus} handle={this.handle}/>
					</div>
				</div>
			</div>
		</div>;
	}
};