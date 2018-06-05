import React from 'react';
import PropTypes from 'prop-types';

import {Map, List} from 'immutable';

import Vfield from '../Vfield';

import VpropertyArray from './VpropertyArray';
import VpropertyBoolean from './VpropertyBoolean';
import VpropertyExpression from './VpropertyExpression';
import VpropertyMetadata from './VpropertyMetadata';
import VpropertyFunction from './VpropertyFunction';
import VpropertyInfo from './VpropertyInfo';
import VpropertyPoint from './VpropertyPoint';

export default class Vproperty extends React.Component {

	static propTypes = {
		focus: PropTypes.string,
		handle: PropTypes.object,
		property: PropTypes.shape({
			name: PropTypes.string.isRequired, // fill_color
			label: PropTypes.string,
			hideOptions: PropTypes.bool,
			// value
			spec: PropTypes.object,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			])
		})
	}

	constructor(props) {
		super(props);

		const {property, handle} = this.props;
		const spec = property.spec || {};

		//console.log('property:',property);

		this.state = {
			error: null,
			dropdownShown: false,
			dropdownControl: null
		};

		this.handle = {
			changeType:(type,value)=>{
				const pos = property.name.split('.');
				let val;
				//console.log('change type:',type);
				switch(type){
					case 'array':
						if (List.isList(value)) return;
						val = [];
						break;
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
				handle.removeIn(pos);
			},
			dropdownToggle:()=>{
				if (this.state.dropdownShown) return this.setState({dropdownShown:false});
				this.setState({dropdownShown:true});
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

	componentDidMount(){
		this.setState({dropdownControl:this.dropdownControl})
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

		if (property.label === 'center'){
			elem = <div>
				<VpropertyPoint property={{
					type:'array',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error
				}} focus={focus} handle={handle}/>
			</div>;
		} else if (spec.type === 'boolean'){
			elem = <div>
				<VpropertyBoolean property={{
					type:'boolean',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error
				}} focus={focus} handle={handle}/>
			</div>;
		} else if (spec.type === 'enum'){
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
			mode = 'array';
			const specType = (spec.value === 'number')? 'number': 'string';
			elem = <div>
				<VpropertyArray property={{
					pos:[0],
					type:'array',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error,
					specType:specType
				}} focus={focus} handle={handle}/>
			</div>;
		} else if (spec.type === '*'){
			mode = 'metadata';
			elem = <div>
				<VpropertyMetadata property={{
					pos:[0],
					type:'array',
					name:property.name,
					value:property.value,
					placeholder:doc,
					error:property.error
				}} focus={focus} handle={handle}/>
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
			if (property.hideOptions) return <div/>;
			let types = [];
			if (spec.type) types.push(spec.type);
			if (property.spec && property.spec['property-function']){
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
				<div className="" ref={ref => this.dropdownControl = ref} data-toggle="dropdown" 
				 onClick={this.handle.dropdownToggle} aria-haspopup="true" aria-expanded="false">
					{mode}
					<i className="material-icons md-14">arrow_drop_down</i>
				</div>
				<div className="dropdown-menu" data-boundary="window">
					{types.map((type)=>{
						let className = 'dropdown-item';
						if (type === mode) className += ' active';
						return <a key={type} onClick={e => this.handle.changeType(type,property.value)} className={className} href="javascript:">{type}</a>
					})}
					<div key="divider" className="dropdown-divider"/>

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

	}
};