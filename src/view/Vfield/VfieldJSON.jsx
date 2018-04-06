import React from 'react';
import PropTypes from 'prop-types';

import codemirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import jsonlint from 'jsonlint';
import {JSHINT} from 'jshint';

export default class VfieldJSON extends React.Component {
	static propTypes = {
		json: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	jsonToStr(json){
		return JSON.stringify(json, null, 2)
	}

	strToJson(str){
		try {
			return JSON.parse(str);
		} catch(err) {
			return console.warn(err);
		}
	}

	constructor(props) {
		super(props);

		const {json, handle} = this.props;

		// expose these includes to codemirror
		window.jsonlint = jsonlint;
		window.JSHINT = JSHINT;

		this.state = {};

		this.handle = {
			change(){
				const val = this.cm.getValue();
				const json = this.strToJson(val);
				if (json) return handle.change(json);
				console.log('perform lint!');
				this.cm.performLint();
			},
			reset(){
				this.cm.setValue(this.jsonToStr(json));
			},
			textareaChange:()=>{
				return;
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps(nextProps){
		const code = JSON.stringify(nextProps.json, null, 2);
		if (code === this.cm.getValue()) return;

		this.cm.setValue(code);
	}

	shouldComponentUpdate(nextProps, nextState){
		return false;
	}

	componentWillUnmount () {
		if (this.cm) {
			this.cm.toTextArea();
			delete this.cm;
		}
	}

	componentDidMount (){
		const {json} = this.props;

		const options = {
			lineNumbers: false,
			fixedGutter: false,
			mode: 'application/json',
			viewportMargin: Infinity,
			gutters: ['CodeMirror-lint-markers'],
			lint: true,
			value:this.jsonToStr(json),
			autoClearEmptyLines:false
		};

		this.cm = codemirror.fromTextArea(this.textarea, options);
		this.cm.on('change', this.handle.change);
		//this.cm.on('cursorActivity', this.cursorActivity);
		//this.cm.on('focus', this.focusChanged.bind(this, true));
		//this.cm.on('blur', this.focusChanged.bind(this, false));
		//this.cm.on('scroll', this.scrollChanged);
		//this.cm.setValue(this.jsonToStr(this.props.json));
	}

	render (){
		const {json} = this.props;

		console.log('render called:',json);

		return <div>
			<textarea
				value={this.jsonToStr(json)}
				onChange={this.handle.textareaChange}
				ref={ref => this.textarea = ref}
				autoComplete="off"/>
		</div>

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