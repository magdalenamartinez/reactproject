import React from "react";


function DetallesCliente({cliente}) {
    return(
        <div className="detalles_container">
            <h1 className="paragraph_label">Más Información</h1>
            <div className="leftright">
                {cliente.video &&
                    <div className="left">
                        <video controls className="form_video" id="videoPlayer" src={`https://backend-empleoinclusivo.onrender.com/uploads/${cliente.video}`}></video>
                    </div>
                }
                <div className="right">
                {cliente.educacion && <p className="paragraph_input">Educación: {cliente.educacion}</p>}
                {cliente.perfil && <p className="paragraph_input">Perfil: {cliente.perfil}</p>}
                {cliente.habilidad && <p className="paragraph_input">Habilidades: {cliente.habilidad}</p>}
                {(cliente.curriculum) && (cliente.curriculumName) && (cliente.curriculum !== '') && (
                    <a className="form_button" id="linkDownload" href={`https://backend-empleoinclusivo.onrender.com/download/${cliente.curriculum}?curriculumName=${cliente.curriculumName}`}>Descargar Curriculum</a>
                )}
                </div>
            </div>
        </div>
    );
}

export default DetallesCliente;