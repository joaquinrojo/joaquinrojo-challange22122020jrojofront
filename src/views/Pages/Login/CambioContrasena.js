import React, { Component } from 'react';
import { Link ,Redirect,Switch,HashRouter,loading,Route} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import Loadable from 'react-loadable';
import  CausalertaUtil  from "../../../util/CausalertaUtil";



class CambioContrasena extends Component {
  
	constructor(props){
		super(props);
		
		this.state = {
			correo: '',
      redirect: false,
      isLoading:false
		}

  }
  
  enterLogin = (event) => {
    if(event.key=="Enter"){
      this.setRedirect();
    }

  }
  
  volverAlLogin = () => {
    this.props.history.push('/login')
  }

  setRedirect = () => {

    let util =new CausalertaUtil();
    //console.log(this.state);
		if(!this.state.correo){
			Swal.fire('Debe ingresar el correo asociado a su cuenta');
			return false;
		}
    var arrayBody =
    {
      "usuCorreo":this.state.correo,    
    };
    let headers={
    };
    this.setState({isLoading:true})
    util.callApi("enviaRecuperacionPassword",headers,arrayBody)	
    .then((responseJson) => {
      if(responseJson.status=='ok'){
        Swal.fire('Email enviado correctamente');	
        this.setState({isLoading:false})
      }else{
        Swal.fire(responseJson.mensaje);		
        this.setState({isLoading:false})
      }
    }).catch((error) =>{

      console.log(error);
    });	   
  }  
  

  
  render() {

    if(this.state.isLoading){
      return <div>Enviando email, favor espere</div>
    }else{



    return (


      <div className="contenedor-out app flex-row align-items-center">

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                      <h1>Recuperacion de contraseña</h1>
                      <p className="text-muted">Recupera tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onKeyPress={(event)=>{this.enterLogin(event)}} value={this.state.correo} onChange={(event)=>{this.setState({ correo : event.target.value });}} placeholder="Correo asociado a tu cuenta" autoComplete="empresa" />
                      </InputGroup>
                      
                      <Row>


                        <Col xs="6"> 
                        <Button color="success" onClick={this.setRedirect} block>Solicitar nueva!</Button>
                        </Col>
                        <Col xs="6">


                        <Button color="primary" onClick={this.volverAlLogin} block><i className="icon-logout"></i>  Volver</Button>
                        </Col>
                      </Row>
                  
                  </CardBody>
                </Card>
                <Card className="text-white  py-5 d-md-down-none" style={{backgroundColor:'#231509', width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Revisa tu correo</h2>
                      <p>Recibirás un email de recuperación de cuenta en la dirección de email asociada a tu cuenta</p>
                      <Row>
                      <Col>
                      <img src="https://causalerta.cl/wp/wp-content/uploads/2018/04/campana-blanca-2-e1522625318423.png" alt="Regístrate en Causalerta y mantente actualizado de todos los movimientos de tus causas."></img>
                      </Col>
                      </Row> 
                      <Row>
 
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
}

export default CambioContrasena;
