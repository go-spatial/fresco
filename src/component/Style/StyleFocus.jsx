import React from 'react'
import PropTypes from 'prop-types'
import {fromJS, Map} from 'immutable'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Property from '../Property'
import modelMap from '../../model/map'

import FeatureRow from '../FeatureRow'
import Field from '../Field'
import Alert from '../Alert'
import Icon from '../Icon'

import modelStyle from '../../model/style'

class StyleFocus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			layerAddShown:false,
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
		const {error, focusFeatures, match, path, style} = this.props,
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
								Focus Features ({focusFeatures? focusFeatures.length: 0})
							</span>
							<div className="content-title-options">
								<span onClick={()=>this.handleSearchShowSet({show:true})} className={'content-title-option interactive'}>
									<Icon icon={'search'}/>
									<div className="content-title-option-hint">
										<span>search</span>
									</div>
								</span>
								<Link to={`${match.url}/add`} className={'content-title-option interactive'}>
									<Icon icon={'add'}/>
									<div className="content-title-option-hint">
										<span>add</span>
									</div>
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
		const {error, focusLayers, match, path} = this.props,
			{search} = this.state

		if (!focusLayers){
			return <div/>
		}

		return (
			<div className="">

				{focusLayers !== undefined && focusLayers.map((layer,i)=>{

					if (search && search.length > 0 && layer.toLowerCase().indexOf(search.toLowerCase()) === -1) return

					return (
							<NavLink key={i} to={`${match.url}/layer/${layer}`} className="content-body-left-row row-icons" >
								<div className="row-icon-left">
									<Icon className="md-shadow" icon={'focus'} weight={'solid'}/>
								</div>
								{layer}
							</NavLink>
						)
				})}
			</div>
		)
	}

	renderRight (){
		//<FeatureRow feature={feature} key={feature.id} style={style}/>

		return <div/>
	}
}

StyleFocus.propTypes = {
	focusFeatures: PropTypes.array,
	history: PropTypes.object,
	layer: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

const mapStoreToProps = (state)=>{
	return {
		focusFeatures: modelMap.selectors.focusFeatures(state),
		focusLayers: modelMap.selectors.focusLayers(state),
	}
}

export default connect(
	mapStoreToProps,
)(withRouter(StyleFocus))
