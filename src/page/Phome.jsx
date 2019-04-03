import React from 'react';

import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Vnav from '../view/Vnav';
import VstyleAdd from '../view/Vstyles/VstyleAdd';
import Vstyles from '../view/Vstyles';

import {NavLink, Link, Route, Switch} from 'react-router-dom';


const mapStoreToProps = (store)=>{
	return {
		styles:store.styles
	} // props
};
const mapDispatchToProps = {};

class Phome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		//styles.do();
		this.id = props.match.params.id;

		Mstyle.loadAll();
		
		this.handle = {
			route:(path)=>{
				this.props.history.push('/'+path);
			},
			routeReplace:(path)=>{
				this.props.history.replace('/'+path);
			},
			goBack:()=>{
				this.props.history.goBack();
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {styles, match} = this.props;
		// build ary from obj
		
		if (styles.get('loaded') !== true) {
			return <div>loading</div>
		}

		//order styles by last updated
		const recs = styles.get('recs').sort((a,b)=>{
			if (a.getIn(['_store','updated']) > b.getIn(['_store','updated'])) return -1;
			return 1;
		});
		
		return <div>
			<Vnav/>
			<div className="bg-blue mb-0 py-4">
				<div className="container text-light">
					<h1 className="">fresco</h1>
					<p className="lead">An open source map style editor.</p>
				</div>
			</div>
			<div className="container">

				<div className="py-4">
					<h2 className="px-2 py-2 m-0 text-light font-lg">Styles ({recs.size}) <Link to="/add/new"><i className="material-icons md-14">add_circle_outline</i></Link></h2>
					<Switch>
						<Route path="/add" 
							render={(props) => <VstyleAdd handle={this.handle} {...props}/>}/>
					</Switch>
					<Vstyles styles={recs} handle={this.handle} match={match}/>
				</div>
			</div>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Phome);