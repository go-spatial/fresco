import PropTypes from 'prop-types';
import React from 'react';

import Mpanel from '../../model/Mpanel';

import {connect} from 'react-redux';

const mapStoreToProps = (store)=>{
	console.log('map store to props:',store);
	return {
		panelStore:store.panel
	} // props
};
const mapDispatchToProps = {};

const gutter = 20;

class Vpanel extends React.Component {

	static propTypes = {
		panelId: PropTypes.string,
		handle: PropTypes.object,
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	}

	constructor(props) {
		super(props);
		this.state = {
		};

		this.handle = {
			resize:()=>{

			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	getLeftRight (){
		const {panelId, panelStore} = this.props;
		const panels = panelStore.get('recs');

		let dim = {left:0,right:0};

		for (let i=0,len=panels.length;i<len;i++){
			if (i !== panelId){
				if (panels[i].float === 'left'){
					dim.left = panels[i].dim.w+gutter;
				}
				else if (panels[i].float === 'right'){
					dim.right = panels[i].dim.w+gutter;
				}
			}
		}

		return dim;
	}

	render (){
		const {children, panelId, panelStore, handle} = this.props;

		const panel = Mpanel.get(panelId);

		console.log('panel:',panel);

		const className = 'panel-float';

		const maxHeight = window.innerHeight-(gutter*2);
		const maxWidth = window.innerHeight-(gutter*2);

		let style = {
			maxHeight,
			maxWidth
		};

		let dim;

		switch(panel.get('float')){
			case 'left':
				style.left = gutter+'px';
				style.top = gutter+'px';
				break;
			case 'right':
				style.right = gutter+'px';
				style.top = gutter+'px';
				break;
			case 'bottom':
				dim = this.getLeftRight();
				style.left = (dim.left+gutter)+'px';
				style.right = (dim.right+gutter)+'px';
				style.bottom = gutter+'px';
				break;
			case 'top':
				dim = this.getLeftRight();
				style.left = (dim.left+gutter)+'px';
				style.right = (dim.right+gutter)+'px';
				style.top = gutter+'px';
		}

		return <div className={className} style={style}>
			{children}
		</div>
	}
};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Vpanel);