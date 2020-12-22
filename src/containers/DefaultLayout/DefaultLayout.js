import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import  CausalertaUtil  from '../../util/CausalertaUtil';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
//import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	constructor(props) {
    super(props);
    this.state={navigation:{items:[]}};

	}		

  componentDidMount = () =>{
    /*
    let util=new CausalertaUtil();
    util.callApi('getMenu',{},{},{})
    .then((responseJson) => {     
      this.setState({navigation:responseJson});
    }).catch((error) =>{
      console.error("Error cargar menú");
      console.log(error);
    });	
*/
  }


  signOut(e) {
    let util=new CausalertaUtil();
   
    // e.preventDefault()
    util.logout();
    this.props.history.push('/cuenta/login')
  }

  render() {
    return (
      <div className="app">

        <div className="app-body">

          <main className="main">
      
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
