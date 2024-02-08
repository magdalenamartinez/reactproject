// Rutas.js

const getRoutesAndNavigation = (table) => {
    let route, navigation;
  
    if (table === 'empresas') {
      route = 'https://backend-empleoinclusivo.onrender.com/enterpriseRoute/update-data2';
      navigation = '/perfilEmpresa';
    } else if (table === 'clientes') {
      route = 'https://backend-empleoinclusivo.onrender.com/clientRoute/update-data';
      navigation = '/perfilUsuario';
    } else if (table === 'oferta_empleo'){
      route = 'https://backend-empleoinclusivo.onrender.com/ofertaRoute/save-data3';
      navigation = '/perfilEmpresa';
    } else if (table ==='oferta_empleo-edit'){
        route = 'https://backend-empleoinclusivo.onrender.com/ofertaRoute/update-data-oferta';
        navigation = '/ofertasCreadas';
    } else if (table ==='clientes_registro'){
      route = 'https://backend-empleoinclusivo.onrender.com/clientRoute/save-data';
      navigation = '/';
    } else if (table ==='empresas_registro'){
      route = 'https://backend-empleoinclusivo.onrender.com/enterpriseRoute/save-data2';
      navigation = '/';
    } else if (table === 'admin_registro') {
      route = 'https://backend-empleoinclusivo.onrender.com/adminRoute/register-admin';
      navigation = '/';
    }
  
    return { route, navigation };
  };
  
  export default getRoutesAndNavigation;
  