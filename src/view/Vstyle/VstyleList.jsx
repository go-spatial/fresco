import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';

import Mstyle from '../../model/Mstyle';

import Vfield from '../Vfield';
import Vpanel from '../Vpanel';

class VstyleList extends React.Component {

	componentWillReceiveProps(newProps){
		const {styles} = newProps;

		if (!styles.get('loaded')){
			Mstyle.loadAll();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			searchShow:false,
			search:null
		};

		//Mstyle.loadAll();

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

	render (){
		const {error, scope, styles} = this.props;

		if (!styles.get('loaded')){
			return <div>Loading</div>;
		}

		let size = 'med', 
			pathAry = scope.location.pathname.split('/');
		if (pathAry.length === 3) size = 'slim';
		else if (pathAry.length > 3) size = 'zero'; 

		const panel = {
			id:'styleList',
			float:'left',
			size:size
		};

		const addPath = '/style/add';

		return <Vpanel panel={panel}>
				<nav className="panel-nav nav">
					<div className="nav-item flex-2 text-overflow-ellipsis" to={scope.match.url}>
						<a className="nav-link" href="javascript:">
							Styles
						</a>
					</div>
					<a href="javascript:" onClick={this.searchHandle.show} className="nav-link px-0">
						<i className="material-icons icon-btn gray md-14">search</i>
					</a>
					<Link to={addPath} className="nav-link px-0 mr-1">
						<i className="material-icons icon-btn gray md-14">add</i>
					</Link>
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
			</Vpanel>
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
			placeholder:'Search for style',
			controlled:false,
			inputClass:'form-control-sm mr-sm-2',
			inputNoAC:true,
			autoFocus:true
		}} key="type" handle={handle}/>;
	}


	renderList (){
		const {styles} = this.props;

		const recs = styles.get('recs');

		let list = [];
		recs.map((style) => {
			let path = '/style/'+style.get('id');
			let className = '';
			//if (error.hasIn(['layers',i])) className += ' error';
			const name = style.get('name');

			if (this.state.search && name.toLowerCase().indexOf(this.state.search.toLowerCase()) === -1) return;

			list.push(<NavLink to={path} className={className} key={style.get('id')}>
				{style.get('name')}
			</NavLink>);
		});

		return list;
	}


};

const mapStoreToProps = (store)=>{
	return {
		styles:store.styles
	} // props
};
const mapDispatchToProps = {};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(VstyleList);