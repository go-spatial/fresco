import React from 'react';

import Valert from '../Valert';
import VlayerEditId from './VlayerEditId';

import Mlayer from '../../model/Mlayer';

export default class Vsource extends React.Component {
	constructor(props) {
		super(props);

		const {handle} = this.props;

		this.state = {
			editId:false
		};

		this.handle = {
			change:(e)=>{
				//this.setState({value:e.target.value});
				//handle.change(e.target.value);
			},
			changeId:(newId)=>{
				// route to new id
				Mlayer.setIn(this.id,['id'],newId).then(()=>{
					handle.routeReplace('layer/'+newId);
				});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {match, style, id} = this.props;

		this.id = id || match.params.id;

		const layer = Mlayer.get(this.id);

		//console.log('active layer:',layer);

		// change map mode to show_hidden source layers

		if (layer === undefined){
			return <Valert message="no layer found"/>;
		}

		return <div className="">
			{this.state.editId?
				<VlayerEditId handle={{change:this.handle.changeId}} style={style} layer={layer}/>
			:
				<h2 className="px-2 py-1 m-0 text-nav bg-light">
					{layer.get('id')}
					<div className="float-right">
						<i className="material-icons md-18">mode_edit</i>
						<i className="material-icons md-18">code</i>
					</div>
				</h2>
			}
		</div>;
	}
};