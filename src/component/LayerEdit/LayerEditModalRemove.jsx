import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import {withRouter} from 'react-router-dom'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'

class LayerEditModalRemove extends React.Component {

  handleRemove = async ()=>{
    const {history, layer, path, style} = this.props

    try{
      await modelApp.actions.setLoading(true)

      const layerIndex = modelLayer.helpers.getIndexById({layerId: layer.get('id'), style})
      if (layerIndex === -1) throw new Error(`LayerEditModalRemove.handleRemove: no layer found to clone`)
      
      await modelStyle.actions.removeIn({
        path
      })
      await modelApp.actions.setLoading(false)
      
      // send user to prev layer
      const prevIndex = layerIndex === 0? 1: layerIndex - 1
      // get prev layer
      const prevLayer = style.getIn(['current','layers', prevIndex])
      const route = prevLayer? `layers/${prevLayer.get('id')}`: 'layers'
      
      history.push(modelStyle.helpers.getRouteFromPath({path, route}))

    } catch(e){
      await modelApp.actions.setLoading(false)
      await modelApp.actions.setError(e)
    }
  }

  render (){
    const {handleClose} = this.props

    return (
      <Modal>
        <div className="modal-header text-dark">
          <h5 className="modal-title">REMOVE LAYER?</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-left text-dark">
          <p className="mb-0">Are you sure you want to remove this layer?</p>
          
        </div>  
        <div className="modal-footer">
          <button onClick={this.handleRemove} className="btn btn-outline-dark">Remove</button>
        </div>
      </Modal>
    )
  }

}

LayerEditModalRemove.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleDone: PropTypes.func,
  history: PropTypes.object,
  layer: PropTypes.object,
  path: PropTypes.array,
  style: PropTypes.object,
}

export default withRouter(LayerEditModalRemove)

