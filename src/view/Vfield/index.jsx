import React from 'react';
import PropTypes from 'prop-types';

import Valert from '../Valert';
import VfieldString from './VfieldString';
import VfieldFile from './VfieldFile';

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
			case 'string':
				return <VfieldString type={type} field={field} handle={handle}/>;
			case 'file':
				return <VfieldFile type={type} field={field} handle={handle}/>;

		}

		return <Valert message="field type not found"/>;
	}
};