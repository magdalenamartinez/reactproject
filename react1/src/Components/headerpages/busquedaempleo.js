// busquedadeempleo.js
import React, { useEffect, useState } from "react";
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import Busqueda from "./busqueda";
import addFav from "../fav/misFavs";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../funcionalidades/userContext.js';
import Spinner from "../spinner.js";
import getAllData from "../data/getAllData.js";
import Bloque from "./bloques.js";
import handleSearch from "./handleSearch.js";
function BusquedaDeEmpleo() {
    const navigate = useNavigate();
    const [currentPagina, setCurrentPagina] = useState(1);
    const [detalles, setDetalles] = useState({});
    const [userExist, setUserExist] = useState(false);
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);
    
    const [data, setData] = useState([]);
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [dataObtained, setObtainedData] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);

    const {userData} = useUser();

    useEffect(() => {
        const chooseData = async () => {
          if (userData && userData.typeUser === 1) {
            setUserExist(true);
          }
        };
        const getOffers = async() => {
          await getAllData(setData, fav, userData, setHeartState, setObtainedData, setFav,
            'https://backend-empleoinclusivo.onrender.com/ofertaRoute/get-all-ofertas', 'favoritos', navigate);
        }
        chooseData();
        getOffers();
      }, [fav, userData]);

      useEffect(()=> {
        if (dataObtained) {
          const valor = indicesCalculados(currentPagina, dataPorPagina, data);
          setNumDatos(data.length);
          setCurrentData(valor);
          setDatosObtenidosFinal(true);
        }
      }, [dataObtained, currentPagina])

      const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)
      }

      const handleSearchFunction = (value) => {
        handleSearch(value, setSearchState, setSearchTerm, 'titulo_oferta', setNumDatos, setCurrentData,
        setCurrentPagina, data);
      }

      if(!datosObtenidosFinal) {
        return(
          <Spinner/>
        );}


  return (
    <div>
        <Busqueda handleSearch={handleSearchFunction}/>
        <div className="contenedor">
          <Bloque currentData={currentData} setDetalles={setDetalles} heartStates={heartStates} favHandle={favHandle} userExist={userExist} detalles={detalles} userData={userData} favTable={'favoritos'} isOferta={true} searchTerm={searchTerm} searchState={searchState}
          term={'titulo_oferta'}/>
          <div className="form_group">
              <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
              <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, data)} disabled={currentPagina === Math.ceil(numDatos / dataPorPagina)}>Siguiente</button>
          </div>
        </div>
    </div>
  );

};

export default BusquedaDeEmpleo;
