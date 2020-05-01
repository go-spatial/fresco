import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

class MapMapboxControls extends React.Component {

	constructor (props){
		super(props)

		this.state = {
			debugLines:false,
		}
	}

	handleDebugLinesToggle = ()=>{
		const {map} = this.props,
			{debugLines} = this.state

		if (debugLines){
			this.setState({debugLines:false})
			map.showTileBoundaries = false
		} else {
			this.setState({debugLines:true})
			map.showTileBoundaries = true
		}
	}

	render (){
		const {handleLocationToggle} = this.props, 
			{debugLines} = this.state

		return (
			<React.Fragment>			
				<div className="mapboxgl-ctrl mapboxgl-ctrl-group tooltip-trigger">
					<button className={`mapboxgl-ctrl-icon`} onClick={handleLocationToggle}>
						<Icon icon={'location'}/>
					</button>
					<Tooltip direction={'left'} message={'jump to location'} origin={'left'}/>
				</div>
				<div className="mapboxgl-ctrl mapboxgl-ctrl-group tooltip-trigger">
					<button className={`mapboxgl-ctrl-icon ${debugLines? 'active': ''}`} onClick={this.handleDebugLinesToggle}>
						<Icon icon={'debug-lines'}/>
					</button>
					<Tooltip direction={'left'} message={`debug lines ${debugLines? 'off': 'on'}`} origin={'left'}/>
				</div>
			</React.Fragment>
		)
	}

}

MapMapboxControls.propTypes = {
	handleLocationToggle: PropTypes.func,
	map:PropTypes.object,
}

export default MapMapboxControls
