import React from "react";

function ImagenOferta({imageValue, InputChange2, inputFunction, handleC, handleDeleteImage, setDeleteImage}) {

    return(
        <div className="imagen dch">
            <label className="form_label" htmlFor="imageInput">Foto de la Oferta</label>
            <input onChange={(event) => {handleC(event); InputChange2('imageInput', 'imageShoww'); setDeleteImage(false);}} type="file" id="imageInput" name='imageInput' style={{display: 'none'}}/>
            <img className="form_img" src={imageValue? imageValue:'/images/uploadimage2.png'} id="imageShoww" alt=''/>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('imageInput')} className="form_button" id="boton_imagen">Cargar Imagen</button>
                </div>
                <div className="right">
                    <button type="button" style={{display: 'none'}} onClick={()=>handleDeleteImage()} className="form_button" id="boton_imagen2">Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default ImagenOferta;