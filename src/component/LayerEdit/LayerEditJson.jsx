import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'
import {withRouter} from 'react-router-dom'

import Field from '../Field'

import modelStyle from '../../model/style'
import modelPreference from '../../model/preference'

class LayerEditJson extends React.Component {

	componentDidMount (){
		// set user preference to json
		modelPreference.actions.setIn({
			path: ['editMode'],
			value: 'json',
		})
	}

	handleChange = async ({value})=>{
		const {history, path, layer} = this.props,
			{pathname} = this.props.location

		if (layer.get('id') !== value.id){
			const pathNew = pathname.replace(/\/layers\/[^/]*/, `/layers/${value.id}`)
			history.replace(pathNew)
		}

		await modelStyle.actions.setIn({
			path,
			value: fromJS(value),
		})
	}

	render (){
		const {error, layer} = this.props

		const handle = {
			change: this.handleChange
		}
		const type = 'json'
		const value = layer

		return (
			<div className="content-body">
				<h4 className="content-body-title mb-0">
					Layer Json
				</h4>
				<Field 
					error={error}
					handle={handle}
					type={type}
					value={value}
				/>
			</div>
		)
	}
}

LayerEditJson.propTypes = {
	history: PropTypes.object,
	layer: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

export default withRouter(LayerEditJson)
