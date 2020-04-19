import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'
import {withRouter} from 'react-router-dom'

import Field from '../Field'
import Alert from '../Alert'

import modelStyle from '../../model/style'

class SourceEditJson extends React.Component {

	handleChange = async (value)=>{
		const {history, path, source} = this.props,
			{pathname} = this.props.location

		await modelStyle.actions.setIn({
			path,
			value: fromJS(value),
		})
	}

	render (){
		const {error, source, path, style} = this.props

		const handle = {
			change: this.handleChange
		}
		const type = 'json'
		const value = source

		return (
			<div className="content-body">
				<h4 className="content-body-title mb-0">
					Source Json
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

SourceEditJson.propTypes = {
	history: PropTypes.object,
	source: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object
}

export default withRouter(SourceEditJson)
