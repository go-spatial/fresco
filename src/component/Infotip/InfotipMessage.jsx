
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class InfotipMessage extends React.Component {

	constructor (props){
		super(props)
		
		this.state = {
			built:false
		}
		
		this.parentEl = null
	}

	componentDidMount (){
		const {direction, sourceEl} = this.props
		if (!this.parentEl) this.parentEl = document.createElement('div')

		const boundingRect = sourceEl.getBoundingClientRect()

  	let bigX = boundingRect.x > window.innerWidth/2? true: false
  	let bigY = boundingRect.y > window.innerHeight/2? true: false

		this.parentEl.style.position = 'absolute'
		this.parentEl.style.top = boundingRect.top+'px'
		this.parentEl.style.left = boundingRect.left+'px'
		this.parentEl.style.width = boundingRect.width+'px'
		this.parentEl.style.height = boundingRect.height+'px'
		this.parentEl.className = `infotip ${bigX? 'bigX': ''} ${bigY? 'bigY': ''} ${direction}`

		document.body.appendChild(this.parentEl)

		this.setState({
			built:true
		})
	}

	componentWillUnmount (){
		console.log('cleanup:',this.parentEl)
		document.body.removeChild(this.parentEl)
	}

	render (){
		const {message} = this.props,
			{built} = this.state

		if (!built) return <div/>

		const textClass = message.length > 20? 'infotip-text-long': 'infotip-text-short'

		return ReactDOM.createPortal(
			<div className="infotip-source">
				<div className="infotip-point">
					<div className="infotip-bubble">
						<span className={textClass}>
							{message}
						</span>
					</div>
				</div>
			</div>,
			this.parentEl
		)
	}
}


InfotipMessage.propTypes = {
	direction: PropTypes.string,
	sourceEl: PropTypes.object,
	message: PropTypes.string,
}

export default InfotipMessage