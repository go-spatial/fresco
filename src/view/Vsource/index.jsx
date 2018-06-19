import PropTypes from 'prop-types';
import React from 'react';
import {Switch, Route} from 'react-router-dom';

import VsourceAdd from './VsourceAdd';
import VsourceDetail from './VsourceDetail';
import VsourceList from './VsourceList';

export default class Vsource extends React.Component {
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
		if (style.has('sources') && style.get('sources').size > 0 && match.isExact){
			handle.routeReplace('source/'+encodeURIComponent(style.get('sources').keySeq().first()));
		}
	}

	render (){
		const {error, handle, match, style} = this.props,
			maxContentH = window.innerHeight - 44, 
			sources = style.get('sources');

		if (!style.has('sources') || style.get('sources').size < 1){
			return <VsourceAdd handle={handle} style={style} sources={sources}/>;
		}

		return <div className="row mr-0 h-100">
			<div className="col-5 pr-0 o-y-scroll panel-min-height" style={{maxHeight:maxContentH+'px'}}>
				<VsourceList error={error} handle={handle} match={match} sources={style.get('sources')}/>
			</div>
			<div className="col-7 px-0 o-y-scroll panel-min-height" style={{maxHeight:maxContentH+'px'}}>
				<div className="p-1">
					<Switch>
						<Route path={`${match.url}/add`} 
							render={(props) => <VsourceAdd handle={handle} style={style} sources={sources} {...props}/>}/>
						<Route path={`${match.url}/:key`} 
							render={(props) => <VsourceDetail error={error} handle={handle} style={style} sources={sources} {...props}/>}/>
					</Switch>
				</div>
			</div>
		</div>
	}
};