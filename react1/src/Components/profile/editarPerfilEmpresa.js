import React from "react";
import DatosGenerales from "./editarFunctionsEnterprise/datosGenerales.js";
import ValidateFormulary from '../funcionalidades/formulario.js';
import { fieldsTrue } from '../funcionalidades/load/load.js';
import useInitialFormEnterprise from '../funcionalidades/initialForm/initialFormEnterprise.js'
import { useState } from "react";
import handleChange from "./funciones/handleChange.js";
import DatosPersonales from "./editarFunctionsEnterprise/datosPersonales.js";
import Descripcion from "./editarFunctionsEnterprise/descripcion.js";
import { Link } from "react-router-dom";
import VideoPresentacion from "./editarFunctionsEnterprise/videoPresentacion.js";
import { handle_delete_image } from "../funcionalidades/handleDelete/handleDeleteImage.js";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useUser } from "../funcionalidades/userContext.js";
import getInfo from "../data/getAll.js";
import updateData from "./updateData.js";
import deleteVideoFunction from './funciones/deleteVideo.js';
import Spinner from "../spinner.js";
import { useStyle } from '../styleContext.js';


function EditarPerfilEmpresa() {
    const navigate = useNavigate();
    const {userData, logout} = useUser();
    const [data, setData] = useState(null);
    const [isStored, setStored] = useState(false);
    
    const [modifiedFields, setModifiedFields] = useState({});
    const [formValues, setFormValues] = useInitialFormEnterprise(data);
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
        deleteVideoFunction(setDeleteVideo);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    }
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = document.getElementById('form_id');
        const formData = new FormData(form);

        formData.append('imageInput', formValues.imageInput);
        formData.append('modifiedFields', JSON.stringify(modifiedFields));
        formData.append('deleteImage', deleteImage);
        formData.append('deleteVideo', deleteVideo);

        await updateData(formData, 'empresas', navigate);
        if (modifiedFields.password === true) {
            localStorage.setItem('successPasswordChange', 'true'); 
            handleLogout();
        }
    };

    useEffect(() => {
        const stored = async() => {
            if (userData && !data) {
                await getInfo(userData.id, 'empresas', setData, userData.token);
                setStored(true);
                setFormValues(data);
            }
        }
        if (!isStored) {
            stored();
        }
    }, [userData, data, isStored]);

    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'form_container_contrast' : '',
        fondoDark: style.darkMode ? 'form_container_dark' : '',
      };
    
      if (!formValues || !data) {
        return (
            <Spinner/>
        );
    }

    return(
        <div className="contenedor margen">
             <Link className='back_link' to='/perfilEmpresa'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className={`formulario form_container_big ${st.fondoContrast} ${st.fondoDark}`}>
                <div className="text_container">
                <h1 className="title_container_big">Editar Perfil de {data.user}</h1>
                <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar editar el Perfil</p></div>
                <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fieldsTrue)}encType='multipart/form-data'>
                    <DatosGenerales enterpriseData={data} formValues={formValues} handleC={handleC} setFormValues={setFormValues} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage}/>
                    <DatosPersonales enterpriseData={data} formValues={formValues} handleC={handleC} setFormValues={setFormValues} />
                    <Descripcion enterpriseData={data} formValues={formValues} handleC={handleC} setFormValues={setFormValues} />
                    <VideoPresentacion enterpriseData={data} handleC={handleC} handleDeleteVideo={handleDeleteVideo} setDeleteVideo={setDeleteVideo}/>
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
