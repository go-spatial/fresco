import React from 'react';
import PropTypes from 'prop-types';

import Vfield from '../../Vfield';

import styleSpec from '../../../vendor/style-spec/style-spec';

export default class VpropertyPoint extends React.Component {

	static propTypes = {
		property: PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired, // string of position . separated
			value: PropTypes.object, // list of 2 coordinates
			placeholder: PropTypes.string,
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
		const {handle, property} = this.props;


		this.fieldHandle = {
			...handle,
			backout:(f)=>{
				
			}
		};

		for (let i in this.fieldHandle){
			this.fieldHandle[i] = this.fieldHandle[i].bind(this);
		}

	}

	render (){
		const {property, focus} = this.props;

		const lngName = property.name+'.0';
		const latName = property.name+'.1';

		return <div className="form-group mb-0">
			<div className="mt-2 p-2 func-border position-relative">
				<div className="row">
					<div className="col-sm-6 pr-1">
						<Vfield field={{
							label:'longitude',
							type:'number',
							name:lngName,
							value:property.value.get(0),
							controlled:false,
							autoFocus:lngName === focus,
						}} handle={this.fieldHandle}/>
					</div>
					<div className="col-sm-6 pl-0">
						<Vfield field={{
							label:'latitude',
							type:'number',
							name:latName,
							value:property.value.get(1),
							controlled:false,
							autoFocus:latName === focus
						}} handle={this.fieldHandle}/>
					</div>
				</div>
			</div>
		</div>
	}
};