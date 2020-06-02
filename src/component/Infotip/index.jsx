
import React from 'react'
import PropTypes from 'prop-types'
import InfotipMessage from './InfotipMessage'

class Infotip extends React.Component {

	constructor (props){
		super(props)

		this.el = React.createRef()
		this.state = {
			show:false,
		}
	}

	handleClick = ()=>{
		const {handleClick} = this.props
		if (handleClick) handleClick()
	}

	handleMouseEnter = (evt)=>{
		let el = evt.currentTarget
  	if (el != null){
  		this.setState({
  			show: true,
  		})
  	}
	}

	handleMouseLeave = (evt)=>{
		this.setState({
			show: false,
		})
	}

	render (){
		const {direction = 'y', message} = this.props,
			{show} = this.state

		return (
			<div 
				className="infotip"
				onClick={this.handleClick}
				onMouseEnter={this.handleMouseEnter} 
				onMouseLeave={this.handleMouseLeave} 
				ref={this.el}>
				{show && this.el.current && (
					<InfotipMessage
						direction={direction}
						message={message} 
						sourceEl={this.el.current}
					/>
				)}
			</div>
		)
	}
}


Infotip.propTypes = {
	children: PropTypes.node,
	handleClick: PropTypes.func,
	direction: PropTypes.oneOf([
		'x',
		'y',
	]),
	message: PropTypes.string,
}

export default Infotip