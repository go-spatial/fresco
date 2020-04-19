import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'immutable'

import Field from '../Field'
import Icon from '../Icon'

import modelStyle from '../../model/style'
import styleSpec from '../../vendor/style-spec/style-spec'
import utilMapboxSpec from '../../utility/utilMapboxSpec'

const getNextPos = (pos)=>{
	let ary = [...pos]
	ary[ary.length-1]++
	return ary
}

const getPrevPos = (pos)=>{
	let ary = [...pos]
	ary[ary.length-1]--
	if (ary[ary.length-1] < 1){
		ary.pop()
	}
	return ary
}

class PropertyExpression extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			open:false
		}
	}

	handleBackout = async ()=>{
		const {handle, name, path, value} = this.props
		if (handle && handle.backout) return handle.backout({name, path, value})
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

	handleOpen = async ({open})=>{
		this.setState({
			open,
		})
	}

	handleFocusNext = async ()=>{

	}

	handleFocusPrev = async ()=>{

	}

	handleEnter = async ()=>{

	}

	handleBackout = async ()=>{

	}


	/*
		this.fieldHandle = {
			change:handle.change,
			focus:handle.focus,


			enter:(f)=>{
				const pos = nameToPos(f.name)
				const nextPos = getNextPos(pos)

				console.log('enter:',nextPos, handle.layerHasIn(nextPos))

				if (!handle.layerHasIn(nextPos)){
					handle.change({
						name:posToName(nextPos),
						value:''
					})
				}
				handle.focus(posToName(nextPos))
			},
			backout:(f)=>{
				const pos = nameToPos(f.name)
				const prevPos = getPrevPos(pos)

				handle.layerRemoveIn(pos)
				handle.focus(posToName(prevPos))
			}
		}
	*/

	

	render (){
		const {autoFocus, error, label, name, path, value} = this.props,
			{open} = this.state

		const expName = value.first() || null

		const vals = List(value).shift()
		let options = utilMapboxSpec.getExpressionOptions()

		const handle = {
			change: this.handleChange,
		}

		const pathExp = [...path, 0]

		return <div className="form-group mb-0">
			{label && <label className="mb-0 d-block">
				{label}
				<span className="badge badge-secondary float-right">expression</span>
			</label>}

			<div className="exp-ml position-relative">
				<div className="exp-path"></div>

				<div onClick={()=>this.handleOpen({open:true})} className="position-absolute exp-arrow">
					{open ?
						<Icon icon={'arrow-down'}/>
						:
						<Icon icon={'arrow-right'}/>
					}
				</div>

				<div className="mb-2">
					<Field 
						autoFocus={autoFocus}
						error={error}
						handle={handle}
						name={name}
						options={options}
						path={pathExp}
						type={'AC'}
						value={value}
					/>
				</div>

				{open && vals.map((val, ind)=>{
					const path = [...path]
					return (
						<div key={ind} className="position-relative mb-2">
							<div className="exp-dot"/>
							{this.renderField({path, val})}
							{ind === vals.size-1 && 
								<div className="exp-line-end"/>
							}
						</div>
					)
				})}
			</div>

		</div>
	}


	renderField ({path, val}){
		const {autoFocus, error, name, options} = this.props

		const handle = {
			change: this.handleChange,
		}

		if (List.isList(val)){
			// build an expression
			return <PropertyExpression 
				autoFocus={autoFocus}
				error={error}
				handle={handle}
				name={name}
				options={options}
				path={path}
				type={'select'}
				value={val}
			/>
		} else if (val !== null && typeof val === 'number'){
			return <Field 
				autoFocus={autoFocus}
				error={error}
				handle={handle}
				name={name}
				options={options}
				path={path}
				type={'number'}
				value={val}
			/>
		} else if (val === true || val === false){
			return <Field 

			key={name} field={{
				type:'boolean',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>
		} else if (val === null){
			return <Field key={name} field={{
				type:'string',
				name:name,
				value:val,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>
		} else if (val && typeof val === 'string'){
			if (val.match(/^[0-9]+$/)){
				return <Field key={name} field={{
					type:'number',
					name:name,
					value:val,
					controlled:false,
					autoFocus:autoFocus
				}} handle={this.fieldHandle}/>
			}
			if (val.indexOf('#') === 0){
				return <Field key={name} field={{
					type:'color',
					name:name,
					value:val,
					controlled:false,
					autoFocus:autoFocus
				}} handle={this.fieldHandle}/>
			}
		}
		return <Field key={name} field={{
			type:'string',
			name:name,
			value:val,
			controlled:false,
			autoFocus:autoFocus
		}} handle={this.fieldHandle}/>
	}
}

PropertyExpression.propTypes = {
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

export default PropertyExpression