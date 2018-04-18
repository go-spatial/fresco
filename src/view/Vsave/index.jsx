import React from 'react';
import fileDownload from 'js-file-download';

import Valert from '../Valert';
import Mstyle from '../../model/Mstyle';

export default class Vsave extends React.Component {
	constructor(props) {
		super(props);
		const {style} = this.props;

		this.state = {};

		this.handle = {
			download:(e)=>{
				e.preventDefault();
				const json = Mstyle.getJSforMapbox();
				const name = style.get('name')+'.json';
				const parsed = JSON.stringify(json, null, 2);
				fileDownload(parsed, name);
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {} = this.props;

		return <div className="row h-100 m-0">
			<div className="col-sm-12 p-0">
				<div className="p-1">
					<div className="p-2 text-right">
						<form onSubmit={this.handle.download}>
							<button type="submit" className="btn btn-primary">Download</button>
						</form>
					</div>
				</div>
			</div>

		</div>
	}
};