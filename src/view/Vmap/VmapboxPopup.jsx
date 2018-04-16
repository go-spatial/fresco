import React from 'react';
import PropTypes from 'prop-types';

export default class VmapboxPopup extends React.Component {

	static propTypes = {
		features: PropTypes.array,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle, field, controlled} = this.props;

		if (controlled){
			this.state = {
				value:field.value
			};
		}

		this.handle = {
			change:(e)=>{
				const file = e.target.files[0];
				const name = e.target.name;
				if (controlled){
					this.setState({value:file});
				}
				handle.change(file);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentDidMount() {
		// render into ref
	}

	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.field.value});
	}

	render (){
		const {features} = this.props;
		
		return <div/>
	}
};