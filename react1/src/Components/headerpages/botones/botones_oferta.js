import React from "react";

function Botones_Oferta({ setDetallesById, oferta }) {
    return (
        <div className="right-little">
            {/*Modificar, Ver más, Publicar, Borrar*/}
            <span className="icon_class link_container_info">
                <i className="pencil fa-solid fa-pen"><span className="line"></span></i>
                <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Modifique su Oferta</span></div>
            </span>
            <span onClick={() => setDetallesById(oferta.id)} className="link_container_info">
                <i className="icon_class ver_mas fa-solid fa-plus"></i>
                <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Vea los Detalles de la Oferta</span></div>
            </span>
        </div>
    );
}


export default Botones_Oferta;