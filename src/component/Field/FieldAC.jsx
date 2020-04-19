import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Dropdown from '../Dropdown'

const maxDropdowns = 20

class FieldAC extends React.Component {

	constructor(props) {
		super(props)

		this.dropdownOver = false
		this.state = {
			selected:null,
			inputValue:'',
			mode:null,
			dropdownShow: false,
		}
	}

	handleBlur = ()=>{
		const {handle} = this.props
		if (this.dropdownOver) return
		this.setState({focused:false})
		if (handle.blur) handle.blur()
	}

	handleCancel = ()=>{
		const {handle} = this.props
		if (handle.clear) handle.clear()
	}

	handleChange = (value)=>{
		const {handle, name} = this.props

		if (handle.change) handle.change({
			name: name,
			value: value
		})
	}

	handleDropdownShow = (show)=>{
		this.setState({
			dropdownShow: show
		})
	}

	handleDropdownMouseEnter = ()=>{
		this.dropdownOver = true
	}
	handleDropdownMouseLeave = ()=>{
		this.dropdownOver = false
	}

	handleFocus = ()=>{
		const {handle} = this.props
		this.setState({focused:true})
		if (handle.focus) handle.focus()
	}

	handleInputChange = (e)=>{
		const {options} = this.props
		this.setState({inputValue: e.target.value})
		// set active to first matching
		for (let i=0,len=options.length;i<len;i++){
			if (options[i].value.indexOf(e.target.value) !== -1){ // is a match
				this.setState({value: options[i].value})
				return
			}
		}
		this.setState({value: null})
	}

	handleItemClick = (value)=>{
		this.handleSelect(value)
	}

	handleKeyUp = (e)=>{
		const {options, value} = this.props
		if (e.key === 'ArrowDown'){
			let next = value === null? true: false
			for (let i=0,len=options.length;i<len;i++){
				if (options[i].value.indexOf(e.target.value) === -1) continue // not a match
				if (next) return this.setState({selected: options[i].value})
				if (options[i].value === this.state.value){ // is value
					next = true
				}
			}
		}
		if (e.key === 'ArrowUp'){
			let next = false
			for (let i=options.length-1;i>=0;i--){
				if (options[i].value.indexOf(e.target.value) === -1) continue // not a match
				if (next) return this.setState({selected: options[i].value})
				if (options[i].value === this.state.value){ // is value
					next = true
				}
			}
		}
		if (e.key === 'Enter'){
			if (this.state.value !== null){
				this.handleSelect(this.state.value)
			}
		}
		if (e.key === 'Backspace' && !this.state.inputValue){
			//if (handle.backout) handle.backout()
		}
	}

	

	handleSelect = (value)=>{
		this.setState({
			mode:'view',
		})

		this.handleChange(value)
	}

	handleSelectedClick = (e)=>{
		this.selectedEnter = true
		this.handleFocus()
		this.setState({mode:'edit'})
		//if (handle.selectedClick) handle.selectedClick()
	}

	handleSelectedKeyPress = (e)=>{
		if (e.which === 13 /* Enter */) {
			return e.preventDefault()
		}
	}

	handleSelectedKeyUp = (e)=>{
		if (e.key === 'Enter'){
			this.setState({mode:'edit'})
		}
		if (e.key === 'Backspace'){
			this.setState({mode:'edit'})
		}
	}
	
	render (){
		const {value} = this.props,
			{mode} = this.state

		if (value !== null && value.length > 0 && (!mode || mode === 'view')){
			return this.renderView()
		}
		return this.renderEdit()
	}

	renderEdit (){
		const {autoFocus, inputClass, label, options, placeholder} = this.props,
			{inputValue, focused, selected} = this.state

		let count = 0
		return (
			<div className="form-group mb-2 position-relative">
				{label && <label className="mb-0">{label}</label>}
				<div className="position-relative">
				<Dropdown handleClose={()=>this.handleBlur(false)} open={focused}>
					<input type="text" className={inputClass? inputClass: 'form-control'} placeholder={placeholder}
						onChange={this.handleInputChange}
						onFocus={this.handleFocus} 
						onKeyUp={this.handleKeyUp}
						autoFocus={autoFocus}
						value={inputValue}
					/>
					{focused && (
						<div className="drop-menu" data-boundary="window">
							{options.map((exp,i)=>{
								
								if (exp.value.indexOf(inputValue) === -1) return null
								count++
								if (count > maxDropdowns) return null

								let className = 'drop-item'
								if (selected === exp.value) className += ' active'

								return (
									<div 
										className={className} 
										onClick={(e)=>{this.handleSelect(exp.value)}} 
										key={exp.value}>

										{exp.value}
									</div>
								)
							})}
						</div>
					)}

				</Dropdown>
					
				</div>
			</div>
		)
	}

	renderView (){
		const {error, icon, label, value} = this.props
		return (
			<div className="form-group mb-0 position-relative">
				{label && <label className="mb-0">{label}</label>}
				{icon && <Icon icon={icon}/>}
				<div className="form-control">
					{value}
					<button type="button" className="btn btn-light btn-sm btn-right" 
						error={error}
						onBlur={this.handleBlur} 
						onClick={this.handleSelectedClick} 
						onKeyPress={this.handleSelectedKeyPress}
						onKeyUp={this.handleSelectedKeyUp} 
						onFocus={this.handleFocus}>
						<Icon icon={'close'}/>
					</button>
				</div>
				{error && (
					<div>{error}</div>
				)}
			</div>
		)
	}
}

FieldAC.propTypes = {
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
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.string,
}

export default FieldAC