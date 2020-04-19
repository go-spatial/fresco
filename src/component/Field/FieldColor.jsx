import React from 'react'
import PropTypes from 'prop-types'

import { SketchPicker } from 'react-color'
import Dropdown from '../Dropdown'

import utilMaterialColor from '../../utility/utilMaterialColors'

class FieldColor extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			panelOpen:false
		}
	}

	handleChange = (e)=>{
		const {handle} = this.props
		handle.change && handle.change({
			name:e.target.name,
			value:e.target.value
		})
	}

	handleFocus = (e)=>{
		const {handle} = this.props
		this.dropdownOver = false
		handle.focus && handle.focus(e.target.name)
	}
	
	handleBlur = (e)=>{
		const {handle} = this.props,
			{panelOpen} = this.state

		if (this.dropdownOver) return
		this.focused = false
		if (panelOpen) this.setState({panelOpen:false})
		handle.blur && handle.blur(e.target.name)
	}

	handleKeyup = (e)=>{
		const {handle} = this.props

		if (e.key === 'Enter'){
			handle && handle.enter && handle.enter({
				name:e.target.name,
				value:e.target.value
			})
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

	handleColorSet = (color)=>{
		const {name, handle} = this.props

		handle.change && handle.change({
			name:name,
			value: color
		})
		//this.setState({panelOpen:false})
	}
	
	handlePanelToggle = ()=>{
		if (this.state.panelOpen){
			this.setState({panelOpen:false})
		} else {
			this.setState({panelOpen:true})
		}
	}

	handlePanelOpenSet = (open)=>{
		this.setState({panelOpen: open})
	}
	
	handleDropdownMouseEnter = ()=>{
		this.dropdownOver = true
	}
	handleDropdownMouseLeave = ()=>{
		this.dropdownOver = false
	}

	render (){
		const {autoFocus, error, handle, inputClass, helper, icon, label, name, placeholder, value} = this.props,
			{panelOpen} = this.state

		return (
			<div className="form-group mb-0 position-relative">
				{label && <label className="mb-0">{label}</label>}
				{icon && <i className="material-icons md-18">{icon}</i>}
				<Dropdown handleClose={()=>this.handlePanelOpenSet(false)} open={panelOpen}>
					<React.Fragment>
						<div style={{backgroundColor:value}} className="swatch position-absolute swatch-pos swatch-border"
							onClick={this.handlePanelToggle}/>
						<input 
							autoFocus={autoFocus}
							type="text" 
							className={`form-control swatch-input-pl font-med ${inputClass? inputClass: ''} ${error? 'error': ''}`}
							placeholder={placeholder}
							name={name}
							onChange={this.handleChange}
							value={value} 
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							onKeyUp={this.handleKeyUp}/>
						{panelOpen && 
							<div className="ac-dropdown p-2"
								onMouseEnter={this.handleDropdownMouseEnter} 
								onMouseLeave={this.handleDropdownMouseLeave}>

								<div className="">
									{this.renderColorOptions()}
								</div>
							</div>
						}
					</React.Fragment>
				</Dropdown>
				{helper && <small className="form-text text-muted">{helper}</small>}
			</div>
		)
	}

	renderColorOptions = ()=>{
		const {value} = this.props

		const colors = utilMaterialColor.getAll()
		

		return (
			<div>
				{Object.keys(colors).map(i => (
					<div key={i} className="row m-0">
						{Object.keys(colors[i]).map(j => {
							const color = colors[i][j]
							const active = (color === value)? 'active': ''
							return (
								<div key={`${i}.${j}`} className={`swatch-flex interactive ${active}`} 
									onClick={e => this.handleColorSet(color)} 
									style={{
										backgroundColor: color
									}}
								/>
							)
						})}
					</div>
				))}
			</div>
		)
	}
}

FieldColor.propTypes = {
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
	value: PropTypes.string,
}

export default FieldColor