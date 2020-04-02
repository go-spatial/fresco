import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';

import styleSpec from '../../../vendor/style-spec/style-spec';


const nameToPos = (name)=>{
	let key = name.split('.');
	key.forEach((k,i)=>{
		if (/^\d+$/.test(k)) key[i] = Number(k);
	});
	return key;
};

const posToName = (pos)=>{
	return pos.join('.');
};

const getNextPos = (pos)=>{
	let ary = [...pos];
	ary[ary.length-1]++;
	return ary;
};

const getPrevPos = (pos)=>{
	let ary = [...pos];
	ary[ary.length-1]--;
	if (ary[ary.length-1] < 1){
		ary.pop();
	}
	return ary;
};

export default class VpropertyExpression extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			helper: PropTypes.string,
			name: PropTypes.string.isRequired, // string of position . separated
			value: PropTypes.object,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			]),
			controlled: PropTypes.bool,
			inputClass: PropTypes.string,
			inputNoAC: PropTypes.bool,
			autoFocus: PropTypes.bool
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field} = this.props;

		this.state = {
			open:false
		};

		this.handle = {
			change:(f)=>{

				const next = field.name+'.1';

				console.log('next:',next);

				this.setState({open:true});

				handle.change(f);

				//if (val.has('1'))
				if (!field.value.has(1)){
					handle.change({
						name:field.name+'.1',
						value:''
					});
				}

				handle.focus(next);
			},
			backout:(f)=>{
				handle.change({
					name:field.name,
					value:''
				});
			},
			toggleOpen:()=>{
				if (this.state.open){
					return this.setState({open:false});
				}
				this.setState({open:true});
			},
			focus:()=>{
				handle.focus(field.name);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		this.fieldHandle = {
			change:handle.change,
			focus:handle.focus,

			focusNext:(pos)=>{
				let nextPos = getNextPos(pos);
				if (!handle.layerHasIn(nextPos)) return;
				this.handle.focus(nextPos);
			},
			focusPrev:(pos)=>{
				let prevPos = getPrevPos(pos);
				if (!handle.layerHasIn(prevPos)) return;
				this.handle.focus(prevPos);
			},

			enter:(f)=>{
				const pos = nameToPos(f.name);
				const nextPos = getNextPos(pos);

				console.log('enter:',nextPos, handle.layerHasIn(nextPos));

				if (!handle.layerHasIn(nextPos)){
					handle.change({
						name:posToName(nextPos),
						value:''
					});
				}
				handle.focus(posToName(nextPos));
			},
			backout:(f)=>{
				const pos = nameToPos(f.name);
				const prevPos = getPrevPos(pos);

				handle.layerRemoveIn(pos);
				handle.focus(posToName(prevPos));
			}
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}

	renderField (name,val){
		const {handle, focus} = this.props;

		const autoFocus = (name === focus)? true: false;

		if (List.isList(val)){
			// build an expression
			return <VpropertyExpression key={name} field={{
				type:'expression',
				name:name,
				value:val,
				controlled:false
			}} focus={focus} handle={handle}/>;
		} else if (val !== null && typeof val === 'number'){
			return <Vfield key={name} field={{
				type:'number',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		} else if (val === true || val === false){
			return <Vfield key={name} field={{
				type:'boolean',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		} else if (val === null){
			return <Vfield key={name} field={{
				type:'string',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>;
		} else if (val && typeof val === 'string'){
			if (val.match(/^[0-9]+$/)){
				return <Vfield key={name} field={{
					type:'number',
					name:name,
					value:val,
					controlled:false,
					autoFocus:autoFocus
				}} handle={this.fieldHandle}/>;
			}
			if (val.indexOf('#') === 0){
				return <Vfield key={name} field={{
					type:'color',
					name:name,
					value:val,
					controlled:false,
					autoFocus:autoFocus
				}} handle={this.fieldHandle}/>;
			}
		}
		return <Vfield key={name} field={{
			type:'string',
			name:name,
			value:val,
			controlled:false,
			autoFocus:autoFocus
		}} handle={this.fieldHandle}/>;
	}

	render (){
		const {field, focus} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		const expName = value.first() || null;

		// check if expName exists in List, if not assume vector (not expression)

		const vals = List(value).shift();

		let pos = -1;
		const getNextName = ()=>{
			pos++;
			return field.name+'.'+String(pos);
		};

		//console.log('property expression:',field,styleSpec.latest);

		let options = [];
		for (let i in styleSpec.latest.expression_name.values){
			options.push({
				name:i,
				value:i
			});
		}

		const autoFocus = (field.name === focus)? true: false;

		return <div className="form-group mb-0">
			{field.label && <label className="mb-0 d-block">
				{field.label}
				<span className="badge badge-secondary float-right">expression</span>
			</label>}

			<div className="exp-ml position-relative">
				<div className="exp-path"></div>

				<div onClick={this.handle.toggleOpen} className="position-absolute exp-arrow">
					{this.state.open ?
						<i className="material-icons md-18">keyboard_arrow_down</i>
						:
						<i className="material-icons md-18">keyboard_arrow_right</i>
					}
				</div>

				<div className="mb-2">
					<Vfield key="expName" field={{
						type:'AC',
						name:getNextName(),
						value:expName,
						controlled:false,
						options:options,
						autoFocus:autoFocus
					}} handle={this.handle}/>
				</div>

				{this.state.open && vals.map((val,ind)=>{
					//console.log('new pos:',newPos);
					const name = getNextName();
					return <div key={name} className="position-relative mb-2">
						<div className="exp-dot"/>
						{this.renderField(name,val)}
						{ind === vals.size-1 && 
							<div className="exp-line-end"/>
						}
					</div>;
				})}
				{field.helper && <small className="form-text text-muted">{field.helper}</small>}
			</div>

		</div>
	}
};