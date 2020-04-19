import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom'

import React from 'react'

import Alert from '../Alert'
import Icon from '../Icon'
import SourceEditActions from './SourceEditActions'
import SourceEditJson from './SourceEditJson'
import SourceEditLayers from './SourceEditLayers'
import SourceEditView from './SourceEditView'
import SourceEditModalRemove from './SourceEditModalRemove'
import Tooltip from '../Tooltip'

import modelApp from '../../model/app'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class SourceEdit extends React.Component {

	constructor(props) {
		super(props)

		const {handle} = this.props

		// get mode preference


		this.state = {
			dropOpen: false,
			mode: 'json'
		}
	}

	handleModeSet = ({e, mode})=>{
		e.stopPropagation()
		this.setState({mode})
	}

	handleClone = async ()=>{

		/*
		modelSource.actions.clone(this.id).then((newLayer)=>{
					handle.routeReplace('source/'+newLayer.get('id'))
				})
		*/
	}

	handleDropToggle = ()=>{
		const {dropOpen} = this.state

		if (dropOpen){
			this.setState({
				dropOpen: false,
			})
		} else {
			 this.setState({
				dropOpen: true,
			})
		}
	}

	handleModalSet = ({modal})=>{
		this.setState({modal})
	}

	handleRemoveDone = ()=>{
		const {history, match, sourceId} = this.props
		// redirect user to sources
		const redirect = match.url.replace(`/${sourceId}`, '')
		history.push(redirect)
	}

	render (){
		const {error, match, source, path, style} = this.props,
			{mode} = this.state

		if (!source) return <div/>

		return <div>
			{this.renderTitle()}
			<div className="position-relative">
				{this.renderSection()}
				{this.renderModal()}
			</div>
			
		</div>
	}

	renderModal (){
		const {errors, path, style} = this.props,
			{modal} = this.state

		switch (modal){
			case 'remove':
				return <SourceEditModalRemove 
					handleClose={()=>this.handleModalSet({modal:null})} 
					handleDone={this.handleRemoveDone}
					path={path}
				/>
			default:
				return <div/>
		}
	}

	renderSection (){
		const {errors, match, source, sourceId, path, style} = this.props

		return (
			<Switch>
				<Route path={`${match.url}/actions`} 
					render={(props) => (
						<SourceEditActions 
							errors={errors} 
							source={source} 
							sourceId={sourceId} 
							path={path} 
							style={style}
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<SourceEditJson 
							errors={errors} 
							source={source} 
							sourceId={sourceId} 
							path={path} 
							style={style}
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/layers`} 
					render={(props) => (
						<SourceEditLayers 
							errors={errors} 
							source={source} 
							sourceId={sourceId} 
							path={path} 
							style={style}
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/editor`} 
					render={(props) => (
						<SourceEditView 
							errors={errors} 
							source={source} 
							sourceId={sourceId} 
							path={path} 
							style={style}
							{...props}
						/>
					)}/>
				<Redirect to={`${match.url}/layers`}/>
			</Switch>
		)
	}

	renderTitle (){
		const {match, path, source, sourceId, style} = this.props,
			{dropOpen} = this.state

		return (
			<h2 className="content-title content-title-sub content-title-light clearfix">
				<span className="text-overflow-ellipsis content-title-label">
					{sourceId}
				</span>
				<div className="content-title-options">
					<NavLink to={`${match.url}/layers`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'source'}/>
						<Tooltip message={'source data'}/>
					</NavLink>
					<NavLink to={`${match.url}/editor`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'editor'}/>
						<Tooltip message={'editor'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'code'}/>
						<Tooltip message={'json'}/>
					</NavLink>
					<NavLink to={`${match.url}/actions`} className="content-title-option interactive tooltip-trigger">
						<Icon icon={'action'}/>
						<Tooltip message={'actions'}/>
					</NavLink>
				</div>
			</h2>
		)
	}
}

SourceEdit.propTypes = {
	errors: PropTypes.object,
	history: PropTypes.object,
	source: PropTypes.object,
	sourceId: PropTypes.string,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}


const mapStateToProps = (state, props) => {
	return {
		source: modelStyle.selectors.getIn(state, {path: props.path}),
	}
}
export default connect(
  mapStateToProps,{}
)(withRouter(SourceEdit))