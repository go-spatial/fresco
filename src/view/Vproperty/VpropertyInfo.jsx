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
		//console.log('errorMessage:',error);
		if (Map.isMap(error) || List.isList(error)){
			let message = '';
			error.keySeq().toArray().forEach((key)=>{
				message += key+': '+this.errorMessage(error.get(key));
			});
			return message;
		}
	}
	
	tooltip(){
		const {error} = this.props;

		if (error !== null && error !== undefined){
			window.$(this.errorIcon).tooltip();
			return;
		}
		window.$(this.icon).tooltip();
	}

	componentDidMount(){
		//console.log('mounted');
		this.tooltip();
	}
	componentDidUpdate(){
		//console.log('updated');
		this.tooltip();
	}

	componentWillUpdate(nextProps){
		const {error} = nextProps;
		if (error && this.icon) window.$(this.icon).tooltip('dispose');
		else if ((error === null || error === undefined) && this.errorIcon) window.$(this.errorIcon).tooltip('dispose');
	}

	render(){
		const {doc, error} = this.props;

		//console.log('error:',error);
		

		if (error !== null && error !== undefined) return <i title={this.errorMessage(error)} ref={ref => {this.errorIcon = ref;}} className="text-danger material-icons md-14">error</i>;
		if (!doc) return <span/>
		return <i title={doc} ref={ref => {this.icon = ref;}} className="material-icons md-14 text-muted">info_outline</i>;
	}
};