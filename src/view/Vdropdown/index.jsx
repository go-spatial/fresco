import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Vdropdown extends React.Component {

	static propTypes = {
		elem: PropTypes.object.isRequired, // dom ref to render the dropdown around
		scrollElem: PropTypes.object,
		show: PropTypes.bool
	}

	render(){
		const {elem, scrollElem, show} = this.props;

		// if in bottom of window, project upwards
		const winRect = elem.getBoundingClientRect(); // {top, bottom, left, right}

		// get scrollTop offset

		const offsetTop = (scrollElem && scrollElem.offsetTop)? scrollElem.offsetTop: 0;
		const offsetLeft = (scrollElem && scrollElem.offsetLeft)? scrollElem.offsetLeft: 0;

		const style = {
			top:(winRect.bottom+offsetTop)+'px',
			left:(winRect.left+offsetLeft)+'px'
		};
		const dropdownClass = 'dropdown-menu'+(show?' show':'');

		console.log('rendered dropdown:',winRect,offsetTop,offsetLeft);

		return ReactDOM.createPortal(
			<div style={style} className={dropdownClass}>
				{this.props.children}
			</div>,
			document.body
		);
	}
};