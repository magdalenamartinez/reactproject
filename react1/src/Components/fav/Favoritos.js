import React from "react";
import { useState, useEffect } from "react";
import addFav from "./misFavs";
import { prevPage, nextPage } from "../ofertasTrabajo/paginacion";
import { getUserData } from "../funcionalidades/setUserData";
import DetailsButton from "../headerpages/botones/botonDetalles";
import DetallesOferta from "../ofertasTrabajo/DetallesOferta";
import { indicesCalculados } from "../ofertasTrabajo/paginacion";
import FavButton from "../headerpages/botones/botonFav";
import Description_ofert from "../headerpages/description_ofert";
import Image_oferta from "../headerpages/image_oferta";
import getFavsOfertas from "./getFavOfertas.js";
import setDetallesById from "./detalles.js";

function MisFavoritos() {
    const [currentPagina, setCurrentPagina] = useState(1);
    const [ofertas, setOfertas] = useState([]);
    const [detalles, setDetalles] = useState({});
    const [userExist, setUserExist] = useState(false);
    const [userData, setData] = useState(null);
    const ofertasPorPagina = 5;
    const [heartStates, setHeartState] = useState({});
    const [fav, setFav] = useState(false);

    const currentOfertas = indicesCalculados(currentPagina, ofertasPorPagina, ofertas);

    
    useEffect(() => {
        const chooseData = async () => {
          let data = localStorage.getItem('userData');
          if (data) {
            setUserExist(true);
            setData(getUserData());
            
          }
        };
      
        const getFavsFunction = async () => {
          try {
                if (!fav) {
                await getFavsOfertas(getUserData().id, 'favoritos', 'oferta_empleo',setHeartState, setOfertas);
                setFav(true);
                }
          } catch (error) {
            // Manejar errores
            console.error('Error:', error);
          }
        };
        getFavsFunction();
        chooseData();
        console.log(ofertas);
      }, [fav]);
      
    const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)

    }

    return (

            <div>
                <div className="contenedor">
                <ul className="ul_class">
                    {currentOfertas.length > 0 ? (
                        currentOfertas.map((oferta) => (
                            heartStates[oferta.id] &&
                            <div key={oferta.id} className="redimensionar_bloque">
                                <li className="bloque_view round_bloque" style={{ listStyle: 'none' }}>
                                    <div className="leftright" style={{ maxWidth: '100%' }}>
                                        <Image_oferta oferta={oferta} imagenPorDefecto={"/images/uploadimage.png"}/>
                                        <Description_ofert oferta={oferta} />
                                        <div className="right-little">
                                        <DetailsButton onClick={() => setDetallesById(oferta.id, setDetalles)}/>
                                        {userExist && <FavButton id="FavButton" onClick={()=>favHandle(userData.id, oferta.id, 'favoritos')} classT={heartStates[oferta.id] ? 'heartClicked' : 'heart'}/>}
                                        </div>
                                    </div>
                                </li>
                                {detalles[oferta.id] && <DetallesOferta oferta={oferta} />}
                            </div>
                        ))
                    ) : (
                        <p>No hay ofertas disponibles.</p>
                    )}
                </ul>
                <div className="form_group">
                    <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                    <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, ofertasPorPagina, ofertas)} disabled={currentPagina === Math.ceil(ofertas.length / ofertasPorPagina)}>Siguiente</button>
                </div>
                </div>
            </div>
  );
}

export default MisFavoritos;