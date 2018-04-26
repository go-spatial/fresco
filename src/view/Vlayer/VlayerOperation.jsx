import React from 'react';
import PropTypes from 'prop-types';

import Mlayer from '../../model/Mlayer';

export default class VlayerEditor extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle,layer} = this.props;

		this.state = {
			deleteShow:false
		};

		this.handle = {
			deleteConfirm:()=>{
				handle.route('layer');
				Mlayer.remove(layer.get('id')).then(()=>{

				});
			},
			deleteShow:()=>{
				this.setState({deleteShow:true});
			},
			deleteHide:()=>{
				this.setState({deleteShow:false});
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
				{this.state.deleteShow ?
					<div className="form-group mt-4 text-right">
						<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm mr-2">
							Delete Layer
						</button>
						<button onClick={this.handle.deleteHide} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">close</i>
						</button>
					</div>
					:
					<div className="form-group mt-4 text-right">
						<button onClick={this.handle.deleteShow} type="submit" className="btn btn-light btn-sm">
							<i className="material-icons md-18">delete</i>
						</button>
					</div>
				}
			</div>
		</div>;
	}
};