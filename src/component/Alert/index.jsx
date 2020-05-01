import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'

class Alert extends React.Component {

	render (){
		const {handleClose, message} = this.props

		if (!message) return <div/>

		let className = 'alert alert-danger fade show alert-position'
		return (
			<div className={className}>
				<span className="alert-message">{message}</span>
				<button onClick={handleClose} type="button" className="close" aria-label="Close">
					<Icon className="text-danger" icon={'close'}/>
				</button>
			</div>
		)
	}
}

Alert.propTypes = {
	handleClose: PropTypes.func,
	message:PropTypes.string,
}
export default Alert