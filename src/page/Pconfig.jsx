import React from 'react';

import {connect} from 'react-redux';

import Vnav from '../view/Vnav';
import Vfield from '../view/Vfield';

import {NavLink, Link, Route, Switch} from 'react-router-dom';


const mapStoreToProps = (store)=>{
	return {
		styles:store.styles
	} // props
};
const mapDispatchToProps = {};

class Pconfig extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		//styles.do();
		this.id = props.match.params.id;
		
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
		const {styles, match} = this.props;
		// buil;d ary from obj

		
		return <div>
			<Vnav/>
			<div className="container mt-4">
				<h2 className="px-2 py-2 m-0 text-light">Config</h2>

				<ul className="nav nav-tabs">
					<li className="nav-item">
						<NavLink className="nav-link" to="/config/mapbox">Mapbox</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/add/upload">Upload</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/add/fromSource">From Source</NavLink>
					</li>
				</ul>
				<div className="p-3 bg-white position-relative">

				</div>
			</div>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pconfig);