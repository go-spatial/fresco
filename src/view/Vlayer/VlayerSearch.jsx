import React from 'react';

export default class VlayerSearch extends React.Component {
	constructor(props) {
		super(props);

		const {handle, mode} = this.props;

		this.state = {
		};

		this.handle = {
			change:(e)=>{

			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {match, handle} = this.props;

		return <div className="">
			Search
		</div>;
	}
};