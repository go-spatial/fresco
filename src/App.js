import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Mconfig from './model/Mconfig';

import Phome from './page/Phome';
import Pconfig from './page/Pconfig';
import Pstyles from './page/Pstyles';
import Pstyle from './page/Pstyle';

import Store from './Store';

import './App.css';

export default class App extends Component {

   render (){
      Mconfig.load(); // load config from localStorage

      const basename = process.env.PUBLIC_URL? process.env.PUBLIC_URL: '';

      return (
         <Provider store={Store}>
            <Router basename={basename}>
               <Switch>
                  <Route path="/config" component={Pconfig}/>
                  <Route path="/style/:id" render={(props) => <Pstyle {...props} />}/>
                  <Route path="/add" component={Phome}/>
                  <Route path="/" component={Phome}/>
               </Switch>
            </Router>
         </Provider>
      );
   }
}
