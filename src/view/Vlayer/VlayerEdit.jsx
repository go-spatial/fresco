import React from 'react';

import Valert from '../Valert';
import VlayerEditId from './VlayerEditId';
import VlayerEditJSON from './VlayerEditJSON';
import VlayerEditor from './VlayerEditor';
import VlayerOperation from './VlayerOperation';

import Mlayer from '../../model/Mlayer';
import Mstyle from '../../model/Mstyle';

export default class VlayerEdit extends React.Component {
	constructor(props) {
		super(props);

		const {handle, mode} = this.props;

		this.state = {
			editId:false,
			mode:mode || 'json'
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
			},
			jsonChange:(json)=>{
				Mlayer.set(this.id,json);
			},
			clickEdit:()=>{
				this.setState({mode:'edit'});
			},
			clickJson:()=>{
				this.setState({mode:'json'});
			},
			clickOperation:()=>{
				this.setState({mode:'operation'});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {match, style, id, handle} = this.props;

		this.id = id || match.params.id;

		const layer = Mlayer.get(this.id);
		const errors = Mstyle.errorsGet();

		const error = errors.getIn(['layers',Mlayer.getInd(this.id)]);

		//console.log('layer err:',error);

		// change map mode to show_hidden source layers

		if (layer === undefined){
			return <Valert message="no layer found"/>;
		}

		let section;
		switch (this.state.mode){
			case 'json':
				section = <VlayerEditJSON handle={{change:this.handle.jsonChange}} error={error} layer={layer}/>;
				break;
			case 'edit':
				section = <VlayerEditor key={this.id} handle={handle} error={error} layer={layer}/>;
				break;
			case 'operation':
				section = <VlayerOperation key={this.id} handle={handle} error={error} layer={layer}/>;
				break;
		}

		return <div className="">
			{this.state.editId?
				<VlayerEditId handle={{change:this.handle.changeId}} style={style} error={error} layer={layer}/>
			:
				<h2 className="px-2 py-1 m-0 text-nav bg-light">
					{layer.get('id')}
					<div className="float-right">
						<div onClick={this.handle.clickEdit} className={'d-inline-block layer-nav-link px-1 '+(this.state.mode === 'edit' ? 'active': '')}>
							<i className="material-icons md-18 icon-btn gray">mode_edit</i>
						</div>
						<div onClick={this.handle.clickJson} className={'d-inline-block layer-nav-link px-1 '+(this.state.mode === 'json' ? 'active': '')}>
							<i className="material-icons md-18 icon-btn gray">code</i>
						</div>
						
					</div>
				</h2>
			}
			<div>
			{section}
			</div>
		</div>;
	}
};