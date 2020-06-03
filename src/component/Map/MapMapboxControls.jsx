import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Infotip from '../Infotip'

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
				<div onClick={handleLocationToggle} className="mapboxgl-ctrl mapboxgl-ctrl-group infotip-trigger map-control">
					<button className={`mapboxgl-ctrl-icon`}>
						<Icon icon={'location'}/>
					</button>
					<Infotip direction={'x'} message={'jump to location'}/>
				</div>
				<div onClick={this.handleDebugLinesToggle} className="mapboxgl-ctrl mapboxgl-ctrl-group infotip-trigger map-control">
					<button className={`mapboxgl-ctrl-icon ${debugLines? 'active': ''}`}>
						<Icon icon={'debug-lines'}/>
					</button>
					<Infotip direction={'x'} message={`debug lines ${debugLines? 'off': 'on'}`}/>
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
