import React from 'react';

import {NavLink} from 'react-router-dom'

class Nav extends React.Component {

	render (){
		const paths = {
			home:'/',
			styles:'/styles',
			settings:'/settings'
		}
		
		return (
			<nav className="primary-nav">
				<NavLink to={paths.home}  className="" activeClassName="active">
					<img src={`${process.env.PUBLIC_URL}/img/icon.png`} className="primary-nav-icon" alt=""/>
				</NavLink>
			</nav>
		)

	}
}

export default Nav