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

import Valert from '../Valert';

export default class VfieldJSON extends React.Component {
	static propTypes = {
		field:PropTypes.shape({
			type: PropTypes.string.isRequired,
			value:PropTypes.object,
			error:PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object
			])
		}),
		handle: PropTypes.object
	}

	jsonToStr(json){
		return JSON.stringify(json, null, 2)
	}

	strToJson(str){
		try {
			//console.log('str to json:',str);
			return JSON.parse(str);
		} catch(err) {
			return console.warn(err);
		}
	}
	
	errorsShow(props = this.props){
		const {field} = props;

		this.cm.clearGutter('err-markers');

		//console.log('errors show:',field.error);

		if (!field.error) return;
		if (typeof field.error === 'string'){
			return;
		}

		let match = [], inside = [], targetInd = -1;
		this.cm.eachLine((line)=>{
			//console.log('line:',line);

			if (inside[targetInd] && inside[targetInd].type === 'obj'){
				let ind = line.text.split(':')[0].trim().replace(/["{},]/g,'');
				if (ind.length > 0) match[targetInd] = ind;
			} else if (inside[targetInd] && inside[targetInd].type === 'ary') {
				match[targetInd] = inside[targetInd].ind;
				inside[targetInd].ind++;
			}

			if (line.text.indexOf('{') !== -1){
				targetInd++;
				inside[targetInd] = {type:'obj'};
			} else if (line.text.indexOf('}') !== -1){
				match = match.slice(0,targetInd);
				inside = inside.slice(0,targetInd);
				targetInd--;
			} else if (line.text.indexOf('[') !== -1){
				targetInd++;
				inside[targetInd] = {type:'ary',ind:0};
			} else if (line.text.indexOf(']') !== -1){
				match = match.slice(0,targetInd);
				inside = inside.slice(0,targetInd);
				targetInd--;
			}

			if (match.length > 0 && field.error.hasIn(match) && typeof field.error.getIn(match) === 'string'){
				//this.cm.setGutterMarker();
				//console.log('set marker:',line);
				let marker = document.createElement('div');
				marker.setAttribute('title',field.error.getIn(match));
				marker.innerHTML = '<i class="text-danger material-icons md-14">error</i>';
				this.cm.setGutterMarker(line,'err-markers',marker);
			}
			//console.log('match',JSON.stringify(match),' targetInd:',targetInd,'inside:',JSON.stringify(inside));
		});
	}

	constructor(props) {
		super(props);

		const {field, handle} = this.props;

		// expose these includes to codemirror
		window.jsonlint = jsonlint;
		window.JSHINT = JSHINT;

		this.state = {
			value:this.jsonToStr(field.value),
			isFocused:false
		};

		this.handle = {
			change(){
				const val = this.cm.getValue();
				const json = this.strToJson(val);
				if (json) return handle.change(json);
				console.log('perform lint!');
				this.cm.performLint();
			},
			focus(){
				this.setState({focused:true});
			},
			blur(){
				this.setState({focused:false});
			},
			reset(){
				this.cm.setValue(this.strToJson(field.value));
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
		const {field} = nextProps;

		const code = this.jsonToStr(field.value);
		//console.log('err:',code === this.cm.getValue());
		if (this.cm) this.errorsShow(nextProps);
		if (code === this.cm.getValue()) return;

		if (!this.state.focused && code) this.cm.setValue(code);
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
		const {field} = this.props;

		const options = {
			lineNumbers: false,
			fixedGutter: false,
			mode: 'application/json',
			viewportMargin: Infinity,
			gutters: ['CodeMirror-lint-markers','err-markers'],
			lint: true,
			//value:this.jsonToStr(json),
			autoClearEmptyLines:false
		};

		this.cm = codemirror.fromTextArea(this.textarea, options);
		this.cm.on('change', this.handle.change);
		this.cm.on('focus',this.handle.focus);
		this.cm.on('blur',this.handle.blur);

		this.errorsShow();

		//this.cm.on('cursorActivity', this.cursorActivity);
		//this.cm.on('focus', this.focusChanged.bind(this, true));
		//this.cm.on('blur', this.focusChanged.bind(this, false));
		//this.cm.on('scroll', this.scrollChanged);
		//this.cm.setValue(this.jsonToStr(this.props.json));
	}

	render (){
		const {field} = this.props;

		return <div>
			<textarea
				value={this.jsonToStr(field.value)}
				onChange={this.handle.textareaChange}
				ref={ref => this.textarea = ref}
				autoComplete="off"/>
			{field.error && typeof field.error === 'string' &&
				<Valert message={field.error}/>
			}
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