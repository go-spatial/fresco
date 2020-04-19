import React from 'react'
import PropTypes from 'prop-types'

import codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import jsonlint from '../../vendor/jsonlint'
import {JSHINT} from 'jshint'

import Alert from '../Alert'

class FieldJSON extends React.Component {

	constructor(props) {
		super(props)

		const {handle, value} = this.props

		// expose these includes to codemirror
		window.jsonlint = jsonlint
		window.JSHINT = JSHINT

		this.state = {
			value:this.jsonToStr(value),
			isFocused:false
		}
	}

	componentWillReceiveProps(nextProps){
		const {value} = nextProps

		const code = this.jsonToStr(value)
		//console.log('err:',code === this.cm.getValue())
		if (this.cm) this.errorsShow(nextProps)
		if (code === this.cm.getValue()) return

		if (!this.state.focused && code) this.cm.setValue(code)
	}

	handleChange = ()=>{
		const {handle} = this.props
		const val = this.cm.getValue()
		const json = this.strToJson(val)
		if (json) return handle.change(json)
		this.cm.performLint()
	}
	handleFocus = ()=>{
		this.setState({focused:true})
	}
	handleBlur = ()=>{
		this.setState({focused:false})
	}
	handleReset = ()=>{
		const {value} = this.props
		this.cm.setValue(this.strToJson(value))
	}
	handleTextareaChange = ()=>{
		return
	}


	jsonToStr(json){
		return JSON.stringify(json, null, 2)
	}

	strToJson(str){
		try {
			//console.log('str to json:',str)
			return JSON.parse(str)
		} catch(err) {
			return console.warn(err)
		}
	}
	
	errorsShow(props = this.props){
		const {error} = props

		this.cm.clearGutter('err-markers')

		this.tooltipI = this.tooltipI || []
		if (this.tooltipI.length > 0){
			this.tooltipI.map((tooltipI)=>{
				tooltipI.tooltip('dispose')
			})
		}

		if (!error){
			return
		} 
		if (typeof error === 'string'){
			return
		}

		let match = [], inside = [], targetInd = -1
		this.cm.eachLine((line)=>{
			if (inside[targetInd] && inside[targetInd].type === 'obj'){
				let ind = line.text.split(':')[0].trim().replace(/["{},]/g,'')
				if (ind.length > 0) match[targetInd] = ind
			} else if (inside[targetInd] && inside[targetInd].type === 'ary') {
				match[targetInd] = inside[targetInd].ind
				inside[targetInd].ind++
			}

			if (line.text.indexOf('{') !== -1){
				targetInd++
				inside[targetInd] = {type:'obj'}
			} else if (line.text.indexOf('}') !== -1){
				match = match.slice(0,targetInd)
				inside = inside.slice(0,targetInd)
				targetInd--
			} else if (line.text.indexOf('[') !== -1){
				targetInd++
				inside[targetInd] = {type:'ary',ind:0}
			} else if (line.text.indexOf(']') !== -1){
				match = match.slice(0,targetInd)
				inside = inside.slice(0,targetInd)
				targetInd--
			}

			if (match.length > 0 && error.hasIn(match) && typeof error.getIn(match) === 'string'){
				let marker = document.createElement('div')
				marker.setAttribute('title',error.getIn(match))
				marker.innerHTML = '<i class="text-danger code-error-left position-relative fas fa-exclamation-triangle" data-toggle="tooltip"></i>'
				this.cm.setGutterMarker(line,'err-markers',marker)
				//const tooltipI = window.$(marker)
				
				//this.tooltipI.push(tooltipI)
				//tooltipI.tooltip()
			}
		})
	}

	

	

	shouldComponentUpdate(nextProps, nextState){
		return false
	}

	componentWillUnmount () {
		if (this.cm) {
			this.cm.toTextArea()
			delete this.cm
		}
	}

	componentDidMount (){

		const options = {
			lineNumbers: false,
			fixedGutter: false,
			mode: 'application/json',
			viewportMargin: Infinity,
			gutters: ['CodeMirror-lint-markers','err-markers'],
			lint: true,
			autoClearEmptyLines:false
		}

		this.cm = codemirror.fromTextArea(this.textarea, options)
		this.cm.on('change', this.handleChange)
		this.cm.on('focus',this.handleFocus)
		this.cm.on('blur',this.handleBlur)

		this.errorsShow()
	}

	render (){
		const {error, value} = this.props

		return <div className="font-lg code-window">
			<textarea
				value={this.jsonToStr(value)}
				onChange={this.handleTextareaChange}
				ref={ref => this.textarea = ref}
				autoComplete="off"/>
			{error && typeof error === 'string' &&
				<Alert message={error}/>
			}
		</div>
	}
}

FieldJSON.propTypes = {
	error:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	handle: PropTypes.object,
	type: PropTypes.string.isRequired,
	value:PropTypes.object,
}

export default FieldJSON