import React from 'react';

export default class Valert extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			show:true,
			message:null
		}
		this.handle = {
			close:()=>{
				this.setState({show:false});
			}
		};
		for (const i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps(nextProps){
		if (!this.state.show || nextProps.message !== this.state.message){
			this.setState({
				message:nextProps.message,
				show:true
			});
		}
	}

	render (){
		const {message} = this.props;

		if (!message || !this.state.show) return <div/>

		let className = 'alert alert-danger alert-dismissible fade show mb-0';
		return <div className={className}>
			{message}
			<button onClick={this.handle.close} type="button" className="close" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	}
};