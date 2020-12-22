import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table ,Button,Collapse} from "reactstrap";
//import Paginador from "../../util/Paginador";
import Pagination from "react-js-pagination";
import  CausalertaUtil  from "../../util/CausalertaUtil";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import {
  FormGroup,
  Input,
  Label,
} from "reactstrap";

/*
    let agnosArray = [
      {key: '',label: 'Seleccione Año'},{key: '2019',label: '2019'},{key: '2018',label: '2018'},{key: '2017',label: '2017'},
      {key: '2016',label: '2016'},{key: '2015',label: '2015'},{key: '2014',label: '2014'},
      {key: '2013',label: '2013'},{key: '2012',label: '2012'},{key: '2011',label: '2011'},{key: '2010',label: '2010'},
    ];*/

class ActualizaUsuario extends Component {
  constructor(props) {
    super(props);
    let arrValoresEscritosResolve=[];
    for(let i=0;i<=365;i++){
      arrValoresEscritosResolve[i]={key:i,label:i};
    }

    this.state = {
      usuAlertaCausasMovReceptor: "",
      usuAlertaCausasSinMovimiento:"",
      usuAlertaRangoEscritoResolver:"",
      usuAlertaRangoHistorias:"",
      usuCorreo:"",

      tcuId:"", //Plan seleccionado

      plan_actual:"",
      listaPlanesMejores:[],


      usuCorreoAuxiliar:"",


      usuEnviaExcelCiviles:"",
      usuNombre:"",
      usuRecibeNotificacionEmail:"",
      rangoMobsReceptor : [
        {key: '0',label: 'Por defecto'},{key: '1',label: '1'},{key: '2',label: '2'},{key: '3',label: '3'},
        {key: '4',label: '4'},{key: '5',label: '5'},{key: '6',label: '6'},{key: '7',label: '7'}
      ],
      rangoMobsHistorias : [
        {key: '0',label: 'Por defecto'},{key: '1',label: '1'},{key: '2',label: '2'},{key: '3',label: '3'},
        {key: '4',label: '4'},{key: '5',label: '5'},{key: '6',label: '6'},{key: '7',label: '7'}
      ],     
      arrValoresEscritosResolve:arrValoresEscritosResolve, 



      usuUsuarioFamilia:"",
      usuClaveFamilia:"",
      usuOrigenDatosFamilia:"ojv",      

    };

 

  }

	refreshCambioPlan = () =>{
    let util=new CausalertaUtil(); 

    util.callApi("getPlanesMejores",{},{})	
    .then((responseJson) => {

      let planes=responseJson.planes;
      planes.unshift({tcuId:'',tcuNombre:'Seleccione',tcuMaxCausas:''});
      this.setState({
        plan_actual:responseJson.planes_actual,
        listaPlanesMejores: planes,
        tcuId:''//Reseteo a plan seleccionado del formulario
      });
    }).catch((error) =>{
      console.error("Error en recuperar el detalle de la causa");
      console.log(error);
    });	
  }


	componentDidMount = () =>{
    let util=new CausalertaUtil();   
    util.callApi("getUsuario",{},{})	
    .then((responseJson) => {
      //console.log("state:");    
      //console.log(responseJson);
      
      this.setState(responseJson);
    }).catch((error) =>{
      console.error("Error en recuperar el detalle de la causa");
      console.log(error);
    });		


  this.refreshCambioPlan();
    


    util.callApi("getUsuarioCredenciales",{},{})	
    .then((responseJson) => {
     
      
      this.setState({
        usuUsuarioFamilia:responseJson.usuUsuarioFamilia,
        usuOrigenDatosFamilia:responseJson.usuOrigenDatosFamilia,
      });
    }).catch((error) =>{
      console.error("Error en recuperar el detalle de la causa");
      console.log(error);
    });	  
  
  }



  actualizar=(tipoConsulta)=>{
  let util=new CausalertaUtil();
  let headers={
    'Content-Type': 'application/x-www-form-urlencoded'
  };
    var arrayBody =
    {
      "correo":this.state.usuCorreo,
      "notificacion_email":this.state.usuRecibeNotificacionEmail,
      "muestra_causas_sin_movimiento":this.state.usuAlertaCausasSinMovimiento,
      "rango_dias_historia_causa":this.state.usuAlertaRangoHistorias,
      "rango_dias_movimiento_receptor":this.state.usuAlertaCausasMovReceptor,
      "rango_dias_escritos_resolver":this.state.usuAlertaRangoEscritoResolver,
      "envia_excel_civiles":this.state.usuEnviaExcelCiviles,
      "usuCorreoAuxiliar":this.state.usuCorreoAuxiliar,
      

    };

    util.callApi("actualizaUsuario",headers,arrayBody)	
    .then((responseJson) => {

      if(responseJson.status=='ok'){
        Swal.fire(responseJson.mensaje);	
      }else{
        Swal.fire('No pudo actualizar el usuario:'+responseJson.mensaje);	
      }
    //  });
    }).catch((error) =>{
      //console.error("La causa no pudo ser ingresada");
      console.log(error);
    });	   
}

actualizarCredenciales=()=>{
  let util=new CausalertaUtil();
  let headers={
    'Content-Type': 'application/x-www-form-urlencoded'
  };


    var arrayBody =
    {
      "usuUsuarioFamilia":this.state.usuUsuarioFamilia,
      "usuClaveFamilia":this.state.usuClaveFamilia,
      "usuOrigenDatosFamilia":this.state.usuOrigenDatosFamilia,
    };

    util.callApi("actualizaUsuarioCredenciales",headers,arrayBody)	
    .then((responseJson) => {

      if(responseJson.status=='ok'){
        Swal.fire(responseJson.mensaje);	
        this.setState({usuClaveFamilia:""});
      }else{
        Swal.fire('No pudo actualizar el usuario');	
      }
    //  });
    }).catch((error) =>{
      //console.error("La causa no pudo ser ingresada");
      console.log(error);
    });	   
}



actualizaPlan=()=>{
  
  if(this.state.tcuId==''){
    Swal.fire('Debe seleccionar un plan');
    return false;
  }
  
  let util=new CausalertaUtil();
  let headers={
    'Content-Type': 'application/x-www-form-urlencoded'
  };


    var arrayBody =
    {
      tcuId:this.state.tcuId,

    };

    util.callApi("actualizaPlan",headers,arrayBody)	
    .then((responseJson) => {

      if(responseJson.status=='ok'){
        Swal.fire(responseJson.mensaje);	
        this.refreshCambioPlan();
      }else{
        Swal.fire('No pudo actualizar el usuario');	
      }
    
      //  });
    }).catch((error) =>{
      //console.error("La causa no pudo ser ingresada");
      console.log(error);
    });	   
}



  renderTable = () => {
    return this.state.arregloResultado.map((value,index) => {
        return (
            <tr key={index}>  
                <td>{value.emp_rut}</td>
                <td>{value.emp_razon_social}</td>
            </tr>
        )
    })
}

  render() {
    return (
      <div className="animated fadeIn">
      <Card>
              <CardHeader>
              Administración Cuenta:  <strong> {this.state.usuNombre}</strong>
              </CardHeader>
      <CardBody>
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Recibe Notificación email</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuRecibeNotificacionEmail} onChange={(event)=>{this.setState({ usuRecibeNotificacionEmail : event.target.value });}}>
              <option value="si">Si</option>
              <option value="no">No</option>
				    </Input>
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Envia excel civiles en reporte</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuEnviaExcelCiviles} onChange={(event)=>{this.setState({ usuEnviaExcelCiviles : event.target.value });}}>
              <option value="si">Si</option>
              <option value="no">No</option>
				    </Input>
          
          </FormGroup>
        </Col>
      </Row>  
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Correo principal</Label>
            <Input value={this.state.usuCorreo} onChange={ e => {this.setState({ usuCorreo : e.target.value });} } type="text" id="nombrePrincipal" placeholder=""  />
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Rango Historias</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuAlertaRangoHistorias} onChange={(event)=>{this.setState({ usuAlertaRangoHistorias : event.target.value });}}>
          {
            this.state.rangoMobsHistorias.map((obj) => {
              return (
                <option value={obj.key}>{obj.label}</option>
              );
            })
          }
				</Input>



        
          
          </FormGroup>
        </Col>
      </Row>   
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Mov receptor</Label>
           
          <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuAlertaCausasMovReceptor} onChange={(event)=>{this.setState({ usuAlertaCausasMovReceptor : event.target.value });}}>
          {
            this.state.rangoMobsReceptor.map((obj) => {
              return (
                <option value={obj.key}>{obj.label}</option>
              );
            })
          }
				</Input>
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Excluir causas sin movimiento</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuAlertaCausasSinMovimiento} onChange={(event)=>{this.setState({ usuAlertaCausasSinMovimiento : event.target.value });}}>
              <option value="1">Si</option>
              <option value="0">No</option>
				    </Input>
          </FormGroup>
        </Col>
      </Row>   
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Rango Escritos por resolver</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuAlertaRangoEscritoResolver} onChange={(event)=>{this.setState({ usuAlertaRangoEscritoResolver : event.target.value });}}>
          {
            this.state.arrValoresEscritosResolve.map((obj) => {
              return (
                <option value={obj.key}>{obj.label}</option>
              );
            })
          }

				</Input>
          
          
          </FormGroup>
        </Col>
        
      

      <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Copia correo seguimiento (separados por comas)</Label>
            <Input value={this.state.usuCorreoAuxiliar} onChange={ e => {this.setState({ usuCorreoAuxiliar : e.target.value });} } type="text" id="correosauxiliares" placeholder=""  />
          </FormGroup>
        </Col>
        
      </Row>         
      <Row> 
      
      <Col xs="12">
          <FormGroup>
          <Button onClick={() => {this.actualizar()}} active block color="primary" aria-pressed="true">Actualizar</Button>
          </FormGroup>
        </Col>
      </Row> 

      </CardBody>
      </Card>







      <Card>
              <CardHeader>
              Cambio de plan
              </CardHeader>
      <CardBody>
 
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Plan Actual: </Label>
             {this.state.plan_actual.tcuNombre} ({this.state.plan_actual.tcuMaxCausas} Causas simultáneas) 
          </FormGroup>
        </Col>

      </Row>   

      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Plan nuevo</Label>
            <Input type="select" name="selectLg" id="selectLg"  value={this.state.tcuId} onChange={ e => {this.setState({tcuId:e.target.value})}}>
                      {
                        this.state.listaPlanesMejores.map((obj) => {
                          if(obj.tcuId==''){
                            return (
                              <option value={obj.tcuId}>Seleccione un plan</option>
                            );
                          } else{
                            return (
                              <option value={obj.tcuId}>Plan: {obj.tcuNombre} ({obj.tcuMaxCausas} Causas simultáneas) </option>
                            );
                          }


                        })
                      }  
                    </Input>
          </FormGroup>
        </Col>
        

      </Row>   
      <Row> 
      
      <Col xs="12">
          <FormGroup>
          <Button onClick={() => {this.actualizaPlan()}} active block color="primary" aria-pressed="true">Actualizar Plan</Button>
          </FormGroup>
        </Col>
      </Row> 

      </CardBody>
      </Card>


      <Card>
              <CardHeader>
              Administración Credenciales OJV
              </CardHeader>
      <CardBody>
 
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">RUT con puntos y guión </Label>
            <Input value={this.state.usuUsuarioFamilia} onChange={ e => {this.setState({ usuUsuarioFamilia : e.target.value });} } type="text" id="" placeholder=""  />
          </FormGroup>
        </Col>

      </Row>   

      <Row>
        <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Contraseña clave única</Label>
            <Input value={this.state.usuClaveFamilia} onChange={ e => {this.setState({ usuClaveFamilia : e.target.value });} } type="password" id="" placeholder="Ingrese contraseña para modificar"  />
          </FormGroup>
        </Col>

      </Row>   

      <Row>
       
      <Col xs="6">
          <FormGroup>
            <Label htmlFor="name">Origen</Label>
            <Input type="select" name="selectLg" id="selectLg"   value={this.state.usuOrigenDatosFamilia} onChange={(event)=>{this.setState({ usuOrigenDatosFamilia : event.target.value });}}>

                <option value="ojv">Oficina Judicial Virtual (OJV)</option>

				</Input>



        
          
          </FormGroup>
        
      </Col>
      </Row>
      



      <Row> 
      
      <Col xs="12">
          <FormGroup>
          <Button onClick={() => {this.actualizarCredenciales()}} active block color="primary" aria-pressed="true">Actualizar Credenciales OJV</Button>
          </FormGroup>
        </Col>
      </Row> 

      </CardBody>
      </Card>



      </div>
    );
  }
}

export default ActualizaUsuario;
