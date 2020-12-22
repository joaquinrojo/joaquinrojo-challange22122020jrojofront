import React from 'react';
const RutificadorPersonas = React.lazy(() => import('./views/Rutificador/RutificadorPersonas'));
const routes = [
  { path: '/rutificadorPersonas', name: 'Rutificador Personas Naturales', component: RutificadorPersonas },
];
export default routes;
