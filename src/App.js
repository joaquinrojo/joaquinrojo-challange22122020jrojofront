import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import  CausalertaUtil  from './util/CausalertaUtil';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

// Pages
const CambioContrasena = Loadable({
  loader: () => import('./views/Pages/Login/CambioContrasena'),
  loading
});

// Ver documento
const VerDocumento = Loadable({
  loader: () => import('./views/Pages/Externos/VerDocumento'),
  loading
});


// Ver link
const VerLink = Loadable({
  loader: () => import('./views/Pages/Externos/VerLink'),
  loading
});



// Pages
const FinalizarCambioContrasena = Loadable({
  loader: () => import('./views/Pages/Login/FinalizarCambioContrasena'),
  loading
});


const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

function checkLoged() {
  return true;

}

class App extends Component {

  constructor(props) {
    super(props);
  }



  render() {



    return (
        <HashRouter>
        <Switch>
          
          <Route path="/cuenta/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/cambio_contrasena" name="Cambio contraseña" component={CambioContrasena} />
          <Route exact path="/finaliza_cambio_contrasena" name="Cambio contraseña" component={FinalizarCambioContrasena} />
          <Route exact path="/ver_documento" name="Documento" component={VerDocumento} />
          <Route exact path="/ver_link" name="Ver Link" component={VerLink} />


          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" render={(props) =>{
              console.log("Entro en el route"+checkLoged());
              if(checkLoged()){  
                return <DefaultLayout {...props}  />
              }else{
                return  <Login {...props}  />
              }

            }} />
        </Switch>
      </HashRouter>  
    );
  }
}

export default App;
