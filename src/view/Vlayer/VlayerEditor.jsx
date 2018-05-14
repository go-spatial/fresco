import React from 'react';
import PropTypes from 'prop-types';

import ArrayHelpers from '../../utility/ArrayHelpers';

import Vfield from '../Vfield';

import VlayerGroup from './VlayerGroup';

import Mlayer from '../../model/Mlayer';
import Msource from '../../model/Msource';

/*
state
- focus for all children

*/

export default class VlayerEditor extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.state = {
			focus:null, // update with current focused element
			deleteShow:false
		};

		this.handle = {

			focus:(pos)=>{
				//console.log('focus:',pos);
				this.setState({focus:pos});
			},
			
			change:(field)=>{
				let key = field.name.split('.');
				key.forEach((k,i)=>{
					if (/^\d+$/.test(k)) key[i] = Number(k);
				});
				Mlayer.setIn(layer.get('id'),key,field.value);
			},


			enter:(field)=>{
				console.log('enter:',field);
				// focus next
				//this.setState({focus})
			},


			layerHasIn:(pos)=>{
				return layer.hasIn(pos);
			},
			layerSetIn:(pos,val)=>{
				Mlayer.setIn(layer.get('id'),pos,val);
			},
			layerRemoveIn:(pos)=>{
				Mlayer.removeIn(layer.get('id'),pos);
			},

			deleteConfirm:()=>{
				handle.route('layer');
				Mlayer.remove(layer.get('id')).then(()=>{

				});
			},
			deleteShow:()=>{
				this.setState({deleteShow:true});
			},
			deleteHide:()=>{
				this.setState({deleteShow:false});
			},




			/*

			clear:(key)=>{
				Mlayer.removeIn(layer.get('id'),key);
			},
			update:(key,value)=>{
				Mlayer.setIn(layer.get('id'),key,value);
			},
			




			// maybe
			isFocus:(pos)=>{
				return ArrayHelpers.equals(this.state.focus, pos);
			},

			/*

			blur:()=>{
				this.setState({focus:null});
			},
			focusNextAdd:(pos,focusPos)=>{ // move focus to next pos, if doesn't exist make it
				// get next pos
				let nextPos = this.getNextPos(pos);
				if (!this.handle.isDefined(nextPos)){
					console.log('next pos not defined:',this.handle.isDefined(nextPos),pos,nextPos);
					this.handle.vectorUpdate(nextPos,'');	
				}
				this.handle.focusFromTo(focusPos || pos,nextPos);
			},
			focusUpAdd:(pos,focusPos)=>{ // move focus to next pos up one level, if doesn't exist make it
				// get next pos
				let upPos = this.getUpPos(pos);
				this.handle.focusNextAdd(upPos,pos);
			},
			focusFromTo:(fromPos,toPos)=>{ // move focus to a pos
				if (this.handle.focusIs(fromPos)){
					this.focusPrev = fromPos;
					this.handle.focusIn(toPos);
				}
			},
			focusPrev:(pos)=>{ // move focus to next pos, if doesn't exist make it
				// get next pos
				let prevPos = this.getPrevPos(pos);
				if (!this.handle.isDefined(prevPos)) return;
				this.handle.focusFromTo(pos,prevPos);
			},
			focusBackout:(pos)=>{
				let prevPos = this.getPrevPos(pos);
				if (pos === '0'){
					this.handle.vectorUpdate(pos,'');
					return;
				}
				this.handle.focusFromTo(pos,prevPos);
				this.handle.vectorRemove(pos);
			},

			focusOut:(pos)=>{
				//console.log('focus out:',pos);
				// do not reset if another focus action triggered change
				if (this.focusPrev === pos){
					this.focusPrev = null;
					return;
				}
				this.setState({focus:null});
			},

			change:(field)=>{
				console.log('change:',field);
				Mlayer.setIn(layer.get('id'),[field.name],field.value);
			}*/
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	

	render (){
		const {style, layer, error} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const layerId = layer.get('id');

		//console.log('error:',error);

		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		// settings has a null group

		return <div className="">	
			
			<VlayerGroup type="settings" open={false} handle={this.handle} focus={this.state.focus} layer={layer} error={error}/>
			<VlayerGroup type="paint" open={true} handle={this.handle} focus={this.state.focus} layer={layer} error={error}/>
			<VlayerGroup type="layout" open={true} handle={this.handle} focus={this.state.focus} layer={layer} error={error}/>
			<div>
				{this.state.deleteShow ?
					<div className="form-group my-2 text-right">
						<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm mr-2">
							Delete Layer
						</button>
						<button onClick={this.handle.deleteHide} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">close</i>
						</button>
					</div>
					:
					<div className="form-group my-2 text-right">
						<button onClick={this.handle.deleteShow} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">delete</i>
						</button>
					</div>
				}
			</div>
		</div>;

		//
	}
};