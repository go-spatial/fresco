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

	render (){
		const {config, error, handle} = this.props;

		return <div className="p-2 bg-white container">
			<VconfigTokens config={config} error={error} handle={handle}/>
		</div>;

	}
};