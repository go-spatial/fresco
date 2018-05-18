import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';

import VpropertyInfo from '../VpropertyInfo';
import VpropertyArrayRow from './VpropertyArrayRow';
import VpropertyArrayAdd from './VpropertyArrayAdd';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyArray extends React.Component {

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
			add:()=>{
				const addName = property.name+'.'+this.props.property.value.size;
				handle.focus(addName);
				handle.change({
					name:addName,
					value:null
				});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		this.rowHandle = {
			...handle,
			backout:(f)=>{
				// focus on prev element
				let ary = f.name.split('.');
				const lastNum = Number(ary[ary.length-1]) - 1;
				if (lastNum >= 0){
					ary[ary.length-1] = String(lastNum);
					const prevName = ary.join('.');
					handle.focus(prevName);
				}
				handle.remove(f);
			},
			enter:(f)=>{
				let ary = f.name.split('.');
				const nextNum = Number(ary[ary.length-1]) + 1;
				ary[ary.length-1] = String(nextNum);
				const nextName = ary.join('.');
				if (nextNum === this.props.property.value.size){ // last element
					handle.change({
						name:nextName,
						value:null
					});
				}
				handle.focus(nextName);
			}
		};

		for (let i in this.rowHandle){
			this.rowHandle[i] = this.rowHandle[i].bind(this);
		}

	}

	render (){
		const {property, focus} = this.props;
		const value = property.value;
		
		console.log('value:',value);

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

		let funcs = [];
		value.forEach((val,key)=>{
			let name = property.name+'.'+key;
			let error = (property.error && property.error.get)? property.error.get(key): null;
			//console.log('function error:',error);
			funcs.push(<VpropertyArrayRow key={key} row={{
				type:property.specType,
				name:name,
				value:val,
				error:error
			}} focus={focus} handle={this.rowHandle}/>);
		});

		const autoFocus = (property.name === focus)? true: false;

		//console.log('ac autofocus:',autoFocus, property.name, focus);

		let addClass = 'func-add mt-1 p-1';
		if (this.state.addOpen) addClass += ' open';

		const spec = styleSpec.latest.array;

		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				{funcs}

				<div className="mt-2">
					<div onClick={this.handle.add} className="btn btn-xs btn-light">
						<i className="material-icons md-14">add</i>
					</div>
				</div>
			</div>
		</div>
	}
};