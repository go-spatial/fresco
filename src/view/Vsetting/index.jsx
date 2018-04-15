import React from 'react';

import Mstyle from '../../model/Mstyle';

import Vfield from '../Vfield';

export default class Vsetting extends React.Component {
	constructor(props) {
		super(props);
		const {style} = this.props;

		console.log('style',style.get('name'));

		this.handle = {
			change:(field)=>{
				Mstyle.setIn([field.name],field.value);
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style} = this.props;

		return <div className="h-100">
			<div className="p-1">
				<h2 className="px-2 py-1 m-0 text-nav bg-light list-border-right">
					Settings
					<div className="float-right">
						
					</div>
				</h2>
				<form className="p-2">
					<Vfield key="name" field={{
						type:'string',
						label:'Name',
						name:'name',
						value:style.get('name'),
						placeholder:'name of this style',
						controlled:false
					}} handle={this.handle}/>
					<Vfield key="sprite" field={{
						type:'string',
						label:'Sprite URL',
						name:'sprite',
						value:style.get('sprite'),
						placeholder:'points to the style sprites',
						controlled:false
					}} handle={this.handle}/>
					<Vfield key="glyphs" field={{
						type:'string',
						label:'Glyph URL',
						name:'glyphs',
						value:style.get('glyphs'),
						placeholder:'points to the style glyphs',
						controlled:false
					}} handle={this.handle}/>
				</form>
			</div>
		</div>
	}
};