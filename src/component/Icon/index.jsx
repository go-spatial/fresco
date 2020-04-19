import React from 'react'
import PropTypes from 'prop-types'
import constants from './constants'

class Icon extends React.Component {
  render(){
    const {className, color, icon, weight} = this.props

    let weightClass = weight? constants.weights[weight]: constants.weights[constants.weightDefault]
    let style = {}
    if (color) style.color = color

    return (
      <i className={`fa-fw ${weightClass} ${constants.icons[icon]} ${className || ''}`} style={style}/>
    )
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  weight: PropTypes.oneOf(['solid', 'regular', 'light', 'duo', 'brand'])
}

export default Icon
