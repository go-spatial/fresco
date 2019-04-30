import PropTypes from 'prop-types';
import React from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';

import VsettingBase from './VsettingBase';
import VsettingDomains from './VsettingDomains';

export default class Vsetting extends React.Component {
	static propTypes = {
		handle: PropTypes.object,
		match: PropTypes.object,
		style: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, match, style} = props;
		this.redirectEmpty(handle, match, style);
	}

	componentWillReceiveProps (nextProps){
		const {handle, match, style} = nextProps;
		this.redirectEmpty(handle, match, style);
	}

	redirectEmpty (handle, match, style){
		if (match.isExact){
			handle.routeReplace('setting/base');
		}
	}

	render (){
		const {error, handle, match, style} = this.props,
			maxContentH = window.innerHeight - 44;

		return <div className="row mr-0 h-100">
			<div className="col-5 pr-0 o-y-scroll panel-min-height" style={{maxHeight:maxContentH+'px'}}>
				<h2 className="px-2 m-0 text-nav bg-light row">
					<div className="flex-2 text-overflow-ellipsis font-med">
						Settings
					</div>
				</h2>
				<div className="bg-light font-sm">
					<NavLink className="px-2 py-1 d-block link-list list-border-right position-relative" to={`${match.url}/base`} key={'base'}>
						Base
					</NavLink>
					<NavLink className="px-2 py-1 d-block link-list list-border-right position-relative" to={`${match.url}/domains`} key={'domains'}>
						Domain Headers
					</NavLink>
				</div>
			</div>
			<div className="col-7 px-0 o-y-scroll panel-min-height" style={{maxHeight:maxContentH+'px'}}>
				<div className="p-1">
					<Switch>
						<Route path={`${match.url}/base`} 
							render={(props) => <VsettingBase handle={handle} style={style} {...props}/>}/>
						<Route path={`${match.url}/domains`} 
							render={(props) => <VsettingDomains handle={handle} style={style} {...props}/>}/>
					</Switch>
				</div>
			</div>
		</div>
	}
};