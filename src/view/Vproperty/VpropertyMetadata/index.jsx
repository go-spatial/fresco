import React from 'react';
import PropTypes from 'prop-types';
import {List,fromJS} from 'immutable';

import Vfield from '../../Vfield';

import VpropertyAdd from '../VpropertyAdd';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyMetadata extends React.Component {

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

		//console.log('handle:',handle);

		// convert value into array of arrays [[k,v],[k,v]]
		let valAry = [];
		property.value.keySeq().toArray().forEach((key)=>{
			let val = property.value.get(key);
			if (val === true) val = 'true';
			else if (val === false) val = 'false';
			valAry.push([key,val]);
		});

		this.state = {
			valAry:fromJS(valAry)
		};

		this.handle = {
			add:()=>{
				this.setState({valAry:this.state.valAry.push(List([]))});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		this.fieldHandle = {
			...handle,
			backout:(f)=>{
				let setIn = f.name.split('.').map((v)=>{
					return Number(v);
				});
				if (setIn[1] === 1){ // value backed out of
					const keyName = [setIn[0],0].join('.');
					handle.focus(keyName);
					return;
				}
				if (setIn[1] === 0){ // key backed out of
					const newValAry = this.state.valAry.remove(setIn[0]);
					this.setState({valAry:newValAry});

					this.fieldHandle.commit(newValAry);

					if (setIn[0] > 0){
						const prevName = [setIn[0]-1,1].join('.');
						handle.focus(prevName);
					}
				}
			},
			change:(f)=>{
				// split name
				let setIn = f.name.split('.').map((v)=>{
					return Number(v);
				});
				const newValAry = this.state.valAry.setIn(setIn,f.value);
				
				this.setState({valAry:newValAry});

				this.fieldHandle.commit(newValAry);
			},
			commit:(newValAry)=>{
				let value = {};

				newValAry.keySeq().toArray().forEach((key)=>{
					let val = newValAry.getIn([key,1]);
					if (val === undefined) val = '';
					else if (val === 'true') val = true;
					else if (val === 'false') val = false;
					else if (val.match && val.match(/^[0-9]+$/)) val = Number(val);
					value[newValAry.getIn([key,0])] = val;
				});

				handle.change({
					name:property.name,
					value:fromJS(value)
				});
			}
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}

	render (){
		const {property, focus} = this.props;

		let rows = [], ind = 0;
		this.state.valAry.keySeq().toArray().forEach((key)=>{

			const keyName = key+'.0';
			const valueName = key+'.1';

			const error = (property.error && property.error.get)? property.error.get(key): null;
			//console.log('function error:',error);

			const keyFocus = (keyName === focus)? true: false;
			const valueFocus = (valueName === focus)? true: false;

			let value = this.state.valAry.getIn([key,1]);
			if (value === true) value = 'true';
			else if (value === false) value = 'false';

			rows.push(
				<div key={key} className="row">
					<div className="col-sm-6 pr-1">
						<Vfield key={keyName} field={{
							type:'string',
							name:keyName,
							value:this.state.valAry.getIn([key,0]),
							controlled:false,
							autoFocus:keyFocus
						}} handle={this.fieldHandle}/>
					</div>
					<div className="col-sm-6 pl-0">
						<Vfield key={valueName} field={{
							type:'string',
							name:valueName,
							value:value,
							controlled:false,
							autoFocus:valueFocus
						}} handle={this.fieldHandle}/>
					</div>
				</div>
			);

			ind++;
		});

		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				{rows}

				<div className="mt-2">
					<div onClick={this.handle.add} className="btn btn-xs btn-light">
						<i className="material-icons md-14">add</i>
					</div>
				</div>
			</div>
		</div>
	}
};