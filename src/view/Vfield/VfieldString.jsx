import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldString extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.string,
			controlled: PropTypes.boolean,
			inputClass: PropTypes.string,
			inputNoAC: PropTypes.boolean,
			autoFocus: PropTypes.boolean
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field} = this.props;

		console.log('field:',field);

		if (field.controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				if (field.controlled) this.setState({value:e.target.value});
				handle && handle.change && handle.change({
					name:e.target.name,
					value:e.target.value
				});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {field} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		return <div className="form-group mb-2">
			{field.label && <label className="mb-0">{field.label}</label>}
			<input type="text" className={'form-control '+field.inputClass} name={field.name}
				placeholder={field.placeholder} value={value} 
				autoComplete={field.inputNoAC ? 'off' : 'on'}
				ref={input => input && field.autoFocus && input.focus()}
				onChange={this.handle.change}/>
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};