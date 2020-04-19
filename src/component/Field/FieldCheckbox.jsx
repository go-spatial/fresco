import React from 'react'
import PropTypes from 'prop-types'

class FieldCheckbox extends React.Component {

	handleBlur = (e)=>{
		const {handle} = this.props
		handle.blur && handle.blur(e.target.name)
	}

	handleChange = (e)=>{
		const {handle} = this.props

		const name = e.target.name
		const value = e.target.checked ? true: false

		handle.change && handle.change({
			name: name,
			value: value
		})
	}

	handleFocus = (e)=>{
		const {handle} = this.props

		handle.focus && handle.focus(e.target.name)
	}

	handleKeyUp = (e)=>{
		const {handle} = this.props
		if (e.key === 'Enter'){
			handle && handle.enter && handle.enter({
				name:e.target.name,
				value:e.target.value
			})
		}
		if (e.key === 'Backspace' && e.target.value === 0){
			handle && handle.change && handle.change({
				name:e.target.name,
				value:null
			})
			return
		}
		if (e.key === 'Backspace' && e.target.value === ''){
			if (this.backoutOnce){
				this.backoutOnce = false
				handle && handle.backout && handle.backout({
					name:e.target.name,
					value:e.target.value
				})
				return
			}
			this.backoutOnce = true
		}
		if (e.key === 'ArrowDown'){
			handle && handle.arrowDown && handle.arrowDown({
				name:e.target.name,
				value:e.target.value
			})
		}
		if (e.key === 'ArrowUp'){
			handle && handle.arrowUp && handle.arrowUp({
				name:e.target.name,
				value:e.target.value
			})
		}
	}

	render (){
		const {autoFocus, helper, inputClass, label, name, placeholder, value} = this.props

		if (value === null || value === undefined) value = false

		return <div className="form-group mb-0">
			<input type="checkbox" 
				autoFocus={autoFocus}
				className={inputClass? inputClass: 'form-control'} 
				name={name}
				placeholder={placeholder} 
				value={true}
				checked={value? 'checked': false}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyUp={this.handleKeyUp}/>
			{label && <label className="mb-0 ml-2">{label}</label>}
			<small className="form-text text-muted">{helper}</small>
		</div>
	}
}

FieldCheckbox.propTypes = {
	autoFocus: PropTypes.bool,
	error: PropTypes.string,
	handle: PropTypes.shape({
		backout: PropTypes.func,
		blur: PropTypes.func,
		change: PropTypes.func,
		focus: PropTypes.func,
	}),
	helper: PropTypes.string,
	inputClass: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.bool,	
}


export default FieldCheckbox