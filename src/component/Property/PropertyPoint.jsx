import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import modelStyle from '../../model/style'

import Field from '../Field'

class PropertyPoint extends React.Component {

	handleChange = async ({name, value})=>{
		const {handle, path} = this.props

		const key = name === 'lng'? 0: 1

		if (handle && handle.change){
			const valueNew = this.props.value.setIn([key], value)
			return handle.change({
				name:this.props.name, 
				path,
				value: valueNew
			})
		}

		await modelStyle.actions.setIn({
			path: [...path, key],
			value,
		})
	}

	handleValueChange = async ({name, value})=>{
		const {handle, path} = this.props

		if (handle && handle.change){
			const valueNew = this.props.value.setIn([name], value)
			return handle.change({
				name:this.props.name, 
				path,
				value: valueNew
			})
		}

		await modelStyle.actions.setIn({
			path: [...path, ],
			value: value
		})
	}

	render (){
		const {focus, value} = this.props

		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				{this.renderFields()}
			</div>
		</div>
	}

	renderFields (){
		const {path, value} = this.props

		const handle = {
			change: this.handleChange,
		}

		return (
			<div className="row">
				<div className="col-sm-6 pr-1">
					<Field 
						handle={handle}
						label={'longitude'}
						name={'lng'}
						type={'number'}
						value={value.get(0)}
					/>
				</div>
				<div className="col-sm-6 pl-0">
					<Field 
						handle={handle}
						label={'latitude'}
						name={'lat'}
						type={'number'}
						value={value.get(1)}
					/>
				</div>
			</div>
		)

	}
}

PropertyPoint.propTypes = {
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
	valueType: PropTypes.string,
}

export default PropertyPoint