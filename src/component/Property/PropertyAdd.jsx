import React from 'react'
import PropTypes from 'prop-types'

import utilMapboxSpec from '../../utility/utilMapboxSpec'
import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'

class PropertyAdd extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			show: false,
		}
	}

	handleChange = async ({name, value})=>{
		const {group, layer, path} = this.props

		const propValue = utilMapboxSpec.getPropDefault({group, layer, key:value})
		await modelStyle.actions.setIn({
			path: [...path, value],
			value: propValue,
		})

		this.handleShowSet({show:false})
	}

	handleShowSet = ({show})=>{
		this.setState({
			show
		})
	}

	render (){
		const {group, layer, propertyOptions} = this.props,
			{show} = this.state

		const handle = {
			change: this.handleChange
		}
		let options
		if (propertyOptions){
			options = propertyOptions
		} else if (layer) {
			options = utilMapboxSpec.getPropertyOptions({group, layer})
		}

		if (!options || options.length < 1) return <div/>

		if (!show){
			return <div onClick={()=>this.handleShowSet({show:true})} className="btn btn-xs btn-light">
				<Icon icon={'add'}/>
			</div>
		}

		return (
			<div className="position-relative">
				<Field
					autoFocus={false}
					error={null}
					handle={handle}
					label={null}
					name={'property'}
					options={options}
					placeholder={'Property name'}
					type={'ac'}
					value={null} 
				/>

				<div className="row-btn-remove">
					<button onClick={()=>this.handleShowSet({show:false})} className="btn btn-light btn-xs" type="button">
						<Icon icon={'close'}/>
					</button>
				</div>
			</div>
		)
	}
}


PropertyAdd.propTypes = {
	path: PropTypes.array,
	propertyOptions: PropTypes.array,
	group: PropTypes.string,
	layer: PropTypes.object,
	handle: PropTypes.object
}

export default PropertyAdd

