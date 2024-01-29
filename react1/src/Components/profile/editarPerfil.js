// editarperfil.js
import limitartexto from '../funcionalidades/limitartexto.js';
import ValidateFormulary from '../funcionalidades/formulario.js';
import RangoKm from '../funcionalidades/rangokm.js';
import inputFunction from '../funcionalidades/inputChange/inputFunction.js';
import InputChange from '../funcionalidades/inputChange/inputChange.js';
import { fieldsTrue } from '../funcionalidades/load/load.js';
import { getUserData, setUserData } from '../funcionalidades/setUserData.js';
import { useEffect, useState } from 'react';
import useInitialFormState from '../funcionalidades/initialFormState.js';
import InfopersonalForm from './editarFunctions/infoPersonal.js';
import DireccionForm from './editarFunctions/direccionBloque.js';
import ExperienciaForm from './editarFunctions/experienciaBloque.js';
import EducacionForm from './editarFunctions/educacionBloque.js';
import handleChange from './editarFunctions/handleChange.js';
import { Link } from 'react-router-dom';
import { handle_delete_image } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import Presentacion from './editarFunctions/presentacion.js';
import Ubicacion from './editarFunctions/Ubicacion.js';
function EditarPerfil() {
    const userData = getUserData();

    const [modifiedFields, setModifiedFields] = useState({});
    const [formValues, setFormValues] = useInitialFormState(userData);
    const [deleteCurriculum, setDeleteCurriculum] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);
    const [deleteImage, setDeleteImage] = useState(false);


    const handleDeleteVideo = () => {
        const player = document.getElementById('videoPlayer');
        const deleteBotonVideo = document.getElementById('borrarvideo');
        player.style.display= 'none';
        deleteBotonVideo.style.display= 'none';
        setDeleteVideo(true);
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
/*
    useEffect(()=>{
        const getAllInfo = async () => {
            try {
                const response = await fetch('/clientRoute/get-all-info', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  if (response.ok) {
                    const responseData = await response.json();
                    setUserData(responseData.data);
                  } else {
                    console.error('Error al obtener el perfil completo');
                  }

            } catch (error) {
                console.error("Se ha producido un error al intentar recuperar los datos de la DB: ", error);
            }
        }
        if ()
        getAllInfo();

    },[]);*/
    

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
            

            try {
                const response = await fetch('https://backend-empleoinclusivo.onrender.com/clientRoute/update-data', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const responseData = await response.json();
                
                    if (responseData.success) {
                        console.log("Datos del usuario", responseData);
                        localStorage.setItem('userData', JSON.stringify(responseData.dataNew));
                        window.location.href = '/perfilUsuario';
                    } else {
                        document.getElementById("messageError").classList.remove('hidden');
                    }
                }
                
            } catch (error) {
                console.error("Se ha producido un error: ", error);
                document.getElementById("messageError").classList.remove('hidden');
            }
    };
    
    if(!userData || userData==='') {
        return(
            <div>
                <h1>Cargando</h1>
            </div>
        )
        }

   
  return (
  
        <div className='contenedor margen'>
            <Link className='back_link' to='/perfilUsuario'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className="formulario form_container_big">
                <div className='text_container'>
                    <h1 className="title_container_big">Editar Perfil de {userData.user}</h1>
                    <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar editar el Perfil</p></div>
                    <form className='form_class_big' id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fieldsTrue)} action="/clientRoute/update-data" encType='multipart/form-data' method="post">
                        <InfopersonalForm userData={userData} formValues={formValues} handleC={handleC} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage}/>
                        <DireccionForm userData={userData} formValues={formValues} handleC={handleC} setFormValues={setFormValues}/>
                        <ExperienciaForm userData={userData} formValues={formValues} handleC={handleC}/>
                        <EducacionForm userData={userData} formValues={formValues} handleC={handleC} handleDeleteCurriculum={handleDeleteCurriculum} setDeleteCurriculum={setDeleteCurriculum}/>
                        <Presentacion userData={userData} formValues={formValues} handleC={handleC} handleDeleteVideo={handleDeleteVideo} setDeleteVideo={setDeleteVideo}/>
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
