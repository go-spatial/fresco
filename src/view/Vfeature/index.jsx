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
		const {features, handle} = this.props;

		// get property values

		let cols = ['id'];
		features.map((feature)=>{
			if (!feature.properties) return;
			Object.keys(feature.properties).map((i)=>{
				if (cols.indexOf(i) === -1) cols.push(i);
			});
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

		/*
			
			{features.map((feature)=>{

				console.log('feature:',feature);

				return <li key={feature.id} onClick={()=>{this.handle.featureClick(feature);}}><a href="javascript://">
					{Object.keys(feature.properties).map((i)=>{
						return i+': '+feature.properties[i];
					})}
				</a></li>
			})}

		*/
	}
};