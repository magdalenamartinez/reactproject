import React from "react";
import Image_oferta from './image_oferta'
import Description_ofert from "./description_ofert";
import DetailsButton from "./botones/botonDetalles";
import FavButton from "./botones/botonFav";
import DetallesOferta from "../ofertasTrabajo/DetallesOferta";
import setDetallesById from "../fav/detalles";
import DetallesCliente from "./detallesCliente";
import { useNavigate } from 'react-router-dom';
import DescriptionCliente from "./description_cliente";
import EditButton from "./botones/botonEditar";
import PublishButton from "./botones/botonPublicar";
import DeleteButton from "./botones/botonEliminar";
import ApplyButtonNumClientes from "./botones/botonAplicarNumClientes";
import ApplyButton from "./botones/botonAplicar";
import OpenChat from "./botones/openchat";
function Bloque({currentData, setDetalles, heartStates, favHandle, userExist, detalles, userData, favTable, isOferta, isCliente, fav, deleteStates, publishStates, 
handleOperation, setShowPopUp, setOptionText, searchTerm, searchState, term, applyStates, applyHandle, solicitud}) {
    const navigate = useNavigate();
    
    const handleEditOferta = (idOferta) => {
        localStorage.setItem('idOferta', idOferta);
        navigate("/editOferta");
    }
    const handleSeeEmpleadosApply = (idOferta) => {
        navigate(`/solicitantesOferta/${idOferta}`);
    }
    const chatHandle = (idEmpresa,idCliente, user) => {
        const userType = userData.typeUser == 2? 'empresa':'user';
        navigate(`/chatEmpresaCliente/${idEmpresa}/${idCliente}/${user}/${userType}`);
    }
    return(
        <ul className="ul_class">
            {currentData.length > 0 ? (
                currentData.map((data) => (
                    (!fav || (fav && heartStates[data.id]) || (deleteStates && deleteStates[data.id] === false )) &&
                    (!searchState ||(searchTerm && searchState && data[term].toLowerCase().includes(searchTerm.toLowerCase()))) &&
                    <div key={data.id} className="redimensionar_bloque">
                        <li className="bloque_view round_bloque" style={{ listStyle: 'none' }}>
                            <div className="leftright" style={{ maxWidth: '100%' }}>
                                <Image_oferta oferta={data} imagenPorDefecto={ isCliente? "/images/user.png":"/images/uploadimage.png"}/>
                                {isOferta && <Description_ofert oferta={data} />}
                                {isCliente && <DescriptionCliente cliente={data} />}
                                <div className="right-little">
                                    {deleteStates &&
                                    <>
                                        <EditButton onClick={() => handleEditOferta(data.id)}/>
                                        <PublishButton onClick={() => {handleOperation(data.id, "publish");
                                        if (!publishStates[data.id]) {setOptionText("Publicar Oferta");} else {setOptionText("Dejar de Publicar Oferta");} setShowPopUp(true);}}
                                        iconClass={`fa-eye${publishStates[data.id] ? '' : '-slash'}`}/>
                                        <DeleteButton onClick={()=> {handleOperation(data.id, 'delete'); setShowPopUp(true); setOptionText("Eliminar Oferta");}}/> 
                                        <ApplyButtonNumClientes onClick={()=> {handleSeeEmpleadosApply(data.id)}} num={data.numApply}/> 
                                    </>
                                    }
                                <DetailsButton onClick={() => setDetallesById(data.id, setDetalles)}/>
                                {userExist && <FavButton id="FavButton" onClick={()=>favHandle(userData.id, data.id, favTable)} classT={heartStates[data.id] ? 'heartClicked' : 'heart'}/>}
                                {userExist && userData.typeUser === 1 && <ApplyButton id="FavButton" onClick={()=>applyHandle(userData.id, data.id)} classT={applyStates[data.id] ? 'applyClicked' : 'heart'}/>}
                                {userExist && solicitud && <OpenChat id="FavButton" onClick={()=>chatHandle(userData.id, data.id, data.user)} />}
                                </div>
                            </div>
                        </li>
                        {isOferta && detalles[data.id] && <DetallesOferta oferta={data} />}
                        {isCliente && detalles[data.id] && <DetallesCliente cliente={data}/>}
                    </div>
                ))
            ) : (
                (isOferta ? <p>No hay ofertas disponibles.</p> : null) ||
                (isCliente ? <p>No hay Personas en Búsqueda de Empleo actualmente</p> : null)
              )}
        </ul>
    );
}

export default Bloque;