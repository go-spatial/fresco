import React from 'react';

export default class Valert extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			closed:false,
			message:null
		}
		this.handle = {
			close:()=>{
				this.setState({closed:true});
			}
		};
		for (const i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.message !== this.state.message){
			this.setState({
				message:nextProps.message,
				closed:false
			});
		}
	}

	render (){
		const {message} = this.props;

		let className = 'alert alert-danger m-2 alert-dismissible fade';
		if (!this.state.closed) className += ' show';
		return <div className={className}>
			{message}
			<button onClick={this.handle.close} type="button" className="close" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	}
};