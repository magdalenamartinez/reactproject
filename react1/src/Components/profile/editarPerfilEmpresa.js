import React from "react";
import DatosGenerales from "./editarFunctionsEnterprise/datosGenerales.js";
import {getEnterpriseData} from "../funcionalidades/setEnterpriseData.js";
import ValidateFormulary from '../funcionalidades/formulario.js';
import { fieldsTrue } from '../funcionalidades/load/load.js';
import useInitialFormEnterprise from '../funcionalidades/initialFormEnterprise.js'
import { useState } from "react";
import handleChange from "./editarFunctions/handleChange.js";
import DatosPersonales from "./editarFunctionsEnterprise/datosPersonales.js";
import Descripcion from "./editarFunctionsEnterprise/descripcion.js";
import { Link } from "react-router-dom";
import VideoPresentacion from "./editarFunctionsEnterprise/videoPresentacion.js";
import { handle_delete_image } from "../funcionalidades/handleDelete/handleDeleteImage.js";

function EditarPerfilEmpresa() {
    const enterpriseData = getEnterpriseData();

    const [modifiedFields, setModifiedFields] = useState({});
    const [formValues, setFormValues] = useInitialFormEnterprise(enterpriseData);
    const [deleteImage, setDeleteImage] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);

    function handleC(event) {
        handleChange(event, setFormValues, setModifiedFields);
    }

    const handleDeleteImage = () => {
        handle_delete_image();
        setDeleteImage(true);
    }

    const handleDeleteVideo = () => {
        const player = document.getElementById('videoPlayer');
        const deleteBotonVideo = document.getElementById('borrarvideo');
        player.style.display= 'none';
        deleteBotonVideo.style.display= 'none';
        setDeleteVideo(true);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = document.getElementById('form_id');
        const formData = new FormData(form);

        formData.append('imageInput', formValues.imageInput);
        
        formData.append('modifiedFields', JSON.stringify(modifiedFields));
        formData.append('deleteImage', deleteImage);
        formData.append('deleteVideo', deleteVideo);

        try {
            const response = await fetch('/enterpriseRoute/update-data2', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
              
                if (responseData.success) {
                    console.log("Datos de la Empresa", responseData);
                    localStorage.setItem('enterpriseData', JSON.stringify(responseData.dataNew));
                    window.location.href = '/perfilEmpresa';
                } else {
                    document.getElementById("messageError").classList.remove('hidden');
                }
            }
                
            } catch (error) {
                document.getElementById("messageError").classList.remove('hidden');
                console.error("Se ha producido un error: ", error);
            }
    };



    return(
        <div className="contenedor margen">
             <Link className='back_link' to='/perfilEmpresa'><i class="fa-solid fa-circle-chevron-left"></i></Link>
            <div className="formulario form_container_big">
                <div className="text_container">
                <h1 className="title_container_big">Editar Perfil de {enterpriseData.user}</h1>
                <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar editar el Perfil</p></div>
                <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fieldsTrue)} action="/enterpriseRoute/update-data2" encType='multipart/form-data' method="post">
                    <DatosGenerales enterpriseData={enterpriseData} formValues={formValues} handleC={handleC} setFormValues={setFormValues} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage}/>
                    <DatosPersonales enterpriseData={enterpriseData} formValues={formValues} handleC={handleC} setFormValues={setFormValues} />
                    <Descripcion enterpriseData={enterpriseData} formValues={formValues} handleC={handleC} setFormValues={setFormValues} />
                    <VideoPresentacion enterpriseData={enterpriseData} handleC={handleC} handleDeleteVideo={handleDeleteVideo} setDeleteVideo={setDeleteVideo}/>
                    <button className="form_button" type="submit">Terminar Edición</button>
                    <Link className="form_button" style={{textDecoration: 'none', textAlign:'center'}} to="/perfilEmpresa" type='button'>Cancelar Edición</Link>
                    <br/>
                </form>
                <div id="results"></div>
                </div>
            </div>
        </div>
    )
};

export default EditarPerfilEmpresa;
