import React from 'react';

import Mlayer from '../../model/Mlayer';

export default class VlayerAdd extends React.Component {
	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {
			layerId:''
		};

		console.log('props:',props);

		this.handle = {
			submit:(e)=>{
				e.preventDefault();
				//if (this.state.layerId.length < 1){
					// error!
					//return;
				//}
				Mlayer.add({
					id:this.state.layerId
				}).then(()=>{
					console.log('added');
					handle.route('layers');
				});

				
			},
			layerIdChange:(e)=>{
				this.setState({layerId: e.target.value});

			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		return <form onSubmit={this.handle.submit}>
			<h2 className="px-2 py-1 m-0 text-nav bg-light">Add Layer</h2>
			<div className="py-3 px-2">
				<div className="form-group">
					<label>Layer ID</label>
					<input type="text" className="form-control" placeholder="Unique identifier for layer"
						value={this.state.layerId} onChange={this.handle.layerIdChange}/>
				</div>
				<button type="submit" className="btn btn-primary">Add</button>
			</div>
		</form>
	}
};