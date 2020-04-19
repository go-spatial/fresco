import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import modelStyle from '../../model/style'

import Field from '../Field'
import Icon from '../Icon'

class PropertyMetadata extends React.Component {

	handleAdd = async ({name, value})=>{
		const {handle, path} = this.props

		if (handle && handle.change){
			const valueNew = this.props.value.setIn([''], '')
			return handle.change({
				name:this.props.name, 
				path,
				value: valueNew
			})
		}

		await modelStyle.actions.setIn({
			path: [...path, ''],
			value: value
		})
	}

	handleKeyChange = async ({name, value})=>{
		const {handle, path} = this.props

		if (handle && handle.change){
			const item = this.props.value.getIn([name])
			const valueRemoved = this.props.value.removeIn([name])
			const valueNew = valueRemoved.setIn([value], item)
			return handle.change({
				name:this.props.name, 
				path,
				value: valueNew
			})
		}

		await modelStyle.actions.changeKeyIn({
			keyOld: name,
			keyNew: value,
			path
		})
	}

	handleRemoveKey = async ({key})=>{
		const {handle, path, value} = this.props

		if (handle && handle.change){
			const valueRemoved = value.removeIn([key])
			return handle.change({
				name:this.props.name, 
				path,
				value: valueRemoved
			})
		}

		await modelStyle.actions.removeIn({
			path: [...path, key]
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
			path: [...path, name],
			value: value
		})
	}

	render (){
		const {focus, value} = this.props

		return <div className="">
			<div className="">
				{this.renderFields()}
				{!value.has('') && (
					<div className="py-1">
						<div onClick={this.handleAdd} className="btn btn-xs btn-light">
							<Icon icon={'add'}/>
						</div>
					</div>
				)}
				
			</div>
		</div>
	}

	renderFields (){
		const {path, value} = this.props

		const handleKey = {
			change: this.handleKeyChange,
		}
		const handleValue = {
			change: this.handleValueChange,
		}

		let i = -1

		return (
			<div>
				{value.keySeq().map((key)=>{
					i++
					return (
						<div key={i} className="row position-relative">

							<div className="col-sm-6 pr-1">
								<Field 
									handle={handleKey}
									name={key}
									placeholder={'key'}
									type={'string'}
									value={key}
								/>
							</div>
							<div className="col-sm-6 pl-0">
								<div className="position-relative">
									<Field 
										handle={handleValue}
										name={key}
										placeholder={'value'}
										type={'string'}
										value={value.get(key)}
									/>
									<div className="row-btn-remove">
										<button onClick={()=>this.handleRemoveKey({key})} className="btn btn-light btn-xs">
											<Icon icon={'close'}/>
										</button>
									</div>
								</div>
							</div>
							
						</div>
					)
				})}
			</div>
		)

	}
}

PropertyMetadata.propTypes = {
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

export default PropertyMetadata