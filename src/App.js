import React, { Component } from 'react'

import Page from './component/Page'
import {Provider} from 'react-redux'
import Store from './Store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default class App extends Component {
  render (){
    return (
      <Provider store={Store}>
         <Page/>
      </Provider>
    )
  }
}
