import React from 'react'
import PropTypes from 'prop-types'

import FieldAC from './FieldAC'
import FieldCheckbox from './FieldCheckbox'
import FieldColor from './FieldColor'
import FieldFile from './FieldFile'
import FieldJSON from './FieldJSON'
import FieldNumber from './FieldNumber'
import FieldSelect from './FieldSelect'
import FieldString from './FieldString'

class Field extends React.Component {

	render (){
		const {type} = this.props

		switch (type){
			case 'ac':
				return <FieldAC {...this.props}/>
			case 'checkbox':
				return <FieldCheckbox {...this.props}/>
			case 'color':
				return <FieldColor {...this.props}/>
			case 'file':
				return <FieldFile {...this.props}/>
			case 'number':
				return <FieldNumber {...this.props}/>
			case 'select':
				return <FieldSelect {...this.props}/>
			case 'string':
				return <FieldString {...this.props}/>
			case 'json':
				return <FieldJSON {...this.props}/>
		}

		return <div/>
	}
}

Field.propTypes = {
	type: PropTypes.string.isRequired,
  handle: PropTypes.object,
}

export default Field