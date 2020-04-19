import React from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'

import Home from '../Home'
import Style from '../Style'

//import Account from '../Account'

class RouteC extends React.Component {

	render() {
		return (
			<Switch>
				<Route path="/style/:styleId" render={(props) => (
					<Style {...props} 
						styleId={props.match.params.styleId} />
				)}/>
				<Route render={(props) => (
					<Home {...props}/>
				)}/>
			</Switch>
		)
	}
}

export default RouteC




