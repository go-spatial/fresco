import React from 'react'
import PropTypes from 'prop-types'

import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'

import Icon from '../Icon'
import LayerEditGroupRoot from './LayerEditGroupRoot'
import LayerEditGroupProps from './LayerEditGroupProps'

class LayerEditGroup extends React.Component {

	constructor (props){
		super(props)

		const {open} = props

		this.state = {
			open
		}
	}

	handleOpenSet = ({open})=>{
		this.setState({open})
	}

	render (){
		const {group} = this.props,
			{open} = this.state

		if (!open){
			return (
				<div className="content-body-group interactive" onClick={()=>this.handleOpenSet({open:true})}>
					<span className="content-body-group-icon">
						<Icon icon={'group-open'}/>
					</span>
					<span className="">
						{group}
					</span>
				</div>
			)
		}
		return <div>
			<div className="content-body-group open interactive" onClick={()=>this.handleOpenSet({open:false})}>
				<span className="content-body-group-icon">
					<Icon icon={'group-close'}/>
				</span>
				<span className="">
					{group}
					
				</span>

			</div>
			{this.renderContent()}
		</div>
	}

	renderContent (){
		const {error, group, layer, path, style} = this.props

		switch (group){
			case 'root':
				return <LayerEditGroupRoot
					error={error} 
					group={group}
					layer={layer}
					path={path}
					style={style}
				/>
			default:
				return <LayerEditGroupProps
					error={error && error.has && error.getIn([group])} 
					group={group}
					layer={layer}
					path={path}
					style={style}
				/>
		}
	}

}

LayerEditGroup.propTypes = {
	error: PropTypes.object,
	group: PropTypes.string,
	layer: PropTypes.object,
	open: PropTypes.bool,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default LayerEditGroup