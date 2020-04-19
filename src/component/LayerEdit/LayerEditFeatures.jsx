import React from 'react'
import PropTypes from 'prop-types'
import {fromJS, Map} from 'immutable'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Property from '../Property'
import modelMap from '../../model/map'

import FeatureRow from '../FeatureRow'
import Field from '../Field'
import Alert from '../Alert'
import Icon from '../Icon'

import modelStyle from '../../model/style'

class LayerEditFeatures extends React.Component {

	render (){
		const {error, focusFeatures, layer, path, style} = this.props

		const handle = {
			change: this.handleChange
		}
		const type = 'json'
		const value = layer

		return (
			<div className="content-body">
				<h4 className="content-body-title">
					Focused Layer Features
				</h4>
				{focusFeatures && focusFeatures.map((feature)=>{
					return <FeatureRow feature={feature} key={feature.id} style={style}/>
				})}
			</div>
		)
	}
}

LayerEditFeatures.propTypes = {
	focusFeatures: PropTypes.array,
	history: PropTypes.object,
	layer: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

const mapStoreToProps = (store, props)=>{
	const {layer} = props
	return {
		focusFeatures: modelMap.selectors.focusFeaturesByLayerId(store, {layerId: layer.get('id')}),
	}
}

export default connect(
	mapStoreToProps,
)(withRouter(LayerEditFeatures))
