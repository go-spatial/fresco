import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import PropertyFuncRow from './PropertyFuncRow';
import PropertyFuncStops from './PropertyFuncStops';
import PropertyAdd from './PropertyAdd';

import styleSpec from '../../vendor/style-spec/style-spec';

export default class PropertyFunc extends React.Component {

	static propTypes = {
		property: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			value: PropTypes.object,
			placeholder: PropTypes.string,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			]),
			specType: PropTypes.string
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, property} = this.props;

		this.state = {
			addOpen:false
		};

		this.handle = {
			addOpen:()=>{
				console.log('add open:',this.state.addOpen);
				if (this.state.addOpen){
					return this.setState({addOpen:false});
				}
				handle.focus(property.name);
				this.setState({addOpen:true});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		/*

		this.handleAdd = {
			change:(f)=>{
				handle.change({
					name:f.name,
					value:f.value
				});
			},
			backout:(f)=>{
				handle.change({
					name:property.name,
					value:''
				});
			},
			focus:()=>{
				console.log('focus Add:');
				handle.focus(property.name);
			}
		};

		for (let i in this.handleAdd){
			this.handleAdd[i] = this.handleAdd[i].bind(this);
		}

		this.funcHandle = {
			change:handle.change,
			focus:(f)=>{
				console.log('focus:',f);
				handle.focus(f);
			},
			...handle
		};

		for (let i in this.funcHandle){
			this.funcHandle[i] = this.funcHandle[i].bind(this);
		}

		*/

	}

	render (){
		const {property, focus} = this.props;
		const value = property.controlled ? this.state.value : property.value || '';

		// check if funcName exists in List, if not assume vector (not expression)

		//console.log('property expression:',property,styleSpec.latest);

		let options = [];
		for (let i in styleSpec.latest.function){
			if (!value.has(i)){
				options.push({
					name:i,
					value:i
				});
			}
		}
		//console.log('function options:',options);

		const funcHandle = {

		}

		let funcs = [];
		value.keySeq().toArray().forEach((key)=>{
			let name = property.name+'.'+key;
			let error = (property.error && property.error.get)? property.error.get(key): null;
			//console.log('function error:',error);

			//console.log('function key:',key);
			if (key === 'stops'){
				const propType = (property.value.get('type') === 'categorical')? 'string': 'number';
				funcs.push(<PropertyFuncStops key={key} func={{
					type:key,
					name:name,
					value:value.get(key),
					error:error,
					specType: property.specType,
					propType:propType
				}} focus={focus} handle={funcHandle}/>);
			} else {
				funcs.push(<PropertyFuncRow key={key} func={{
					type:key,
					name:name,
					value:value.get(key),
					error:error
				}} focus={focus} handle={funcHandle}/>);
			}
		});

		const autoFocus = (property.name === focus)? true: false;

		//console.log('ac autofocus:',autoFocus, property.name, focus);

		const doc = "function";

		let addClass = 'func-add mt-1 p-1';
		if (this.state.addOpen) addClass += ' open';

		const spec = styleSpec.latest.function;
		const layerGroup = value;

		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				{funcs}

				<div className="mt-2">
					<PropertyAdd 
						groupName={property.name}
						spec={spec} 
						layerGroup={layerGroup} 
						focus={focus}
						handle={this.handleAdd}/>
				</div>
			</div>
		</div>
	}
};