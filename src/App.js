import React, { Component } from 'react'
import './App.css'

import Page from './component/Page'
import {Provider} from 'react-redux'
import Store from './Store'

export default class App extends Component {
  render (){
    return (
      <Provider store={Store}>
         <Page/>
      </Provider>
    )
  }
}
