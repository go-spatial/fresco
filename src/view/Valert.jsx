import React from 'react';

export default class Valert extends React.Component {
	render (){
		const {message} = this.props;
		return <div className="alert alert-danger my-1 mx-2">
			{message}
		</div>
	}
};