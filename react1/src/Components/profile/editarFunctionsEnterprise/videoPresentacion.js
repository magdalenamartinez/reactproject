import React from "react";
import InputChange from "../../funcionalidades/inputChange/inputChange.js";
import Video from "../../login/registro/video.js";
const VideoPresentacion = ({ enterpriseData, handleC, handleDeleteVideo, setDeleteVideo}) => {
    return (
        <div className="bloque_form" id="presentacion">
            <h1 className="title_container">Vídeo de Presentación de la Empresa</h1>
            <Video handleDeleteVideo={handleDeleteVideo} onChange={(event) => { handleC(event); InputChange('inputVideo', 'videoPlayer'); setDeleteVideo(false);}}
            style={{display: enterpriseData.video ? 'initial' : 'none'}} style_button={{ display: enterpriseData.video ? 'block' : 'none' }}
            src={enterpriseData.video ? `http://localhost:5000/uploads/${enterpriseData.video}` : ''}/>
        </div>
        )
    };
    
    export default VideoPresentacion;