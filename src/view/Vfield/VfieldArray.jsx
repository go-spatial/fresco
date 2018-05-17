import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldArray extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.object,
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

		//console.log('field:',field);

		if (field.controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				//console.log('number changed:',e.target);
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

	render (){
		const {field} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		return <div className="form-group mb-0">
			{field.label && <label className="mb-0">{field.label}</label>}
			{value.map((val,ind)=>{
				const name = field.name+'.'+ind;
				console.log('name:',name);
				return <input key={ind} type="text" className={'form-control '+field.inputClass} name={name}
					placeholder={field.placeholder} value={val} 
					autoComplete={field.inputNoAC ? 'off' : 'on'}
					ref={input => input && field.autoFocus && input.focus()}
					onChange={this.handle.change}
					onFocus={this.handle.focus}
					onBlur={this.handle.blur}/>
			})}
			
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};