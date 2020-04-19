import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/utilMapboxSpec'

import Property from '../Property'
import PropertyAdd from '../Property/PropertyAdd'

import modelSource from '../../model/source'
import modelStyle from '../../model/style'

class SourceEditView extends React.Component {

	handleIdChange = async ({value})=>{
		const {history, path, sourceId} = this.props,
			{pathname} = this.props.location

		const pathNew = pathname.replace(/\/sources\/[^\/]*/, `/sources/${value}`)
		
		await modelSource.actions.changeId({
			path: path.slice(0, -1),
			idOld: sourceId,
			idNew: value,
		})
		history.replace(pathNew)
	}

	render (){
		const {error, source, path, sourceId, style} = this.props

		const group = 'source'

		const idHandle = {
			change: this.handleIdChange
		}
		const options = utilMapboxSpec.getSourceTypeOptions()

		return <div className="content-body">
			<h4 className="content-body-title">
				Source Editor
			</h4>
			<div className="property-content">
				<Property {...utilMapboxSpec.getProperties({group, key: 'url', value: source.get('url')})}
					key={'url'}
					label={'url'}
					name={'url'}
					path={[...path, 'url']}
					value={source.get('url')}
				/>
				<Property {...utilMapboxSpec.getProperties({group, key: 'id', value: sourceId})}
					info={'Unique reference to the source'}
					handle={idHandle}
					key={'id'}
					label={'id'}
					name={'id'}
					path={path}
					value={sourceId}
				/>
				<Property {...utilMapboxSpec.getProperties({group, key: 'type', value: source.get('type')})}
					key={'type'}
					label={'type'}
					name={'type'}
					options={options}
					path={[...path, 'type']}
					value={source.get('type')}
				/>
				<PropertyAdd 
					path={path}
					group={group}
					source={source} 
				/>
			</div>
		</div>
	}

	renderProperty ({key}){
		const {error, group, source, path, style} = this.props
		const pathProp = [...path, key]
		const value = source.get(key)
		let property = {
			...utilMapboxSpec.getProperties({group, source, key, value}),
			key: key,
			name: key,
			label: key,
			path: pathProp,
			value: value,
			error: error && error.get && error.get(key)
		}
		if (key === 'name'){ // special case because of a routing issue
			property.handle = {
				change: this.handleIdChange
			}
		}
		if (key === 'type'){
			property.options = modelSource.helpers.getTypeOptions({style})
		}
		return (
			<Property key={key}
				{...property}
			/>
		)
	}
}

SourceEditView.propTypes = {
	error: PropTypes.object,
	group: PropTypes.string,
	history: PropTypes.object,
	source: PropTypes.object.isRequired,
	location: PropTypes.object,
	path: PropTypes.array,
	sourceId: PropTypes.string,
	style: PropTypes.object,
}

export default withRouter(SourceEditView)