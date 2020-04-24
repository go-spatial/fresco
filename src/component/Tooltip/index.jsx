import React from 'react'
import PropTypes from 'prop-types'

class Tooltip extends React.Component {

	render (){
		const {direction, message, origin} = this.props

		const originClass = origin? `tooltip-origin-${origin}`: 'tooltip-origin-bottom'
		const bubbleDirectionClass = direction? `tooltip-bubble-${direction}`: 'tooltip-bubble-left'

		const textClass = message.length > 20? 'tooltip-text-long': 'tooltip-text-short'

		return (
			<div className={`tooltip-source ${originClass}`}>
				<div className="tooltip-point">
					<div className={`tooltip-bubble ${bubbleDirectionClass}`}>
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
	align: PropTypes.oneOf([
		'left',
		'right',
	]),
	direction: PropTypes.oneOf([
		'left',
		'right',
	]),
	origin: PropTypes.oneOf([
		'bottom',
		'left',
	]),
	message: PropTypes.string,
}

export default Tooltip