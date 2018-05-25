import React from 'react';
import PropTypes from 'prop-types';

import Vfield from '../../Vfield';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyBoolean extends React.Component {

	static propTypes = {
		property: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			value: PropTypes.bool, 
			placeholder: PropTypes.string,
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
		const {handle, property} = this.props;


		this.fieldHandle = {
			...handle,
			backout:(f)=>{
				
			},
			change:(f)=>{
				const val = (f.value === 'true')? true: false;
				handle.change({
					name:f.name,
					value:val
				});
			}
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}

	render (){
		const {property, focus} = this.props;

		const options = [
			{name:'true',value:'true'},
			{name:'false',value:'false'}
		];

		const val = (property.value)? 'true': 'false';

		return <div className="form-group mb-0">
			<Vfield field={{
				type:'select',
				name:property.name,
				value:val,
				controlled:false,
				autoFocus:property.name === focus,
				options:options
			}} handle={this.fieldHandle}/>
		</div>
	}
};