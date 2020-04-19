import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {NavLink, Link, Redirect, Route, Switch} from 'react-router-dom'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import {List} from 'immutable'

import modelSource from '../../model/source'
import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'
import SourceAdd from '../SourceAdd'
import SourceEdit from '../SourceEdit'
import Tooltip from '../Tooltip'

class StyleSources extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sourceAddShown:false,
			searchShow:false,
			search:''
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

	render (){
		const {errors, path, sources, style, match} = this.props,
			{search, searchShow} = this.state

		//const errors = Mstyle.errorsGet()

		//const sources = style.getIn(['current','sources']) || List([])

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
									placeholder={'Search for sources'}
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
								Sources ({sources? sources.size: 0})
							</span>
							<div className="content-title-options">
								<span onClick={()=>this.handleSearchShowSet({show:true})} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'search'}/>
									<Tooltip message={'search'}/>
								</span>
								<Link to={`${match.url}/add`} className={'content-title-option interactive tooltip-trigger'}>
									<Icon icon={'add'}/>
									<Tooltip message={'add source'}/>
								</Link>
							</div>
						</h2>
					}
					{this.renderList({sources})}
				</div>
				{this.renderRight()}
			</div>
		)
	}

	renderList (){
		const {errors, match, path, sources} = this.props,
			{search} = this.state

		if (!sources) return <div/>

		let dragInd = -1

		return (
			<div className="">
				{sources !== undefined && sources.keySeq().map((name)=>{
					const source = sources.get(name)
					if (!source || !source.has) return <div/>
					const sourceId = name

					if (search && sourceId.toLowerCase().indexOf(search.toLowerCase()) === -1) return

					let className = 'content-body-left-row row-icons '
					const icon = 'source'

					dragInd++

					return (
						<NavLink key={sourceId} to={`${match.url}/${sourceId}`} className={className}>
							<div className="row-icon-left">
								<Icon className="md-shadow" icon={icon}/>
							</div>
							{sourceId}
						</NavLink>
					)
				})}
			</div>
		)
	}

	renderRight (){
		const {errors, match, path, style} = this.props

		const sourcesPath = [...path, 'current', 'sources']

		let redirect = `${match.url}/add`
		const sources = style.getIn(['current','sources'])
		if (sources && sources.size > 0){
			redirect = `${match.url}/${sources.keySeq().first()}`
		}

		return (
			<div className="content-body-right">
				<Switch>
					<Route path={`${match.url}/add`} 
						render={(props) => <SourceAdd path={sourcesPath} style={style} {...props}/>}/>
					<Route path={`${match.url}/:sourceId`} 
						render={(props) => {
							// get index for sourceId
							const sourceId = props.match.params.sourceId
							return <SourceEdit errors={errors} sourceId={sourceId} path={[...sourcesPath, sourceId]} style={style} {...props}/>
						}}/>
					<Redirect to={redirect}/>
				</Switch>
			</div>
		)
	}
}


StyleSources.propTypes = {
	errors: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	sources: PropTypes.object,
	style: PropTypes.object,
	styleId: PropTypes.string,
}

const mapStateToProps = (state, props) => {
	return {
		sources: modelStyle.selectors.getIn(state, {path: [...props.path, 'current', 'sources']}),
	}
}
export default connect(
  mapStateToProps,{}
)(StyleSources)
