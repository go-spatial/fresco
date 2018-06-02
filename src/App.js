import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Phome from './page/Phome';
import Pconfig from './page/Pconfig';
import Pstyles from './page/Pstyles';
import Pstyle from './page/Pstyle';

import Store from './Store';

import './App.css';

export default class App extends Component {

   render (){
      return (
         <Provider store={Store}>
            <Router>
               <Switch>
                  <Route exact path="/" component={Phome}/>
                  <Route path="/config" component={Pconfig}/>
                  <Route path="/style/:id" render={(props) => <Pstyle {...props} />}/>
                  <Route path="/add" component={Phome}/>
               </Switch>
            </Router>
         </Provider>
      );
   }
}
