import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {

	render (){
		const {children, size = 'md'} = this.props

		// add class d-block
		const modalClass = `modal-dialog modal-dialog-scrollable modal-${size}`
		return (
			<div className="modal fade show d-block" tabIndex="-1" role="dialog">
				<div className={modalClass} role="document">
					<div className="modal-content">
						{children}
					</div>
				</div>
			</div>
		)	
	}
}

Modal.propTypes = {
	size: PropTypes.string,
}

export default Modal