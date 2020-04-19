import React from 'react'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import Field from '../Field'
import Alert from '../Alert'
import Icon from '../Icon'

import modelStyle from '../../model/style'

class HomeSettings extends React.Component {

	render (){
		const {error, styles} = this.props

		return (
			<div className="content-body content-body-scroll content-body-full">
				<h2 className="content-title">
					Settings
				</h2>
				<div className="content-body">
					<h3 className="content-body-title">
						API Access Tokens
					</h3>
				</div>
			</div>
		)
	}
}

HomeSettings.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
	location: PropTypes.object,
}

const mapStateToProps = (state, props) => {
	return {
		styles: modelStyle.selectors.get(state),
	}
}

export default connect(
  mapStateToProps,{}
)(withRouter(HomeSettings))
