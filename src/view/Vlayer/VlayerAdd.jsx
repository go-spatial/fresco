import React from 'react';

import NameFromURL from '../../utility/NameFromURL';

import Mlayer from '../../model/Mlayer';
import Msource from '../../model/Msource';

import Vfield from '../Vfield';

export default class VlayerAdd extends React.Component {
	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {
			id:null,
			source:null,
			type:null,
			'source-layer':null
		};

		console.log('props:',props);

		this.handle = {
			submit:(e)=>{
				e.preventDefault();
				//if (this.state.layerId.length < 1){
					// error!
					//return;
				//}

				Mlayer.add(this.state).then((layer)=>{
					console.log('added:',layer);
					handle.route('layer/'+layer.id);
				});
			},

			change:(field)=>{
				if (field.name !== 'id'){
					let parts = [];
					field.name === 'source-layer' ? parts.push(NameFromURL.get(field.value)) :
						this.state['source-layer'] && parts.push(NameFromURL.get(this.state['source-layer']));

					let id = parts.join('.'), newId;

					if (id){
						let num = 1,
							newId = id,
							existing;
						while (existing = Mlayer.get(newId)){
							num++;
							newId = id+'_'+num;
						}
						id = newId;
					}

					console.log('id:',id);
					this.setState({id:id});
				}
				this.setState({
					[field.name]:field.value
				})
			},

			changeId:()=>{
				// generate unique id based on defined source
				let parts = [];
				if (this.state.source) parts.push(NameFromURL.get(this.state.source));
				if (this.state['source-layer']) parts.push(this.state['source-layer']);
				if (this.state.type) parts.push(this.state.type);
				const id = parts.join('.');
				console.log('id:',id);
				this.setState({id:id});
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		console.log('source:',this.state.source);

		const sourceLayerOptions = (this.state.source)? Msource.getLayerOptions(this.state.source):
			null;

		return <form onSubmit={this.handle.submit}>
			<h2 className="px-2 py-1 m-0 text-nav bg-light">Add Layer</h2>
			<div className="p-2">
				<div className="">
					<Vfield field={{
						type:'select',
						name:'type',	
						label:'Type',
						value:this.state.type,
						placeholder:'Type of layer style',
						controlled:false,
						options:typeOptions
					}} key="type" handle={this.handle}/>
				</div>
				<div className="mt-2">
					<Vfield field={{
						type:'select',
						name:'source',	
						label:'Source',
						value:this.state.source,
						placeholder:'Name of the source',
						controlled:false,
						options:sourceOptions
					}} key="source" handle={this.handle}/>
				</div>

				{sourceLayerOptions && 
					<div className="mt-2">
						<Vfield field={{
							type:'AC',
							name:'source-layer',	
							label:'Source Layer',
							value:this.state['source-layer'],
							placeholder:'Source Layer name',
							controlled:false,
							options:sourceLayerOptions
						}} key="source-layer" handle={this.handle}/>
					</div>
				}
				<div className="mt-2">
					<Vfield field={{
						type:'string',
						name:'id',
						label:'Layer ID',
						value:this.state.id,
						placeholder:'Unique identifier for layer',
						controlled:false
					}} key="id" handle={this.handle}/>
				</div>

				<div className="form-group mt-3 text-right">
					<button type="submit" className="btn btn-primary">Add</button>
				</div>
			</div>
		</form>
	}
};