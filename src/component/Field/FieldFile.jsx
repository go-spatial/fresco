import React from 'react'
import PropTypes from 'prop-types'

class FieldFile extends React.Component {

	handleChange = (e)=>{
		const {name, handle} = this.props
		const file = e.target.files[0]
		handle.change({
			name,
			value:file
		})
	}

	handleFocus = (e)=>{
		const {handle} = this.props
		handle.focus && handle.focus(e.target.name)
	}

	handleBlur = (e)=>{
		const {handle} = this.props
		handle.blur && handle.blur(e.target.name)
	}

	render (){
		const {label, helper, placeholder, value} = this.props

		return <div>
			{label && (
				<label className="property-label clearfix">
					<span>{label}</span>
				</label>
			)}
			<input type="file" className="form-control" 
				placeholder={placeholder}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
       />
			<small className="form-text text-muted">{helper}</small>
		</div>
	}
}

FieldFile.propTypes = {
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
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
}

export default FieldFile
