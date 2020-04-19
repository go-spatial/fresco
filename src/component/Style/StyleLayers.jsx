import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {NavLink, Link, Redirect, Route, Switch} from 'react-router-dom'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import {List} from 'immutable'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelMap from '../../model/map'
import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'
import LayerAdd from '../LayerAdd'
import LayerEdit from '../LayerEdit'
import Tooltip from '../Tooltip'

class StyleLayers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			layerAddShown:false,
			searchShow:false,
			search:''
		}
	}
	handleFocusClose = async ()=>{
		await modelMap.actions.clearFocus()
	}
	handleOnDragEnd = async (result)=>{
		const {path} = this.props
		
		console.log('draggable res:',result.source,result.destination)

		if (!result.source) throw new Error('StyleLayers.handleOnDragEnd: no source index found')
		const sourceIndex = result.source.index

		if (!result.destination) return
		const destinationIndex = result.destination.index

		try{
      await modelLayer.actions.reorder({
				indexOld: sourceIndex, 
				indexNew: destinationIndex, 
				path: [...path, 'current', 'layers']
			})
    } catch(e){
      await modelApp.actions.setError(e)
    }
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

	handleVisibility = async ({e, layerId, show})=>{
		//e.stopPropagation();

		const {style} = this.props
		// get layer path
		const layerPath = modelLayer.helpers.getLayerPath({layerId, style})
		const visibilityPath = [...layerPath, 'layout', 'visibility']
		await modelStyle.actions.setIn({
			path: visibilityPath,
			value: show? 'visible': 'none'
		})
	}

	render (){
		const {error, focusLayers, layers, path, style, match} = this.props,
			{search, searchShow} = this.state

		const handle = {
			change: this.handleSearchChange
		}

		return (
			<div className="content-body content-body-flex">
				<div className="content-body-left">
					{searchShow ? 
						<div className="d-flex p-1">
							<div className="property flex-fill">
								<Field
									autoFocus={true}
									handle={handle}
									name={'search'}
									placeholder={'Search for layers'}
									inputClass={'form-control-sm font-sm'}
									inputNoAC={true}
									type={'string'}
									value={search}
								 />
							</div>
							<div className="content-title-option" onClick={()=>this.handleSearchShowSet({show:false})}>
								<Icon icon={'close'}/>
							</div>
						</div>
						:
						<h2 className="content-title content-title-sub clearfix">
							<span className="content-title-label text-overflow-ellipsis">
								Layers ({layers? layers.size: 0})
							</span>
							<div className="content-title-options">
								<span onClick={()=>this.handleSearchShowSet({show:true})} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'search'}/>
									<Tooltip message={'search'}/>
								</span>
								<Link to={`${match.url}/add`} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'add'}/>
									<Tooltip message={'add layer'}/>
								</Link>
							</div>
						</h2>
					}
					{focusLayers && focusLayers.length > 0 && (
						<div className="content-body-title bg-info pl-1">
							<Icon className="mr-1" icon={'map-focus'} weight={'solid'}/>
							{focusLayers.length} Focused
							<button type="button" className="btn btn-outline-light btn-xs float-right" 
								onClick={this.handleFocusClose}>
								<Icon icon={'close'}/>
							</button>
						</div>
					)}
					{this.renderList()}
				</div>
				{this.renderRight()}
			</div>
		)
	}

	renderList (){
		const {error, focusLayers, layers, match, path} = this.props,
			{search} = this.state

		if (!layers){
			return <div/>
		}

		return (
			<div className="">
				<DragDropContext onDragEnd={this.handleOnDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{layers !== undefined && layers.map((layer,i)=>{
									
									if (!layer || !layer.has) return <div/>
									const layerId = layer.has('id')? layer.get('id'): `layer-${i}`

									if (focusLayers && focusLayers.length > 0 && !focusLayers.includes(layerId)) return

									if (search && search.length > 0 && layerId.toLowerCase().indexOf(search.toLowerCase()) === -1) return

									let className = 'content-body-left-row row-icons '
									if (error && error.hasIn([i])) className += ' error'

									const color = modelLayer.helpers.getColor({layer}) || '#FFFFFF'
									const icon = `layer-${modelLayer.helpers.getType({layer})}`

									return <Draggable key={layerId} draggableId={layerId} index={i}>
										{(provided, snapshot) => (
											<NavLink key={layerId} to={`${match.url}/${layerId}`} className={className} ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>

													<div className="row-icon-left">
														<Icon className="md-shadow" icon={icon} color={color} weight={'solid'}/>
													</div>
													{layerId}
													{this.renderLayerOption({layer, layerId, layerInd:i})}
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

	renderLayerOption ({layer, layerId, layerInd}){
		const {error, focusLayers} = this.props

		if (error && error.hasIn([layerInd])){
			return (
				<div className="row-icon-right">
					<Icon className="md-shadow text-danger" icon={'alert'} weight={'solid'}/>
				</div>
			)
		}

		/*
		if (focusLayers && focusLayers.includes(layerId)){
			return (
				<div className="row-icon-right">
					<Icon className="md-shadow text-info" icon={'map-focus'} weight={'solid'}/>
				</div>
			)
		}
		*/
		if (layer.getIn(['layout','visibility']) === 'none'){
			return (
				<div onClick={(e)=>this.handleVisibility({e, layerId, show:true})} className="row-icon-right">
					<Icon className="md-shadow text-muted" icon={'invisible'} weight={'solid'}/>
				</div>
			)
		}

		return (
			<div onClick={(e)=>this.handleVisibility({e, layerId, show:false})} className="row-icon-right">
				<Icon className="md-shadow" icon={'visible'} weight={'solid'}/>
			</div>
		)
	}

	renderRight (){
		const {error, match, path, style} = this.props

		const layersPath = [...path, 'current', 'layers']

		let redirect = `${match.url}/add`
		const layers = style.getIn(['current','layers'])
		if (layers && layers.size > 0){
			redirect = `${match.url}/${layers.getIn([0, 'id'])}`
		}

		return (
			<div className="content-body-right">
				<Switch>
					<Route path={`${match.url}/add`} 
						render={(props) => <LayerAdd path={layersPath} style={style} {...props}/>}/>
					<Route path={`${match.url}/:layerId`} 
						render={(props) => {
							// get index for layerId
							const layerIndex = modelLayer.helpers.getIndexById({layerId: props.match.params.layerId, path:layersPath, style})
							return (
								<LayerEdit 
									error={error && error.has && error.getIn([layerIndex])} 
									layerId={props.match.params.layerId} 
									layerIndex={layerIndex}
									path={[...layersPath, layerIndex]} 
									style={style} {...props}
								/>
							)
						}}/>
					<Redirect to={redirect}/>
				</Switch>
			</div>
		)
	}
}


StyleLayers.propTypes = {
	error: PropTypes.object,
	focusLayers: PropTypes.array,
	layers: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
	styleId: PropTypes.string,
}

const mapStateToProps = (state, props) => {
	return {
		layers: modelStyle.selectors.getIn(state, {path: [...props.path, 'current', 'layers']}),
		focusLayers: modelMap.selectors.focusLayers(state),
	}
}
export default connect(
  mapStateToProps,{}
)(StyleLayers)
