import React, { useState, useEffect } from "react";
import Busqueda from "./busqueda";
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import addFav from "../fav/misFavs";
import { useUser } from "../funcionalidades/userContext";
import Spinner from "../spinner";
import getAllData from "../data/getAllData.js";
import { useNavigate } from 'react-router-dom';
import Bloque from "./bloques.js";
import handleSearch from "./handleSearch.js";

function BusquedaEmpleados() {
  const navigate = useNavigate();

    const [enterpriseExist, setEnterpriseExist] = useState(false);
    const [currentPagina, setCurrentPagina] = useState(1);
    const [detalles, setDetalles] = useState({});
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);
    const {userData} = useUser();

    const [data, setData] = useState([]);
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [dataObtained, setObtainedData] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);
    

    useEffect(() => {
        const chooseData = async () => {
          if (userData && userData.typeUser === 2) {
            setEnterpriseExist(true);
          } else if (userData && userData.typeUser != 2) {
            navigate("/");
          }
        };
      
        const getClientes = async () => {
          await getAllData(setData, fav, userData, setHeartState, null, setObtainedData, setFav,
             'https://backend-empleoinclusivo.onrender.com/clientRoute/get-clientes' ,'favoritosempresa', navigate);
        }
        if (userData && userData.typeUser === 2) {
          getClientes();
        }
        chooseData();
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
        handleSearch(value, setSearchState, setSearchTerm, 'name', setNumDatos, setCurrentData,
        setCurrentPagina, data);
      }

      

      if(!fav || !enterpriseExist || !datosObtenidosFinal) {
      return(
        <Spinner/>
      );}


    return(
        <div>
            <Busqueda handleSearch={handleSearchFunction}/>
            <div className="contenedor">
              <Bloque currentData={currentData} setDetalles={setDetalles} heartStates={heartStates} favHandle={favHandle} userExist={enterpriseExist} detalles={detalles} userData={userData} favTable={'favoritosempresa'} isCliente={true} term={'name'}
              searchTerm={searchTerm} searchState={searchState}/>
              <div className="form_group">
                  <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                  <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, data)} disabled={currentPagina === Math.ceil(numDatos/ dataPorPagina)}>Siguiente</button>
              </div>
            </div>
        </div>
    );
  }


export default BusquedaEmpleados;