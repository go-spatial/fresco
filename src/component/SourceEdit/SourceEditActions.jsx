import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import Icon from '../Icon'
import SourceEditModalRemove from './SourceEditModalRemove'

import modelApp from '../../model/app'
import modelSource from '../../model/source'

class SourceEditActions extends React.Component {
	constructor (props){
		super(props)

		this.state = {
			modal: null,
			refreshed: false,
		}
	}

	handleRefresh = async ()=>{
		const {source} = this.props

		try{
      await modelApp.actions.setLoading(true)
      await modelSource.actions.pullData({
				url: source.get('url'),
			})

      this.setState({
      	refreshed: true
      })

      setTimeout(()=>{
      	this.setState({
	      	refreshed: false
	      })
      },2000)

      await modelApp.actions.setLoading(false)
    } catch(e){
      await modelApp.actions.setLoading(false)
      await modelApp.actions.setError(e)
    }
		
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
		const {refreshed} = this.state

		return (
			<div>
				<h2 className="content-body-title">
					Source Actions
				</h2>
				<div className="content-body">
					<div className="content-body-row">
						{refreshed? (
							<button className="btn btn-sm btn-success btn-block">
								<Icon className="mr-1" icon={'confirm'}/>
								Refreshed
							</button>
						):(
							<button onClick={this.handleRefresh} className="btn btn-sm btn-outline-dark btn-block">
								<Icon className="mr-1" icon={'refresh'}/>
								Refresh Source Data
							</button>
						)}
					</div>
					<hr/>
					<div className="content-body-row">
						<button onClick={()=>this.handleModalSet('remove')} className="btn btn-sm btn-outline-danger btn-block">
							<Icon className="mr-1" icon={'remove'}/>
							Remove Source
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
				return <SourceEditModalRemove 
					handleClose={()=>this.handleModalSet({modal:null})} 
					handleDone={this.handleRemoveDone}
					path={path}
					style={style}
				/>
			default:
				return <div/>
		}
	}
}

SourceEditActions.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	source: PropTypes.object,
	style: PropTypes.object,
}

export default withRouter(SourceEditActions)