import React from 'react';
import PropTypes from 'prop-types';

import {List, Map} from 'immutable';

import Vfield from '../Vfield';

export default class VpropertyAdd extends React.Component {

	static propTypes = {
		groupName: PropTypes.string,
		layerGroup: PropTypes.object,
		spec: PropTypes.object,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {groupName, handle, spec} = this.props;

		this.state = {
			show:false
		};

		this.handle = {
			change:(field)=>{

				const prop = field.value;
				const value = spec && spec[prop] && spec[prop].default || null;
				const name = (groupName)? groupName + '.' + prop: prop;

				this.setState({show:false});

				handle.change({
					name:name,
					value:value
				});

				handle.focus(name);
			},
			show:()=>{
				this.setState({show:true});
			},
			hide:()=>{
				this.setState({show:false});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {spec, handle, layerGroup, focus} = this.props;

		let group = layerGroup || Map();

		let propOptions = [];
		for (let i in spec){
			//console.log('check:',spec[i],group.get(i));
			if (group.has(i)) continue;
			propOptions.push({
				name:i,
				value:i
			});
		}

		if (propOptions.length < 1) return <div/>;

		if (!this.state.show){
			return <div onClick={this.handle.show} className="btn btn-xs btn-light">
				<i className="material-icons md-14">add</i>
			</div>
		}

		//const autoFocus = true;
		return <div className="position-relative add-input-pr">
			<Vfield field={{
				type:'AC',
				name:'property',
				value:null,
				placeholder:'Property name',
				controlled:false,
				options:propOptions,
				size:'sm'
			}} key="source-layer" handle={this.handle}/>

			<div className="position-absolute add-close-pos">
				<button onClick={this.handle.hide} className="btn btn-light btn-sm" type="button">
					<i className="material-icons md-14">close</i>
				</button>
			</div>
		</div>


		/*
		if (List.isList(property.value)){
			// render an expression field
			return <Vfield field={{
				type:'expression',
				name:'type',	
				label:'Type',
				value:property.value,
				placeholder:spec.doc,
				controlled:false
			}} key="type" handle={handle}/>
		}

		// if value is an ary, use the expression field

		// else use the spec type


		return <div className="">
		</div>;
		*/
	}
};