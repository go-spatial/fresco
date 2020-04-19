import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'immutable'

import PropertyArrayRow from './PropertyArrayRow'
import Icon from '../Icon'

import modelStyle from '../../model/style'
import styleSpec from '../../vendor/style-spec/style-spec'

class PropertyArray extends React.Component {

	handleAdd = async ()=>{
		const {path, value, valueDefault} = this.props
		if (!value || !value.size){
			await modelStyle.actions.setIn({
				path,
				value: List([valueDefault])
			})
			await modelStyle.actions.focusIn({path})
			return
		}
		const pathAdd = [...path, value.size]
		await modelStyle.actions.setIn({
			path: pathAdd,
			value: valueDefault
		})
		await modelStyle.actions.focusIn({path: pathAdd})
	}

	render (){
		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				{this.renderRows()}

				<div className="mt-2">
					<div onClick={this.handleAdd} className="btn btn-xs btn-light">
						<Icon icon={'add'}/>
					</div>
				</div>
			</div>
		</div>
	}

	renderRows (){
		const {error, handle, name, path, type, value, valueDefault} = this.props

		if (!value || !value.map) return <div/>

		return value.map((val, key) => {
			const pathRow = [...path, key]
			//const error = error && error.get ? error.get(key): null
			return (
				<PropertyArrayRow 
					handle={handle}
					key={key} 
					name={name}
					path={pathRow}
					type={type}
					value={val}
					valueDefault={valueDefault}
				/>
			)
		})
	}
}


PropertyArray.propTypes = {
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

export default PropertyArray