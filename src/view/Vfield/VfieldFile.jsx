import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldFile extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			helper: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.object,
			placeholder: PropTypes.string,
			error: PropTypes.string
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field, controlled} = this.props;

		if (controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				const file = e.target.files[0];
				if (controlled){
					this.setState({value:file});
				}
				handle.change(file);
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
		const {field, controlled} = this.props;
		const value = controlled ? this.state.value : this.props.value;

		return <div className="form-group mb-0">
			<label className="mb-0">{field.label}</label>
			<input type="file" className="form-control" 
				placeholder={field.placeholder} value={value && value.name}
				onChange={this.handle.change}
				onFocus={this.handle.focus}
				onBlur={this.handle.blur}/>
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};