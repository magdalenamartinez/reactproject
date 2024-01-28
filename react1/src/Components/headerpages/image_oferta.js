import React from "react";


function Image_Oferta({oferta, imagenPorDefecto}) {
    if (!oferta) {
        return null; // o cualquier lógica para manejar la falta de oferta
      } else {
    return(
        
        <div className="left">
            <img className="form_img img_oferta" src={oferta.image ? `http://localhost:5000/uploads/${oferta.image}` : imagenPorDefecto} alt="imagen de la oferta"/>      
        </div>

)}}

export default Image_Oferta;