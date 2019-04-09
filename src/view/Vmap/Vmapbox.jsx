import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import LayerIcon from '../../utility/LayerIcon';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mconfig from '../../model/Mconfig';
import Msource from '../../model/Msource';
import Mstyle from '../../model/Mstyle';
import Mlayer from '../../model/Mlayer';
import VmapboxControls from './VmapboxControls';
import VmapboxInspector from './VmapboxInspector';

import 'mapbox-gl-inspect/dist/mapbox-gl-inspect.css';
const MapboxInspect = require('mapbox-gl-inspect');

class CustomControls {
	onAdd(map) {
		this._container = document.createElement('div');
		ReactDOM.render(<VmapboxControls map={map}/>,this._container);
		return this._container;
	}
	onRemove() {
		this._container.parentNode.removeChild(this._container);
		this._map = undefined;
	}
}

class Vmapbox extends React.Component {

	static propTypes = {
		handle: PropTypes.object,
		match: PropTypes.object,
		rebuildMap: PropTypes.number,
		styleJS: PropTypes.object.isRequired,
	}

	buildMap (){
		const {styleJS} = this.props;

		this.styleJS = styleJS;

		Mstyle.errorsSet();

		const config = Mconfig.get();
		const token = config.get('mapboxToken');

		MapboxGl.accessToken = token;

		const map = new MapboxGl.Map({
			attributionControl:false,
			logoPosition:'bottom-right',
			container: this.container,
			style: styleJS.toJS(),
			transformRequest: this.transformRequest,
			hash:true
		});

		map.addControl(new CustomControls({}));

		map.addControl(new MapboxInspect({
			popup: new MapboxGl.Popup({
				closeButton: true,
				closeOnClick: false
			}),
			showInspectButton: false,
			showMapPopup: true,
			showMapPopupOnHover: false,
			showInspectMapPopupOnHover: false,
			renderPopup: this.renderPopup.bind(this)
		}));

		map.addControl(new MapboxGl.AttributionControl({
			compact: true
		}));

		const nav = new MapboxGl.NavigationControl();
		map.addControl(nav, 'top-right');

		map.on('error',(e)=>{
			console.error('map error:',e);
			if (e.sourceId){
				const error = {
					message:'sources.'+e.sourceId+'.url: error loading source'
				};
				return Mstyle.errorAdd(error);
			}
			Mstyle.errorAdd(e.error);
		});

		this.map = map;
	}

	componentDidMount (){
		this.buildMap();
	}

	componentDidUpdate(){
		const {rebuildMap, styleJS} = this.props

		if (!styleJS || !this.map) return

		if (rebuildMap && rebuildMap && this.builtMap !== rebuildMap){
			this.buildMap();
			this.builtMap = rebuildMap
			return;
		}

		if (!this.styleJS || !this.styleJS.equals(styleJS)){
			this.styleJS = styleJS;
			
			this.reStyleMap();
		}
	}

	constructor (props){
		super(props);

		this.state = {
			debugLines:null
		}

		this.container = null; // node to put map in
		this.map = null;
		this.styleJS = null;
		this.builtMap = null;
	}

	reStyleMap (){
		const {styleJS} = this.props
		Mstyle.errorsSet();
		try {
			this.map && this.map.setStyle(styleJS.toJS(),{diff: true});
		} catch(e){
			Mstyle.errorAdd(e);
		}
	}

	render (){
		const className = 'btn btn-light btn-sm'+(this.state.debugLines? ' active': '');

		return <div>
			<div id="map" className="" ref={el => this.container = el}></div>
		</div>
	}

	renderPopup (features){
		const {handle} = this.props;

		setTimeout(()=>{
			return ReactDOM.render(<VmapboxInspector features={features} handle={handle}/>,document.getElementById('map-inspect'));
		},1);
		
		return '<div class="map-inspect" id="map-inspect"></div>';
	}

	transformRequest = (url, resourceType)=>{
		if (resourceType === 'Source') {
			const sources = Msource.get(); // get all sources

			const matchKey = sources.findKey((source, sourceKey) => {
				const url = source.get('url');
				if (!url) return false;
				var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
				var domain = matches && matches[1];
				if (!domain) return false;
				return url.includes(domain);
			});
			
			if (!matchKey) return {url: url, headers:{}};
			const settings = Msource.getSettings(matchKey);

			if (!settings || !settings.has('headers')){
				return {url: url, headers:{}};
			}
			return {
				url: url,
				headers: settings.get('headers').toJS()
			}
		} else if (resourceType === 'Tile'){
			const sources = Msource.get(); // get all sources

			const matchKey = sources.findKey((source, sourceKey) => {

				const sourceJson = Msource.getJson(sourceKey)

				let tiles;
				if (source.has('tiles')){
					tiles = source.get('tiles')
				} else if (sourceJson && sourceJson.has('tiles')){
					tiles = sourceJson.get('tiles')
				}

				if (!tiles){
					return false;
				}
				const tileMatch = tiles.find((path)=>{
					var matches = path.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
					var domain = matches && matches[1];
					if (!domain) return false;
					return url.includes(domain)
				})

				return (tileMatch)? true: false;
			});

			if (!matchKey) return {url: url, headers:{}};
			const settings = Msource.getSettings(matchKey);

			if (!settings || !settings.has('headers')){
				return {url: url, headers:{}};
			}
			return {
				url: url,
				headers: settings.get('headers').toJS()
			}
		}
	}
};

const mapStoreToProps = (store)=>{
	return {
		rebuildMap:store.style.get('rebuildMap'),
	}
};
const mapDispatchToProps = {};

export default connect(
	mapStoreToProps,
	mapDispatchToProps
)(Vmapbox);

