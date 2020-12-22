import React, { Component } from "react";
import  CausalertaUtil  from "../../../util/CausalertaUtil";
import Swal from 'sweetalert2'

class VerLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
     base64payload:"",
     cargando:false,
     resultado:"",
    };

 

  }

  getJsonFromUrl=(url) =>{

    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

	componentDidMount = () =>{


    let cod=this.props.location.search;
    //console.log(this.props.location.search);
    let objParametros=(this.getJsonFromUrl(cod));
   let body={};

    body={
      tipo_doc:objParametros.tipo_doc,
      id:objParametros.id,
    };


    this.setState({cargando:true});

    let util=new CausalertaUtil();   
    util.callApi("getLinkDocumento",{},body)	
    .then((responseJson) => {   
      if(responseJson.status=="ok"){
        this.setState({cargando:false,base64payload:responseJson.payload});
      }  


    }).catch((error) =>{
      console.error("Error en recuperar el reporte");
      console.log(error);
    });		



  
  
  }





  


  render() {
    if(this.state.cargando){
      return <div>Se está cargando el documento, espere un poco</div>
    }else{
      return  <div dangerouslySetInnerHTML={{__html: atob(this.state.base64payload)}} />
    }


    

  }
}

export default VerLink;
