import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import modelStyle from '../../model/style'
import Icon from '../Icon'

class StyleRow extends React.Component {
	render() {
		const {style, styleId} = this.props

		const link = `/style/${styleId}`

		const title = style.getIn(['current', 'name'])

		return (
			<Link key={styleId} to={link} className="content-row interactive">
				{title}
			</Link>
		)
	}
}

StyleRow.propTypes = {
	style: PropTypes.object,
	styleId: PropTypes.string,
}

const mapStateToProps = (state, props) => {
	return {
		style: modelStyle.selectors.getIn(state, {path: [props.styleId]}),
	}
}
export default connect(
  mapStateToProps,{}
)(StyleRow)