import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from '../Dropdown'
import Icon from '../Icon'
import PropertyArray from './PropertyArray'
import PropertyBool from './PropertyBool'
import PropertyColor from './PropertyColor'
import PropertyEnum from './PropertyEnum'
import PropertyJson from './PropertyJson'
import PropertyMetadata from './PropertyMetadata'
import PropertyFile from './PropertyFile'
import PropertyInfo from './PropertyInfo'
import PropertyNumber from './PropertyNumber'
import PropertyPoint from './PropertyPoint'
import PropertyString from './PropertyString'

import modelStyle from '../../model/style'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

class Property extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			dropdownShow: false,
		}
	}


	handleChangeType = async ({type})=>{
		const {handle, path, value, valueDefault} = this.props

		if (handle && handle.typeChange) return handle.typeChange({type, value, valueDefault})
		const newVal = utilMapboxSpec.getTypeChangeValue({type, value, valueDefault})
		await modelStyle.actions.setIn({path, value: newVal})
	}

	handleChange = async ({name, path, value})=>{
		const {handle} = this.props
		if (handle && handle.change) return handle.change({name, path, value})
		if (path) await modelStyle.actions.setIn({name, path, value})
	}

	handleRemove = async ()=>{
		const {handle, path} = this.props
		if (handle && handle.remove) return handle.remove({path})
		await modelStyle.actions.removeIn({path})
	}

	handleDropdownToggle = ()=>{
		const {dropdownShow} = this.state
		if (dropdownShow) return this.setState({dropdownShow:false})
		this.setState({dropdownShow:true})
	}

	handleDropdownShowSet = (show)=>{
		this.setState({dropdownShow:show})
	}


	render (){
		const {className, error, info, label} = this.props

		/* {required && <Icon icon={'required'}/>} */

		return <div className={className || 'form-group property'}>
			{label && <label className="property-label clearfix">
					<span>{label}</span>
					<PropertyInfo doc={info} error={error}/>
					<div className="property-label-options" role="group">
						{this.renderOptions()}
					</div>
				</label>
			}
			{this.renderField()}
		</div>

	}


	renderField (){
		const {autoFocus, error, focus, info, name, options, path, type, value} = this.props

		const handle = {
			change: this.handleChange,
			remove: this.handleRemove,
		}

		switch (type){
			case 'array':
				return (
					<PropertyArray
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'bool':
				return (
					<PropertyBool
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'color':
				return (
					<PropertyColor 
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						options={options}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'enum':
				return (
					<PropertyEnum 
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						options={options}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'expression':
				return (
					<PropertyJson
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'file':
				return (
					<PropertyFile
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'function':
				return (
					<PropertyJson
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'json':
				return (
					<PropertyJson
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'metadata':
				return (
					<PropertyMetadata
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'number':
				return (
					<PropertyNumber
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			case 'point':
				return (
					<PropertyPoint 
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
			default:
				return (
					<PropertyString 
						autoFocus={autoFocus}
						error={error}
						focus={focus} 
						handle={handle}
						name={name}
						path={path}
						placeholder={info}
						type={type}
						value={value}
					/>
				)
		}
	}

	renderOptions (){
		const {casts, removeEnabled, type} = this.props,
			{dropdownShow} = this.state

		const hasDropdown = (casts && casts.length > 1) || removeEnabled

		return (
			<Dropdown handleClose={()=>this.handleDropdownShowSet(false)} open={dropdownShow}>
				<div className="" onClick={this.handleDropdownToggle} aria-haspopup="true" aria-expanded="false">
					{type}
					{hasDropdown && <Icon icon={'dropdown'}/>}
				</div>
				{hasDropdown && dropdownShow && (
					<div className="drop-menu" data-boundary="window">
						{casts && casts.map((cast)=>{
							const className = `drop-item ${type === cast? 'active': ''}`
							return (
								<div 
									className={className}
									key={cast} 
									onClick={e => this.handleChangeType({type:cast})}>

									{cast}
								</div>
							)
						})}
						{removeEnabled && (
							<React.Fragment>
								<div key="divider" className="dropdown-divider"/>
								<div key="remove" onClick={this.handleRemove} className="drop-item">remove</div>
							</React.Fragment>
						)}
					</div>
				)}
				
			</Dropdown>
		)
	}
}

Property.propTypes = {
	autoFocus: PropTypes.bool,
	casts: PropTypes.array,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	handle: PropTypes.shape({
		change: PropTypes.func,
	}),
	info: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.array, // [{name:'test',value:3}]
	path: PropTypes.array,
	removeEnabled: PropTypes.bool,
	required: PropTypes.bool,
	type: PropTypes.string, // enum, point
	value: PropTypes.any,
	valueDefault: PropTypes.any,
}

export default Property