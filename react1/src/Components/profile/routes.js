// Rutas.js

const getRoutesAndNavigation = (table) => {
    let route, navigation;
  
    if (table === 'empresas') {
      route = '/enterpriseRoute/update-data2';
      navigation = '/perfilEmpresa';
    } else if (table === 'clientes') {
      route = '/clientRoute/update-data';
      navigation = '/perfilUsuario';
    } else if (table === 'oferta_empleo'){
      route = '/ofertaRoute/save-data3';
      navigation = '/perfilEmpresa';
    } else if (table ==='oferta_empleo-edit'){
        route = '/ofertaRoute/update-data-oferta';
        navigation = '/ofertasCreadas';
    } else if (table ==='clientes_registro'){
      route = '/clientRoute/save-data';
      navigation = '/';
    } else if (table ==='empresas_registro'){
      route = '/enterpriseRoute/save-data2';
      navigation = '/';
    }
  
    return { route, navigation };
  };
  
  export default getRoutesAndNavigation;
  