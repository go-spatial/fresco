import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import Field from '../Field'
import Alert from '../Alert'
import Icon from '../Icon'

import modelStyle from '../../model/style'
import modelSource from '../../model/source'

class SourceEditLayers extends React.Component {

	handleChange = async (value)=>{
		const {history, path, source} = this.props,
			{pathname} = this.props.location

		await modelStyle.actions.setIn({
			path,
			value: fromJS(value),
		})
	}

	render (){
		const {error, path, source, sourceId, sourceData, style} = this.props

		const handle = {
			change: this.handleChange
		}
		const type = 'json'
		const value = source

		if (!sourceData) return (
			<div className="content-body">
				<h4 className="content-body-title">
					Source Layers (0)
				</h4>
				<div className="content-body-row">
					No source data
				</div>
			</div>
		)

		const layers = modelSource.helpers.getLayersFromData({data:sourceData})
		const styleLayers = style.getIn(['current','layers'])

		return (
			<div className="content-body">
				<h4 className="content-body-title">
					Source Layers ({layers.size})
				</h4>
				{layers.valueSeq().map((layer)=>{
					const layerId = layer.get('name') || layer.get('id')
					let foundStyleLayers = []
					
					styleLayers && styleLayers.map((styleLayer)=>{
						if (!styleLayer || !styleLayer.has) return
						if (styleLayer.get('source') === sourceId && styleLayer.get('source-layer') === layerId)
							foundStyleLayers.push(styleLayer.get('id'))
					})

					if (foundStyleLayers.length < 1){
						const layerAddPath = modelStyle.helpers.getRouteFromPath({path, route:`layers/add`})
						return (
							<div className="content-body-row" key={layerId}>
								{layerId}
								<Link to={layerAddPath} className="float-right text-right">
									<Icon className="pr-2" icon="add"/>
								</Link>
							</div>
						)
					} else {
						const layerPath = modelStyle.helpers.getRouteFromPath({path, route:`layers/${foundStyleLayers[0]}`})
						return (
							<div className="content-body-row" key={layerId}>
								{layerId}
								<Link to={layerPath} className="float-right text-right">
									<Icon className="pr-2" icon="layer"/>
									{foundStyleLayers.length}
								</Link>
							</div>
						)
					}

					
				})}
			</div>
		)
	}
}

SourceEditLayers.propTypes = {
	history: PropTypes.object,
	source: PropTypes.object,
	sourceId: PropTypes.string,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

const mapStateToProps = (state, props) => {
	const {source} = props
	return {
		sourceData: modelSource.selectors.getDataByUrl(state, {url: source.get('url')}),
	}
}

export default connect(
  mapStateToProps,{}
)(withRouter(SourceEditLayers))
