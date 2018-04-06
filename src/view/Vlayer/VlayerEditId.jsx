import React from 'react';

import Vfield from '../Vfield';

export default class Vsource extends React.Component {
	constructor(props) {
		super(props);

		const {handle} = this.props;

		this.state = {};

		this.handle = {
			change:(val)=>{
				//this.setState({value:e.target.value});
				//handle.change(e.target.value);
				if (handle.change) handle.change(val);
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
			label:'ID',
			name:'id',
			value:layer.get('id'),
			placeholder:'Unique ID for layer'
		};
		return <div>
			<Vfield type="string" handle={this.handle} field={idField} />
		</div>;
	}
};