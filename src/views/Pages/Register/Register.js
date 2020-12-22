import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2'
import  CausalertaUtil  from "../../../util/CausalertaUtil"
class Register extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			usuCorreo: '',
      usuPassword: '',
      usuPassword2: '',
			usuNombre: '',
      cliTelefono: '',
			cliRut: '',
      cliTipoEntidad: 'natural',
			cliNombre: '',
      cliDireccion: '',
			cliGiro: '',
      tcuId: '2',
      arregloPlanesVigentes: [],
		}

  }


  componentDidMount() {
    let util=new CausalertaUtil();
    var arrayBody =
    {};
    util.callApi("getPlanes",{},arrayBody)	
    .then((responseJson) => {
      this.setState({arregloPlanesVigentes:responseJson.cuentas}
        );
    }).catch((error) =>{

      console.log(error);
    });	   
  }
  
  crearUsuario = () => {

    let state=this.state;
    let errores="";
    if(state.cliRut==="")
      errores+='Debe ingresar un Rut\n';
    if(state.usuCorreo==="")
      errores+='Debe ingresar correo electrónico\n';
    if(state.usuPassword==="")
      errores+='Debe contraseña\n';  
    if(state.usuPassword2==="")
      errores+='Debe repetir la contraseña\n'; 	
    if(state.usuNombre==="")
      errores+='Debe ingresar el nombre de la cuenta\n'; 	   
    if(state.cliNombre==="")
      errores+='Debe ingresar nombre o razón social\n'; 	         
      

      if(errores!=""){
      Swal.fire(errores);
      return false;
    }
    

    if(!(state.usuPassword===state.usuPassword2)){
      Swal.fire('Las contraseñas deben coincidir');  
      return false;
    }


    

    let util=new CausalertaUtil();
    var arrayBody =
    {
      "cliRut":this.state.cliRut,
      "usuCorreo":this.state.usuCorreo,
      "usuPassword":this.state.usuPassword,
      "usuNombre":this.state.usuNombre,
      "cliNombre":this.state.cliNombre,
      "cliDireccion":this.state.cliDireccion,
      "cliTelefono":this.state.cliTelefono,
      "cliTipoEntidad":this.state.cliTipoEntidad, 
      "tcuId":this.state.tcuId,       
    };
    let headers={
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    util.callApi("crearNuevoUsuario",headers,arrayBody)	
    .then((responseJson) => {


      if(responseJson.status=='ok'){
        Swal.fire('La Cuenta fue creada correctamente.');  

        this.setState({
          usuCorreo: '',
          usuPassword: '',
          usuPassword2: '',
          usuNombre: '',
          cliTelefono: '',
          cliRut: '',
          cliNombre: '',
          cliDireccion: '',
          cliGiro: '',
          tcuId:'2',
        });
 
      }else{
        Swal.fire(responseJson.mensaje); 
      }

    }).catch((error) =>{

      console.log(error);
    });	   


  }


  volverAlLogin = () => {
    this.props.history.push('/login')
  }




  render() {
    return (
      <div className="contenedor-out app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Regístrate en CausAlerta</h1>
                    <p className="text-muted">Crea tu cuenta</p>
                    <Row>




                    <Col xs="12">

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Plan CausAlerta
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="selectLg" id="selectLg"  value={this.state.tcuId} onChange={ e => {this.setState({tcuId:e.target.value})}}>
                      {
                        this.state.arregloPlanesVigentes.map((obj) => {
                          return (
                            <option value={obj.tcuId}>Plan: {obj.tcuNombre} ({obj.tcuMaxCausas} Causas simultáneas) </option>
                          );
                        })
                      }  
                    </Input>
                    </InputGroup>

                          </Col>
                    
                    
                    </Row>
                    
                    <Row>
                    <Col xs="6">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Nombre de cuenta*"  value={this.state.usuNombre} onChange={(event)=>{this.setState({ usuNombre : event.target.value })}}  />
                      </InputGroup>
                      </Col>
                      <Col xs="6">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-drivers-license-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="R.U.T.*" value={this.state.cliRut} onChange={(event)=>{this.setState({ cliRut : event.target.value })}}   />
                      </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Cliente/Razón Social*" value={this.state.cliNombre} onChange={(event)=>{this.setState({ cliNombre : event.target.value })}}  />
                    </InputGroup>
                    </Col>     
                    <Col xs="6">                   
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email*" value={this.state.usuCorreo} onChange={(event)=>{this.setState({ usuCorreo : event.target.value })}}  />
                    </InputGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Contraseña*" value={this.state.usuPassword} onChange={(event)=>{this.setState({ usuPassword : event.target.value })}}   />
                    </InputGroup>
                    </Col>
                    <Col xs="6">
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repite Contraseña*" value={this.state.usuPassword2} onChange={(event)=>{this.setState({ usuPassword2 : event.target.value })}}  />
                    </InputGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-location-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Dirección"  value={this.state.cliDireccion} onChange={(event)=>{this.setState({ cliDireccion : event.target.value })}}  />
                    </InputGroup>
                    </Col>
                    <Col xs="6"> 
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Teléfono" value={this.state.cliTelefono} onChange={(event)=>{this.setState({ cliTelefono : event.target.value })}}  />
                    </InputGroup> 
                    </Col>
                    </Row>
                    <Row>  
                    <Col xs="6">
                    <Button color="primary" onClick={this.volverAlLogin} block><i className="icon-logout"></i>  Volver al login</Button>
                    </Col>
                    <Col xs="6"> 
                    <Button color="success" onClick={this.crearUsuario} block>Crea tu cuenta!</Button>
                    </Col>
                    </Row>                 
                    <p></p>

                    <div style={{fontSize:11}} >Toda la información de las causas y sus movimientos son obtenidos del portal público del poder judicial, dependiente de la Corporación Administrativa del Poder Judicial. Causalerta sólo hace la búsqueda y procesamiento de información para que llegue a sus clientes de una forma clara y centralizada. La creación de cuentas es inmediata para cualquier tipo de cuenta, pero para las cuentas de pagadas hay 15 días para validar los datos de pago o la cuenta se convertirá en una cuenta de tipo gratuita. Cualquier consulta al correo de soporte o al Whatsapp/Celular +56 931207912. </div>
                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
