import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import Property from '../Property'
import modelStyle from '../../model/style'

class StyleSettingsDomains extends React.Component {

	handleChange = async ({name, value})=>{
		const {style} = this.props
		await modelStyle.actions.setDomainHeader({
			domain: name,
			header: value,
			style,
		})
	}

	handleSubmit = async ({path, value})=>{
		
	}

	render (){
		const {style} = this.props;

		const domains = modelStyle.helpers.getDomains({style})

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Style Domains</span>
			</h2>
			<h4 className="content-body-title">
				Domain Headers
			</h4>
			<form onSubmit={this.handleSubmit} className="property-content">
				{domains && domains.map((domain)=>{
					return this.renderProperty({domain})
				})}
			</form>
		</div>
	}


	renderProperty ({domain}){
		const {domainHeaders, error} = this.props

		const handle = {
			change: this.handleChange
		}

		const value = domainHeaders? domainHeaders.get(domain): Map({})

		const property = {
			key: domain,
			handle,
			name: domain,
			label: domain,
			type:'metadata',
			value,
			error: error && error.get && error.get(domain)
		}
		return (
			<Property key={domain}
				{...property}
			/>
		)
	}
}

StyleSettingsDomains.propTypes = {
	error: PropTypes.object,
	domainHeaders: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}


const mapStoreToProps = (state, props)=>{
	const styleId = props.style.getIn(['current', 'id'])
	return {
		domainHeaders: modelStyle.selectors.domainHeaders(state, {styleId}),
	}
}

export default connect(
	mapStoreToProps,
)(withRouter(StyleSettingsDomains))