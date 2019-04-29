import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import DateFormat from '../../utility/DateFormat';

export default class Vstyles extends React.Component {
	static propTypes = {
		handle: PropTypes.object,
		styles: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {styles, handle} = props;

		if (styles.size < 1){
			handle.routeReplace('add/new');
		}
		this.state = {};
	}

	render (){
		const {styles, handle} = this.props;

		return <ul className="bg-dk m-0 row">
			{styles.valueSeq().map((style) => {
				if (typeof style !== 'object') return;
				
				let path = '/style/'+style.get('id')+'/layer';
				return <li key={style.get('id')} className="p-3 col-sm-6 col-lg-4">
					<Link to={path}>
						<h5 className="mb-0">{style.get('name')}</h5>
						<p className="mb-0"><small className="text-muted">Last updated {DateFormat.ago(style.getIn(['_store','updated']))}</small></p>
					</Link>
				</li>
			})}
		</ul>

	}
};