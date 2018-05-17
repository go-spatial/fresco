import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Vfield from '../../Vfield';
import Valert from '../../Valert';
import VpropertyInfo from '../VpropertyInfo';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyArrayRow extends React.Component {

	static propTypes = {
		row: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			//value: PropTypes.object,
			error: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			])
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, func} = this.props;

		this.state = {
			open:true
		};

		this.handle = {
			toggleOpen:()=>{
				if (this.state.open){
					return this.setState({open:false});
				}
				this.setState({open:true});
			},
			remove:()=>{
				const pos = func.name.split('.');
				handle.layerRemoveIn(pos);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		this.fieldHandle = {
			change:handle.change,
			focus:handle.focus,

			/*

			focusNext:(pos)=>{
				let nextPos = getNextPos(pos);
				if (!handle.layerHasIn(nextPos)) return;
				this.handle.focus(nextPos);
			},
			focusPrev:(pos)=>{
				let prevPos = getPrevPos(pos);
				if (!handle.layerHasIn(prevPos)) return;
				this.handle.focus(prevPos);
			},

			enter:(f)=>{
				const pos = nameToPos(f.name);
				const nextPos = getNextPos(pos);

				console.log('enter:',nextPos, handle.layerHasIn(nextPos));

				if (!handle.layerHasIn(nextPos)){
					handle.change({
						name:posToName(nextPos),
						value:''
					});
				}
				handle.focus(posToName(nextPos));
			},
			backout:(f)=>{
				const pos = nameToPos(f.name);
				const prevPos = getPrevPos(pos);

				handle.layerRemoveIn(pos);
				handle.focus(posToName(prevPos));
			}
			*/
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}

	render (){
		const {row, error, focus} = this.props;

		const autoFocus = (row.name === focus)? true: false;

		//console.log('spec:',spec, 'value:',value);

		return <div className="form-group mb-0 position-relative">
			<Vfield key={row.name} field={{
				type:row.type,
				name:row.name,
				value:row.value,
				controlled:false,
				autoFocus:autoFocus
			}} handle={this.fieldHandle}/>
		</div>
	}
};