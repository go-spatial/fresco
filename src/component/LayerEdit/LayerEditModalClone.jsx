import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import {withRouter} from 'react-router-dom'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelStyle from '../../model/style'

import Property from '../Property'

class LayerEditModalClone extends React.Component {

  constructor(props) {
    super(props)
    const {layer, style} = props

    const cloneId = modelLayer.helpers.getLayerCloneId({layer, style})

    this.state = {
      id: cloneId,
      placement: '',
    }
  }

  handleClone = async ()=>{
    const {history, layer, path, style} = this.props,
      {id, placement} = this.state
    
    try{
      await modelApp.actions.setLoading(true)

      const clone = await modelLayer.actions.clone({cloneId: id, layer, path, placement, style})
      await modelApp.actions.setLoading(false)
      
      // send user to newly created layer
      const route = `layers/${clone.get('id')}`
      history.push(modelStyle.helpers.getRouteFromPath({path, route}))

    } catch(e){
      await modelApp.actions.setLoading(false)
      await modelApp.actions.setError(e)
    }

    this.setState({
      modal: 'cloneDone'
    })
  }

  handleChange = ({name, value})=>{
    let state = {}
    state[name] = value

    this.setState(state)
  }

  render (){
    const {handleClose} = this.props,
      {id, placement} = this.state

    //const stylePath = modelStyle.helpers.getRouteFromPath({path})

    const handle = {
      change: this.handleChange
    }

    const options = [
      {name:'at the bottom', value:'bottom'},
      {name:'after cloned layer', value:'after'},
    ]

    return (
      <Modal>
        <div className="modal-header text-dark">
          <h5 className="modal-title">CLONE LAYER</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-left text-dark">

          <Property 
            handle={handle}
            info={'id for the layer clone'}
            key={'id'}
            label={'new layer id'}
            name={'id'}
            path={null}
            required={true}
            type={'string'}
            value={id}
          />
          <Property 
            handle={handle}
            info={'placement of the cloned layer'}
            key={'placement'}
            label={'placement'}
            name={'placement'}
            options={options}
            path={null}
            required={true}
            type={'enum'}
            value={placement}
          />
          
        </div>  
        <div className="modal-footer">
          <button onClick={this.handleClone} className="btn btn-outline-dark">Create</button>
        </div>
      </Modal>
    )
  }

}

LayerEditModalClone.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleDone: PropTypes.func,
  history: PropTypes.object,
  layer: PropTypes.object,
  path: PropTypes.array,
  style: PropTypes.object,
}

export default withRouter(LayerEditModalClone)

