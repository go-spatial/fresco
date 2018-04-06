import React from 'react';
import PropTypes from 'prop-types';

//import Valert from '../Valert';
import VfieldJSON from '../Vfield/VfieldJSON';


export default class VlayerEditJSON extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		const {handle} = this.props;

		this.handle = {
			change(code){
				handle.change(code);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {layer} = this.props;

		return <VfieldJSON key={layer.get('id')} json={layer.toJS()} handle={this.handle}/>;

		/*

		const codeMirrorOptions = {
			mode: {name: "javascript", json: true},
			tabSize: 2,
			theme: 'maputnik',
			viewportMargin: Infinity,
			lineNumbers: true,
			lint: true,
			gutters: ["CodeMirror-lint-markers"],
			scrollbarStyle: "null",
		}

		return <CodeMirror
			value={this.state.code}
			onBeforeChange={(editor, data, value) => this.handle.update(value)}
			onFocusChange={focused => focused ? true : this.handle.reset()}
			options={codeMirrorOptions}/>;
		*/
	}
};