import React from 'react';
import PropTypes from 'prop-types';

import Msource from '../../model/Msource';

export default class VsourceDelete extends React.Component {
	static propTypes = {
		handle: PropTypes.object,
		sourceKey: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);

		const {handle, sourceKey} = this.props;

		this.handle = {
			deleteConfirm:()=>{
				handle.route('source');
				Msource.remove(sourceKey).then(()=>{

				});
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style, layer} = this.props;

		//console.log('source options:',sourceOptions);
		// loop through editable layer props and display edit interface for each

		return <div>
			<div className="p-2">
				
				<div className="form-group">
					<label>Are you sure you want to delete this source?</label>
					<label>Deleting this source will also remove all style layers associated with this source.</label>
					<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm">
						Delete Source
					</button>
				</div>
		
			</div>
		</div>;
	}
};