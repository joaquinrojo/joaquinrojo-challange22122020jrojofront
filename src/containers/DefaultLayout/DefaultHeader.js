import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import logo from '../../assets/img/brand/logo.svg'
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/campana.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 40, alt: 'Causalerta Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Causalerta Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
        
          <NavItem className="px-3">
            <NavLink href="#/">Dashboard</NavLink>
          </NavItem>
         
          <NavItem className="px-4">
            <Link to="/causas">Causas</Link>
          </NavItem>
          <NavItem className="px-4">
            <Link to="/ingresoCausas">Ingreso Causas</Link>
          </NavItem>

          

        </Nav>
        <Nav className="ml-auto" navbar>
          {/*
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../causalertav2/assets/img/avatars/mini-icono-01.jpg'} className="img-avatar" alt="soporte@causalerta.cl" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}> 

              <Link to="/usuario"><DropdownItem><i className="cui-cog"></i>Cuenta</DropdownItem></Link>
              <Link to="/cobros"><DropdownItem><i className="fa fa-usd"></i>Cobros</DropdownItem></Link>

              <DropdownItem divider />
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Cerrar Sesión</DropdownItem>
              {/*
              <DropdownItem><i className="fa fa-bell-o"></i> Cambio de Plan<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Cobros<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Pagos<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Administración cuenta<Badge color="secondary">42</Badge></DropdownItem>
              
              const ActualizaUsuario = React.lazy(() => import('./views/Usuario/ActualizaUsuario'));

              <DropdownItem><i className="fa fa-file"></i> Administración usuarios<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i>Configuración Tribunales Familia<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i>Planes<Badge color="primary">42</Badge></DropdownItem>
              
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              */}
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
