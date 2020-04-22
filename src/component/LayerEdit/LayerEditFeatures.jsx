import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import modelMap from '../../model/map'

import FeatureRow from '../FeatureRow'

class LayerEditFeatures extends React.Component {

	render (){
		const {focusFeatures, style} = this.props

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
