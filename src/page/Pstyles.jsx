import React from 'react';

import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Vstyles from '../view/Vstyles';


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
			<Vstyles styles={styles.get('recs')} handle={this.handle} match={match}/>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pstyles);