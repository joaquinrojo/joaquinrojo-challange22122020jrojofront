export default {
  items: [
  
  /*
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
	*/
	{
      title: true,
      name: 'Mis Causas',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Mis Causas',
      url: '/causas',
      icon: 'icon-briefcase',
    },
    {
      name: 'Ingreso Causa',
      url: '/ingresoCausas',
      icon: 'icon-pencil',
    },
    /*
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        */	
        {
          name: 'Importar Causas ',
          url: '/importarCausas',
          icon: 'icon-magnifier-add',
          badge: {
            variant: 'success',
            text: 'New',
          },
        },
        {
          name: 'Seguimiento Diario',
          url: '/alerta',
          icon: 'icon-flag',
        },

        {
          name: 'Archivadas',
          url: '/archivadas',
          icon: 'icon-folder-alt',
        },

        {
          name: 'Excel Causas Civiles',
          url: '/reporte_civiles',
          icon: 'icon-book-open',
        },

        

        {
          title: true,
          name: 'Gestión',
          wrapper: {            // optional wrapper object
            element: '',        // required valid HTML5 element tag
            attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
          name: 'Gestión',
          url: '/gestion',
          icon: 'icon-target',
          badge: {
            variant: 'success',
            text: 'New',
          },
        }, 
        {
          name: 'Escritos Enviados',
          url: '/escritos_enviados',
          icon: 'icon-cursor',
          badge: {
            variant: 'success',
            text: 'New',
          },
        },      


        {
          name: 'Clientes',
          url: '/clientes',
          icon: 'icon-people',
          badge: {
            variant: 'info',
            text: 'Soon',
            
          }, 
        },

              
        {
          title: true,
          name: 'Rutificador',
          wrapper: {            // optional wrapper object
            element: '',        // required valid HTML5 element tag
            attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
          name: 'Naturales',
          url: '/rutificadorPersonas',
          icon: 'icon-user',
        },
        {
          name: 'Jurídicas',
          url: '/rutificadorEmpresas',
          icon: 'icon-home',
        },

        {
          title: true,
          name: 'Otros',
          wrapper: {            // optional wrapper object
            element: '',        // required valid HTML5 element tag
            attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
        }, 
        
        {
          name: 'Links de interes',
          icon: 'icon-cursor',
          children: [
            {
              name: 'Jurisprudencia (JurisChile) ',
              url: 'http://www.jurischile.com/?m=1',
              
              attributes: {target:"_blank"},    
    
            },
            {
              name: 'Receptores Chile',
              url: 'http://www.receptoreschile.cl/',
              
              attributes: {target:"_blank"},
            },
            {
              name: 'Publicaciones Facultad de derecho UdeChile',
              url: 'http://www.derecho.uchile.cl/publicaciones',
              
              attributes: {target:"_blank"},
            },
            {
              name: 'Baremo',
              url: 'http://baremo.poderjudicial.cl/BAREMOWEB/',
              
              attributes: {target:"_blank"},
            },   
          ],
        },
  ],
};
