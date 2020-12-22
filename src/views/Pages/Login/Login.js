import React, { Component } from 'react';
import { Link ,Redirect,Switch,HashRouter,loading,Route} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Badge } from 'reactstrap';
import Swal from 'sweetalert2';

import  CausalertaUtil  from "../../../util/CausalertaUtil";



class Login extends Component {
  
	constructor(props){
		super(props);
		
		this.state = {
			usuario: '',
      contrasena: '',
      redirect: false,
		}

  }
  
  enterLogin = (event) => {
    if(event.key=="Enter"){
      this.setRedirect();
    }

  }
  

  setRedirect = () => {

    let util =new CausalertaUtil();
    //console.log(this.state);
		if(!this.state.usuario || !this.state.contrasena){
			Swal.fire('Debe ingresar cuenta y contraseña');
			return false;
		}

    util.callApiLogin(this.state.usuario,this.state.contrasena)
    .then((responseJson) => {

      if(responseJson){
        let objLogin={
          usuario:this.state.usuario,
          contrasena:this.state.contrasena,
        }
        //console.log(responseJson);
        util.login(objLogin);
        this.props.history.push('/dashboard')
        this.setState({redirect:true});      
      }else{
        Swal.fire('Usuario o contraseña incorrectos');
        console.log("Error en el login");
      }
    }).catch((error) =>{
      Swal.fire('Error en el login');
      console.log(error);
    });	

  }  
  

  
  render() {
    return (

      <div className="contenedor-out app flex-row align-items-center">

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
         
                      <h1>Bienvenido(a) a CausAlerta</h1>
                      <p className="text-muted">Ingresa con tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onKeyPress={(event)=>{this.enterLogin(event)}} value={this.state.usuario} onChange={(event)=>{this.setState({ usuario : event.target.value });}} placeholder="Cuenta" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onKeyPress={(event)=>{this.enterLogin(event)}} value={this.state.contrasena} onChange={(event)=>{this.setState({ contrasena : event.target.value });}} placeholder="Contraseña" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.setRedirect}> <i className="icon-login"></i> Acceder</Button>
                        </Col>
                      </Row>
                      <br/>
                      
                      <a href="https://www.causalerta.cl/tramitacion" >Acceder como usuario</a> <Badge color="success">New</Badge>
                        <br/> 
                      <Link to="/cambio_contrasena">
                        ¿Olvidaste tu contraseña?
                        </Link>
                  
                  </CardBody>
                </Card>
                <Card className="text-white  py-5 d-md-down-none" style={{backgroundColor:'#231509', width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Regístrate</h2>
                      <p>Regístrate en Causalerta y mantente actualizado de todos los movimientos de tus causas.</p>
                      <Row>
                      <Col>
                      <img src="https://causalerta.cl/wp/wp-content/uploads/2018/04/campana-blanca-2-e1522625318423.png" alt="Regístrate en Causalerta y mantente actualizado de todos los movimientos de tus causas."></img>
                      </Col>
                      </Row> 
                      <Row>
                      <Col>
                      <Link to="/register">
                        <Button color="success" className="mt-3" active tabIndex={-1}>Crear cuenta</Button>
                      </Link>
                      </Col>
                      </Row> 
                      {

                      }
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
