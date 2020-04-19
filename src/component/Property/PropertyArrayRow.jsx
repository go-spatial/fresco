import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'immutable'

import Field from '../Field'

import modelStyle from '../../model/style'
import styleSpec from '../../vendor/style-spec/style-spec'

class PropertyArrayRow extends React.Component {

	handleBackout = async ()=>{
		const {handle, name, path} = this.props
		if (handle && handle.backout) return handle.backout({name, path})
		await modelStyle.actions.removeIn({
			path,
		})
	}

	handleChange = async ({value})=>{
		const {handle, name, path} = this.props
		if (handle && handle.change) return handle.change({name, path, value})
		await modelStyle.actions.setIn({
			path,
			value,
		})
	}

	render (){
		const {autoFocus, error, name, path, value} = this.props

		const handle = {
			backout: this.handleBackout,
			change: this.handleChange,
		}

		return <div className="form-group mb-0 position-relative">
			<Field 
				autoFocus={autoFocus}
				error={error}
				handle={handle}
				name={name}
				path={path}
				type={'string'}
				value={value}
			/>
		</div>
	}
}

PropertyArrayRow.propTypes = {
	autoFocus: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	handle: PropTypes.shape({
		change: PropTypes.func,
	}),
	name: PropTypes.string.isRequired,
	path: PropTypes.array,
	type: PropTypes.string, // enum, point
	value: PropTypes.any,
	valueDefault: PropTypes.any,
}

export default PropertyArrayRow