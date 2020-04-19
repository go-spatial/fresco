import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import modelMap from '../../model/map'

import MapMapbox from './MapMapbox'

class Map extends React.Component {
	render (){
		const {focus, style} = this.props

		return <MapMapbox focus={focus} style={style}/>
	}
}

Map.propTypes = {
	focus: PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number,
	}),
	path: PropTypes.array,
	style: PropTypes.object,
}

const mapStateToProps = (state, props) => {
	return {
		focus: modelMap.selectors.focus(state),
	}
}
export default connect(
  mapStateToProps,{}
)(Map)