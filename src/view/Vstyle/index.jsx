import PropTypes from 'prop-types';
import React from 'react';
import {Switch, Link, NavLink, Route} from 'react-router-dom';

import Mstyle from '../../model/Mstyle';

import Vcode from '../Vcode';
import Vlayer from '../Vlayer';
import Vsave from '../Vsave';
import Vsetting from '../Vsetting';
import Vsource from '../Vsource';

export default class Vstyle extends React.Component {

	static propTypes = {
		handle: PropTypes.object,
		match: PropTypes.object,
		style: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {};

		this.handle = {
			getScrollElem:()=>{
				return this.scrollElem
			},
			...handle
		}
		this.handle.getScrollElem.bind(this);
	}

	render (){
		const {match, style} = this.props;

		const error = Mstyle.errorsGet();

		if (!style){
			return <div className="container">
				<h2>Loading</h2>
			</div>
		}
		return <div className="container-fluid h-100 ">
			<div className="row">
				<div className="col-xs-6 col-sm-8 col-lg-6 col-xl-5 w-max-500 bg-dk p-0">

					<nav className="nav w-100">
						<div className="nav-link nav-bb px-2" onClick={this.handle.goUp}>
							<i className="material-icons icon-btn white md-18">arrow_back</i>
						</div>
						<div className="navbar-brand flex-2 text-light text-nav text-overflow-ellipsis font-lg" to={match.url}>
							{style.get('name')}
						</div>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/setting`}>
							<i className="material-icons icon-btn white md-18">settings</i>
						</NavLink>
						<NavLink className={'nav-link nav-bb px-2 '+(error.has('sources')? 'error': '')} activeClassName="active" to={`${match.url}/source`}>
							<i className="material-icons icon-btn white md-18">wallpaper</i>
						</NavLink>
						<NavLink className={'nav-link nav-bb px-2 '+(error.has('layers')? 'error': '')} 
							activeClassName="active" to={`${match.url}/layer`}>
							<i className="material-icons icon-btn white md-18">layers</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/code`}>
							<i className="material-icons icon-btn white md-18">code</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/save`}>
							<i className="material-icons icon-btn white md-18">save</i>
						</NavLink>
						<Link to={match.url} className="nav-link nav-bb px-2">
							<i className="material-icons icon-btn white md-18">close</i>
						</Link>
					</nav>

					<div className="w-100 bg-white" ref={ref => this.scrollElem = ref}>
						<Switch>
							<Route path={`${match.url}/code`} 
								render={(props) => <Vcode error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${match.url}/layer`} 
								render={(props) => <Vlayer error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${match.url}/save`} 
								render={(props) => <Vsave error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${match.url}/setting`} 
								render={(props) => <Vsetting error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${match.url}/source`} 
								render={(props) => <Vsource error={error} handle={this.handle} style={style} {...props}/>}/>
						</Switch>
					</div>

					
				</div>
			</div>

		</div>
	}
};