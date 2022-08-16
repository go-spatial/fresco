import React from 'react'
import PropTypes from 'prop-types'

import modelLayer from '../../model/layer'

class FieldRadio extends React.Component {

	handleChange = (e)=>{
		const {handle, name} = this.props
		handle.change && handle.change({
			name: name,
			value: e.target.value
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

	handleSubmit = async ()=>{
		const {layer, path, style} = this.props
		await modelLayer.actions.clone({layer, path, style})
	}

	render (){
		const {helper, label, name, options, value} = this.props

		return <div className="form-group mb-0">
			{label && <label className="mb-0">{label}</label>}
            <div>
                {options.map((option)=>{
                    const optionId = `field-radio-${name}-${option.value?.replaceAll(' ', '_')}`

                    return <div key={option.value} className="form-check">
                        <input
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            type="radio"
                            className="form-check-input"
                            id={optionId}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                        />
                        <label className="form-check-label" htmlFor={optionId}>{option.name}</label>
                        {option.helper && <div className="form-text font-med text-muted">
                            {option.helper}
                        </div>}
                    </div>
                })}
            </div>
			{/* <select  */}
			{/* 	autoFocus={autoFocus} */}
			{/* 	className="form-control font-med"  */}
			{/* 	name={name} */}
			{/* 	onChange={this.handleChange} */}
			{/* 	onFocus={this.handleFocus} */}
			{/* 	onBlur={this.handleBlur} */}
			{/* 	placeholder={placeholder}  */}
			{/* 	value={value}> */}
			{/* 	<option key="default" value="">**Select one**</option> */}
			{/* 	{options.map((option)=>{ */}
			{/* 		return <option key={option.value} value={option.value}>{option.name}</option> */}
			{/* 	})} */}
			{/* </select> */}
			{helper && <small className="form-text text-muted">{helper}</small>}
		</div>
	}
}

FieldRadio.propTypes = {
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
	value: PropTypes.any,
}


export default FieldRadio
