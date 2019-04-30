import PropTypes from 'prop-types';
import React from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';

import NameFromURL from '../../utility/NameFromURL';
import styleSpec from '../../vendor/style-spec/style-spec';

import Valert from '../Valert';
import Vproperty from '../Vproperty';
import VsourceDelete from './VsourceDelete';
import VsourceEdit from './VsourceEdit';
import VsourceLayers from './VsourceLayers';
import VsourceSettings from './VsourceSettings';

import Msource from '../../model/Msource';

export default class VsourceDetail extends React.Component {
	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		handle: PropTypes.object,
		match: PropTypes.object,
		sources: PropTypes.object,
		style: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle, match, style} = this.props;

		this.redirectEmpty(handle, match, style);

		this.state = {
			modal:null
		};

		this.handle = {
			...handle,
			clickDelete:()=>{
				this.setState({modal:'delete'});
			},
			modalClose:()=>{
				this.setState({modal:null});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}

		// use loading screen for JSON
		const key = decodeURIComponent(match.params.key);
		const source = Msource.get(key);

		Msource.setJSON(key,source).catch((e)=>{

		});
	}

	componentWillReceiveProps (nextProps){
		const {handle, match, style} = nextProps;
		this.redirectEmpty(handle, match, style);
	}

	redirectEmpty (handle, match, style){
		if (style.has('sources') && style.get('sources').size > 0 && match.isExact){
			//console.log('redirect emtpy:',match);
			handle.routeReplace(match.url+'/edit');
		}
	}

	render (){
		const {error, handle, match, sources, style} = this.props;

		const sourceKey = decodeURIComponent(match.params.key);
		const source = sources.get(sourceKey);

		const sourceError = error && error.getIn(['sources',sourceKey]);

		//console.log('spec:',styleSpec.latest);

		const spec = styleSpec.latest['source_'+source.get('type')];

		// change map mode to show_hidden source layers

		if (source === null){
			return <div/>;
		}

		let modal;
		switch (this.state.modal){
			case 'delete':
				modal = <VsourceDelete error={error} handle={handle} key={sourceKey} sourceKey={sourceKey} style={style} source={source}/>;
				break;
		}

		const settingsPath = match.url+'/settings';
		const editPath = match.url+'/edit';
		const layersPath = match.url+'/layers';

		return <div>
			<h2 className="px-2 m-0 right-col-title bg-light row">
				<div className="text-overflow-ellipsis flex-2 edit-name mr-2 font-med" onClick={this.handle.editIdShow}>
					{sourceKey}
				</div>
				<div className="text-right">
					<NavLink className="d-inline-block layer-nav-link px-1" to={editPath}>
						<i className="material-icons md-14 icon-btn gray">mode_edit</i>
					</NavLink>
					<NavLink className="d-inline-block layer-nav-link px-1" to={layersPath}>
						<i className="material-icons md-14 icon-btn gray">layers</i>
					</NavLink>

					<div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="d-inline-block layer-nav-link px-1">
						<i className="material-icons md-14 icon-btn gray">arrow_drop_down</i>
					</div>
					<div className="dropdown-menu" style={{lineHeight:1.5}} data-boundary="window">
						<a key="delete" onClick={this.handle.clickDelete} className="dropdown-item" href="javascript:">delete source</a>
					</div>
				</div>
			</h2>
			<div className="position-relative panel-min-height">
				<Switch>
					<Route path={`${match.url}/edit`} 
						render={(props) => <VsourceEdit error={sourceError} handle={handle} sourceKey={sourceKey} style={style} source={source} {...props}/>}/>
					<Route path={`${match.url}/layers`} 
						render={(props) => <VsourceLayers error={sourceError} handle={handle} sourceKey={sourceKey} style={style} source={source} {...props}/>}/>
					<Route path={`${match.url}/settings`} 
						render={(props) => <VsourceSettings error={sourceError} handle={handle} sourceKey={sourceKey} style={style} source={source} {...props}/>}/>
				</Switch>
				{modal && 
					<div className="modal-container">
						<div className="modal-backdrop"></div>
						<div className="modal-content pt-3">
							<button onClick={this.handle.modalClose} className="btn btn-light btn-xs position-absolute close-pos">
								<i className="material-icons md-14">close</i>
							</button>
							{modal}
						</div>
					</div>
				}
			</div>
			
		</div>;
	}
};