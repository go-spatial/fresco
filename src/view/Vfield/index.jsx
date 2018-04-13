import React from 'react';
import PropTypes from 'prop-types';

import Valert from '../Valert';
import VfieldFile from './VfieldFile';
import VfieldJSON from './VfieldJSON';
import VfieldSelect from './VfieldSelect';
import VfieldString from './VfieldString';


export default class Vfield extends React.Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		field: PropTypes.object,
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
		const {type, field, handle} = this.props;

		switch (type){
			case 'file':
				return <VfieldFile type={type} field={field} handle={handle}/>;
			case 'select':
				return <VfieldSelect type={type} field={field} handle={handle}/>;
			case 'string':
				return <VfieldString type={type} field={field} handle={handle}/>;
			case 'JSON':
				return <VfieldJSON type={type} field={field} handle={handle}/>;
			

		}

		return <Valert message="field type not found"/>;
	}
};