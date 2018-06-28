import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Mstyle from '../model/Mstyle';

import Valert from '../view/Valert';
import Vmap from '../view/Vmap';
import Vstyle from '../view/Vstyle';

import Vpanel from '../view/Vpanel';
import Mpanel from '../model/Mpanel';

const mapStoreToProps = (store)=>{
	return {
		style:store.style,
		error:store.styleError
	} // props
};
const mapDispatchToProps = {};

class Pstyle extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		match: PropTypes.object,
		style: PropTypes.object
	}

	constructor(props) {
		super(props);

		//styles.do();
		this.id = props.match.params.id;

		Mstyle.load(this.id);
		Mstyle.errorsSet();

		this.handle = {
			route:(path)=>{
				this.props.history.push('/style/'+this.id+'/'+path);
			},
			routeHome:()=>{
				this.props.history.push('/');
			},
			routeReplace:(path)=>{
				if (path.indexOf('/') === 0) return this.props.history.replace(path); //is a root path
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

	render (){
		const {style, match, error} = this.props;

		return <div>
			<Vmap handle={this.handle} style={style.get('rec')} match={match}/>
			<Vstyle handle={this.handle} style={style.get('rec')} match={match}/>
			<div className="fixed-bottom p-2">
				{error.has('general') && 
					<Valert message={error.get('general')}/>
				}
			</div>
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Pstyle);