import React from "react";
import inputFunction from "../../funcionalidades/inputChange/inputFunction";

function Video({handleDeleteVideo, onChange, style, src, style_button}) {
    return(
        <div className="dch form_group">
            <input  onChange={onChange} id="inputVideo" name="videoInput" type='file' style={{display:'none'}} accept='video/*'/>
            <video src={src? src:''} className='form_video' controls id="videoPlayer" style={style}></video>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('inputVideo')} className="form_button " id="boton_video">Cargar Vídeo</button>
                </div>
                <div className="right" id="borrarvideo1">
                    <button id="borrarvideo" type="button" style={style_button} onClick={handleDeleteVideo} className="form_button">Eliminar Vídeo</button>
                </div>
            </div>
           
        </div>
    );
}

export default Video;