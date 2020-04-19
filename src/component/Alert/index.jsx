import React from 'react'
import PropTypes from 'prop-types'

class Alert extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			show:true
		}
	}

	handleClose = ()=>{
		this.setState({show:false})
	}

	render (){
		const {message} = this.props,
			{show} = this.state

		if (!message || !show) return <div/>

		let className = 'alert alert-danger alert-dismissible fade show alert-position'
		return (
			<div className={className}>
			{message}
				<button onClick={this.handleClose} type="button" className="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		)
	}
}

Alert.propTypes = {
	message:PropTypes.string,
}
export default Alert