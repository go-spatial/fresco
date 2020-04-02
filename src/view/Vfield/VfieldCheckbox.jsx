import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldCheckbox extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.bool,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.string,
			controlled: PropTypes.bool,
			inputClass: PropTypes.string,
			inputNoAC: PropTypes.bool,
			autoFocus: PropTypes.bool
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field} = this.props;

		//console.log('field:',field);

		if (field.controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				//console.log('number changed:',e.target);
				let value = e.target.checked ? true: false;

				if (field.controlled) this.setState({value:value});

				console.log('checked value:',value);
				handle && handle.change && handle.change({
					name:e.target.name,
					value:value
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
				//console.log('handle key:',e.key,e.target.value);
				if (e.key === 'Backspace' && e.target.value === 0){

					handle && handle.change && handle.change({
						name:e.target.name,
						value:null
					});
					return;
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

	render (){
		const {field} = this.props;
		let value = field.controlled ? this.state.value : field.value;
		if (value === null || value === undefined) value = false;

		//console.log('number value:',value);

		const className = field.inputClass? field.inputClass: '';

		return <div className="form-group mb-0">
			
			<input type="checkbox" className={className} name={field.name}
				placeholder={field.placeholder} 
				value={true}
				checked={value? 'checked': false}
				ref={input => input && field.autoFocus && input.focus()}
				onChange={this.handle.change}
				onFocus={this.handle.focus}
				onBlur={this.handle.blur}
				onKeyUp={this.handle.keyUp}/>
			{field.label && <label className="mb-0 ml-2">{field.label}</label>}
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};