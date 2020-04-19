import React from 'react'
import PropTypes from 'prop-types'

class FieldNumber extends React.Component {

	handleChange = (e)=>{
		const {handle, name, field} = this.props

		let value = (e.target.value)? Number(e.target.value): null
		handle && handle.change && handle.change({
			name,
			value
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

	handleKeyUp = (e)=>{
		const {handle, name} = this.props
		if (e.key === 'Enter'){
			handle && handle.enter && handle.enter({
				name:name,
				value:e.target.value
			})
		}
		if (e.key === 'Backspace' && e.target.value === 0){

			handle && handle.change && handle.change({
				name:name,
				value:null
			})
			return
		}

		if (e.key === 'Backspace' && e.target.value === ''){
			if (this.backoutOnce){
				this.backoutOnce = false
				handle && handle.backout && handle.backout({
					name:name,
					value:e.target.value
				})
				return
			}
			this.backoutOnce = true
		}
		if (e.key === 'ArrowDown'){
			handle && handle.arrowDown && handle.arrowDown({
				name:name,
				value:e.target.value
			})
		}
		if (e.key === 'ArrowUp'){
			handle && handle.arrowUp && handle.arrowUp({
				name:name,
				value:e.target.value
			})
		}
	}

	render (){
		const {autoFocus, helper, inputClass, inputNoAC, label, name, placeholder, value} = this.props

		return <div className="form-group mb-0">
			{label && <label className="mb-0">{label}</label>}
			<input 
				autoComplete={inputNoAC ? 'off' : 'on'}
				autoFocus={autoFocus}
				className={`form-control ${inputClass}`}
				name={name}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyUp={this.handleKeyUp}
				placeholder={placeholder} 
				type="number"  
				value={value} 
			/>
			<small className="form-text text-muted">{helper}</small>
		</div>
	}
}

FieldNumber.propTypes = {
	autoFocus: PropTypes.bool,
	error: PropTypes.string,
	handle: PropTypes.shape({
		backout: PropTypes.func,
		blur: PropTypes.func,
		change: PropTypes.func,
		focus: PropTypes.func,
	}),
	helper: PropTypes.string,
	icon: PropTypes.string,
	inputClass: PropTypes.string,
	inputNoAC: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.number,
}

export default FieldNumber