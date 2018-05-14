import React from 'react';

import Mstyle from '../../model/Mstyle';

import Vfield from '../Vfield';

export default class Vsetting extends React.Component {
	constructor(props) {
		super(props);
		const {style, handle} = props;

		this.state = {
			deleteShow:false
		};

		console.log('style',style.get('name'));

		this.handle = {
			change:(field)=>{
				Mstyle.setIn([field.name],field.value);
			},
			deleteConfirm:()=>{
				handle.routeHome();
				Mstyle.remove().then(()=>{

				});
			},
			deleteShow:()=>{
				this.setState({deleteShow:true});
			},
			deleteHide:()=>{
				this.setState({deleteShow:false});
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
				<h2 className="px-2 py-1 m-0 text-nav bg-light">
					Settings
					<div className="float-right">
						
					</div>
				</h2>
				<div className="p-2">
					<div className="">
						<Vfield key="name" field={{
							type:'string',
							label:'Name',
							name:'name',
							value:style.get('name'),
							placeholder:'name of this style',
							controlled:false
						}} handle={this.handle}/>
					</div>
					<div className="mt-2">
						<Vfield key="sprite" field={{
							type:'string',
							label:'Sprite URL',
							name:'sprite',
							value:style.get('sprite'),
							placeholder:'points to the style sprites',
							controlled:false
						}} handle={this.handle}/>
					</div>
					<div className="mt-2">
						<Vfield key="glyphs" field={{
							type:'string',
							label:'Glyph URL',
							name:'glyphs',
							value:style.get('glyphs'),
							placeholder:'points to the style glyphs',
							controlled:false
						}} handle={this.handle}/>
					</div>

					{this.state.deleteShow ?
						<div className="form-group mt-2 text-right">
							<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm mr-2">
								Delete Style
							</button>
							<button onClick={this.handle.deleteHide} type="submit" className="btn btn-light btn-sm">
								<i className="material-icons md-18">close</i>
							</button>
						</div>
						:
						<div className="form-group mt-4 text-right">
							<button onClick={this.handle.deleteShow} type="submit" className="btn btn-light btn-sm">
								<i className="material-icons md-18">delete</i>
							</button>
						</div>
					}
				</div>
			</div>
		</div>
	}
};