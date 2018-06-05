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

		/*
							
		*/

		return <nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to={paths.home} className="navbar-brand">
					<img src="/img/icon.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink to={paths.config} className="nav-link" activeClassName="active">
								config
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	}
};