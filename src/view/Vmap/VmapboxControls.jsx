import React from 'react';
import PropTypes from 'prop-types';

export default class VmapboxControls extends React.Component {
	static propTypes = {
		map:PropTypes.object
	}

	constructor (props){
		super(props);
		const {map} = props;

		this.state = {
			debugLines:false
		}

		this.handle = {
			debugLinesToggle:()=>{
				if (this.state.debugLines){
					this.setState({debugLines:false});
					map.showTileBoundaries = false;
				} else {
					this.setState({debugLines:true});
					map.showTileBoundaries = true;
				}
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentDidMount(){
		this.tooltip();
	}

	tooltip(){
		//console.log('ref:',)
		window.$(this.tooltipsRef).children().tooltip();
	}

	render (){

		const className = 'mapboxgl-ctrl-icon'+(this.state.debugLines? ' active': '');

		return <div className="mapboxgl-ctrl mapboxgl-ctrl-group" ref={ref => this.tooltipsRef = ref}>
			<button className={className} onClick={this.handle.debugLinesToggle} title="debug lines">
				<i className="material-icons md-18">
					border_all
				</i>
			</button>
		</div>
	}

};
