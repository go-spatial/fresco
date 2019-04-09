import React from 'react';

import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Vnav from '../view/Vnav';
import VstyleAdd from '../view/Vstyles/VstyleAdd';
import Vstyles from '../view/Vstyles';

import {Link, Route, Switch} from 'react-router-dom';


const mapStoreToProps = (store)=>{
	return {
		styles:store.styles
	} // props
};
const mapDispatchToProps = {};

class Pstyles extends React.Component {
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
		// buil;d ary from obj
		console.log('render page styles:',styles);
		if (styles.get('loaded') !== true) {
			return <div>loading</div>
		}

		
		return <div>
			<Vnav/>
			<div className="container mt-4">
				<h2 className="px-2 py-2 m-0 text-light">Styles ({styles.size}) <Link to="/add/new"><i className="material-icons md-18">add_circle_outline</i></Link></h2>
				<Switch>
					<Route path="/add" 
						render={(props) => <VstyleAdd handle={this.handle} {...props}/>}/>
				</Switch>
				<Vstyles styles={styles.get('recs')} handle={this.handle} match={match}/>
			</div>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pstyles);