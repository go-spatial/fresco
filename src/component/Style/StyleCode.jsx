import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'

import modelStyle from '../../model/style'
import Field from '../Field'

class StyleCode extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleChange = async (value)=>{
		const {path} = this.props

		await modelStyle.actions.setIn({
			path: [...path, 'current'],
			value:fromJS(value),
		})
	}

	render (){
		const {error, path, style, match} = this.props

		const value = style.getIn(['current'])
		const type = 'json'

		const handle = {
			change: this.handleChange
		}

		return <div className="content-body content-body-scroll">
			<div className="col-sm-12 p-0">
				<Field 
					error={error}
					handle={handle}
					type={type}
					value={value}
				/>
			</div>
		</div>
	}
}


StyleCode.propTypes = {
	error: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
	styleId: PropTypes.string,
}


export default StyleCode