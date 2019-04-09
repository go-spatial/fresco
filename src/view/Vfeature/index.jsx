import React from 'react';
import PropTypes from 'prop-types';

export default class Vfeature extends React.Component {

	static propTypes = {
		features: PropTypes.array,
		handle: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	render (){
		const {features} = this.props;

		let cols = ['id'];
		features.map((feature)=>{
			if (!feature.properties) return null;
			Object.keys(feature.properties).map((i)=>{
				if (cols.indexOf(i) === -1) cols.push(i);
				return null;
			});
			return null;
		});
		
		let ids = [];
		let uniqueFeatures = features.filter((feature)=>{
			// check if feature is already in
			if (ids.indexOf(feature.id) === -1){
				ids.push(feature.id);
				return true;
			}
			return false;
		});

		return <table className="table font-sm table-sm">
			<thead>
				<tr>
					{cols.map((col)=>{
						return <th key={col}>{col}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{uniqueFeatures.map((feature)=>{
					return <tr key={feature.id}>
						{cols.map((col)=>{
							return <td key={col}>
								{feature.properties[col] || feature[col]}
							</td>
						})}
					</tr>
				})}
			</tbody>

		</table>
	}
};