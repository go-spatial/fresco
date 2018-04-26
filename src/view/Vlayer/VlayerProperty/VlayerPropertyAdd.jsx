import React from 'react';
import PropTypes from 'prop-types';

import {List} from 'immutable';

import Vfield from '../../Vfield';

export default class VlayerPropertyAdd extends React.Component {

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
		};

		this.handle = {
			change:(field)=>{

				const prop = field.value;
				const value = spec && spec[prop] && spec[prop].default || null;
				const name = groupName + '.' + prop;

				handle.change({
					name:name,
					value:value
				});

				handle.focus(name);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {spec, handle, layerGroup} = this.props;

		let propOptions = [];
		for (let i in spec){
			if (layerGroup.has(i)) continue;
			propOptions.push({
				name:i,
				value:i
			});
		}

		//console.log('propOptions:',propOptions,spec);

		return <div>
			<Vfield field={{
				type:'AC',
				name:'property',
				icon:'add',
				value:null,
				placeholder:'Property name',
				controlled:false,
				options:propOptions
			}} key="source-layer" handle={this.handle}/>
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