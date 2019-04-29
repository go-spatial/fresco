import PropTypes from 'prop-types';
import React from 'react';
import {Map} from 'immutable';

import styleSpec from '../../vendor/style-spec/style-spec';
import NameFromURL from '../../utility/NameFromURL';

import Msource from '../../model/Msource';
import Valert from '../Valert';
import Vfield from '../Vfield';
import Vproperty from '../Vproperty';

export default class VsourceAdd extends React.Component {
	static propTypes = {
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {
			headers:Map({}),
			name:'',
			url:'',
			type:'',
			makeLayers:true,
			focus:null,
			error:null
		};

		console.log('props:',props);

		this.handle = {
			submit:(e)=>{
				e.preventDefault();

				Msource.add({
					url: this.state.url,
					type: this.state.type
				}, this.state.name, this.state.makeLayers, this.state.headers).then((source)=>{
					handle.route('source/'+encodeURIComponent(this.state.name));
				}).catch((e)=>{
					if (e === 'not localhost'){
						return this.setState({error:'the source you are adding is running locally and Fresco is not. You must run Fresco locally to be able to connect to this source.'});
					}
					console.log('catch error:',e);
					this.setState({error:''+e});
				});
			},
			change:(field)=>{

				if (field.name === 'url'){
					this.setState({
						name:NameFromURL.get(field.value)
					});
				}

				this.setState({
					[field.name]:field.value
				});
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}



	render (){
		const {} = this.props;

		const error = this.state.error;

		const spec = styleSpec.latest['source_vector'] || {};

		const options = Msource.getAllTypeOptions();

		return <form onSubmit={this.handle.submit}>
			<h2 className="px-2 m-0 right-col-title bg-light font-med">Add Source</h2>
			<div className="p-2">
				<Vproperty key="url" property={{
					name:'url',
					label:'url',
					required:true,
					spec:spec['url'],
					value:this.state.url,
					error:error && error.get && error.get('url')
				}} focus={this.state.focus} handle={this.handle}/>
				<Vproperty key="name" property={{
					name:'name',
					label:'name',
					required:true,
					spec:spec['name'],
					value:this.state.name,
					error:error && error.get && error.get('name')
				}} focus={this.state.focus} handle={this.handle}/>
				<Vproperty key="type" property={{
					name:'type',
					label:'type',
					required:true,
					spec:spec['type'],
					value:this.state.type,
					error:error && error.get && error.get('type'),
					options:options
				}} focus={this.state.focus} handle={this.handle}/>
				<Vproperty key="headers" property={{
					hideOptions:true,
					name:'headers',
					label:'headers',
					spec:{doc:'Headers attached to domain requests', type:'*'},
					value:this.state.headers,
					error:error && error.get && error.get('headers')
				}} focus={this.state.focus} handle={this.handle}/>

				<Vfield key="makeLayers" field={{
					name:'makeLayers',
					type:'checkbox',
					value:this.state.makeLayers,
					label:'make style layers from source?',
					error:error && error.get && error.get('type')
				}} focus={this.state.focus} handle={this.handle}/>

				<div className="pt-2">
					<button type="submit" className="btn btn-primary">Add</button>
				</div>
				<div className="mt-3">
					<Valert message={this.state.error}/>
				</div>
			</div>

		</form>
	}
};