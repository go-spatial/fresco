import React from 'react';
import PropTypes from 'prop-types';

import {Map, List} from 'immutable';

import Vfield from '../../Vfield';

import VlayerPropertyExpression from './VlayerPropertyExpression';

export default class VlayerProperty extends React.Component {

	static propTypes = {
		property: PropTypes.shape({
			name: PropTypes.string.isRequired, // fill_color
			label: PropTypes.string,
			spec: PropTypes.object,
			placeholder: PropTypes.string
		}),
		focus: PropTypes.string,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {mode} = this.props;

		this.state = {
		};

	}

	render (){
		const {property, handle, focus} = this.props;

		//console.log('prop:',property);

		const options = [];

		const spec = property.spec || {};

		const doc = property.spec && property.spec.doc || null;
		const type = property.spec && property.spec.type || 'string';

		const autoFocus = (property.name === focus)? true: false;

		if (spec.type === 'enum'){
			let options = [];
			for (let i in spec.values){
				options.push({
					name:i,
					value:i
				});
			};

			return <div>
				<Vfield field={{
					type:'select',
					name:property.name,
					label:property.label,
					value:property.value,
					placeholder:doc,
					controlled:false,
					options:options,
					autoFocus:autoFocus
				}} handle={handle}/>
			</div>
		}

		if (spec.type === 'array'){
			return <div>
				<Vfield field={{
					type:'array',
					name:property.name,
					label:property.label,
					value:property.value,
					placeholder:doc,
					controlled:false,
					autoFocus:autoFocus
				}} handle={handle}/>
			</div>
		}

		if (List.isList(property.value)){
			//console.log('expression');

			return <div>
				<VlayerPropertyExpression field={{
					pos:[0],
					type:'expression',
					name:property.name,
					label:property.label,
					value:property.value,
					placeholder:doc,
					controlled:false
				}} focus={focus} handle={handle}/>
			</div>
		}

		if (Map.isMap(property.value)){
			//console.log('object map');

			return <div>
				<VlayerPropertyExpression field={{
					type:'expression',
					name:property.name,
					label:property.label,
					value:property.value,
					placeholder:doc,
					controlled:false
				}} focus={focus} handle={handle}/>
			</div>
		}

		return <div>
			<Vfield field={{
				type:type,
				name:property.name,
				label:property.label,
				value:property.value,
				placeholder:doc,
				controlled:false,
				options:options,
				autoFocus:autoFocus
			}} handle={handle}/>
		</div>


		/*
		if (List.isList(property.value)){
			// render an expression field
			return <Vfield field={{
				type:'expression',
				name:'type',	
				label:'Type',
				value:property.value,
				placeholder:spec.doc,
				controlled:false
			}} key="type" handle={handle}/>
		}

		// if value is an ary, use the expression field

		// else use the spec type


		return <div className="">
		</div>;
		*/
	}
};