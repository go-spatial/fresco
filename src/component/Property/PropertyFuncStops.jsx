import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Field from '../Field';
import PropertyInfo from './PropertyInfo';

import styleSpec from '../../vendor/style-spec/style-spec';

export default class PropertyFuncStops extends React.Component {

	static propTypes = {
		func: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			value: PropTypes.object,
			specType: PropTypes.string,
			propType: PropTypes.string, // the type of the property field
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
			focus:handle.focus

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
		const {func, focus} = this.props;
		const value = func.controlled ? this.state.value : func.value || '';

		const autoFocus = (func.name === focus)? true: false;

		const spec = styleSpec.latest.function[func.type];
		const doc = spec.doc;


		const buildOptions = ()=>{
			let types = [spec.type];

			return <div>
				<div className=""
				 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{spec.type}
					<i className="material-icons md-14">arrow_drop_down</i>
				</div>
				<div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
					<a key="remove" onClick={this.handle.remove} className="dropdown-item" href="javascript:">remove</a>
				</div>
			</div>;
		};

		//console.log('spec:',spec, 'value:',value,'error:',func.error);

		return <div className="form-group mb-0">
			<div className="position-relative">
				<label className="mb-0 d-block py-1 pl-1">
					{func.type+' '}
					<PropertyInfo doc={doc} error={func.error}/>
					<span className="float-right">
						{buildOptions()}
					</span>
				</label>

				{this.state.open && value.map((item,ind)=>{
					let name = func.name+'.'+ind;

					let key = item.get && item.get(0) || null;
					let val = item.get && item.get(1) || null;
					//let err = func.error && func.error.getIn && func.error.getIn(ind);

					return <div key={name} className="position-relative">
						<div className="row">
							<div className="col-sm-6 pr-1">
								<Field key={ind+'.0'} field={{
									type:func.propType || 'number',
									name:name+'.0',
									value:key,
									controlled:false,
									autoFocus:autoFocus
								}} handle={this.fieldHandle}/>
							</div>
							<div className="col-sm-6 pl-0">
								<Field key={ind+'.1'} field={{
									type:func.specType,
									name:name+'.1',
									value:val,
									controlled:false,
									autoFocus:autoFocus
								}} handle={this.fieldHandle}/>
							</div>
						</div>
					</div>;
				})}

				{func.helper && <small className="form-text text-muted">{func.helper}</small>}
			</div>

		</div>
	}
};