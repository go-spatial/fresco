import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'
import utilRenderer from '../../utility/utilRenderer'

import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'
import Field from '../Field'

import modelStyle from '../../model/style'

const RENDERER_OPTIONS = [
	{
		value: 'mapbox-gl-v1',
		name: 'Mapbox GL v1',
		helper: <React.Fragment>
			This is the original Mapbox vector tile rendering library. It is no longer actively developed. This is the default renderer. <a href='https://github.com/mapbox/mapbox-gl-js/tree/v1.13.2' target='_blank'>See details.</a>
		</React.Fragment>,
	},
	{
		value: 'maplibre-gl-v2',
		name: 'MapLibre GL v2',
		helper: <React.Fragment>
			This is an open source fork of the Mapbox renderer after Mapbox adopted a proprietary model for v2. <a href='https://github.com/maplibre/maplibre-gl-js' target='blank'>See details.</a>
		</React.Fragment>,
	},
]

class StyleSettingsRenderers extends React.Component {
	handleRendererChange = async ({value})=>{
		const {style} = this.props
		await modelStyle.actions.setRenderer({
			style,
			renderer: value,
		})
	}

	render (){
		const {style} = this.props

		const current = style.get('current')

		const currentRenderer = current.get('metadata')?.get('fresco:renderer') || utilRenderer.defaultRenderer

		return (
			<React.Fragment>
				<h2 className="content-title content-title-sub content-title-light">
					<span className="content-title-label">Style Renderers</span>
				</h2>
				<div className="property-content">
					<Field
						type='radio'
						name='renderer'
						value={currentRenderer}
						options={RENDERER_OPTIONS}
						handle={{
							change: this.handleRendererChange,
						}}
					/>
				</div>
			</React.Fragment>
		)
	}
}

StyleSettingsRenderers.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleSettingsRenderers)
