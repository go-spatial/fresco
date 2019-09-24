import React from 'react';

import {NavLink, Link} from 'react-router-dom';

export default class Vnav extends React.Component {

	render (){
		const {styles, handle} = this.props;

		const paths = {
			home:'/',
			styles:'/',
			config:'/config'
		}
		
		return <nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to={paths.home} className="navbar-brand">
					<img src={`${process.env.PUBLIC_URL}/img/icon.png`} width="30" height="30" className="d-inline-block align-top" alt=""/>
				</Link>

				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink to={paths.config} className="nav-link" activeClassName="active">
							config
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>

	}
};