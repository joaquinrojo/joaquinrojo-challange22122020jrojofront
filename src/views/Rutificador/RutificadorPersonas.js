import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table ,Button,Collapse} from "reactstrap";
import  Util  from "../../util/Util";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import {
  FormGroup,
  Input,
  Label,
} from "reactstrap";


class RutificadorPersonas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rutBusqueda: "16282864-9",
      arregloResultado:[],
    };
  }


consulta=(tipoConsulta)=>{
  let util=new Util();
    var arrayBody =
    {
      "rut":this.state.rutBusqueda,
    };

    


    util.callApi("findById",{},{},arrayBody)	
    .then((responseJson) => {
      let arregloResultado=[];
      let respJson=(responseJson);
      if(respJson!=undefined){
        arregloResultado.push(respJson);
        this.setState({
        arregloResultado: arregloResultado,
        });
      }else{
        Swal.fire('No encontrado');  
        let arregloResultado=[];
        this.setState({
          arregloResultado: arregloResultado,
        });
      }
   // console.log(responseJson);




    }).catch((error) =>{
      Swal.fire('No encontrado');  
      let arregloResultado=[];
      this.setState({
        arregloResultado: arregloResultado,
      });
    });	   
}

	consultarPorRut = () =>{   
    this.consulta('rut');
  }



  renderTable = () => {
    return this.state.arregloResultado.map((value,index) => {
        return (
            <tr key={index}>  
                <td>{value.rut}</td>
                <td>{value.nombre}</td>
                <td>{value.apellido}</td>
                <td>{value.fecha_nac}</td>
            </tr>
        )
    })
}

  render() {
    return (
      <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Búsqueda</strong>
        </CardHeader>
      <CardBody>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label htmlFor="name">RUT </Label>
            <Input value={this.state.rutBusqueda} onChange={ e => {this.setState({ rutBusqueda : e.target.value });} } type="text" id="rut" placeholder="rut"  />
          </FormGroup>
        </Col>
      </Row>
      <Row> 
      <Col xs="12">
          <FormGroup>
          <Button onClick={() => {this.consultarPorRut()}} active block color="primary" aria-pressed="true">Consultar por rut</Button>
          </FormGroup>
        </Col>
      </Row>   
      </CardBody>
      </Card>
        <Row>
          <Col><Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Personas
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Rut</th>
                    <th>Nombre </th>
                    <th>Apellido</th>
                    <th>Fecha Nac</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderTable()}
                  </tbody>
                </Table>
              </CardBody>
              </Card>
            </Col>
        </Row>
      </div>
    );
  }
}

export default RutificadorPersonas;
