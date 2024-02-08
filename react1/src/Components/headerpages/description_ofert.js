import React from "react";


function Description_Oferta({oferta}) {

    return(
        <div className="right-verybig">
            <h1 className="title_container" style={{margin: '0px'}}>{oferta.titulo_oferta}</h1>
            <div className="description_container">
                {oferta.nombre_empresa && <><p className="paragraph_label">Empresa {oferta.nombre_empresa}</p><br/></>}
                <p className="paragraph_label">Descripción: </p> 
                <p className="paragraph_input">{oferta.descripcion_oferta}</p>                                
            </div>
        </div>
        
)}

export default Description_Oferta;