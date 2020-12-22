import React, { Component } from 'react';
import { Link ,Redirect,Switch,HashRouter,loading,Route} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import Loadable from 'react-loadable';
import  CausalertaUtil  from "../../../util/CausalertaUtil";



class FinalizarCambioContrasena extends Component {
  
	constructor(props){
		super(props);
		
		this.state = {
      password1: '',
      password2: '',
      cod: '',
      redirect: false,
      isLoading:false,
      cambiaRealizado:false, 
		}

  }
  

	componentDidMount = () =>{
    console.log(this.props);
    let cod=this.props.location.search;
    cod=cod.replace('?cod=','');
    this.setState({cod:cod});
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
		if(this.state.password1!=this.state.password2){
			Swal.fire('La nueva contraseña debe coincidir');
			return false;
		}
    var arrayBody =
    {
      "password":this.state.password1,    
      "cod":this.state.cod,    
    };
    let headers={
    };
    util.callApi("confirmarRecuperacionPassword",headers,arrayBody)	
    .then((responseJson) => {
      if(responseJson.status=="ok"){
        Swal.fire(responseJson.mensaje);
        this.setState({cambiaRealizado:true});
      }else{
        Swal.fire(responseJson.mensaje);
      }


      console.log(responseJson);
    }).catch((error) =>{

      console.log(error);
    });	   
  }  
  

  
  render() {



    if(this.state.cambiaRealizado){

      return ( <div className="contenedor-out app flex-row align-items-center">

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                      <h1>Clave cambiada exitosamente</h1>

                      <br></br>
                      <br></br>
                      <Row>


                        <Col xs="6"> 
                        
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
                      <h2>Tu contraseña ya fue cambiada</h2>
                      <p>Agradecemos que siga utilizando nuestros servicios</p>
                      <Row>
                      <Col>
                      <img src="https://www.causalerta.cl/wp/wp-content/uploads/2018/04/campana-blanca-2-e1522625318423.png" alt="Regístrate en Causalerta y mantente actualizado de todos los movimientos de tus causas."></img>
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
      )}else{


    if(this.state.isLoading){
      return <div>Cambiando clave, porfavor espere</div>
    }else{
    return (

      <div className="app flex-row align-items-center">

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                      <h1>Confirma tu nueva contraseña</h1>
                      <p className="text-muted">Recupera tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onKeyPress={(event)=>{this.enterLogin(event)}} value={this.state.password1} onChange={(event)=>{this.setState({ password1 : event.target.value });}} placeholder="Contraseña" autoComplete="empresa" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onKeyPress={(event)=>{this.enterLogin(event)}} value={this.state.password2} onChange={(event)=>{this.setState({ password2 : event.target.value });}} placeholder="Repite tu contraseña" autoComplete="empresa" />
                      </InputGroup>
                    

                      <Row>


                        <Col xs="6"> 
                        <Button color="success" onClick={this.setRedirect} block>Confirma nueva contraseña!</Button>
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
                      <h2>Ya estás a un paso</h2>
                      <p>Confirma la nueva contraseña y vuelve a utilizar CausAlerta</p>
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
}}
}

export default FinalizarCambioContrasena;
