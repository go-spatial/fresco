import React from 'react';
import {NavLink, Link, Route, Switch} from 'react-router-dom';

import LayerIcon from '../../utility/LayerIcon';

import VlayerAdd from './VlayerAdd';
import VlayerEdit from './VlayerEdit';

export default class Vlayers extends React.Component {
	constructor(props) {
		super(props);
		const {handle} = this.props;

		this.state = {
			layerAddShown:false
		};

		this.handle = {
			layerAdd:()=>{
				handle.route('layerAdd');
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style, match, handle} = this.props;

		if (!style.has('layers') || style.get('layers').size < 1){
			return <VlayerAdd handle={handle} style={style}/>;
		}

		let layers = style.get('layers');
		
		return <div className="row h-100">
			<div className="col-sm-5 pr-0">
				<div className="pl-1 py-1">
					<h2 className="px-2 py-1 m-0 text-nav bg-light list-border-right">
						Layers ({layers.size})
						<div className="float-right">
							<Link className="icon-btn gray" to={`${match.url}/search`}>
								<i className="material-icons md-18">search</i>
							</Link>
							<Link className="ml-1 icon-btn gray" to={`${match.url}/add`}>
								<i className="material-icons md-18">add_circle_outline</i>
							</Link>
						</div>
					</h2>
					<div className="bg-light">
						{layers !== undefined && layers.map((layer,i)=>{
							//console.log('layer:',layer);

							return <NavLink to={`${match.url}/${layer.get('id')}`} 
								className="px-2 py-1 d-block link-list list-border-right position-relative p-list" key={layer.get('id')}>

									<div className="list-left mr-2 inline-block">
										<i className="material-icons md-18" style={{color:LayerIcon.getColor(layer)}}>{LayerIcon.getIcon(layer)}</i>
									</div>
									{layer.get('id')}

								
								<div className="list-right ml-2">
									<i className="material-icons md-18">visibility</i>
								</div>
							</NavLink>
						})}
					</div>
				</div>
			</div>
			<div className="col-sm-7 pl-0">
				<div className="p-1">
					<Switch>
						<Route path={`${match.url}/add`} 
							render={(props) => <VlayerAdd style={style} handle={handle} {...props}/>}/>
						<Route path={`${match.url}/:id`} 
							render={(props) => <VlayerEdit style={style} handle={handle} {...props}/>}/>
						<Route path={match.url}
							render={(props) => <VlayerEdit style={style} handle={handle} id={layers.getIn([0,'id'])} {...props}/>}/>
					</Switch>
				</div>
			</div>
		</div>
	}
};