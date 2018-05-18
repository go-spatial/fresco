import React from 'react';
import PropTypes from 'prop-types';

import Valert from '../Valert';
import VfieldAC from './VfieldAC';
import VfieldColor from './VfieldColor';
import VfieldFile from './VfieldFile';
import VfieldJSON from './VfieldJSON';
import VfieldNumber from './VfieldNumber';
import VfieldSelect from './VfieldSelect';
import VfieldString from './VfieldString';

export default class Vfield extends React.Component {

	static propTypes = {
		field: PropTypes.shape({ 
			type: PropTypes.string.isRequired
		}),
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.value});
	}

	render (){
		const {field, handle} = this.props;

		switch (field.type){
			case 'AC':
				return <VfieldAC type={field.type} field={field} handle={handle}/>;
			case 'color':
				return <VfieldColor type={field.type} field={field} handle={handle}/>;
			case 'file':
				return <VfieldFile type={field.type} field={field} handle={handle}/>;
			case 'number':
				return <VfieldNumber type={field.type} field={field} handle={handle}/>;
			case 'select':
				return <VfieldSelect type={field.type} field={field} handle={handle}/>;
			case 'string':
				return <VfieldString type={field.type} field={field} handle={handle}/>;
			case 'JSON':
				return <VfieldJSON type={field.type} field={field} handle={handle}/>;
			

		}

		return <Valert message="field type not found"/>;
	}
};