import React from 'react';
import Valert from '../Valert';
import Mstyle from '../../model/Mstyle';

export default class Vsave extends React.Component {
	constructor(props) {
		super(props);
		const {} = this.props;

		this.state = {};

		this.handle = {
			download:()=>{
				const json = Mstyle.getJSforMapbox();
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {} = this.props;

		return <div className="row h-100">
			<div className="col-sm-12">
				<div className="p-1">
					<h2 className="px-2 py-1 m-0 text-nav bg-light">
						Save
						<div className="float-right">
							
						</div>
					</h2>
					Save
					<Valert message="save error"/>
					Download stylesheet
					<form onSubmit={this.handle.download}>
						<button type="submit" className="btn btn-secondary">Download</button>
					</form>
				</div>
			</div>

		</div>
	}
};