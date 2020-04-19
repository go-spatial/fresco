import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorC extends React.Component {
	static propTypes = {
		handleClose: PropTypes.func,
		message: PropTypes.string,
	}

	render() {
		const {handleClose, message} = this.props

		//console.log('message type:',typeof message, JSON.stringify(message))

		if (!message) return <div/>

		return (
			<div className="alert-bar fixed-bottom">
				<div className="alert alert-danger fade show mb-0" role="alert">
					{message.replace(/Error:\s/g,'')}
					<button type="button" className="close text-light" data-dismiss="alert" aria-label="Close">
						<span onClick={handleClose} aria-hidden="true">&times;</span>
					</button>
				</div>
			</div>
		)
	}
}