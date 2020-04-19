import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'

import Icon from '../Icon'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

class LayerEditModalRemove extends React.Component {

  handleRemove = async ()=>{
    const {handleClose, handleDone, history, path} = this.props

    try{
      await modelApp.actions.setLoading(true)
      await modelStyle.actions.removeIn({
        path
      })
      await modelApp.actions.setLoading(false)
      handleDone()
    } catch(e){
      await modelApp.actions.setLoading(false)
      await modelApp.actions.setError(e)
    }
  }

  render (){
    const {handleClose, subject} = this.props

    return (
      <Modal>
        <div className="modal-header text-dark">
          <h5 className="modal-title">REMOVE LAYER?</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-left text-dark">
          <p>Are you sure you want to remove this layer?</p>
          
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
  path: PropTypes.array,
}

export default LayerEditModalRemove

