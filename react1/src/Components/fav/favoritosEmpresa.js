import React from "react";
import { useState, useEffect } from "react";
import addFav from "./misFavs";
import { prevPage, nextPage } from "../ofertasTrabajo/paginacion";
import { indicesCalculados } from "../ofertasTrabajo/paginacion";
import getFavsOfertas from "./getFavOfertas.js";
import { useUser } from '../funcionalidades/userContext.js';
import Spinner from "../spinner.js";
import Bloque from "../headerpages/bloques.js";
import Busqueda from "../headerpages/busqueda.js";
import handleSearch from "../headerpages/handleSearch.js";
function FavoritosEmpresa() {
    const [currentPagina, setCurrentPagina] = useState(1);
    const [detalles, setDetalles] = useState({});
    const [enterpriseExist, setUserExist] = useState(false);
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);


    const [data, setData] = useState([]);
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);

    const {userData} = useUser();

    
    useEffect(() => {
      const chooseData = async () => {
        if (userData && userData.typeUser === 2) {
          setUserExist(true);
        }
      };
      
        const getFavsFunction = async () => {
          try {
              if (!fav) {
              await getFavsOfertas(userData.id, 'favoritosempresa', 'clientes', setHeartState, setData);
              setFav(true);
              }
          } catch (error) {
              console.error('Error:', error);
          }
        };
        if (userData) {
          getFavsFunction();
        }
        chooseData();
      }, [fav, userData]);

      useEffect(()=> {
        if (fav) {
          const valor = indicesCalculados(currentPagina, dataPorPagina, data);
          setNumDatos(data.length);
          setCurrentData(valor);
          setDatosObtenidosFinal(true);
        }
      }, [fav, currentPagina])
      
    const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)
    }

    const handleSearchFunction = (value) => {
      handleSearch(value, setSearchState, setSearchTerm, 'name', setNumDatos, setCurrentData,
      setCurrentPagina, data);
    }

    if(!enterpriseExist || !datosObtenidosFinal) {
      return(
        <Spinner/>
        );}
      
    return (

        <div>
          <Busqueda handleSearch={handleSearchFunction}/>
          <div className="contenedor">
          <Bloque currentData={currentData} setDetalles={setDetalles} heartStates={heartStates} favHandle={favHandle} userExist={enterpriseExist} detalles={detalles} userData={userData} favTable={'favoritosempresa'} isCliente={true} fav={true}
          term={'name'} searchTerm={searchTerm} searchState={searchState}/>
          <div className="form_group">
              <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
              <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, data)} disabled={currentPagina === Math.ceil(numDatos/ dataPorPagina)}>Siguiente</button>
          </div>
        </div>
    </div>
  );
}

export default FavoritosEmpresa;