import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Icon from '../Icon'
import Property from '../Property'

import modelMap from '../../model/map'
import modelStyle from '../../model/style'

class StyleSettingsTokens extends React.Component {

	constructor (props){
		super(props)
		const {accessTokens} = props

		this.oldAccessTokens = accessTokens
	}

	handleChange = async ({name, value})=>{
		const {style} = this.props
		await modelStyle.actions.setAccessToken({
			key: name,
			token: value,
			style,
		})
	}

	handleDeploy = async ()=>{
		const {accessTokens} = this.props
		await modelMap.actions.setAccessTokenDeploy({deploy:true})
		this.oldAccessTokens = accessTokens
	}

	render (){
		const {accessTokens} = this.props

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Access Tokens</span>
			</h2>
			<h4 className="content-body-title">
				Maplibre
			</h4>
			<div className="property-content">
				{this.renderProperty()}
				<div className="position-relative">
					{accessTokens && !accessTokens.equals(this.oldAccessTokens) && (
						<button className="btn btn-outline-info btn-xs float-right" onClick={this.handleDeploy}>
							<Icon icon={'deploy'} weight={'solid'}/>
						</button>
					)}
				</div>
			</div>
		</div>
	}


	renderProperty (){
		const {accessTokens} = this.props

		const handle = {
			change: this.handleChange
		}

		const value = accessTokens? accessTokens.get('maplibre'): ''

		const property = {
			key: 'maplibre',
			handle,
			info: 'Your maplibre token from https://maplibre.com',
			name: 'maplibre',
			label: 'API access token',
			type:'string',
			value
		}
		return (
			<Property key={'maplibre'}
				{...property}
			/>

		)
	}
}

StyleSettingsTokens.propTypes = {
	error: PropTypes.object,
	accessTokens: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}


const mapStoreToProps = (state, props)=>{
	const styleId = props.style.getIn(['current', 'id'])
	return {
		accessTokens: modelStyle.selectors.accessTokens(state, {styleId}),
	}
}

export default connect(
	mapStoreToProps,
)(withRouter(StyleSettingsTokens))