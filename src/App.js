import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});



class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
        <HashRouter>
        <Switch>
          <Route path="/" name="Home" render={(props) =>{
                return <DefaultLayout {...props}  />
            }} />
        </Switch>
      </HashRouter>  
    );
  }
}

export default App;
