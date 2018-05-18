import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';
import Valert from '../../Valert';
import VpropertyInfo from '../VpropertyInfo';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyArrayAdd extends React.Component {

	static propTypes = {
		name: PropTypes.string.isRequired, // string of position . separated
		type: PropTypes.string.isRequired,
		//value: PropTypes.object,
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, func} = this.props;

		this.state = {
			open:true,
			value:null
		};

		this.handle = {
			change:(field)=>{
				this.setState({value:field.value});
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
		const {name, error, focus, type} = this.props;

		const autoFocus = (name === focus)? true: false;

		//console.log('spec:',spec, 'value:',value);

		if (!this.state.show){
			return <div onClick={this.handle.show} className="btn btn-xs btn-light">
				<i className="material-icons md-14">add</i>
			</div>
		}

		//const autoFocus = true;
		return <div className="position-relative add-input-pr">
			<Vfield field={{
				type:type,
				name:name,
				value:this.state.value,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.handle}/>

			<div className="position-absolute add-close-pos">
				<button onClick={this.handle.hide} className="btn btn-light btn-sm" type="button">
					<i className="material-icons md-14">close</i>
				</button>
			</div>
		</div>
	}
};