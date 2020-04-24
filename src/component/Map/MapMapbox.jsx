import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import modelMap from '../../model/map'
import modelStyle from '../../model/style'

import MapboxGl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import utilUrl from '../../utility/utilUrl'

import MapMapboxControls from './MapMapboxControls'

class CustomControls {
	onAdd(map) {
		this._container = document.createElement('div')
		ReactDOM.render(<MapMapboxControls map={map}/>,this._container)
		return this._container
	}
	onRemove() {
		this._container.parentNode.removeChild(this._container)
		this._map = undefined
	}
}

class MapMapbox extends React.Component {

	applyFeatureStates = async ()=>{
		const {featureStates, featureStateDeploy} = this.props

		if (!featureStateDeploy) return
		if (!featureStates || (this.featureStates && this.featureStates.equals(featureStates))) return

		// remove current frature states
		this.featureStates && this.featureStates.keySeq().forEach(source => {
			const sourceObj = this.featureStates.get(source)
			sourceObj.keySeq().forEach(sourceLayer => {
				const sourceLayerObj = sourceObj.get(sourceLayer)
				sourceLayerObj.keySeq().forEach(featureId => {

					this.map.removeFeatureState({
						source,
						sourceLayer,
						id: featureId,
					})
				})
			})
		})

		featureStates.keySeq().forEach(source => {
			const sourceObj = featureStates.get(source)
			sourceObj.keySeq().forEach(sourceLayer => {
				const sourceLayerObj = sourceObj.get(sourceLayer)
				sourceLayerObj.keySeq().forEach(featureId => {
					const featureState = sourceLayerObj.get(featureId)

					this.map.setFeatureState({
						source,
						sourceLayer,
						id: featureId,
					}, featureState.toJS())
				})
			})
		})

		this.featureStates = featureStates

		await modelMap.actions.setFeatureStateDeploy({deploy: false})
	}

	buildMap (){
		const {accessTokens, style} = this.props

		if (this.map){
			// tear down map
			this.map.remove()
		}



		/*

		Mstyle.errorsSet()

		const config = Mconfig.get()
		const token = config.get('mapboxToken')

		MapboxGl.accessToken = token

		*/

		if (accessTokens && accessTokens.has('mapbox')) MapboxGl.accessToken = accessTokens.get('mapbox')

		window.onerror = (message, source, lineno, colno, error)=>{
			modelStyle.actions.errorSet({
				error, 
				path: [style.getIn(['id'])],
			})
		}

		const map = new MapboxGl.Map({
			attributionControl:false,
			logoPosition:'bottom-right',
			container: this.container,
			style: style.toJS(),
			transformRequest: this.transformRequest,
			hash:true
		})


		map.addControl(new CustomControls({}))

		map.addControl(new MapboxGl.AttributionControl({
			compact: true
		}))

		const nav = new MapboxGl.NavigationControl()
		map.addControl(nav, 'top-right')

		map.on('error',(e)=>{
			this.handleMapError(e.error)
		})

		map.on('moveend', ()=>{
			if (window.location.hash) this.hash = window.location.hash
		})

		map.on('load', (e)=>{
			this.setState({
				mapLoaded: true
			})
			this.applyFeatureStates()
		})

		map.on('click', (e)=>{
			this.handleClick(e)
		})

		this.map = map
	}

	componentDidUpdate = async ()=>{
		const {accessTokenDeploy, focus, rebuildMap, style} = this.props,
			{mapLoaded} = this.state

		if (!style || !this.map || !mapLoaded) return

		if (rebuildMap && rebuildMap && this.builtMap !== rebuildMap){
			this.buildMap()
			this.builtMap = rebuildMap
			return
		}

		if (!window.location.hash){
			if (window.history.replaceState) {
	    	window.history.replaceState(null, null, this.hash)
			}
			else {
			  window.location.hash = this.hash
			}
		}
     
		// if there is a point, set it on the map and query features
		if (focus){
			const featuresDuped = modelMap.helpers.queryMapFeatures({
				map: this.map,
				point: focus,
			})

			// dedupe features
			let found = [], features = []
			featuresDuped.forEach(feature => {
				const key = `${feature.source}~${feature.sourceLayer}~${feature.layer.id}~${feature.id}`
				if (!found.includes(key)){
					found.push(key)
					features.push(feature)
				}
			})

			modelMap.actions.setFocusFeatures({
				features,
			})

			let el = document.createElement('div')
			el.innerHTML = `<span class="marker-number"><span>${features.length}</span><span class="marker-close" onclick="window.mapMarkerClose(event)"><i class="fas fa-times"></i></span></span><i class="fas fa-map-marker text-info"></i>`
			el.className = 'marker'
			if (this.clickMarker) this.clickMarker.remove()
			this.clickMarker = new MapboxGl.Marker(el, {offset:[0,-17]})
				.setLngLat(focus)
				.addTo(this.map)
		} else {
			if (this.clickMarker) this.clickMarker.remove()
		}


		if (!this.style || !this.style.equals(style)){
			this.style = style
			
			this.reStyleMap()
		}

		this.applyFeatureStates()

		if (accessTokenDeploy){
			this.buildMap()

			await modelMap.actions.setAccessTokenDeploy({deploy: false})
		}
	}

	componentWillUnmount(){
		if (this.map) this.map.remove()
	}

	constructor (props){
		super(props)

		this.state = {
			debugLines: null,
			mapLoaded: false,
		}

		this.container = null // node to put map in
		this.map = null
		this.style = props.style
		this.builtMap = null
		this.featureStates = null
		this.hash = window.location.hash
	}

	handleClick = (e)=>{
		const point = this.map.unproject(e.point)

		// store point
		modelMap.actions.setFocus({point})
	}

	handleMapError = (error)=>{
		const {style} = this.props

		if (error.sourceId){
			const err= {
				message:'sources.'+error.sourceId+'.url: error loading source'
			}
			modelStyle.actions.errorSet({
				error: err, 
				path: [style.getIn(['id'])],
			})
			//return Mstyle.errorAdd(error)
			return
		}

		modelStyle.actions.errorSet({
			error, 
			path: [style.getIn(['id'])],
		})
	}

	

	handleMarkerClose = (e)=>{
		e.stopPropagation()
		if (this.clickMarker) this.clickMarker.remove()
		modelMap.actions.clearFocus()
	}

	componentDidMount (){

		window.mapMarkerClose = this.handleMarkerClose

		this.buildMap()
	}

	reStyleMap (){
		const {style} = this.props
	
		modelStyle.actions.errorClear({
			path: [style.getIn(['id'])],
		})
		try {
			this.map && this.map.setStyle(style.toJS(),{diff: true})
		} catch(e){
			this.handleMapError(e)
		}
	}

	render (){
		return (
			<div id="map" ref={el => this.container = el}></div>
		)
	}

	transformRequest = (url, resourceType)=>{
		const {domainHeaders} = this.props

		const domain = utilUrl.getDomain(url)

		if (domainHeaders && domainHeaders.has(domain)){
			const headers = domainHeaders.getIn([domain]).toJS()

			let sendHeaders = {}
			Object.keys(headers).forEach(key => {
				if (key && key.length > 0){
					sendHeaders[key] = headers[key]
				}
			})

			return {
				url: url,
				headers: sendHeaders,
			}
		}
	}
}

MapMapbox.propTypes = {
	accessTokenDeploy: PropTypes.bool,
	domainHeaders: PropTypes.object,
	featureStates: PropTypes.object,
	featureStateDeploy: PropTypes.bool,
	focus:  PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number,
	}),
	handle: PropTypes.object,
	match: PropTypes.object,
	rebuildMap: PropTypes.number,
	style: PropTypes.object.isRequired,
}

const mapStoreToProps = (store, props)=>{
	const {style} = props
	return {
		accessTokens: modelStyle.selectors.accessTokens(store, {styleId: style.get('id')}),
		accessTokenDeploy: modelMap.selectors.accessTokenDeploy(store),
		domainHeaders: modelStyle.selectors.domainHeaders(store, {styleId: style.get('id')}),
		featureStates: modelStyle.selectors.featureStates(store, {styleId: style.get('id')}),
		featureStateDeploy: modelMap.selectors.featureStateDeploy(store),
	}
}

export default connect(
	mapStoreToProps,
)(withRouter(MapMapbox))

