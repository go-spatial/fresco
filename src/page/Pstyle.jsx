import React from 'react';

import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Vstyle from '../view/Vstyle';
import Vmap from '../view/Vmap';

const mapStoreToProps = (store)=>{
	return {
		style:store.style,
		error:store.styleError
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
		Mstyle.errorsSet();
		
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
		const {style, error} = nextProps;

		this.setState({styleRec:style.get('rec')});		
	}

	render (){
		const {style, match, error} = this.props;

		return <div>
			<Vmap handle={this.handle} style={style.get('rec')} match={match} error={error}/>
			<Vstyle handle={this.handle} style={style.get('rec')} match={match} error={error}/>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pstyle);