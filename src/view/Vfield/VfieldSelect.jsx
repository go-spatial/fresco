import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldSelect extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			options: PropTypes.array,
			error: PropTypes.string,
			controlled: PropTypes.boolean,
			autoFocus: PropTypes.boolean
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field} = this.props;

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
			},
			focus:(e)=>{
				handle.focus && handle.focus(e.target.name);
			},
			blur:(e)=>{
				handle.blur && handle.blur(e.target.name);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.field.value});
	}

	render (){
		const {field} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		return <div className="form-group mb-0">
			{field.label && <label className="mb-0">{field.label}</label>}
			<select type="text" className="form-control" 
				name={field.name}
				placeholder={field.placeholder} 
				value={value}
				ref={input => input && field.autoFocus && input.focus()}
				onChange={this.handle.change}
				onFocus={this.handle.focus}
				onBlur={this.handle.blur}>
				<option key="default" value="">**Select one**</option>
				{field.options.map((option)=>{
					return <option key={option.value} value={option.value}>{option.name}</option>
				})}
			</select>
			{field.helper && <small className="form-text text-muted">{field.helper}</small>}
		</div>
	}
};