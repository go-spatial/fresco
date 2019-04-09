import React from 'react';
import PropTypes from 'prop-types';

import { SketchPicker } from 'react-color';

import MaterialColor from '../../utility/MaterialColor';

export default class VfieldColor extends React.Component {

	static propTypes = {
		field: PropTypes.shape({
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			icon: PropTypes.string,
			helper: PropTypes.string,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
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
			panelOpen:false
		}
		if (field.controlled){
			this.state.value = field.value;
		}

		this.handle = {
			change:(e)=>{
				if (field.controlled) this.setState({value:e.target.value});
				handle && handle.change && handle.change({
					name:e.target.name,
					value:e.target.value
				});
			},
			focus:(e)=>{
				this.dropdownOver = false;
				handle.focus && handle.focus(e.target.name);
			},
			blur:(e)=>{
				if (this.dropdownOver) return;
				this.focused = false;
				if (this.state.panelOpen) this.setState({panelOpen:false});
				handle.blur && handle.blur(e.target.name);
			},
			keyUp:(e)=>{
				if (e.key === 'Enter'){
					handle && handle.enter && handle.enter({
						name:e.target.name,
						value:e.target.value
					});
				}
				if (e.key === 'Backspace' && e.target.value === ''){
					if (this.backoutOnce){
						this.backoutOnce = false;
						handle && handle.backout && handle.backout({
							name:e.target.name,
							value:e.target.value
						});
						return;
					}
					this.backoutOnce = true;
				}
				if (e.key === 'ArrowDown'){
					handle && handle.arrowDown && handle.arrowDown({
						name:e.target.name,
						value:e.target.value
					});
				}
				if (e.key === 'ArrowUp'){
					handle && handle.arrowUp && handle.arrowUp({
						name:e.target.name,
						value:e.target.value
					});
				}
			},
			colorSet:(color)=>{
				let value;
				switch(color.source){
					case 'rgb':
						value = 'rgba('+color.rgb.r+', '+color.rgb.g+', '+color.rgb.b+', '+color.rgb.a+')';
						break;
					default:
						value = color.hex;
				}

				handle && handle.change && handle.change({
					name:field.name,
					value:value
				});
				//this.setState({panelOpen:false});
			},
			panelToggle:()=>{
				if (this.state.panelOpen){
					this.setState({panelOpen:false});
				} else {
					this.setState({panelOpen:true});
				}
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

	render (){
		const {field, error} = this.props;
		const value = field.controlled ? this.state.value : field.value || '';

		const colors = MaterialColor.getAll();

		const colorOptionsGet = ()=>{
			let colorOptions = [];
			for (let i in colors){
				let colorGroup = colors[i];
				let colorRow = [];
				for (let j in colorGroup){
					let className = 'swatch-flex';
					if (field.value === colorGroup[j]) className += ' active';
					colorRow.push(<div key={i+'.'+j} className={className} 
						onClick={e => {this.handle.colorSet(colorGroup[j])}} 
						style={{
							backgroundColor:colorGroup[j]
						}}/>);
				}
				colorOptions.push(<div key={i} className="row m-0">{colorRow}</div>);
			}
			return colorOptions;
		};

		return <div className="form-group mb-0 position-relative">
			{field.label && <label className="mb-0">{field.label}</label>}
			{field.icon && <i className="material-icons md-18">{field.icon}</i>}
			<div className="position-relative">
				<div style={{backgroundColor:value}} className="swatch position-absolute swatch-pos swatch-border"
					data-toggle="dropdown"/>
				<div className="dropdown-menu" data-boundary="window">
					<SketchPicker
			        color={field.value}
			        onChangeComplete={this.handle.colorSet}
			      />
				</div>
				<input type="text" 
					className="form-control swatch-input-pl font-med" 
					placeholder={field.placeholder}
					name={field.name}
					onChange={this.handle.change}
					ref={input => {
						if (input && field.autoFocus){
							input.focus();
							if (!this.focused) input.setSelectionRange(value.length,value.length);
							this.focused = true;
						}		
					}}
					value={value} 
					onFocus={this.handle.focus}
					onBlur={this.handle.blur}
					onKeyUp={this.handle.keyUp}/>
				{this.state.panelOpen && 
					<div className="ac-dropdown p-2"
						onMouseEnter={this.handle.dropdownMouseEnter} 
						onMouseLeave={this.handle.dropdownMouseLeave}>

						<div className="">
							{colorOptionsGet()}
						</div>
					</div>
				}
			</div>
			{error && <div>{error}</div>}
			{field.helper && <small className="form-text text-muted">{field.helper}</small>}
		</div>
	}
};