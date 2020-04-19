import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'

import modelLayer from '../../model/layer'
import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class StyleSettingsRoot extends React.Component {

	handleIdChange = async ({path, value})=>{
		const {history} = this.props,
			{pathname} = this.props.location

		const pathNew = pathname.replace(/\/layers\/[^\/]*/, `/layers/${value}`)
		
		await modelStyle.actions.setIn({
			path,
			value,
		})
		history.replace(pathNew)
	}

	render (){
		const {error, path, style} = this.props

		const fields = utilMapboxSpec.getStyleRootPropertyFields()

		const current = style.get('current')

		return (
			<React.Fragment>
				<h2 className="content-title content-title-sub content-title-light">
					<span className="content-title-label">Style Root</span>
				</h2>
				<div className="property-content">
					{current && Map.isMap(current) && current.keySeq().map((key)=>{
						if (!fields.includes(key)) return <div key={key}/>
						return this.renderProperty({key})
					})}
					<div className="property">
						<PropertyAdd 
							path={path}
							propertyOptions={utilMapboxSpec.getStyleRootPropertyOptions()}
						/>
					</div>
				</div>
			</React.Fragment>
		)
	}

	renderProperty ({key}){
		const {error, path, style} = this.props
		const pathProp = [...path, key]
		const value = style.getIn(['current',key])
		let property = {
			...utilMapboxSpec.getStyleProperties({key, value}),
			key: key,
			name: key,
			label: key,
			path: pathProp,
			value: value,
			error: error && error.get && error.get(key)
		}
		if (key === 'id'){ // special case because of a routing issue
			property.handle = {
				change: this.handleIdChange
			}
		}
		return (
			<Property key={key}
				{...property}
			/>
		)
	}
}

StyleSettingsRoot.propTypes = {
	error: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleSettingsRoot)