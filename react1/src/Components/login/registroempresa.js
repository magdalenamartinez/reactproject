// registroempresa.js
import React from 'react';
import password_visibility from '../funcionalidades/password.js';
import { tiposEmpresa, sectores, fields} from '../funcionalidades/load/loadempresa.js'
import { provincias} from '../funcionalidades/load/load.js'
import ValidateFormulary from '../funcionalidades/formulario.js';
import checkFolder from '../funcionalidades/checkUserName.js';
import InputChange from '../funcionalidades/inputChange/inputChange.js';
import { useState } from 'react';
import InputChange2 from '../funcionalidades/inputChange/inputChange2.js';
import { handle_delete_image, handle_delete_image_notedit } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import Usuario from './registro/usuario.js';
import InputValidation from './input/InputValidation.js';
import Input from './input/input.js';
import Foto from './registro/foto.js';
import Correo from './registro/correo.js';
import Select from './input/select.js';
import ErrorMessage from './registro/errorMessage.js';
import Video from './registro/video.js';
import { useNavigate } from 'react-router-dom';
import InputTextArea from './input/inputTextArea.js';
import changePostalcod from '../profile/funciones/postalcod.js';
import changeProvincia from '../profile/funciones/provincia.js';
import updateData from '../profile/updateData.js';
import DeleteVideo from '../funcionalidades/handleDelete/handleDeleteVideo.js';
import { useStyle } from '../styleContext.js';
const {checkUserName, getExistsUser, checkMail, getExistsMail} = checkFolder;

function RegistroEmpresa() {
    const navigate = useNavigate();

    const [deleteImage, setDeleteImage] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);
    const handleDeleteImage = () => {
        handle_delete_image();
        handle_delete_image_notedit();
        setDeleteImage(true);
    }
    const handleDeleteVideo = () => {
        DeleteVideo();
        setDeleteVideo(true);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fields).every((value) => value === true);

        if (areAllFieldsValid && getExistsUser() === false && getExistsMail() === false) {
            const form = document.getElementById('form_id');
            const formData = new FormData(form);
            try {
                 await updateData(formData, 'empresas_registro', navigate);
                localStorage.setItem('successRegistrationEnterprise', 'true'); 
            } catch (error) {
                console.log('Se ha producido un error', error);
            }
        } else {
            alert('Compruebe que toda la información añadida es correcta.');
        }      
    }    

    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'form_container_contrast' : '',
        fondoDark: style.darkMode ? 'form_container_dark' : '',
        cont2: style.highContrast ? 'inputContrast' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
      };

  return (
        <div className='contenedor margen'>
        <div className={`formulario form_container_big ${st.fondoContrast} ${st.fondoDark}`} >
            <h1 className="title_container_big">Registro para Empresas</h1>
            <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fields)} action="/enterpriseRoute/save-data2" encType='multipart/form-data' method="post">
                <div className="bloque_form" id="empresa">
                    <h1 className="title_container">Datos Generales</h1>
                        <div className="comun">
                            <div className="izq">
                                <Usuario readOnly={false} onInput={() => checkUserName('user', 'empresas')} text={"Usuario de la Cuenta de Empresa"}/>
                                <InputValidation idName={"name"} big={"big"} typeInput={"text"}
                                errorText={"El nombre tiene que tener de 4 a 16 dígitos y contener únicamente letras, números y guión bajo."}
                                textLabel={"Nombre de la Empresa"}/>
                                <br/><br/><br/>
                                <Select textLabel={"Tipo de Empresa"} idName={"tipo_empresa"} mapName={tiposEmpresa}/>
                                <Select textLabel={"Sector de la Industria"} idName={"sector"} mapName={sectores}/>
                            </div>
                            <Foto handleDeleteImage={handleDeleteImage} style={{display: 'none'}} onChange={() => {InputChange2('imageInput', 'imageShoww'); }}/>
                        </div>
                    </div>
                    <div className="bloque_form" id="datos_personales">
                        <h1 className="title_container">Datos Privados</h1>
                        <Correo onInput={() => checkMail('correo', 'empresas')} readOnly={false}/>
                        <InputValidation idName={"password"} textLabel={"Contraseña"} typeInput={"password"}
                        errorText={"La contraseña tiene que tener de 4 a 12 dígitos."} pas={'pas3'}
                        clickPassword={() => password_visibility('password', 'pas3')} password={true}                            
                        />
                        <InputValidation idName={"password2"} textLabel={"Confirmar Contraseña"} typeInput={"password"} pas={'pas4'}
                        errorText={"Las contraseñas tienen que ser iguales."}
                        clickPassword={() => password_visibility('password2', 'pas4')} password={true}                            
                        />
                        <InputValidation idName={"tlf"} typeInput={"tel"}
                            errorText={"Su número de teléfono solo puede estar formado por números y como máximo tener 14 dígitos."}
                            textLabel={"Número de Teléfono"}/>
                        <div className="dir1">
                            <Select textLabel={"Provincia"} idName={"provincia"} mapName={provincias} onChange={()=>changePostalcod()} mini={"mini"}/>
                            <Input textLabel={"Código Postal"} idName={"codpostal"} required={true} onChange={() => changeProvincia()} mini={"mini"}/> 
                        </div>
                        <ErrorMessage/>
                    </div>
                    
                    <div className="bloque_form" id="descripcion_info">
                        <h1 className="title_container">Descripción y Cultura de la Empresa</h1>
                        <InputTextArea textLabel={"Descripción de la Empresa"} idName={"description"} area={'area3'}/>
                        <InputTextArea textLabel={"Cultura de Inclusión de la Empresa"} idName={"cultura"} area={'area4'}/>
                    </div>
                    <div className="bloque_form" id="presentacion">
                        <h1 className="title_container">Vídeo de Presentación de la Empresa</h1>
                        <label className="form_label" htmlFor="video">Si lo desea puede subir un vídeo que explique cómo funciona su Empresa</label>
                        <Video handleDeleteVideo={handleDeleteVideo} onChange={() => InputChange('inputVideo', 'videoPlayer')}
                            style={{display: 'none'}} style_button={{ display: 'none' }}/>
                    </div>
                    <button className="submit_button" type="submit">Terminar Registro de la Empresa</button>
                </form>
                <br/>
            </div>
        </div>
  );
};

export default RegistroEmpresa;
