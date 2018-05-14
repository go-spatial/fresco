import React from 'react';
import PropTypes from 'prop-types';

import {Map, List} from 'immutable';

import Vfield from '../Vfield';

import VpropertyExpression from './VpropertyExpression';
import VpropertyFunction from './VpropertyFunction';
import VpropertyInfo from './VpropertyInfo';

export default class Vproperty extends React.Component {

	static propTypes = {
		property: PropTypes.shape({
			name: PropTypes.string.isRequired, // fill_color
			label: PropTypes.string,
			// value
			spec: PropTypes.object,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			])
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {property, handle} = this.props;
		const spec = property.spec || {};

		//console.log('property:',property);

		this.state = {
			error: null
		};

		this.handle = {
			changeType:(type,value)=>{
				const pos = property.name.split('.');
				let val;
				//console.log('change type:',type);
				switch(type){
					case 'expression':
						if (List.isList(value)) return;
						val = [];
						break;
					case 'function':
						if (Map.isMap(value)) return;
						val = {stops:[[6,null],[10,null]]};
						break;
					case 'string':
						if (typeof value === 'string') return;
						val = spec.default || '';
						break;
					case 'number':
						if (typeof value === 'number') return;
						val = spec.default || 0;
						break;
					case 'color':
						if (typeof value === 'string') return;
						val = spec.default;
						break;
					default:
						val = null;
				}
				//console.log('change type set:',pos,val);
				handle.layerSetIn(pos,val);
			},
			remove:()=>{
				const pos = property.name.split('.');
				handle.layerRemoveIn(pos);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentDidCatch(error, info) { // catch errors
		//this.setState({error: error});
		//console.log('error caught:',error);
	}

	render (){
		const {property, handle, focus} = this.props;

		//console.log('prop:',property);
		const options = [];

		const spec = property.spec || {};

		const doc = property.spec && property.spec.doc || null;
		const type = property.spec && property.spec.type || 'string';

		const autoFocus = (property.name === focus)? true: false;

		let elem, mode = type;

		
		//console.log('spec:',property.spec);

		if (spec.type === 'enum'){
			let options = [];
			for (let i in spec.values){
				options.push({
					name:i,
					value:i
				});
			};

			elem = <div>
				<Vfield field={{
					type:'select',
					name:property.name,
					value:property.value,
					placeholder:property.label,
					controlled:false,
					options:options,
					autoFocus:autoFocus,
					error:property.error
				}} handle={handle}/>
			</div>;
		} else if (spec.type === 'array'){
			elem = <div>
				<Vfield field={{
					type:'array',
					name:property.name,
					value:property.value,
					placeholder:property.label,
					controlled:false,
					autoFocus:autoFocus,
					error:property.error
				}} handle={handle}/>
			</div>;
		} else if (List.isList(property.value)){
			//console.log('expression');

			mode = 'expression';

			elem = <div>
				<VpropertyExpression field={{
					pos:[0],
					type:'expression',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error,
					specType:spec.type
				}} focus={focus} handle={handle}/>
			</div>;
		} else if (Map.isMap(property.value)){
			//console.log('object map');

			mode = 'function';

			elem = <div>
				<VpropertyFunction property={{
					type:'function',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error,
					specType:spec.type
				}} focus={focus} handle={handle}/>
			</div>;
		} else {
			elem = <div>
				<Vfield field={{
					type:type,
					name:property.name,
					value:property.value,
					placeholder:property.label,
					controlled:false,
					options:options,
					autoFocus:autoFocus,
					error:property.error
				}} handle={handle}/>
			</div>
		}

		let className = 'form-group mb-2 property'
		className += (autoFocus)? ' focus': '';

		const buildOptions = ()=>{
			let types = [spec.type];
			if (property.spec['property-function']){
				// add function and exp support
				types.push('expression');
				types.push('function');
			}

			let actions = [];
			if (!property.required) actions.push('remove');

			if (actions.length < 1 && types.length == 1){ // no options
				return mode;
			}

			return <div>
				<div className=""
				 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{mode}
					<i className="material-icons md-14">arrow_drop_down</i>
				</div>
				<div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
					{types.map((type)=>{
						let className = 'dropdown-item';
						if (type === mode) className += ' active';
						return <a key={type} onClick={e => this.handle.changeType(type,property.value)} className={className} href="javascript:">{type}</a>
					})}
					<div className="dropdown-divider"></div>

					<a key="remove" onClick={this.handle.remove} className="dropdown-item" href="javascript:">remove</a>
				</div>
			</div>;
		};

		return <div className={className}>
			<label className="p-0 d-block">
				{property.label+' '}
				<VpropertyInfo doc={doc} error={property.error}/>
				<div className="float-right" role="group">
					{buildOptions()}
				</div>
			</label>
			{elem}
			
		</div>;



		

		

		


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