import React from 'react';

import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Vstyle from '../view/Vstyle';
import Vmap from '../view/Vmap';

const mapStoreToProps = (store)=>{
	return {
		style:store.style
	} // props
};
const mapDispatchToProps = {};

class Pstyle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styleRec:undefined
		};

		//styles.do();
		this.id = props.match.params.id;

		Mstyle.load(this.id);
		
		this.handle = {
			route:(path)=>{
				this.props.history.push('/style/'+this.id+'/'+path);
			},
			routeReplace:(path)=>{
				this.props.history.replace('/style/'+this.id+'/'+path);
			},
			goUp:()=>{
				this.props.history.push('/');
			},
			goBack:()=>{
				this.props.history.goBack();
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps (nextProps){
		const {style} = nextProps;

		if (this.state.styleRec !== undefined && !this.state.styleRec.equals(style.get('rec'))) Mstyle.save();
		this.setState({styleRec:style.get('rec')});
	}

	render (){
		const {style, match} = this.props;

		return <div>
			<Vmap handle={this.handle} style={style.get('rec')} match={match}/>
			<Vstyle handle={this.handle} style={style.get('rec')} match={match}/>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pstyle);