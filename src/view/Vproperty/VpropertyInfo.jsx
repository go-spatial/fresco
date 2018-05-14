import React from 'react';
import PropTypes from 'prop-types';

import {Map, List} from 'immutable';

export default class Vproperty extends React.Component {

	static propTypes = {
		doc: PropTypes.string,
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	}

	errorMessage(error){
		if (typeof error === 'string') return error;
		console.log('errorMessage:',error);
		if (Map.isMap(error) || List.isList(error)){
			let message = '';
			error.keySeq().toArray().forEach((key)=>{
				message += key+': '+this.errorMessage(error.get(key));
			});
			return message;
		}
	}

	render(){
		const {doc, error} = this.props;

		//console.log('error:',error);

		if (error !== null && error !== undefined) return <i title={this.errorMessage(error)} className="text-danger material-icons md-14">error</i>;
		return <i title={doc} className="material-icons md-14 text-muted">info_outline</i>;
	}
};