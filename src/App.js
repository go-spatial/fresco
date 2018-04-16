import React, {Component} from 'react';
import Pstyles from './page/Pstyles';
import Pstyle from './page/Pstyle';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';

import './App.css';

import {Provider} from 'react-redux';

import Store from './Store';

// npm install --save-dev josdejong/jsonlint

export default class App extends Component {

   render (){

      const routeRoot = process.env.PUBLIC_URL;

      console.log('root:',routeRoot);

      return (
         <Provider store={Store}>
            <Router>
               <Switch>
                  <Route exact path="/" component={Pstyles}/>
                  <Route path="/style/:id" component={Pstyle}/>
                  <Route path="/add" component={Pstyles}/>
               </Switch>
            </Router>
         </Provider>
      );
   }
}
