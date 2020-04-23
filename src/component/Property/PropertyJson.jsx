import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'

import Field from '../Field'

import modelStyle from '../../model/style'

class PropertyJson extends React.Component {

	handleChange = async ({value})=>{
		const {handle, name, path} = this.props
		const valueImm = fromJS(value)
		if (handle && handle.change) return handle.change({name, path, value: valueImm})
		await modelStyle.actions.setIn({
			path,
			value: valueImm,
		})
	}

	render (){
		const {autoFocus, error, name, options, path, value} = this.props

		const handle = {
			change: this.handleChange
		}

		return <div className="form-group mb-0">
			<Field 
				autoFocus={autoFocus}
				error={error}
				handle={handle}
				name={name}
				options={options}
				path={path}
				type={'json'}
				value={value}
			/>
		</div>
	}
}

PropertyJson.propTypes = {
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

export default PropertyJson