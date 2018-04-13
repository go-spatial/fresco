import React from 'react';

import Mstyle from '../../model/Mstyle';

import Vfield from '../Vfield';

export default class Vsetting extends React.Component {
	constructor(props) {
		super(props);
		const {style} = this.props;

		console.log('style',style.get('name'));

		this.state = {
			name:style.get('name'),
			sprite:style.get('sprite'),
			glyphs:style.get('glyphs')
		};

		this.handle = {
			submit:(e)=>{
				e.preventDefault();
				Mstyle.setIn(['name'],this.state.name);
				Mstyle.setIn(['sprite'],this.state.sprite);
				Mstyle.setIn(['glyphs'],this.state.glyphs);
			},
			nameChange:(val)=>{
				this.setState({name:val});
				Mstyle.setIn(['name'],val);
			},
			spriteChange:(val)=>{
				this.setState({sprite:val});
				Mstyle.setIn(['sprite'],val);
			},
			glyphChange:(val)=>{
				this.setState({glyphs:val});
				Mstyle.setIn(['glyphs'],val);
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
				<form onSubmit={this.handle.submit} className="p-2">
					<Vfield key="name" type="string" field={{
						label:'Name',
						name:'styleName',
						value:this.state.name,
						placeholder:'name of this style',
						controlled:false
					}} handle={{change:this.handle.nameChange}}/>
					<Vfield key="sprite" type="string" field={{
						label:'Sprite URL',
						name:'sprite',
						value:this.state.sprite,
						placeholder:'points to the style sprites',
						controlled:false
					}} handle={{change:this.handle.spriteChange}}/>
					<Vfield key="glyphs" type="string" field={{
						label:'Glyph URL',
						name:'glyphs',
						value:this.state.glyphs,
						placeholder:'points to the style glyphs',
						controlled:false
					}} handle={{change:this.handle.glyphChange}}/>
				</form>
			</div>
		</div>
	}
};