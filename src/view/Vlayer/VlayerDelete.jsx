import React from 'react';
import PropTypes from 'prop-types';

import Mlayer from '../../model/Mlayer';

export default class VlayerDelete extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.handle = {
			deleteConfirm:()=>{
				handle.route('layer');
				Mlayer.remove(layer.get('id')).then(()=>{

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
					<label>Are you sure you want to delete this layer?</label>
					<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm">
						Delete Layer
					</button>
				</div>
		
			</div>
		</div>;
	}
};