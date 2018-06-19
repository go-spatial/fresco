import PropTypes from 'prop-types';
import React from 'react';

import Valert from '../Valert';
import VlayerEditId from './VlayerEditId';
import VlayerEditJSON from './VlayerEditJSON';
import VlayerEditor from './VlayerEditor';
import VlayerDelete from './VlayerDelete';

import Mlayer from '../../model/Mlayer';
import Mstyle from '../../model/Mstyle';

export default class VlayerEdit extends React.Component {

	static propTypes = {
		error: PropTypes.object, // map
		handle: PropTypes.object,
		match: PropTypes.object,
		mode: PropTypes.oneOf(['edit','json']),
		style: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle, mode} = this.props;

		this.state = {
			editId:false,
			mode:mode || 'json'
		};

		this.handle = {
			...handle,
			changeId:(newId)=>{
				// route to new id
				Mlayer.setIn(this.id,['id'],newId).then(()=>{
					this.setState({editId:false});
					handle.routeReplace('layer/'+newId);
				});
			},
			blurId:()=>{
				this.setState({editId:false});
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
			clickDelete:()=>{
				this.setState({modal:'delete'});
			},
			editIdShow:()=>{
				this.setState({editId:true});
			},
			clone:()=>{
				Mlayer.clone(this.id).then((newLayer)=>{
					handle.routeReplace('layer/'+newLayer.get('id'));
				});
			},
			modalClose:()=>{
				this.setState({modal:null});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, match, style, handle} = this.props;

		this.id = match.params.id;

		const layer = Mlayer.get(this.id);

		if (!layer) return <div/>

		const layerError = error.getIn(['layers',Mlayer.getInd(this.id)]);

		//console.log('layer err:',error);

		// change map mode to show_hidden source layers

		if (layer === undefined){
			return <Valert message="no layer found"/>;
		}

		let section, modal;
		switch (this.state.mode){
			case 'json':
				section = <VlayerEditJSON handle={{...handle,change:this.handle.jsonChange}} error={layerError} layer={layer}/>;
				break;
			case 'edit':
				section = <VlayerEditor key={this.id} handle={handle} error={layerError} layer={layer}/>;
				break;
			
		}

		switch (this.state.modal){
			case 'delete':
				modal = <VlayerDelete key={this.id} handle={handle} error={layerError} layer={layer}/>;
				break;
		}

		return <div>
			<h2 className="px-2 m-0 right-col-title bg-light row">
				<div className="text-overflow-ellipsis flex-2 edit-name mr-2 font-med" onClick={this.handle.editIdShow}>
					{this.state.editId ? 
						<VlayerEditId handle={{change:this.handle.changeId,blur:this.handle.blurId}} style={style} error={layerError} layer={layer}/>
						:
						layer.get('id')
					}
				</div>
				<div className="text-right">
					<div onClick={this.handle.clickEdit} className={'d-inline-block layer-nav-link px-1 '+(this.state.mode === 'edit' ? 'active': '')}>
						<i className="material-icons md-14 icon-btn gray">mode_edit</i>
					</div>
					<div onClick={this.handle.clickJson} className={'d-inline-block layer-nav-link px-1 '+(this.state.mode === 'json' ? 'active': '')}>
						<i className="material-icons md-14 icon-btn gray">code</i>
					</div>
					<div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="d-inline-block layer-nav-link px-1">
						<i className="material-icons md-14 icon-btn gray">arrow_drop_down</i>
					</div>
					<div className="dropdown-menu" style={{lineHeight:1.5}} data-boundary="window">
						<a key="clone" onClick={this.handle.clone} className="dropdown-item" href="javascript:">clone layer</a>
						<a key="delete" onClick={this.handle.clickDelete} className="dropdown-item" href="javascript:">delete layer</a>
					</div>
					
				</div>
			</h2>
			<div className="position-relative">
				{section}
				{modal && 
					<div className="modal-container">
						<div className="modal-backdrop"></div>
						<div className="modal-content pt-3">
							<button onClick={this.handle.modalClose} className="btn btn-light btn-xs position-absolute close-pos">
								<i className="material-icons md-14">close</i>
							</button>
							{modal}
						</div>
					</div>
				}
			</div>
			
		</div>;
	}
};