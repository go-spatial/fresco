import PropTypes from 'prop-types';
import React from 'react';
import {Map} from 'immutable';

import styleSpec from '../../vendor/style-spec/style-spec';

import Valert from '../Valert';
import Vproperty from '../Vproperty';
import VpropertyAdd from '../Vproperty/VpropertyAdd';

import Msource from '../../model/Msource';
import Mstyle from '../../model/Mstyle';

export default class VsourceSettings extends React.Component {
	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		handle: PropTypes.object,
		sourceKey: PropTypes.string,
		style: PropTypes.object,
		source: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle, sourceKey} = this.props;

		const settings = Msource.getSettings(sourceKey)

		this.state = {
			authToken:settings && settings.get('authToken'),
			focus:null
		};

		this.handle = {
			...handle,
			focus:(pos)=>{
				//console.log('focus:',pos);
				this.setState({focus:pos});
			},
			
			change:(field)=>{
				//console.log('change:',field);
				this.setState({[field.name]:field.value})
			},

			submit:(e)=>{
				e.preventDefault()
				Msource.setSettings(sourceKey, this.state);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, handle, sourceKey, style, source} = this.props;

		return <form onSubmit={this.handle.submit} className="p-2">
			<Vproperty key="authToken" property={{
				hideOptions:true,
				name:'authToken',
				label:'authorization token',
				spec:{doc:'Token to be attached to source requests'},
				value:this.state.authToken,
				error:error && error.get && error.get('authToken')
			}} focus={this.state.focus} handle={this.handle}/>
			<div className="pt-2">
				<button type="submit" className="btn btn-primary">Save</button>
			</div>
			<div className="mt-3">
				<Valert message={this.state.error}/>
			</div>
		</form>;

	}
};