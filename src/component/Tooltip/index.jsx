import React from 'react'
import PropTypes from 'prop-types'

class Tooltip extends React.Component {

	render (){
		const {direction, message} = this.props

		const textClass = message.length > 20? 'tooltip-text-long': 'tooltip-text-short'

		return (
			<div className="tooltip-source">
				<div className="tooltip-point">
					<div className={`tooltip-bubble ${direction === 'right'? 'tooltip-bubble-right': ''}`}>
						<span className={textClass}>
							{message}
						</span>
					</div>
				</div>
			</div>
		)		
	}
}


Tooltip.propTypes = {
	direction: PropTypes.oneOf([
		'left',
		'right',
	]),
	message: PropTypes.string,
}

export default Tooltip