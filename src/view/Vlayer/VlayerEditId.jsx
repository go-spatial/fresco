import React from 'react';

import Vfield from '../Vfield';

export default class Vsource extends React.Component {
	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.state = {
			value:layer.get('id')
		};

		this.handle = {
			change:(f)=>{
				//this.setState({value:e.target.value});
				//handle.change(e.target.value);
				this.setState({value:f.value})
			},
			enter:(f)=>{
				if (handle.change) handle.change(this.state.value);
			},
			blur:()=>{
				if (handle.blur) handle.blur();
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {layer} = this.props;

		//console.log('active layer:',layer);

		const idField = {
			type:'string',
			name:'id',
			value:this.state.value,
			placeholder:'Unique ID for layer',
			controlled:false,
			autoFocus:true
		};
		return <div className="property">
			<Vfield type="string" handle={this.handle} field={idField} />
		</div>;
	}
};