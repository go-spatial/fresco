import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

class SourceEditModalRemove extends React.Component {

  handleRemove = async ()=>{
    const {path} = this.props

    try{
      await modelApp.actions.setLoading(true)
      await modelStyle.actions.removeIn({
        path
      })
      await modelApp.actions.setLoading(false)
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
          <h5 className="modal-title">REMOVE SOURCE?</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-left text-dark">
          <p>Are you sure you want to remove this source?</p>s
          
        </div>  
        <div className="modal-footer">
          <button onClick={this.handleRemove} className="btn btn-outline-dark">Remove</button>
        </div>
      </Modal>
    )
  }

}

SourceEditModalRemove.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleDone: PropTypes.func,
  path: PropTypes.array,
}

export default SourceEditModalRemove

