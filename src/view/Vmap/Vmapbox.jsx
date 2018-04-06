import React from 'react';
import PropTypes from 'prop-types';

import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

export default class Vmap extends React.Component {

	static propTypes = {
		styleJS: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			map:undefined,
			styleJS:undefined
		};
	}

	render (){
		return <div id="map" className="" ref={el => this.container = el}></div>
	}
	componentWillReceiveProps(nextProps) {
		if(!this.state.map) return;

		const {styleJS} = nextProps;

		//console.log('compare:',this.state.styleJS,styleJS);

		if (this.state.styleJS.equals(styleJS)) return;
		this.setState({styleJS:styleJS});

		//console.log('styleJs:',JSON.stringify(styleJS.toJS()));

		/*
		const metadata = nextProps.mapStyle.metadata || {}
		MapboxGl.accessToken = metadata['maputnik:mapbox_access_token'] || tokens.mapbox
		*/

		this.state.map.setStyle(styleJS.toJS(),{diff: true});
  }

	componentDidMount() {
		const {styleJS} = this.props;

		this.setState({styleJS:styleJS});

		console.log('map style:',styleJS);

		const map = new MapboxGl.Map({
			container: this.container,
			style: styleJS.toJS(),
			hash: true
		});


		//console.log('map:',MapboxGl);

		/*
		const zoom = new ZoomControl;
		map.addControl(zoom, 'top-right');
		*/

		const nav = new MapboxGl.NavigationControl();
		map.addControl(nav, 'top-right');

		this.setState({map:map});



		//this.setState({map:map});



		/*
		const map = new MapboxGl.Map({
		container: this.container,
		style: this.props.mapStyle,
		hash: true,
		})

		*/

		/*

		const inspect = new MapboxInspect({
		popup: new MapboxGl.Popup({
		  closeOnClick: false
		}),
		showMapPopup: true,
		showMapPopupOnHover: false,
		showInspectMapPopupOnHover: true,
		showInspectButton: false,
		assignLayerColor: (layerId, alpha) => {
		  return Color(colors.brightColor(layerId, alpha)).desaturate(0.5).string()
		},
		buildInspectStyle: (originalMapStyle, coloredLayers) => buildInspectStyle(originalMapStyle, coloredLayers, this.props.highlightedLayer),
		renderPopup: features => {
		  if(this.props.inspectModeEnabled) {
		    return renderPropertyPopup(features)
		  } else {
		    var mountNode = document.createElement('div');
		    ReactDOM.render(<FeatureLayerPopup features={features} onLayerSelect={this.props.onLayerSelect} />, mountNode)
		    return mountNode
		  }
		}
		})
		map.addControl(inspect)

		map.on("style.load", () => {
		this.setState({ map, inspect });
		})

		map.on("data", e => {
		if(e.dataType !== 'tile') return
		this.props.onDataChange({
		  map: this.state.map
		})
		})
		*/
  }
};