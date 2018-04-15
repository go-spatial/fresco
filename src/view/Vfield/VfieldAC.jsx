import React from 'react';
import PropTypes from 'prop-types';

export default class VfieldAC extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
			helper: PropTypes.string,
			error: PropTypes.string
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field, controlled} = this.props;

		if (controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				this.setState({inputValue: e.target.value});
				// set active to first matching
				for (let i=0,len=this.props.options.length;i<len;i++){
					if (this.props.options[i].value.indexOf(e.target.value) !== -1){ // is a match
						this.setState({active: this.props.options[i].value});
						return;
					}
				}
				this.setState({active: null});
			},
			keyUp:(e)=>{
				if (e.key === 'ArrowDown'){
					let next = this.state.active === null? true: false;
					for (let i=0,len=this.props.options.length;i<len;i++){
						if (this.props.options[i].value.indexOf(e.target.value) === -1) continue; // not a match
						if (next) return this.setState({active: this.props.options[i].value});
						if (this.props.options[i].value === this.state.active){ // is active
							next = true;
						}
					}
				}
				if (e.key === 'ArrowUp'){
					let next = false;
					for (let i=this.props.options.length-1;i>=0;i--){
						if (this.props.options[i].value.indexOf(e.target.value) === -1) continue; // not a match
						if (next) return this.setState({active: this.props.options[i].value});
						if (this.props.options[i].value === this.state.active){ // is active
							next = true;
						}
					}
				}
				if (e.key === 'Enter'){

					if (this.state.active !== null){
						this.handle.select(this.state.active);
					}
				}
				if (e.key === 'Backspace' && !this.state.inputValue){
					this.props.handle.backout();
				}
			},
			
			select:(value)=>{
				this.setState({mode:'view'});
				// if this is focused, move focus to next

				this.props.handle.select(value);
			},
			liClick:(value)=>{
				this.handle.select(value);
			},
			cancel:()=>{
				//this.setState({selected:null});
				this.props.handle.clear();
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
				this.props.handle.selectedClick();
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
				this.props.handle.focus();
			},
			focusIs:()=>{
				return this.props.handle.focusIs();
			},
			blur:()=>{
				if (this.dropdownOver) return;
				this.props.handle.blur();
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
		const {field, controlled} = this.props;
		const value = controlled ? this.state.value : this.props.value;

		//console.log('handle change:',this.state.value);
		if (this.props.value !== null && this.props.value.length > 0 && (!this.state.mode || this.state.mode === 'view')){

			//check if value is valid option, if not show error
			let found = false;
			for (let i=0,len=this.props.options.length;i<len;i++){
				let option = this.props.options[i];
				if (option.value === this.props.value){
					found = true;
				}
			}

			let error = (!found)? 'expression not found': null; 

			return <div theme={this.props.theme}>
				<div type="button" 
					error={error}
					onBlur={this.handle.blur} 
					onClick={this.handle.selectedClick} 
					onKeyPress={this.handle.selectedKeyPress}
					onKeyUp={this.handle.selectedKeyUp} 
					onFocus={this.handle.focus} 
					innerRef={input => input && this.props.focus && input.focus()} 
					theme={this.props.theme}>
					{this.props.value}
					
				</div>
				{error && (
					<Err>{error}</Err>
				)}
			</div>
		}
		let count = 0;
		return <div theme={this.props.theme}>
			<Input type="text" placeholder="enter an expression"
				onBlur={this.handle.blur} 
				onChange={this.handle.change}
				onFocus={this.handle.focus} 
				onKeyUp={this.handle.keyUp}
				innerRef={input => input && this.props.focus && input.focus()}
				theme={this.props.theme} 
				value={this.state.inputValue} />
			{this.handle.focusIs() && 
				<div theme={this.props.theme} 
					onMouseEnter={this.handle.dropdownMouseEnter} 
					onMouseLeave={this.handle.dropdownMouseLeave}>
					{this.props.options.map((exp,i)=>{
						
						if (exp.value.indexOf(this.state.inputValue) === -1) return null;
						count++;
						if (count > 10) return null;
						if (this.state.active === exp.value){
							return <ActiveLi theme={this.props.theme} 
								onClick={(e)=>{this.handle.liClick(exp.value)}} 
								key={exp.value}>{exp.value}</ActiveLi>
						}
						return <Li theme={this.props.theme} 
							onClick={(e)=>{this.handle.liClick(exp.value)}} 
							key={exp.value}>{exp.value}</Li>
					})}
				</div>
			}
		</div>
	}
};