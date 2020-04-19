import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {NavLink, Link, Redirect, Route, Switch} from 'react-router-dom'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import {List} from 'immutable'

import modelLayer from '../../model/style'
import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'
import StyleAdd from '../StyleAdd'
import Tooltip from '../Tooltip'

class HomeStyles extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			styleAddShown:false,
			searchShow:false,
			search:null
		}
	}

	handleChange = ()=>{

	}
	handleOnDragEnd = ()=>{

	}

	handleSearchChange = ({value})=>{
		this.setState({
			search: value,
		})
	}

	handleSearchShowSet = ({show})=>{
		this.setState({
			searchShow: show,
		})
	}

	render (){
		const {error, match, styles} = this.props,
			{search, searchShow} = this.state

		//const error = Mstyle.errorGet()

		const handle = {
			change: this.handleChange
		}

		return (
			<div className="content-body content-body-flex">
				<div className="content-body-left">
					{searchShow ? 
						<div className="d-flex">
							<div className="property flex-fill">
								<Field field={{
									type:'string',
									name:'search',	
									value: search,
									placeholder:'Search for style',
									controlled:false,
									inputClass:'form-control-sm font-sm',
									inputNoAC:true,
									autoFocus:true
								}} key="type" handle={{
									change:this.handleSearchChange
								}}/>
							</div>
							<div className="content-title-option" onClick={()=>this.handleSearchShowSet({show:false})}>
								<Icon icon={'close'}/>
							</div>
						</div>
						:
						<h2 className="content-title content-title-sub clearfix">
							<span className="content-title-label text-overflow-ellipsis">
								Styles ({styles? styles.size: 0})
							</span>
							<div className="content-title-options">
								<span onClick={()=>this.handleSearchShowSet({show:true})} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'search'}/>
									<Tooltip message={'search'}/>
								</span>
								<Link to={`/styles/add`} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'add'}/>
									<Tooltip message={'add style'}/>
								</Link>
							</div>
						</h2>
					}
					{this.renderList()}
				</div>
				{this.renderRight()}
			</div>
		)
	}

	renderList (){
		const {error, styles, match, path} = this.props,
			{search} = this.state 

		if (!styles){
			return <div/>
		}

		let ind = -1

		return (
			<div className="">
				<DragDropContext onDragEnd={this.handleOnDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{styles !== undefined && styles.keySeq().map((styleId)=>{

									const style = styles.get(styleId)
									
									if (!style.has) return <div/>

									if (search && styleId.toLowerCase().indexOf(search.toLowerCase()) === -1) return <div/>

									let className = 'content-body-left-row row-icons '
									//if (error && error.hasIn(['styles',i])) className += ' error'

									const name = style.getIn(['current','name']) || styleId

									ind++

									return <Draggable key={styleId} draggableId={styleId} index={ind}>
										{(provided, snapshot) => (
											<NavLink key={styleId} to={`/style/${styleId}`} className={className} ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>

													<div className="row-icon-left">
														<Icon className="md-shadow" icon={'style'}/>
													</div>
													{name}
											</NavLink>
										)}
									</Draggable>
								})}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		)
	}

	renderRight (){
		const {error, match, path, style} = this.props

		return (
			<div className="content-body-right">
				<Switch>
					<Route path={'/styles/add'} 
						render={(props) => <StyleAdd {...props}/>}/>
					<Redirect to={`/styles/add`}/>
				</Switch>
			</div>
		)
	}
}


HomeStyles.propTypes = {
	error: PropTypes.object,
	styles: PropTypes.object,
	match: PropTypes.object,
}

const mapStateToProps = (state, props) => {
	return {
		styles: modelStyle.selectors.get(state),
	}
}
export default connect(
  mapStateToProps,{}
)(HomeStyles)
