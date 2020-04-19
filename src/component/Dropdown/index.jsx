import React from 'react'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {

	handleVoid = (e)=>{
		e.stopPropagation()
	}

	render (){
		const {children, handleClose, open} = this.props

		return (
			<div className="dropdown-container">
				{open && <div className="dropdown-cover" onClick={handleClose}/>}
				<div className="dropdown-content" onClick={this.handleVoid}>
					{children}
				</div>
			</div>
		)		
	}
}


Dropdown.propTypes = {
	children: PropTypes.node,
	handleClose: PropTypes.func,
	open: PropTypes.bool,
}

export default Dropdown