import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import {Link, withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import Icon from '../Icon'
import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'
import StyleSettingsModalRemove from './StyleSettingsModalRemove'

import modelLayer from '../../model/layer'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class StyleSettingsActions extends React.Component {
	constructor (props){
		super(props)

		this.state = {
			modal: null
		}
	}

	handleDownload = async ()=>{
		const {style} = this.props
		await modelStyle.actions.download({style})
	}

	handleModalSet = (modal)=>{
		this.setState({
			modal
		})
	}

	handleRemoveDone = ()=>{
		const {history} = this.props

		history.push('/')
	}

	render (){
		const {error, handle, match, style} = this.props

		const domains = modelStyle.helpers.getDomains({style})

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Style Actions</span>
			</h2>
			<div className="content-body">
				<div className="content-body-row mb-2">
					<button onClick={this.handleDownload} className="btn btn-sm btn-outline-dark btn-block">
						<Icon className="mr-1" icon={'download'}/>
						Download Style
					</button>
				</div>
				<div className="content-body-row mb-2">
					<Link to={`${match.url}/update`} className="btn btn-sm btn-outline-dark btn-block">
						<Icon className="mr-1" icon={'update'}/>
						Update Style
					</Link>
				</div>
				<hr/>
				<div className="content-body-row">
					<button onClick={()=>this.handleModalSet('remove')} className="btn btn-sm btn-outline-danger btn-block">
						<Icon className="mr-1" icon={'remove'}/>
						Remove Style
					</button>
				</div>
			</div>
			{this.renderModal()}
		</div>
	}

	renderModal (){
		const {style} = this.props,
			{modal} = this.state

		switch (modal){
			case 'remove':
				return <StyleSettingsModalRemove 
					handleClose={()=>this.handleModalSet({modal:null})} 
					handleDone={this.handleRemoveDone}
					style={style}
				/>
			default:
				return <div/>
		}
	}
}

StyleSettingsActions.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleSettingsActions)