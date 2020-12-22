import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import  CausalertaUtil  from "../../util/CausalertaUtil";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      activas:"",
      archivadas:"",
      ultimaActualizacionCredenciales:"",
      tieneClaveOJV:"",
      mensajeInicial:"",
      cargandoDashboard:true,
      cuenta:"",
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  componentDidMount = () =>{
    let util=new CausalertaUtil();   

    let cau_id=this.props.match.params.cau_id;
    this.state.cau_id=cau_id;
   // let cau_id='8485';
   
   this.setState({cargandoDashboard:true});

    util.callApi("getTotalCausas",{},{},{})	
    .then((responseJson) => {
      console.log("state:");    
      console.log(responseJson);
      
      this.setState({
        cargandoDashboard:false,
        cuenta:responseJson.cuenta,
        activas:responseJson.activas,
        archivadas:responseJson.archivadas, 
        ultimaActualizacionCredenciales:responseJson.fechaCambioClave, 
        tieneClaveOJV:responseJson.tieneClaveOJV,
        mensajeInicial:responseJson.mensajeInicial,

      }, function(){
      });
    }).catch((error) =>{
      console.error("Error en recuperar el detalle de la causa");
      console.log(error);
    });		


  }


  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  
  render() {
    
    let mensajeTieneClaveOJV="Cargando Dashboard";
    if(!this.state.cargandoDashboard){

    
    if(this.state.tieneClaveOJV){
      if(this.state.ultimaActualizacionCredenciales!=""){
        mensajeTieneClaveOJV="Clave OJV integrada. Última actualización: "+this.state.ultimaActualizacionCredenciales;
      }else{
        mensajeTieneClaveOJV="Clave OJV integrada";
      }

    }else{
      mensajeTieneClaveOJV="Clave OJV no integrada, ingresela en configuración de cuenta." 
    }
  }


    return (<div><h2>Bienvenido {this.state.cuenta} a CausAlerta</h2>
   <Row>
   <Col>

   <div dangerouslySetInnerHTML={{__html: this.state.mensajeInicial}} />

   <p>{mensajeTieneClaveOJV}</p> 
   </Col>

   </Row>

   <Row>


<Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.activas}</div>
                <div>Causas Activas</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
               
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">

                <div className="text-value">{this.state.archivadas}</div>
                <div>Causas Archivadas</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
               
              </div>
            </Card>
          </Col>
          </Row>
    </div>)
  }
}

export default Dashboard;
