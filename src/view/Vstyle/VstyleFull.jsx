import React from 'react';
import {Switch, Link, NavLink, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Mproperty from '../../model/Mproperty';
import Mstyle from '../../model/Mstyle';

import Vcode from '../Vcode';
import Vfield from '../Vfield';
import Vlayer from '../Vlayer';
import Vpanel from '../Vpanel';
import Vproperty from '../Vproperty';
import Vsave from '../Vsave';
import Vsetting from '../Vsetting';
import Vsource from '../Vsource';

class VstyleFull extends React.Component {

	componentWillReceiveProps(newProps){
		const {scope, style} = newProps;
		//console.log('comWRP:',!style || !style.get('loaded'),scope.match.params.id !== this.props.scope.match.params.id);
		if (!style || !style.get('loaded')){
			return Mstyle.load(scope.match.params.id);
		}
		if (scope.match.params.id !== this.props.scope.match.params.id){
			return Mstyle.load(scope.match.params.id);
		}
	}

	componentWillUnmount(){
		//Mstyle.clear();
	}

	constructor(props) {
		super(props);
		this.state = {
			searchShow:false,
			search:null
		};

		this.searchHandle = {
			show:()=>{
				this.setState({searchShow:true});
			},
			hide:()=>{
				this.setState({
					searchShow:false,
					search:null
				});
			}
		}
		for (let i in this.searchHandle){
			this.searchHandle[i] = this.searchHandle[i].bind(this);
		}
	}

	/*
	constructor(props) {
		super(props);
		const {handle, scope, style} = props;
		this.handle = {
			goUp:()=>{
				handle.go('/');
			},
			route:(path)=>{
				handle.go('/style/'+style.get('id')+'/'+path);
			},
			routeReplace:(path)=>{
				if (path.indexOf('/') === 0) return handle.forward(path); //is a root path
				handle.forward('/style/'+style.get('id')+'/'+path);
			}
		};
		for (const i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
		
		this.state = {};
	}
	*/

	render (){
		const {handle, scope, style} = this.props;

		const rec = style.get('rec');

		console.log('pathname:', scope.location.pathname);

		let size = 'med', 
			pathAry = scope.location.pathname.split('/');
		if (pathAry.length === 4) size = 'slim';
		else if (pathAry.length > 4) size = 'zero'; 

		console.log('size:',size);

		const panel = {
			id:'VstyleFull',
			float:'left',
			size:size
		};

		const error = Mstyle.errorsGet();

		const navHandle = {
			goUp:()=>{
				handle.go('/');
			}
		};

		let inner, outer;
		if (!scope.match.params.id){
			inner = <div>No style id</div>;
			outer = [];
		} else if (!style || !style.get('loaded') || style.getIn(['rec','id']) !== scope.match.params.id){
			inner = <div>Loading</div>;
			outer = [];
		} else {
			inner = <div>
				<nav className="panel-nav nav">
					<div className="nav-item px-0">
						<a href="javascript:" onClick={navHandle.goUp} className="nav-link px-0">
							<i className="material-icons icon-btn gray md-14">keyboard_arrow_left</i>
						</a>
					</div>
					<div className="nav-item flex-2 text-overflow-ellipsis" to={scope.match.url}>
						<a className="nav-link" href="javascript:">
							{rec.get('name')}
						</a>
					</div>
					<div className="nav-item px-0">
						<a href="javascript:" onClick={this.searchHandle.show} className="nav-link px-0">
							<i className="material-icons icon-btn gray md-14">search</i>
						</a>
					</div>
					<div className="nav-item px-0">
						<a href="javascript:" onClick={this.searchHandle.show} className="nav-link px-0">
							<i className="material-icons icon-btn gray md-14">add</i>
						</a>
					</div>
					<div className="nav-item px-0">
						<a href="javascript:" onClick={this.searchHandle.show} className="nav-link px-0">
							<i className="material-icons icon-btn gray md-14">code</i>
						</a>
					</div>
					<div className="nav-item px-0 mr-1">
						<Link to={scope.match.url} className="nav-link px-0">
							<i className="material-icons icon-btn gray md-14">keyboard_arrow_down</i>
						</Link>
					</div>
				</nav>
				<div className="panel-list panel-list-lg">
					{this.state.searchShow &&
						<form className="panel-search">
							{this.renderSearchField()}
							<a href="javascript:" className="close" onClick={this.searchHandle.hide}>
								<i className="material-icons icon-btn gray md-18">close</i>
							</a>
				    	</form>
				    }
					{this.renderList()}
				</div>
			</div>;
			outer = this.renderRoutes();
		}
		//console.log('render styleFull:',style);

		return <div>
			<Vpanel panel={panel}>
				{inner}
			</Vpanel>
			{outer}
		</div>;

	}

	renderFull (){

	}

	renderList (){
		const {handle, scope, style} = this.props;

		// render properties

		const rec = style.get('rec');

		let list = [];
		console.log('style:',rec);

		rec.map((val,key) => {
			let path = scope.match.url+'/'+key;
			let className = '';
			//if (error.hasIn(['layers',i])) className += ' error';
			const name = style.get('name');

			if (this.state.search && name.toLowerCase().indexOf(this.state.search.toLowerCase()) === -1) return;

			const prop = {
				error:this.state.error,
				key:key,
				path:['style',rec.get('id')],
				view:'row',
				value:val
			};

			list.push(<NavLink to={path} className={className} key={key}>
				<Vproperty handle={handle} property={prop} scope={scope}/>
			</NavLink>);
		});

		return list;
	}

	renderRoutes(paths){
		const {scope, style} = this.props;

		const rec = style.get('rec');

		let routes = [];
		rec.map((val,key) => {
			routes.push(
				<Route key={key} path={scope.match.url+'/'+key} 
					render={(props) => this.renderRoute(key,val,props)}/>
			);
		});
		return routes;
	}

	renderRoute(key,val,props){
		const {match} = props;
		const {handle, scope, style} = this.props;

		const rec = style.get('rec');

		const prop = {
			error:this.state.error,
			key:key,
			path:['style',rec.get('id')],
			view:'full',
			value:val
		};

		return <Vproperty handle={handle} property={prop} scope={{...scope, match, prev:scope.match}}/>;
	}

	renderSearchField (){
		const handle = {
			change:(field)=>{
				this.setState({search:field.value});
			}
		};

		for (let i in handle){
			handle[i] = handle[i].bind(this);
		}

		return <Vfield field={{
			type:'string',
			name:'search',	
			value:this.state.search,
			placeholder:'Search for property',
			controlled:false,
			inputClass:'form-control-sm mr-sm-2',
			inputNoAC:true,
			autoFocus:true
		}} key="type" handle={handle}/>;
	}
};

const mapStoreToProps = (store)=>{
	return {
		style:store.style
	} // props
};
const mapDispatchToProps = {};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(VstyleFull);

/*
<div>
	<Switch>
							<Route path={`${scope.match.url}/code`} 
								render={(props) => <Vcode error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${scope.match.url}/layer`} 
								render={(props) => <Vlayer error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${scope.match.url}/save`} 
								render={(props) => <Vsave error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${scope.match.url}/setting`} 
								render={(props) => <Vsetting error={error} handle={this.handle} style={style} {...props}/>}/>
							<Route path={`${scope.match.url}/source`} 
								render={(props) => <Vsource error={error} handle={this.handle} style={style} {...props}/>}/>
						</Switch>


		<nav className="nav w-100">
						<div className="nav-link nav-bb px-2" onClick={this.handle.goUp}>
							<i className="material-icons icon-btn gray md-18">keyboard_arrow_left</i>
						</div>
						<div className="navbar-brand flex-2 text-nav text-overflow-ellipsis font-lg" to={scope.match.url}>
							{style.get('name')}
						</div>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${scope.match.url}/setting`}>
							<i className="material-icons icon-btn gray md-18">settings</i>
						</NavLink>
						<NavLink className={'nav-link nav-bb px-2 '+(error.has('sources')? 'error': '')} activeClassName="active" to={`${scope.match.url}/source`}>
							<i className="material-icons icon-btn gray md-18">wallpaper</i>
						</NavLink>
						<NavLink className={'nav-link nav-bb px-2 '+(error.has('layers')? 'error': '')} 
							activeClassName="active" to={`${scope.match.url}/layer`}>
							<i className="material-icons icon-btn gray md-18">layers</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${scope.match.url}/code`}>
							<i className="material-icons icon-btn gray md-18">code</i>
						</NavLink>
						<NavLink className="nav-link nav-bb px-2" activeClassName="active" to={`${scope.match.url}/save`}>
							<i className="material-icons icon-btn gray md-18">save</i>
						</NavLink>
						<Link to={scope.match.url} className="nav-link nav-bb px-2">
							<i className="material-icons icon-btn gray md-18">close</i>
						</Link>
					</nav>
</div>
*/