import React from 'react';
import PropTypes from 'prop-types';

import MapboxError from '../../utility/MapboxError';

//import Valert from '../Valert';
import Vfield from '../Vfield';
import Valert from '../Valert';

import Mlayer from '../../model/Mlayer';

export default class VlayerEditJSON extends React.Component {
	static propTypes = {
		layer: PropTypes.object.isRequired,
		handle: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		const {layer, handle} = this.props;

		this.layerId = layer.get('id');

		this.handle = {
			change(code){
				//check if id was changed, if so navigate to page that matches id
				console.log('change code:',code,this.layerId);
				if (this.layerId !== code.id){
					Mlayer.set(this.layerId,code).then(()=>{
						this.layerId = code.id;
						handle.routeReplace('layer/'+code.id);
					});
					return;
				}
				handle.change(code);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {layer, error} = this.props;

		this.layerId = layer.get('id');

		// convert error to JSON position
		//console.log('json error:',error);

		const field = {
			value:layer.toJS(),
			error:error,
			type:'JSON'
		};
		return <div>
			<Vfield key={layer.get('id')} field={field} handle={this.handle}/>
		</div>;

		/*

		const codeMirrorOptions = {
			mode: {name: "javascript", json: true},
			tabSize: 2,
			theme: 'maputnik',
			viewportMargin: Infinity,
			lineNumbers: true,
			lint: true,
			gutters: ["CodeMirror-lint-markers"],
			scrollbarStyle: "null",
		}

		return <CodeMirror
			value={this.state.code}
			onBeforeChange={(editor, data, value) => this.handle.update(value)}
			onFocusChange={focused => focused ? true : this.handle.reset()}
			options={codeMirrorOptions}/>;
		*/
	}
};