import React from 'react';
import {Switch, Link, NavLink, Route} from 'react-router-dom';

import Mstyle from '../../model/Mstyle';

import Vcode from '../Vcode';
import Vlayer from '../Vlayer';
import Vsave from '../Vsave';
import Vsetting from '../Vsetting';
import Vsource from '../Vsource';
import Valert from '../Valert';

export default class Vstyle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render (){
		const {match, style, handle, error} = this.props;

		const maxContentH = window.innerHeight - 44;

		//check for error in style
		//console.log('error:',error);

		if (!style){
			return <div className="container">
				<h2>Loading</h2>
			</div>
		}
		return <div className="container-fluid h-100">
			<div className="row">
				<div className="col-xs-6 col-sm-8 col-lg-6 col-xl-5 w-max-500 bg-dk p-0">

					<nav className="nav w-100">
						<div className="nav-link nav-bb px-2" onClick={handle.goUp}>
							<i className="material-icons icon-btn white md-24">arrow_back</i>
						</div>
						<Link className="navbar-brand flex-2 text-light text-nav" to={match.url}>
							{style.get('name')}
						</Link>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/setting`}>
							<i className="material-icons icon-btn white md-24">settings</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/source`}>
							<i className="material-icons icon-btn white md-24">wallpaper</i>
						</NavLink>
						<NavLink className={'nav-link nav-bb px-2 '+(error.has('layers')? 'error': '')} 
							activeClassName="active" to={`${match.url}/layer`}>
							<i className="material-icons icon-btn white md-24">layers</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/code`}>
							<i className="material-icons icon-btn white md-24">code</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${match.url}/save`}>
							<i className="material-icons icon-btn white md-24">save</i>
						</NavLink>
					</nav>

					<div className="w-100 bg-white o-y-scroll" style={{maxHeight:maxContentH+'px'}}>
						<Switch>
							<Route path={`${match.url}/code`} 
								render={(props) => <Vcode style={style} handle={handle} {...props}/>}/>
							<Route path={`${match.url}/layer`} 
								render={(props) => <Vlayer style={style} handle={handle} {...props}/>}/>
							<Route path={`${match.url}/save`} 
								render={(props) => <Vsave style={style} handle={handle} {...props}/>}/>
							<Route path={`${match.url}/setting`} 
								render={(props) => <Vsetting style={style} handle={handle} {...props}/>}/>
							<Route path={`${match.url}/source`} 
								render={(props) => <Vsource style={style} handle={handle} {...props}/>}/>
						</Switch>
					</div>

					<div className="fixed-bottom">
						{error.has('general') && 
							<Valert message={error.get('general')}/>
						}
					</div>
				</div>
			</div>

		</div>
	}
};