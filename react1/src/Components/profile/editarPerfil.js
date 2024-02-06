// editarperfil.js
import ValidateFormulary from '../funcionalidades/formulario.js';
import { fieldsTrue } from '../funcionalidades/load/load.js';
import { useEffect, useState } from 'react';
import useInitialFormState from '../funcionalidades/initialForm/initialFormState.js';
import InfopersonalForm from './editarFunctions/infoPersonal.js';
import DireccionForm from './editarFunctions/direccionBloque.js';
import ExperienciaForm from './editarFunctions/experienciaBloque.js';
import EducacionForm from './editarFunctions/educacionBloque.js';
import handleChange from './funciones/handleChange.js';
import { Link } from 'react-router-dom';
import { handle_delete_image } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import Presentacion from './editarFunctions/presentacion.js';
import Ubicacion from './editarFunctions/Ubicacion.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../funcionalidades/userContext.js";
import getInfo from "../data/getAll.js";
import updateData from './updateData.js';
import deleteVideoFunction from './funciones/deleteVideo.js';
import Spinner from '../spinner.js';
import { useStyle } from '../styleContext.js';
import getProfile from '../data/getProfile.js';
function EditarPerfil() {
    const {userData, logout, updateUser} = useUser();
    const navigate = useNavigate();
    const [isStored, setStored] = useState(false);
    const [data, setData] = useState(null);

    const [modifiedFields, setModifiedFields] = useState({});
    const [formValues, setFormValues] = useInitialFormState(data);
    const [deleteCurriculum, setDeleteCurriculum] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);
    const [deleteImage, setDeleteImage] = useState(false);
    const handleLogout = () => {
        logout();
        navigate("/");
    }
  

    const handleDeleteVideo = () => {
        deleteVideoFunction(setDeleteVideo);
    }

    const handleDeleteImage = () => {
        handle_delete_image();
        setDeleteImage(true);
    }

    const handleDeleteCurriculum = () => {
        const deleteBotonCurriculum = document.getElementById('borrarCurriculum');
        const downloadLink = document.getElementById('linkDownload');
        deleteBotonCurriculum.style.display = 'none';
        downloadLink.style.display = 'none';
        setDeleteCurriculum(true);
    }

    function handleC(event) {
        handleChange(event, setFormValues, setModifiedFields);
    }



    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = document.getElementById('form_id');
        const formData = new FormData(form);

        formData.append('imageInput', formValues.imageInput);
        formData.append('videoInput', formValues.videoInput);
        formData.append('curriculumInput', formValues.curriculumInput);
        formData.append('deleteCurriculum', deleteCurriculum);
        formData.append('deleteImage', deleteImage);
        formData.append('deleteVideo', deleteVideo);
        formData.append('modifiedFields', JSON.stringify(modifiedFields));
        
        await updateData(formData, 'clientes', navigate);
        if (modifiedFields.password === true) {
            localStorage.setItem('successPasswordChange', 'true'); 
            handleLogout();
        }
        if (modifiedFields.imageInput === true) {
            let updatedUserData;
            if (formValues.image === null || formValues.image === '') {
                updatedUserData = { ...userData, image: null };
            } else {
                updatedUserData = { ...userData, image: formValues.image };
            }
            updateUser(updatedUserData);
        }
        
    };
    
    useEffect(() => {
        const stored = async() => {
            if (userData && !data) {
                await getInfo(userData.id, 'clientes', setData, userData.token);
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
   
    
  return (
  
        <div className='contenedor margen'>
            <Link className='back_link' to='/perfilUsuario'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className={`formulario form_container_big ${st.fondoContrast} ${st.fondoDark}`}>
                <div className='text_container'>
                    <h1 className="title_container_big">Editar Perfil de {data.user}</h1>
                    <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar editar el Perfil</p></div>
                    <form className='form_class_big' id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fieldsTrue)} encType='multipart/form-data'>
                        <InfopersonalForm userData={data} formValues={formValues} handleC={handleC} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage}/>
                        <DireccionForm userData={data} formValues={formValues} handleC={handleC} setFormValues={setFormValues}/>
                        <ExperienciaForm userData={data} formValues={formValues} handleC={handleC}/>
                        <EducacionForm userData={data} formValues={formValues} handleC={handleC} handleDeleteCurriculum={handleDeleteCurriculum} setDeleteCurriculum={setDeleteCurriculum}/>
                        <Presentacion userData={data} formValues={formValues} handleC={handleC} handleDeleteVideo={handleDeleteVideo} setDeleteVideo={setDeleteVideo}/>
                        <Ubicacion value={formValues.distancia} onChange={handleC} span={(formValues.distancia)}/>
                        <button type="submit" className='form_button'>Terminar Edición</button>
                        <Link className="form_button" style={{textDecoration: 'none', textAlign:'center'}} to="/perfilUsuario" type='button'>Cancelar Edición</Link>
                        <br />
                    </form>
                    <div id="results"></div>
                </div>
            </div>
        </div>
        
  );
};

export default EditarPerfil;
