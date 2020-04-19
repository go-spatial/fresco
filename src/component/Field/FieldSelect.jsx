import React from 'react'
import PropTypes from 'prop-types'

class FieldSelect extends React.Component {

	handleChange = (e)=>{
		const {handle, name} = this.props
		handle.change && handle.change({
			name:name,
			value:e.target.value
		})
	}
	
	handleFocus = (e)=>{
		const {handle, name} = this.props
		handle.focus && handle.focus(name)
	}
	
	handleBlur = (e)=>{
		const {handle, name} = this.props
		handle.blur && handle.blur(name)
	}

	render (){
		const {autoFocus, helper, label, name, options, placeholder, value} = this.props

		return <div className="form-group mb-0">
			{label && <label className="mb-0">{label}</label>}
			<select 
				autoFocus={autoFocus}
				className="form-control font-med" 
				name={name}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				placeholder={placeholder} 
				value={value}>
				<option key="default" value="">**Select one**</option>
				{options.map((option)=>{
					return <option key={option.value} value={option.value}>{option.name}</option>
				})}
			</select>
			{helper && <small className="form-text text-muted">{helper}</small>}
		</div>
	}
}

FieldSelect.propTypes = {
	autoFocus: PropTypes.bool,
	error: PropTypes.string,
	handle: PropTypes.shape({
		backout: PropTypes.func,
		blur: PropTypes.func,
		change: PropTypes.func,
		focus: PropTypes.func,
	}),
	helper: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.any,
}


export default FieldSelect