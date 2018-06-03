import React from 'react';

import {connect} from 'react-redux';

import Vnav from '../view/Vnav';
import Vconfig from '../view/Vconfig';

import {NavLink, Link, Route, Switch} from 'react-router-dom';


const mapStoreToProps = (store)=>{
	return {
		config:store.config
	} // props
};
const mapDispatchToProps = {};

class Pconfig extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		
		this.handle = {
			route:(path)=>{
				this.props.history.push('/'+path);
			},
			routeReplace:(path)=>{
				this.props.history.replace('/'+path);
			},
			goBack:()=>{
				this.props.history.goBack();
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {config, match} = this.props;

		return <div>
			<Vnav/>
			<div className="p-3">
				<Vconfig config={config} handle={this.handle}/>
			</div>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pconfig);