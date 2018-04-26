import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldAC extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			icon: PropTypes.string,
			helper: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.string,
			options: PropTypes.array,
			autoFocus: PropTypes.boolean
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {field, handle} = this.props;

		this.state = {
			inputValue:'',
			value:null,
			mode:null,
			focused:false
		};

		if (field.controlled){
			this.state.value = field.value;
		}

		console.log('AC handle:',handle);

		this.handle = {
			inputChange:(e)=>{
				this.setState({inputValue: e.target.value});
				// set active to first matching
				for (let i=0,len=field.options.length;i<len;i++){
					if (field.options[i].value.indexOf(e.target.value) !== -1){ // is a match
						this.setState({value: field.options[i].value});
						return;
					}
				}
				this.setState({value: null});
			},
			keyUp:(e)=>{
				if (e.key === 'ArrowDown'){
					let next = this.state.value === null? true: false;
					for (let i=0,len=field.options.length;i<len;i++){
						if (field.options[i].value.indexOf(e.target.value) === -1) continue; // not a match
						if (next) return this.setState({value: field.options[i].value});
						if (field.options[i].value === this.state.value){ // is value
							next = true;
						}
					}
				}
				if (e.key === 'ArrowUp'){
					let next = false;
					for (let i=field.options.length-1;i>=0;i--){
						if (field.options[i].value.indexOf(e.target.value) === -1) continue; // not a match
						if (next) return this.setState({value: field.options[i].value});
						if (field.options[i].value === this.state.value){ // is value
							next = true;
						}
					}
				}
				if (e.key === 'Enter'){
					if (this.state.value !== null){
						this.handle.select(this.state.value);
					}
				}
				if (e.key === 'Backspace' && !this.state.inputValue){
					if (handle.backout) handle.backout();
				}
			},

			change:(value)=>{
				if (field.controlled){
					this.setState({value:value});
				} else {
					if (handle.change) handle.change({
						name:field.name,
						value:value
					});
				}
			},
			
			select:(value)=>{
				this.setState({
					mode:'view',
				});

				this.handle.change(value);
			},
			liClick:(value)=>{
				console.log('li click:',value);
				this.handle.select(value);
			},
			cancel:()=>{
				//this.setState({selected:null});
				if (handle.clear) handle.clear();
			},

			selectedKeyPress:(e)=>{
				if (e.which === 13 /* Enter */) {
					return e.preventDefault();
				}
			},
			selectedClick:(e)=>{
				console.log('selected click');
				this.selectedEnter = true;
				this.setState({mode:'edit'});
				if (handle.selectedClick) handle.selectedClick();
			},
			selectedKeyUp:(e)=>{
				console.log('selected keyUp',e);
				/*
				if (e.key === 'ArrowDown'){
					this.props.handle.focusNext();
				}
				if (e.key === 'ArrowUp'){
					this.props.handle.focusPrev();
				}
				*/
				if (e.key === 'Enter'){
					this.setState({mode:'edit'});
				}
				if (e.key === 'Backspace'){
					this.setState({mode:'edit'});
				}
			},

			focus:()=>{
				this.setState({focused:true});
				if (handle.focus) handle.focus();
			},
			focusIs:()=>{
				//return handle.focusIs();
				return this.state.focused;
			},
			blur:()=>{
				//console.log('blur:',this.dropdownOver);
				if (this.dropdownOver) return;
				this.setState({focused:false});
				if (handle.blur) handle.blur();
			},

			dropdownMouseEnter:()=>{
				this.dropdownOver = true;
			},
			dropdownMouseLeave:()=>{
				this.dropdownOver = false;
			}

		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.field.value});
	}

	render (){
		const {field, handle} = this.props;
		const value = field.controlled ? this.state.value : field.value;

		//console.log('handle change:',value);
		if (value !== null && value.length > 0 && (!this.state.mode || this.state.mode === 'view')){

			//check if value is valid option, if not show error
			let found = false;
			for (let i=0,len=field.options.length;i<len;i++){
				let option = field.options[i];
				if (option.value === value){
					found = true;
				}
			}

			let error = null; //(!found)? 'expression not found': null; 

			return <div className="form-group mb-2 position-relative">
				{field.label && <label className="mb-0">{field.label}</label>}
				{field.icon && <i className="material-icons md-18">{field.icon}</i>}
				<div className="form-control">
					{value}
					<button type="button" className="btn btn-light btn-sm btn-right" 
						error={error}
						onBlur={this.handle.blur} 
						onClick={this.handle.selectedClick} 
						onKeyPress={this.handle.selectedKeyPress}
						onKeyUp={this.handle.selectedKeyUp} 
						onFocus={this.handle.focus} 
						ref={input => input && this.props.focus && input.focus()} 
					>
						<i className="material-icons md-14">close</i>
					</button>
				</div>
				{error && (
					<div>{error}</div>
				)}
			</div>
		}
		let count = 0;
		return <div className="form-group mb-2 position-relative">
			{field.label && <label className="mb-0">{field.label}</label>}
			{field.icon && <i className="material-icons md-18">{field.icon}</i>}
			<div className="position-relative">
				<input type="text" className="form-control" placeholder={field.placeholder}
					onBlur={this.handle.blur} 
					onChange={this.handle.inputChange}
					onFocus={this.handle.focus} 
					onKeyUp={this.handle.keyUp}
					ref={input => input && field.autoFocus && input.focus()}
					value={this.state.inputValue} />
				{this.handle.focusIs() && 
					<div className="ac-dropdown"
						onMouseEnter={this.handle.dropdownMouseEnter} 
						onMouseLeave={this.handle.dropdownMouseLeave}>
						{field.options.map((exp,i)=>{
							
							if (exp.value.indexOf(this.state.inputValue) === -1) return null;
							count++;
							if (count > 10) return null;

							let className = 'link-list px-2 py-1'
							if (this.state.value === exp.value) className += ' active';

							return <li className={className}
								onClick={(e)=>{this.handle.liClick(exp.value)}} 
								key={exp.value}>{exp.value}</li>
						})}
					</div>
				}
			</div>
		</div>

		return <div className="form-group mb-2">
			<label className="mb-0">{field.label}</label>
			<input type="text" className="form-control" name={field.name}
				placeholder={field.placeholder} value={value}
				onChange={this.handle.change}/>
			<small className="form-text text-muted">{field.helper}</small>
		</div>
	}
};