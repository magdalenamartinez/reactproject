import React from "react";
import inputFunction from "../../funcionalidades/inputChange/inputFunction";
import { useStyle } from "../../styleContext";
function Video({handleDeleteVideo, onChange, stylec, src, style_button}) {
    
    const {style} = useStyle();
    
    const st = {
        botonContrast: style.highContrast ? 'yellow_button' : '',
      };
    return(
        <div className="dch form_group">
            <input  onChange={onChange} id="inputVideo" name="videoInput" type='file' style={{display:'none'}} accept='video/*'/>
            <video src={src? src:''} className='form_video' controls id="videoPlayer" style={stylec}></video>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('inputVideo')} className={`form_button ${st.botonContrast}`} id="boton_video">Cargar Vídeo</button>
                </div>
                <div className="right" id="borrarvideo1">
                    <button id="borrarvideo" type="button" style={style_button} onClick={handleDeleteVideo} className={`form_button ${st.botonContrast}`}>Eliminar Vídeo</button>
                </div>
            </div>
           
        </div>
    );
}

export default Video;