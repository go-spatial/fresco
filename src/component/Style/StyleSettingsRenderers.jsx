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

const DEFAULT_RENDERER = 'mapbox-gl-v1'
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
		// await modelStyle.actions.setAccessToken({
		// 	key: name,
		// 	token: value,
		// 	style,
		// })
    }

	render (){
		const {style} = this.props

		const current = style.get('current')

        const currentRenderer = current.get('metadata')?.get('fresco:renderer') || DEFAULT_RENDERER

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

// class StyleSettingsRoot extends React.Component {
//
// 	handleIdChange = async ({path, value})=>{
// 		const {history} = this.props,
// 			{pathname} = this.props.location
//
// 		const pathNew = pathname.replace(/\/layers\/[^/]*/, `/layers/${value}`)
// 	
// 		await modelStyle.actions.setIn({
// 			path,
// 			value,
// 		})
// 		history.replace(pathNew)
// 	}
//
// 	render (){
// 		const {path, style} = this.props
//
// 		const fields = utilMapboxSpec.getStyleRootPropertyFields()
//
// 		const current = style.get('current')
//
// 		return (
// 			<React.Fragment>
// 				<h2 className="content-title content-title-sub content-title-light">
// 					<span className="content-title-label">Style Root</span>
// 				</h2>
// 				<div className="property-content">
// 					{current && Map.isMap(current) && current.keySeq().map((key)=>{
// 						if (!fields.includes(key)) return <div key={key}/>
// 						return this.renderProperty({key})
// 					})}
// 					<div className="property">
// 						<PropertyAdd 
// 							path={path}
// 							propertyOptions={utilMapboxSpec.getStyleRootPropertyOptions()}
// 						/>
// 					</div>
// 				</div>
// 			</React.Fragment>
// 		)
// 	}
//
// 	renderProperty ({key}){
// 		const {error, path, style} = this.props
// 		const pathProp = [...path, key]
// 		const value = style.getIn(['current',key])
// 		let property = {
// 			...utilMapboxSpec.getStyleProperties({key, value}),
// 			key: key,
// 			name: key,
// 			label: key,
// 			path: pathProp,
// 			removeEnabled: true,
// 			value: value,
// 			error: error && error.get && error.get(key)
// 		}
// 		if (key === 'id'){ // special case because of a routing issue
// 			property.handle = {
// 				change: this.handleIdChange
// 			}
// 		}
// 		return (
// 			<Property key={key}
// 				{...property}
// 			/>
// 		)
// 	}
// }

StyleSettingsRenderers.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleSettingsRenderers)
