import React from 'react';

import {Link, Route, Switch} from 'react-router-dom';
//import styles from '../model/styles';

import VstyleAdd from './VstyleAdd';

export default class Vstyles extends React.Component {
	constructor(props) {
		super(props);

		this.handle = {

		};

		this.state = {};
	}

	render (){
		const {styles, handle} = this.props;

		//console.log('styles:',styles);
		return <div className="container">
			<div className="">
				<div className="px-2 mt-4">
					<h3 className="text-light">Fresco</h3>
					<p className="text-light">An open source map style editor - born from Maputnik</p>
				</div>
				<h2 className="px-2 py-2 m-0 text-light">Styles ({styles.size}) <Link to="/add/new"><i className="material-icons md-18">add_circle_outline</i></Link></h2>
				<Switch>
					<Route path="/add" 
						render={(props) => <VstyleAdd handle={handle} {...props}/>}/>
				</Switch>
				<ul className="bg-dk m-0 row">
				{styles.valueSeq().map((style) => {
					//console.log('style:',style);
					let path = '/style/'+style.get('id');
					return <li key={style.get('id')} className="p-3 col-sm-6 col-lg-4">
						<div className="">
							<h5 className=""><Link to={path}>{style.get('name')}</Link></h5>
							<p className=""><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</li>
				})}
				</ul>
				
			</div>
		</div>
	}
};