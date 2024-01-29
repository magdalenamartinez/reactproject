// registroempresa.js
import React from 'react';
import password_visibility from '../funcionalidades/password.js';
import limitartexto from '../funcionalidades/limitartexto.js';
import { tiposEmpresa, sectores, fields} from '../funcionalidades/load/loadempresa.js'
import { provincias} from '../funcionalidades/load/load.js'
import ValidateFormulary from '../funcionalidades/formulario.js';
import checkFolder from '../funcionalidades/checkUserName.js';
import change_postalcod from '../funcionalidades/postalcod/change_postalcod.js';
import change_provincia from '../funcionalidades/postalcod/codpostal.js';
import InputChange from '../funcionalidades/inputChange/inputChange.js';
import inputFunction from '../funcionalidades/inputChange/inputFunction.js';
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
import InputTextArea from './input/inputTextArea.js';
const {checkUserName, getExistsUser, checkMail, getExistsMail} = checkFolder;

function RegistroEmpresa() {
    const [deleteImage, setDeleteImage] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(false);
    const handleDeleteImage = () => {
        handle_delete_image();
        handle_delete_image_notedit();
        setDeleteImage(true);
    }
    const handleDeleteVideo = () => {
        const player = document.getElementById('videoPlayer');
        const deleteBotonVideo = document.getElementById('borrarvideo');
        const videoInput = document.getElementById('inputVideo');
        player.style.display= 'none';
        deleteBotonVideo.style.display= 'none';
        videoInput.value = '';
        setDeleteVideo(true);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fields).every((value) => value === true);
        
        if (areAllFieldsValid && getExistsUser() === false && getExistsMail() === false) {
            const form = document.getElementById('form_id');
            const formData = new FormData(form);
            try {
                const response = await fetch('https://backend-empleoinclusivo.onrender.com/enterpriseRoute/save-data2', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.success) {
                        localStorage.setItem('successRegistrationEnterprise', 'true');
                        window.location.href = '/';
                    }
                } else {
                    console.log("Se ha producido un error al intentar registrar al usuario");
                }
            } catch (error) {
                console.log('Se ha producido un error', error);
            }
            
        } else {
            alert('Compruebe que toda la información añadida es correcta.');
        }       
    }    

  return (
        <div className='contenedor margen'>
        <div className="formulario form_container_big" >
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
                        <InputValidation idName={"tlf"} typeInput={"text"}
                            errorText={"Su número de teléfono solo puede estar formado por números y como máximo tener 14 dígitos."}
                            textLabel={"Número de Teléfono"}/>
                        <div className="dir1">
                            <Select textLabel={"Provincia"} idName={"provincia"} mapName={provincias} onChange={()=>change_postalcod()} mini={"mini"}/>
                            <Input textLabel={"Código Postal"} idName={"codpostal"} required={true} onChange={() => change_provincia()} mini={"mini"}/> 
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
