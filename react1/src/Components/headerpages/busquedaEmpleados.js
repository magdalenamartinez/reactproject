import React, { useState, useEffect } from "react";
import Busqueda from "./busqueda";
import { getEnterpriseData } from "../funcionalidades/setEnterpriseData";
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import Image_Oferta from "./image_oferta";
import DescriptionCliente from "./description_cliente";
import DetailsButton from "./botones/botonDetalles";
import DetallesCliente from "./detallesCliente";
import FavButton from "./botones/botonFav";
import addFav from "../fav/misFavs";
import getFavs from "../fav/getFav";
import setDetallesById from "../fav/detalles";

function BusquedaEmpleados() {
    const [enterpriseExist, setEnterpriseExist] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [enterpriseData, setData] = useState(null);
    const [currentPagina, setCurrentPagina] = useState(1);
    const clientesPorPagina = 5;
    const currentClientes = indicesCalculados(currentPagina, clientesPorPagina, clientes);
    const [detalles, setDetalles] = useState({});
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);



    useEffect(() => {
        const chooseData = async () => {
          let data = localStorage.getItem('enterpriseData');
          if (data) {
            setEnterpriseExist(true);
            setData(getEnterpriseData());
          }
        };
      
        const getClientes = async () => {
          try {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/clientRoute/get-clientes', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
              const responseData = await response.json();
              if (responseData.success) {
                console.log("Datos de los clientes", responseData.data);
                setClientes(responseData.data);
                if (!fav) {
                  await getFavs(getEnterpriseData().id, 'favoritosempresa', setHeartState);
                  setFav(true);
                }
              }
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getClientes();
        chooseData();
      }, [fav]);

      const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)
      }
      if(!fav && !enterpriseData) {
      return(
        <div><h1>Cargando</h1></div>
      );}


    return(
        <div>
            <Busqueda/>
              <div className="contenedor">
              <ul className="ul_class">
                {currentClientes.length > 0? (
                  currentClientes.map((cliente) => (
                    <div key={cliente.id} className="redimensionar_bloque">
                        <li  key={cliente.id} className="bloque_view round_bloque" style={{listStyle:'none'}}>
                            <div className="leftright" style={{maxWidth:'100%'}}>
                                  <Image_Oferta oferta={cliente} imagenPorDefecto="/images/user.png"/>
                                  <DescriptionCliente cliente={cliente}/>
                                  <div className="right-little">
                                    <DetailsButton onClick={() => setDetallesById(cliente.id, setDetalles)}/>
                                    {enterpriseExist && <FavButton id="FavButton" onClick={()=>favHandle(enterpriseData.id, cliente.id, 'favoritosempresa')} classT={heartStates[cliente.id] ? 'heartClicked' : 'heart'}/>}
                                  </div>
                            </div>  
                        </li>
                        {detalles[cliente.id] && <DetallesCliente cliente={cliente}/>}
                    </div>
                )))
                :
                (<p>No hay Personas en Búsqueda de Empleo actualmente</p>)}
              </ul>
              <div className="form_group">
                  <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                  <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, clientesPorPagina, clientes)} disabled={currentPagina === Math.ceil(clientes.length / clientesPorPagina)}>Siguiente</button>
              </div>
            </div>
        </div>
    );
  }


export default BusquedaEmpleados;