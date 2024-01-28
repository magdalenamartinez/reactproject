import React from "react";
import InputTextArea from "../../login/input/inputTextArea";
import Video from "../../login/registro/video";
import InputChange from "../../funcionalidades/inputChange/inputChange";

function Presentacion({userData, formValues, handleC, setDeleteVideo, handleDeleteVideo}) {
    return(
        <div className="bloque_form" id="presentacion">
            <h1 className="title_container">Sobre mi</h1>
            <div className="presentacion1 comun">
                <div className=" izq">
                    <InputTextArea textLabel={"Habilidades y Competencias"} idName={"habilidad"} area={'area1'} value={formValues.habilidad} onChange={handleC}/>
                    <InputTextArea textLabel={"Perfil Personal"} idName={"perfil"} area={'area2'} value={formValues.perfil} onChange={handleC}/>
                </div>
                <Video handleDeleteVideo={handleDeleteVideo} onChange={(event) => { handleC(event); InputChange('inputVideo', 'videoPlayer'); setDeleteVideo(false);}}
                style={{display: userData.video ? 'initial' : 'none'}} style_button={{ display: userData.video ? 'block' : 'none' }}
                src={userData.video ? `http://localhost:5000/uploads/${userData.video}` : ''}
                />
            </div>
        </div>
    );
}

export default Presentacion;