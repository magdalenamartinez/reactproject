import React from "react";
import Image_oferta from '../headerpages/image_oferta.js'
import Description_ofert from '../headerpages/description_ofert.js'
import DetailsButton from "../headerpages/botones/botonDetalles.js";
import DetallesOferta from "../ofertasTrabajo/DetallesOferta.js";
import setDetallesById from "../fav/detalles.js";
import DetallesCliente from "../headerpages/detallesCliente.js";
import DescriptionCliente from "../headerpages/description_cliente.js";
import DeleteButton from "../headerpages/botones/botonEliminar.js";
import OfertasEmpresaButton from "../headerpages/botones/botonOfertasEmpresa.js";
function BloqueAdmin({currentData, isCliente, isEmpresa, isOferta, setDetalles, detalles, deleteStates, setShowPopUp, setIdToDelete, showOfertas}) {
    return(
        <ul className="ul_class">
        {currentData.length > 0 ? (
            currentData.map((data) => (
                (deleteStates && deleteStates[data.id] === false ) &&
                <div key={data.id} className="redimensionar_bloque">
                    <li className="bloque_view round_bloque" style={{ listStyle: 'none' }}>
                        <div className="leftright" style={{ maxWidth: '100%' }}>
                            <Image_oferta oferta={data} imagenPorDefecto={ isCliente? "/images/user.png":"/images/uploadimage.png"}/>
                            {isOferta && <Description_ofert oferta={data} />}
                            {isCliente && <DescriptionCliente cliente={data} />}
                            <div className="right-little">
                                {deleteStates &&
                                    <DeleteButton onClick={()=>{setShowPopUp(true);setIdToDelete(data.id)}} notext={true}/> 
                                }
                            <DetailsButton onClick={() => setDetallesById(data.id, setDetalles)} notext={true}/>
                            {isEmpresa && <OfertasEmpresaButton onClick={() => showOfertas(data.name, data.id)}/>}
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

export default BloqueAdmin;