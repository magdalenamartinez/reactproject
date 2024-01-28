import React from "react";
import { useState, useEffect } from "react";
import addFav from "./misFavs";
import { prevPage, nextPage } from "../ofertasTrabajo/paginacion";
import DetailsButton from "../headerpages/botones/botonDetalles";
import { indicesCalculados } from "../ofertasTrabajo/paginacion";
import FavButton from "../headerpages/botones/botonFav";
import getFavsOfertas from "./getFavOfertas.js";
import setDetallesById from "./detalles.js";
import { getEnterpriseData } from "../funcionalidades/setEnterpriseData.js";
import Image_Oferta from "../headerpages/image_oferta.js";
import DetallesCliente from "../headerpages/detallesCliente.js";
import DescriptionCliente from "../headerpages/description_cliente.js";

function FavoritosEmpresa() {
    const [currentPagina, setCurrentPagina] = useState(1);
    const [clientes, setOfertas] = useState([]);
    const [detalles, setDetalles] = useState({});
    const [enterpriseExist, setUserExist] = useState(false);
    const [enterpriseData, setData] = useState(null);
    const clientesPorPagina = 5;
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);

    const currentClientes = indicesCalculados(currentPagina, clientesPorPagina, clientes);

    
    useEffect(() => {
        const chooseData = async () => {
          let data = localStorage.getItem('enterpriseData');
          if (data) {
            setUserExist(true);
            setData(getEnterpriseData());
            
          }
        };
      
        const getFavsFunction = async () => {
          try {
                if (!fav) {
                await getFavsOfertas(getEnterpriseData().id, 'favoritosempresa', 'clientes', setHeartState, setOfertas);
                setFav(true);
                }
          } catch (error) {
            // Manejar errores
            console.error('Error:', error);
          }
        };
        getFavsFunction();
        chooseData();
        console.log(clientes);
      }, [fav]);
      
    const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)
    }

    return (

        <div>
          <div className="contenedor">
          <ul className="ul_class">
            {currentClientes.length > 0? (
              currentClientes.map((cliente) => (
                heartStates[cliente.id] && 
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

export default FavoritosEmpresa;