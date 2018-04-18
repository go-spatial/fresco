import React from 'react';
import {NavLink, Link, Route, Switch} from 'react-router-dom';

import LayerIcon from '../../utility/LayerIcon';

import Mstyle from '../../model/Mstyle';
import Mlayer from '../../model/Mlayer';

import Vfield from '../Vfield';
import VlayerAdd from './VlayerAdd';
import VlayerEdit from './VlayerEdit';
import VlayerSearch from './VlayerSearch';

export default class Vlayers extends React.Component {
	constructor (props){
		super(props);
		const {handle, match, style} = this.props;

		this.state = {
			layerAddShown:false,
			searchShow:false,
			search:null
		};

		console.log('match:',match);

		if (style.has('layers') && style.get('layers').size > 0 && match.isExact){
			handle.routeReplace('layer/'+encodeURIComponent(style.getIn(['layers',0,
				'id'])));
		}

		this.handle = {
			layerAdd:()=>{
				handle.route('layerAdd');
			},
			visibility:(layerId)=>{
				Mlayer.visibilityToggle(layerId);
			},
			searchShow:()=>{
				this.setState({searchShow:true});
			},
			searchHide:()=>{
				this.setState({
					searchShow:false,
					search:null
				});
			},
			searchChange:(field)=>{
				this.setState({search:field.value});
			}
		};
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

		if (!style.has('layers') || style.get('layers').size < 1){
			return <VlayerAdd handle={handle} style={style}/>;
		}

		const layers = style.get('layers');
		const errors = Mstyle.errorsGet();
		
		return <div className="row mr-0 h-100">
			<div className="col-sm-5 pr-0">
				<div className="pl-1 py-1">
					{this.state.searchShow ? 
						<div className="px-2 py-1 m-0 text-nav bg-light list-border-right clearfix position-relative">
							<div className="position-absolute layer-search-pos">
								<Vfield field={{
									type:'string',
									name:'search',	
									value:this.state.search,
									placeholder:'Search for layer',
									controlled:false,
									inputClass:'form-control-sm',
									inputNoAC:true,
									autoFocus:true
								}} key="type" handle={{
									change:this.handle.searchChange
								}}/>
							</div>
							<div className="float-right">
								<span className="icon-btn gray" onClick={this.handle.searchHide}>
									<i className="material-icons md-18">close</i>
								</span>
							</div>
						</div>
						:
						<h2 className="px-2 py-1 m-0 text-nav bg-light list-border-right">
							Layers ({layers.size})
							<div className="float-right">
								<span className="icon-btn gray" onClick={this.handle.searchShow}>
									<i className="material-icons md-18">search</i>
								</span>
								<Link className="ml-1 icon-btn gray" to={`${match.url}/add`}>
									<i className="material-icons md-18">add_circle_outline</i>
								</Link>
							</div>
						</h2>
					}
					
					<div className="bg-light">
						{layers !== undefined && layers.map((layer,i)=>{
							//console.log('layer:',layer);

							if (this.state.search && layer.get('id').indexOf(this.state.search) === -1) return;

							let className = 'px-2 py-1 d-block link-list list-border-right position-relative p-list';
							if (errors.hasIn(['layers',i])) className += ' error';

							return <NavLink to={`${match.url}/${layer.get('id')}`} 
								className={className} key={layer.get('id')}>

								<div className="list-left mr-2 inline-block">
									<i className="material-icons md-18 md-shadow" style={{color:LayerIcon.getColor(layer)}}>{LayerIcon.getIcon(layer)}</i>
								</div>
								{layer.get('id')}
								<div onClick={()=>{this.handle.visibility(layer.get('id'))}} className="list-right ml-2">
									{layer.getIn(['layout','visibility']) === 'none' ?
										<i className="material-icons md-18 md-muted">visibility_off</i>
										:
										<i className="material-icons md-18">visibility</i>
									}
								</div>
							</NavLink>
						})}
					</div>
				</div>
			</div>
			<div className="col-sm-7 px-0">
				<div className="p-1">
					<Switch>
						<Route path={`${match.url}/add`} 
							render={(props) => <VlayerAdd style={style} handle={handle} {...props}/>}/>
						<Route path={`${match.url}/search`} 
							render={(props) => <VlayerSearch style={style} handle={handle} {...props}/>}/>
						<Route path={`${match.url}/:id`} 
							render={(props) => <VlayerEdit style={style} handle={handle} {...props}/>}/>
					</Switch>
				</div>
			</div>
		</div>
	}
};