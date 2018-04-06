import React from 'react';
import PropTypes from 'prop-types';

export default class Vfield extends React.Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		field: PropTypes.shape({
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
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
				if (controlled) this.setState({value:e.target.value});
				handle && handle.change && handle.change(e.target.value);
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

		return <div className="form-group">
			<label>{field.label}</label>
			<input type="text" className="form-control" 
				placeholder={field.placeholder} value={value}
				onChange={this.handle.change}/>
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};