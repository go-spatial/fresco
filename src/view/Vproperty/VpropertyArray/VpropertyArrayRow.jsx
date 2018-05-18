import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';
import Valert from '../../Valert';
import VpropertyInfo from '../VpropertyInfo';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyArrayRow extends React.Component {

	static propTypes = {
		row: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			//value: PropTypes.object,
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
		const {handle, func} = this.props;

		this.state = {
			open:true
		};

		this.handle = {
			toggleOpen:()=>{
				if (this.state.open){
					return this.setState({open:false});
				}
				this.setState({open:true});
			},
			remove:()=>{
				handle.remove({name:func.name});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

	}

	render (){
		const {row, error, focus, handle} = this.props;

		const autoFocus = (row.name === focus)? true: false;

		//console.log('spec:',spec, 'value:',value);

		return <div className="form-group mb-0 position-relative">
			<Vfield key={row.name} field={{
				type:row.type,
				name:row.name,
				value:row.value,
				controlled:false,
				autoFocus:autoFocus
			}} handle={handle}/>
		</div>
	}
};