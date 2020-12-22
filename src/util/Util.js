import  SecurityUtilities  from './SecurityUtilities';
import  { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
var store = require('store');


class Util {

	constructor() {
		this.rootApi="https://challange22122020jrojo.herokuapp.com";

		this.apis=[
		  { nombre: 'findById', verbo: 'GET', url: "/externos/persona/{rut}",sinAuth:true },
		];
  }

  buscaApiPorNombre = (stringNombre) =>{	
    for(let a=0;a<this.apis.length;a++){
      if(this.apis[a].nombre===stringNombre)
        return this.apis[a];
    }
  }  

    callApi=function(idEndpoint,headers,body,urlParamsObj){
        //Busco el endpoint

        if(headers==null){
          headers={};
        }
        let objApi=this.buscaApiPorNombre(idEndpoint);

        let headersFinal={};        
        if(!objApi.sinAuth){ //Para endpoints públicos
     
        let stringAuth=this.getCredenciales();

                  
          //OJO
          headersFinal={	
            'Authorization': stringAuth,			
          };

          Object.assign(headersFinal,headers);
        }else{

          Object.assign(headersFinal,headers);          
        }


        let urlBase=objApi.url;
        let verbo=objApi.verbo;
        //Reemplazo con la ruta
        for (var key in urlParamsObj) {
          var valor = urlParamsObj[key];
          urlBase=urlBase.replace('{'+key
          +'}',valor);
        }
        let url='';
        var urlParams = "";

        if(verbo==="GET"){
          for (let [key, value] of Object.entries(body)) {
            urlParams += key + "=" + value + "&";
          }
          urlParams = urlParams.trim("&");
          if(urlParams!=""){
            url=this.rootApi+urlBase+'?'+urlParams;
          }else{
            url=this.rootApi+urlBase
          }
        }else{
          for (let [key, value] of Object.entries(body)) {
            urlParams += key + "=" + value + "&";
          }
          urlParams = urlParams.trim("&");
          url=this.rootApi+urlBase;
        }

          return fetch(url,
          {
              method: objApi.verbo,
              mode: 'cors',
              headers: headersFinal,
          })
          .then(
            (response) => {
              //console.log(response);
              if(response.status==401){
                Swal.fire('No autorizado, cierre e inicie sesión nuevamente');  
              }else{
                return response.json()
              }
            }
            )
          .then((responseJson) => {
            return (responseJson);
          })
          .catch((error) =>{

          });	

    }

}

export default Util;

