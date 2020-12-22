import React, { Component } from "react";
import  CausalertaUtil  from "../../../util/CausalertaUtil";
import Swal from 'sweetalert2'

class VerDocumento extends Component {
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



   // let arreglo=cod.split("&");

   // let cau_id=(arreglo[0].replace("?cau_id=","")); //CAU_ID
    

    
   // let folio=(arreglo[1].replace("folio=","")); //FOLIO



   console.log(this.props.match.params);
   let body={};
   if(!objParametros.idDoc){
    body={cau_id:objParametros.cau_id,folio:objParametros.folio};

   }else{
    body={idDoc:objParametros.idDoc};
   }
   

    this.setState({cargando:true});

    let util=new CausalertaUtil();   
    util.callApi("getBase64File",{},body)	
    .then((responseJson) => {     
      //console.log(responseJson.payload);
      
      //this.setState({base64payload:responseJson.payload });

      if(responseJson.payload!="" && responseJson.payload!=null && responseJson.payload!="null"){
      var blob=util.base64toBlob(responseJson.payload,"application/pdf");
     // var blob = new Blob([tdData], { type: 'application/vnd.ms-excel' });
      if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
          window.navigator.msSaveOrOpenBlob(blob, 'documento' + new Date().toDateString() + '.pdf');
      }
      else {
          var a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(blob, { type: "application/pdf" });
          a.download = "documento" + new Date().toDateString() + "."+responseJson.extension;
          document.body.appendChild(a);
          a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
          document.body.removeChild(a);
      }
      this.setState({cargando:false,
        resultado:"El reporte fué generado, revise sus descargas"});
      }else{
        Swal.fire(
          'No encontrado',
          'No se pudo descargar el documento, los PDFS se descargan una vez al día',
          'error'
        )
        this.setState({cargando:false,
          resultado:'No se pudo descargar el documento, los PDFS se descargan una vez al día'});
      }

    }).catch((error) =>{
      console.error("Error en recuperar el reporte");
      console.log(error);
    });		



  
  
  }





  
 /*<div dangerouslySetInnerHTML={{__html: atob(this.state.base64payload)}} />*/

  render() {
    if(this.state.cargando){
      return <div>Se está cargando el documento, espere un poco</div>
    }else{
      return <div>{this.state.resultado}</div>
    }


    

  }
}

export default VerDocumento;
