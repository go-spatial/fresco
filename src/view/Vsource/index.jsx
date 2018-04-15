import React from 'react';
import {Link, NavLink, Switch, Route} from 'react-router-dom';

import VsourceAdd from './VsourceAdd';
import VsourceEdit from './VsourceEdit';

import NameFromUrl from '../../utility/NameFromUrl';

export default class Vsources extends React.Component {
	constructor(props) {
		super(props);

		const {style, handle, match} = props;

		this.state = {};

		this.handle = {
		};

		if (style.has('sources') && style.get('sources').size > 0 && match.isExact){
			handle.routeReplace('source/'+encodeURIComponent(style.get('sources').keySeq().first()));
		}

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps (nextProps){
		const {handle, match, style} = nextProps;
		if (style.has('layers') && style.get('layers').size > 0 && match.isExact){
			handle.routeReplace('layer/'+encodeURIComponent(style.getIn(['layers',0,
				'id'])));
		}
	}

	render (){
		const {style, match, handle} = this.props;

		if (!style.has('sources') || style.get('sources').size < 1){
			return <VsourceAdd style={style} handle={handle}/>;
		}

		const sources = style.get('sources');

		return <div className="row h-100 mr-0">
			<div className="col-sm-5 pr-0">
				<div className="pl-1 py-1">
					<h2 className="px-2 py-1 m-0 text-nav bg-light list-border-right">
						Sources ({sources.size})
						<div className="float-right">
							<Link className="icon-btn gray" to={`${match.url}/search`}>
								<i className="material-icons md-18">search</i>
							</Link>
							<Link className="ml-1 icon-btn gray" to={`${match.url}/add`}>
								<i className="material-icons md-18">add_circle_outline</i>
							</Link>
						</div>
					</h2>
					<ul>
					{sources.keySeq().map((key)=>{
						const source = sources.get(key);
						const path = '/style/'+style.get('id')+'/source/'+encodeURIComponent(key);
						return <NavLink to={path} 
									className="px-2 py-1 d-block link-list list-border-right position-relative pr-list" 
									key={source.get('url')}>
										{NameFromUrl.get(source.get('url'))}
									<div className="list-right ml-2">
									</div>
								</NavLink>
					})}
					</ul>
				</div>
			</div>
			<div className="col-sm-7 px-0">
				<div className="p-1">
					<Switch>
						<Route path={`${match.url}/add`} 
							render={(props) => <VsourceAdd style={style} handle={handle} {...props}/>}/>
						<Route path={`${match.url}/:path`} 
							render={(props) => <VsourceEdit style={style} handle={handle} {...props}/>}/>
						<Route path={match.url}>
							<div className="bg-light h-100">
								Select a source
							</div>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	}
};