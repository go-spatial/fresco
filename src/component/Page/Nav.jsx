import React from 'react';

import {NavLink, Link} from 'react-router-dom'
import Icon from '../Icon'

class Nav extends React.Component {

	render (){
		const {styles, handle} = this.props;

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