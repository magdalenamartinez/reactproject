// registrousuario.js
import React, { useState } from 'react';
import password_visibility from '../funcionalidades/password';
import ValidateFormulary from '../funcionalidades/formulario';
import { fields, levels } from '../funcionalidades/load/load.js';
import checkFolder from '../funcionalidades/checkUserName.js';
import { handle_delete_image, handle_delete_image_notedit } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import Foto from './registro/foto.js';
import Input from './input/input.js';
import Curriculum from './registro/curriculum.js';
import InputTextArea from './input/inputTextArea.js';
import InputChange from '../funcionalidades/inputChange/inputChange.js';
import Video from './registro/video.js';
import Select from './input/select.js';
import { provincias } from '../funcionalidades/load/load.js';
import InputValidation from './input/InputValidation.js';
import Correo from './registro/correo.js';
import Usuario from './registro/usuario.js';
import InputChange3 from '../funcionalidades/inputChange/inputChange3.js';
import ErrorMessage from './registro/errorMessage.js';
import InputChange2 from '../funcionalidades/inputChange/inputChange2.js';
import { useNavigate } from 'react-router-dom';
import Ubicacion from '../profile/editarFunctions/Ubicacion.js';
import changePostalcod from '../profile/funciones/postalcod.js';
import changeProvincia from '../profile/funciones/provincia.js';
import updateData from '../profile/updateData.js';
import DeleteVideo from '../funcionalidades/handleDelete/handleDeleteVideo.js';
import DeleteCurriculum from '../funcionalidades/handleDelete/handleDeleteCurriculum.js';
import sendMail from '../funcionalidades/sendMail.js';
import { useStyle } from '../styleContext.js';
const { getExistsUser, getExistsMail, checkUserName, checkMail} = checkFolder;

function RegistroUsuario() {
    const navigate = useNavigate();

    const [deleteImage, setDeleteImage] = useState(false);
    const [deleteCurriculum, setDeleteCurriculum] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);
    
    const handleDeleteVideo = () => {
        DeleteVideo();
        setDeleteVideo(true);
    }

    const handleDeleteImage = () => {
        handle_delete_image();
        handle_delete_image_notedit();
        setDeleteImage(true);
    }

    const handleDeleteCurriculum = () => {
        DeleteCurriculum();
        setDeleteCurriculum(true);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fields).every((value) => value === true);
        
        if (areAllFieldsValid && getExistsUser() === false && getExistsMail() === false) {
            const form = document.getElementById('form_id');
            const formData = new FormData(form);
            try {
                 await updateData(formData, 'clientes_registro', navigate);
                localStorage.setItem('successRegistrationUser', 'true');
            } catch (error) {
                console.log('Se ha producido un error', error);
            }
        } else {
            alert('Compruebe que toda la información añadida es correcta.');
        }

    };

    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'form_container_contrast' : '',
        cont2: style.highContrast ? 'link-contrast' : '',
        fondoDark: style.darkMode ? 'form_container_dark':'',
        botonContrast: style.highContrast ? 'yellow_button' : '',
        bloqueContrast: style.highContrast ? 'bloque_contrast' : '',
      };
   
  return (
  
        <div className='contenedor margen'>
            <div className={`formulario form_container_big ${st.fondoContrast} ${st.fondoDark}`}>
            <div className='text_container'>
                <h1 className="title_container_big">Registro para Usuarios</h1>
                <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar registrar al Usuario</p></div>
                <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fields)} action="/clientRoute/save-data" encType='multipart/form-data' method="post">
                <div className={`bloque_form ${st.bloqueContrast}`} id="infopersonal">
                    <h1 className="title_container">Información Personal</h1>
                    <div className="infopersonal_bloque comun">
                        <div className="izq">
                            <Usuario readOnly={false} onInput={() => checkUserName('user', 'clientes')}/>
                            <InputValidation idName={"name"} big={"big"} typeInput={"text"}
                            errorText={"El nombre tiene que tener de 4 a 16 dígitos y contener únicamente letras, números y guión bajo."}
                            textLabel={"Nombre y Apellidos"}/>
                            <Correo onInput={() => checkMail('correo', 'clientes')} readOnly={false}/>
                            <InputValidation idName={"password"} textLabel={"Contraseña"} typeInput={"password"}
                            errorText={"La contraseña tiene que tener de 4 a 12 dígitos."} pas={'pas1'}
                            clickPassword={() => password_visibility('password', 'pas1')} password={true}                            
                            />
                            <InputValidation idName={"password2"} textLabel={"Confirmar Contraseña"} typeInput={"password"} pas={'pas2'}
                            errorText={"Las contraseñas tienen que ser iguales."}
                            clickPassword={() => password_visibility('password2', 'pas2')} password={true}                            
                            />
                            <InputValidation idName={"tlf"} typeInput={"tel"}
                            errorText={"Su número de teléfono solo puede estar formado por números y como máximo tener 14 dígitos."}
                            textLabel={"Número de Teléfono"}/>
                        </div>
                        <Foto handleDeleteImage={handleDeleteImage} style={{display: 'none'}} onChange={() => {InputChange2('imageInput', 'imageShoww'); }}/>
                    </div>
                    <ErrorMessage/>
                </div>
                <div className="bloque_form" id="direccion">
                    <h1 className="title_container">Dirección Actual</h1>
                    <Input textLabel={"Dirección"} idName={"calle"} required={true}/>
                    <br/>
                    <div className="dir1">
                        <Input textLabel={"Ciudad"} idName={"ciudad"} mini={"mini"} required={true}/>
                        <Select textLabel={"Provincia"} idName={"provincia"} mapName={provincias} onChange={()=>changePostalcod()} mini={"mini"}/>
                        <Input textLabel={"Código Postal"} idName={"codpostal"} required={true} onChange={() => changeProvincia()} mini={"mini"}/>                       
                    </div>
                </div>
                    <div className="bloque_form" id="experiencia_laboral">
                        <h1 className="title_container">Experiencia Laboral</h1>
                        <div className="experiencia" id ="exp">
                            <Input textLabel={"Posición Anterior"} idName={"posanterior"}/>
                            <div className="dir1">
                                <Input textLabel={"Empresa"} idName={"empresa"} mini={"mini"}/>
                                <Input textLabel={"Duración"} idName={"duracion"} mini={"mini"}/>
                            </div>
                        </div>
                    </div>
                    <div className="bloque_form" id="clase_educacion">
                        <h1 className="title_container">Educación</h1>
                        <Select textLabel={"Nivel de Educación Alcanzado"} idName={"nivel_educacion"} mapName={levels}/>
                        <div className="titulos comun">
                            <div className="titulos_academicos izq" id='titulos_ac'>
                                <Input textLabel={"Título Académico Obtenido"} idName={"titulo"}/>
                                <Input textLabel={"Institución"} idName={"institucion"}/>
                            </div>
                            <Curriculum handleDeleteCurriculum={handleDeleteCurriculum} onChange={() => InputChange3('curriculumInput', 'linkDownload')}
                            stylec={{display: 'none', textDecoration: 'none'}}
                            />
                        </div>
                    </div>
                    <div className="bloque_form" id="presentacion">
                        <h1 className="title_container">Sobre mi</h1>
                        <div className="presentacion1 comun">
                            <div className=" izq">
                                <InputTextArea textLabel={"Habilidades y Competencias"} idName={"habilidad"} area={'area1'}/>
                                <InputTextArea textLabel={"Perfil Personal"} idName={"perfil"} area={'area2'}/>
                            </div>
                            <Video handleDeleteVideo={handleDeleteVideo} onChange={() => InputChange('inputVideo', 'videoPlayer')}
                            stylec={{display: 'none'}} style_button={{ display: 'none' }}/>
                        </div>
                    </div>
                    <Ubicacion span={0}/>
                    <br/>
                    <button type="submit " className={`submit_button ${st.botonContrast}`}>Terminar Registro</button><br />
                </form>
                <div id="results"></div>
                </div>
            </div>
        </div>
  );
};

export default RegistroUsuario;
