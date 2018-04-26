import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldColor extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			icon: PropTypes.string,
			helper: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.string,
			options: PropTypes.array,
			autoFocus: PropTypes.boolean
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {field, handle} = this.props;

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
			},
			keyUp:(e)=>{
				if (e.key === 'Enter'){
					handle && handle.enter && handle.enter({
						name:e.target.name,
						value:e.target.value
					});
				}
				if (e.key === 'Backspace' && e.target.value === ''){
					if (this.backoutOnce){
						this.backoutOnce = false;
						handle && handle.backout && handle.backout({
							name:e.target.name,
							value:e.target.value
						});
						return;
					}
					this.backoutOnce = true;
				}
				if (e.key === 'ArrowDown'){
					handle && handle.arrowDown && handle.arrowDown({
						name:e.target.name,
						value:e.target.value
					});
				}
				if (e.key === 'ArrowUp'){
					handle && handle.arrowUp && handle.arrowUp({
						name:e.target.name,
						value:e.target.value
					});
				}
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
		const {field, handle, error} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		return <div className="form-group mb-2 position-relative">
			{field.label && <label className="mb-0">{field.label}</label>}
			{field.icon && <i className="material-icons md-18">{field.icon}</i>}
			<div className="position-relative">
				<div style={{backgroundColor:value}} className="swatch position-absolute swatch-pos"></div>
				<input type="text" 
					className="form-control swatch-input-pl" 
					placeholder={field.placeholder}
					name={field.name}
					onChange={this.handle.change}
					ref={input => input && field.autoFocus && input.focus()}
					value={value} 
					onFocus={this.handle.focus}
					onBlur={this.handle.blur}
					onKeyUp={this.handle.keyUp}/>
			</div>
			{error && <div>{error}</div>}
			{field.helper && <small className="form-text text-muted">{field.helper}</small>}
		</div>
	}
};