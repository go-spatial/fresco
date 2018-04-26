import React from 'react';
import PropTypes from 'prop-types';

import ArrayHelpers from '../../utility/ArrayHelpers';

import Vfield from '../Vfield';

import VlayerGroup from './VlayerGroup';

import Mlayer from '../../model/Mlayer';
import Msource from '../../model/Msource';


const getNextPos = (pos)=>{
	let copy = [...pos];
	copy[copy.length-1]++;
	return copy;
};

const getPrevPos = (pos)=>{
	let copy = [...pos];
	copy[copy.length-1]--;
	if (copy[copy.length-1] < 1){
		copy.pop();
	}
	return copy;
};

const nameToPos = (name)=>{
	let key = name.split('.');
	key.forEach((k,i)=>{
		if (/^\d+$/.test(k)) key[i] = Number(k);
	});
	return key;
};

const posToName = (pos)=>{
	return pos.join('.');
};

export default class VlayerEditor extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.state = {
			focus:null // update with current focused element

			// focus ['paint','fill-color',0]
		};

		this.handle = {

			focus:(pos)=>{ // pos is an array of the position in the layer ['paint','fill-color',0]
				this.setState({focus:pos});
			},
			focusNext:(pos)=>{
				let nextPos = getNextPos(pos);
				if (!layer.hasIn(nextPos)) return;
				this.handle.focus(nextPos);
			},
			focusPrev:(pos)=>{
				let prevPos = getPrevPos(pos);
				if (!layer.hasIn(prevPos)) return;
				this.handle.focus(prevPos);
			},
			change:(field)=>{
				let key = field.name.split('.');
				key.forEach((k,i)=>{
					if (/^\d+$/.test(k)) key[i] = Number(k);
				});
				Mlayer.setIn(layer.get('id'),key,field.value);
			},

			layerHasIn:(pos)=>{
				return layer.hasIn(pos);
			},
			layerRemoveIn:(pos)=>{
				Mlayer.removeIn(layer.get('id'),pos);
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
		const {style, layer} = this.props;

		const typeOptions = Mlayer.getTypes();
		const sourceOptions = Msource.getOptions();

		const sourceLayerOptions = (layer.get('source'))? Msource.getLayerOptions(layer.get('source')):
			null;

		const layerId = layer.get('id');
		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		// settings has a null group

		return <div>
			<div className="p-2">
				<VlayerGroup type="settings" handle={this.handle} focus={this.state.focus} layer={layer}/>
				
			</div>
		</div>;

		//<VlayerGroup type="paint" handle={this.handle} focus={this.state.focus} layer={layer}/>
	}
};