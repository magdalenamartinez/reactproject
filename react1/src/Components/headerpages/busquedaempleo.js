// busquedadeempleo.js
import React, { useEffect, useState } from "react";
import '../../css/index.css';
import '../../css/buscarempleo.css';
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import DetallesOferta from "../ofertasTrabajo/DetallesOferta";
import Image_oferta from "./image_oferta";
import Description_ofert from "./description_ofert";
import DetailsButton from "./botones/botonDetalles";
import { getUserData } from "../funcionalidades/setUserData";
import FavButton from "./botones/botonFav";
import Busqueda from "./busqueda";
import addFav from "../fav/misFavs";
import getFavs from "../fav/getFav";
import setDetallesById from "../fav/detalles";
import { useNavigate } from 'react-router-dom';

function BusquedaDeEmpleo() {
    const navigate = useNavigate();
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
      
        const getOfertas = async () => {
          try {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/ofertaRoute/get-all-ofertas', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
      
            if (response.ok) {
              const responseData = await response.json();
              if (responseData.success) {
                console.log("Datos de las Ofertas", responseData.data);
                setOfertas(responseData.data);
                if (!fav) {
                    await getFavs(getUserData().id, 'favoritos', setHeartState);
                    setFav(true);
                  }
              } else {
                navigate("/");
              }
            }
          } catch (error) {
            // Manejar errores
            console.error('Error:', error);
          }
        };
          
        getOfertas();
        chooseData();
      }, [fav]);

      const favHandle = (id, select_id, table) => {
        addFav(id, select_id, table, setHeartState)
      }
      


  return (<div>
        <Busqueda/>
    
        <div className="contenedor">
    <ul className="ul_class">
        {currentOfertas.length > 0 ? (
            currentOfertas.map((oferta) => (
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

};

export default BusquedaDeEmpleo;
