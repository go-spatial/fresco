import React from 'react';
import PropTypes from 'prop-types';

import Valert from '../Valert';
import VfieldFile from './VfieldFile';
import VfieldJSON from './VfieldJSON';
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
			case 'file':
				return <VfieldFile type={field.type} field={field} handle={handle}/>;
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