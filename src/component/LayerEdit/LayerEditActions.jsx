import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'
import utilPath from '../../utility/utilPath'

import Icon from '../Icon'
import LayerEditModalRemove from './LayerEditModalRemove'
import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'

import modelLayer from '../../model/layer'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class LayerEditActions extends React.Component {
	constructor (props){
		super(props)

		this.state = {
			modal: null
		}
	}

	handleClone = async ()=>{
		const {layer} = this.props
		await modelLayer.actions.clone({layer})
	}

	handleModalSet = (modal)=>{
		this.setState({
			modal
		})
	}

	handleRemoveDone = ()=>{
		const {history, path} = this.props

		this.handleModalSet(null)

		history.push(utilPath.getStyleLocation({path, pathSub:'/layers'}))
	}

	render (){
		const {error, handle} = this.props;

		return (
			<div>
				<h2 className="content-body-title">
					Layer Actions
				</h2>
				<div className="content-body">
					<div className="content-body-row">
						<button onClick={()=>this.handleClone()} className="btn btn-sm btn-outline-dark btn-block" disabled="disabled">
							<Icon className="mr-1" icon={'clone'}/>
							Clone Layer
						</button>
					</div>
					<hr/>
					<div className="content-body-row">
						<button onClick={()=>this.handleModalSet('remove')} className="btn btn-sm btn-outline-danger btn-block">
							<Icon className="mr-1" icon={'remove'}/>
							Remove Layer
						</button>
					</div>
				</div>
				{this.renderModal()}
			</div>
		)
	}

	renderModal (){
		const {path, style} = this.props,
			{modal} = this.state

		switch (modal){
			case 'remove':
				return (
					<LayerEditModalRemove 
						handleClose={()=>this.handleModalSet(null)}
						handleDone={this.handleRemoveDone} 
						path={path} 
						style={style}/>
				)
			default:
				return <div/>
		}
	}
}

LayerEditActions.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	layer: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(LayerEditActions)