import React from "react";


function Image_Oferta({oferta, imagenPorDefecto}) {
    if (!oferta) {
        return null; // o cualquier lógica para manejar la falta de oferta
      } else {
    return(
        
        <div className="left">
            <img className="form_img img_oferta" src={oferta.image ? `https://backend-empleoinclusivo.onrender.com/uploads/${oferta.image}` : imagenPorDefecto} alt="imagen" onError={(e) => {e.target.src = imagenPorDefecto;}}/>      
        </div>

)}}

export default Image_Oferta;