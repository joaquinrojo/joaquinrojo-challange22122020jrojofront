import  SecurityUtilities  from './SecurityUtilities';
import  { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
var store = require('store');


class CausalertaUtil {

	constructor() {
    
   //this.rootApi="http://ec2-18-236-111-219.us-west-2.compute.amazonaws.com:8080/sistema/resources/resource";
	// this.rootApi="https://hypercube.cl:8181/sistema/resources/resource";
  this.rootApi="https://challange22122020jrojo.herokuapp.com";
  


    this.apis=[
      { nombre: 'findById', verbo: 'GET', url: "/externos/persona/{rut}",sinAuth:true },
    ]
    
    ;
  }
  

  login=function(objLogin){
		//objLogin.username=
    //objLogin.contrasena="";
    let sec=new SecurityUtilities();	
    let stringAuth=sec.getStringBasicLogin(objLogin.usuario,objLogin.contrasena);
    let authorization={digest:stringAuth};
    //store.set('usuarioCausalerta', objLogin.usuario);
    store.set('credenciales', {authorization});
	//	alert("LOGIN"+objLogin.usuario+"---------------Password"+objLogin.contrasena);
  }
  
  base64toBlob = (b64Data, contentType, sliceSize)=> {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: "application/vnd.ms-excel"
    });
    return blob;
  }

  logout=function(){
		store.set('credenciales', null);
	}
  
  getUsuarioLogged=function(){
    let stringAuth=this.getCredenciales();
    stringAuth=atob(stringAuth.replace("Basic ",""));
    
    let arr=stringAuth.split(":");
    console.log(arr[0]);
    return arr[0];  
  }

    getCredenciales=function(){

      let objCredenciales=store.get('credenciales');

		  return objCredenciales.authorization.digest;
  }	
  

  chequeaSession=function(){
      let objCredenciales=store.get('credenciales');
      if(objCredenciales==null){
        return false;
      }else{
      //  console.log(objCredenciales);
        return true;
      }
      
  }	
	
	


  buscaApiPorNombre = (stringNombre) =>{	
    for(let a=0;a<this.apis.length;a++){
      if(this.apis[a].nombre===stringNombre)
        return this.apis[a];
    }
  }  

  callApiLogin=function(username,_password){
    //Busco el endpoint
    let sec=new SecurityUtilities();	

    let stringAuth=sec.getStringBasicLogin(username,_password);
                
    //OJO
    let headersFinal={	
      'Authorization': stringAuth,			
    };

    let objApi=this.buscaApiPorNombre("login");


    return fetch(this.rootApi+objApi.url,
      {
          method: objApi.verbo,
          mode: 'cors',
          headers: headersFinal,
      })
      .then((response) => {
        if(response.status==200){
          console.log("logeo ok");
          return true;
        }else{
          console.log("logeo Falló");
          return false;
        }
      })
      .catch((error) =>{
        console.log('Ha ocurrido un error :'+error);
      });	        
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

     //   console.log("Api encontrada");
     //   console.log(verbo);


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

        if(objApi.verbo==="GET"){
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
            //Swal.fire('Ha ocurrido un error desconocido, revise su conexión a internet o contacte a soporte');  
            //console.log('Ha ocurrido un error en la llamada a '+idEndpoint+' Error:'+error);
          });	
        }else{
          return fetch(url,
            {
                method: objApi.verbo,
                mode: 'cors',
                headers: headersFinal,
                body:urlParams,
            })
            .then((response) => {
              //console.log(response);
              if(response.status==401){
                Swal.fire('No autorizado, cierre e inicie sesión nuevamente');  
              }else{
                return response.json()
              }
            })
            .then((responseJson) => {
              return (responseJson);
            })
            .catch((error) =>{
              Swal.fire('Ha ocurrido un error desconocido, revise su conexión a internet o contacte a soporte');  
              console.log('Ha ocurrido un error en la llamada a '+idEndpoint+' Error:'+error);
            });	
        }
    }

}

export default CausalertaUtil;

