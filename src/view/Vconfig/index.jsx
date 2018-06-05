import PropTypes from 'prop-types';
import React from 'react';

import VconfigTokens from './VconfigTokens';

export default class Vconfig extends React.Component {
	static propTypes = {
		error: PropTypes.object, // map
		handle: PropTypes.object,
		match: PropTypes.object,
		config: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {} = props;

		
	}

	render (){
		const {config, error, handle} = this.props;

		return <div className="p-2 bg-white container">
			<VconfigTokens config={config} error={error} handle={handle}/>
		</div>;

	}
};