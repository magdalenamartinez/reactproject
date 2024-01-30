import React from "react";
import inputFunction from "../../funcionalidades/inputChange/inputFunction";
import InputChange2 from "../../funcionalidades/inputChange/inputChange2";

function Foto({handleDeleteImage, onChange, style, src}) {
    return(
        <div className="imagen dch">
            <label className="form_label" htmlFor="imageInput">Foto de Perfil</label>
            <input onChange={onChange} type="file" id="imageInput" name='imageInput' style={{display: 'none'}}/>
            <img className="form_img" src={src? src:"/images/uploadimage2.png"} id="imageShoww" alt=''/>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('imageInput')} className="form_button " id="boton_imagen">Cargar Imagen</button>
                </div>
                <div className="right">
                    <button type="button" style={style} onClick={handleDeleteImage} className="form_button " id="boton_imagen2">Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default Foto;