import React from 'react';
import { useEffect, useState } from 'react';
import { getEnterpriseData } from '../funcionalidades/setEnterpriseData.js';
import InputChange2 from '../funcionalidades/inputChange/inputChange2.js';
import inputFunction from '../funcionalidades/inputChange/inputFunction.js';
import { handle_delete_image, handle_delete_image_notedit } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import '../../css/oferta.css';
import DatosPrincipales from './Registro/DatosPrincipales.js';
import ImagenOferta from './Registro/ImagenOferta.js';
import Ubicacion from './Registro/Ubicacion.js';
import Calendario from './Registro/Calendario.js';
import Question from './Registro/Question.js';
import Requisitos from './Registro/Requisitos.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegistroOferta() {
    const navigate = useNavigate();
    const [enterpriseId, setEnterpriseId] = useState("");
    const [deleteImage, setDeleteImage] = useState(false);
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        const id = getEnterpriseData().id;
        if (!id) {
            handleExit();
        } else {
            setEnterpriseId(id);
        }
    }, []);

    const handleExit = () => {
        navigate("/");
    };


    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = document.getElementById('form_id');
        const formData = new FormData(form);
        formData.append('id_empresa', enterpriseId);
        try {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/ofertaRoute/save-data3', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    navigate('/perfilEmpresa');
                } else {
                    console.log('error', responseData.message);
                }
            } else {
                console.log("Se ha producido un error al intentar registrar la nueva oferta");
            }
        } catch (error) {

        }
    };

    const handleDeleteImage = () => {
        handle_delete_image();
        handle_delete_image_notedit();
    }

    function handleC(event) {

    }
    return(
        
        <div className="contenedor margen">
        <Link className='back_link' to='/perfilEmpresa'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className="formulario form_container_big" >
                <h1 className="title_container_big">Nueva Oferta de Empleo</h1>
                <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} action="/enterpriseRoute/save-data3" encType='multipart/form-data' method="post">
                    <div className="bloque_form" id="empresa">
                        <h1 className='title_container'>Datos Principales</h1>
                        <div className='comun'>
                           <DatosPrincipales handleC={handleC}/>
                           <ImagenOferta handleC={handleC} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage} InputChange2={InputChange2} inputFunction={inputFunction}/>
                        </div>
                    </div>
                    <Ubicacion setFormValues={setFormValues} handleC={handleC}/>
                    <Calendario handleC={handleC}/>
                    <div className='bloque_form'>
                            <h1 className='title_container'>Preguntas sobre Inclusividad</h1>
                            <Question handleC={handleC} questionText={'¿La Empresa tiene políticas inclusivas?'} idQuestion={'politicasInclusivas'}/>
                            <Question handleC={handleC} questionText={'¿Ofrecen instalaciones accesibles?'} idQuestion={'instalacionesAccesibles'}/>
                            <Question handleC={handleC} questionText={'¿La empresa fomenta la inclusividad hacia compañeros con discapacidad?'} idQuestion={'formacionInclusividad'}/>
                            <Question handleC={handleC} questionText={'¿Se ofrecen programas de mentoría o apoyo para empleados con discapacidad intelectual?'} idQuestion={'mentoresApoyo'}/>
                            <Question handleC={handleC} questionText={'¿El entorno de trabajo está adaptado para ser inclusivo para personas con discapacidad?'} idQuestion={'ambienteAdaptado'}/>
                    </div>
                    <Requisitos handleC={handleC}/>
                    &nbsp;
                    <button className="submit_button" type="submit">Terminar Creación de la Oferta</button>
                    <br/>
                </form>
            </div>
        </div>
    );
};

export default RegistroOferta;