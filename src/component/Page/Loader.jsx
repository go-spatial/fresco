import React from 'react'
import PropTypes from 'prop-types'

export default class Loader extends React.Component {
	render() {
		return (
			<div className="cover">
				<div className="cover-bg"/>
				<div className="center page-loader text-center">
					<div className="page-loader-spinner spinner-border text-white" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		)
	}
}