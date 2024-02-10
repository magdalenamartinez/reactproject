import React from 'react';
import { useEffect, useState } from 'react';
import InputChange2 from '../funcionalidades/inputChange/inputChange2.js';
import { handle_delete_image, handle_delete_image_notedit } from '../funcionalidades/handleDelete/handleDeleteImage.js';
import Foto from '../login/registro/foto.js';
import DatosPrincipales from './Registro/DatosPrincipales.js';
import Ubicacion from './Registro/Ubicacion.js';
import Calendario from './Registro/Calendario.js';
import Question from './Registro/Question.js';
import Requisitos from './Registro/Requisitos.js';
import { Link } from 'react-router-dom';
import { useUser } from '../funcionalidades/userContext.js';
import updateData from '../profile/updateData.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner.js';
import { useStyle } from '../styleContext.js';

function RegistroOferta() {
    const navigate = useNavigate();
    const [enterpriseId, setEnterpriseId] = useState("");
    const [formValues, setFormValues] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {userData} = useUser();

    useEffect(() => {
        if (userData) {
            if (userData.typeUser != 2) {
                handleExit();
            } else {
                setEnterpriseId(userData.id);
            }
        }
    }, [userData]);

    const handleExit = () => {
        navigate("/");
    };

    const handleSubmit = async(event) => {
        setLoading(true);
        event.preventDefault();
        const form = document.getElementById('form_id');
        const formData = new FormData(form);
        formData.append('id_empresa', enterpriseId);
        await updateData(formData, 'oferta_empleo', navigate);
        setLoading(false);
    };

    const handleDeleteImage = () => {
        handle_delete_image();
        handle_delete_image_notedit();
    }

    function handleC(event) {

    }

    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'form_container_contrast' : '',
        fondoDark: style.darkMode ? 'form_container_dark' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
      };

    if (!userData || isLoading) {
        return(
            <Spinner/>
        );
    }
    return(
        
        <div className="contenedor margen">
        <Link className='back_link' to='/perfilEmpresa'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className={`formulario form_container_big ${st.fondoContrast} ${st.fondoDark}`}>
                <h1 className="title_container_big">Nueva Oferta de Empleo</h1>
                <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar registrar la Oferta</p></div>
                <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} encType='multipart/form-data'>
                    <div className="bloque_form" id="empresa">
                        <h1 className='title_container'>Datos Principales</h1>
                        <div className='comun'>
                           <DatosPrincipales handleC={handleC} />
                           <Foto handleDeleteImage={handleDeleteImage}  styleFoto={{display: 'none'}} onChange={() => {InputChange2('imageInput', 'imageShoww'); }} textFoto={'Foto de la Oferta'}/>
                        </div>
                    </div>
                    <Ubicacion setFormValues={setFormValues} handleC={handleC} />
                    <Calendario handleC={handleC} />
                    <div className='bloque_form'>
                            <h1 className='title_container'>Preguntas sobre Inclusividad</h1>
                            <Question handleC={handleC} questionText={'¿La Empresa tiene políticas inclusivas?'} idQuestion={'politicasInclusivas'}/>
                            <Question handleC={handleC} questionText={'¿Ofrecen instalaciones accesibles?'} idQuestion={'instalacionesAccesibles'}/>
                            <Question handleC={handleC} questionText={'¿La empresa fomenta la inclusividad hacia compañeros con discapacidad?'} idQuestion={'formacionInclusividad'}/>
                            <Question handleC={handleC} questionText={'¿Se ofrecen programas de mentoría o apoyo para empleados con discapacidad intelectual?'} idQuestion={'mentoresApoyo'}/>
                            <Question handleC={handleC} questionText={'¿El entorno de trabajo está adaptado para ser inclusivo para personas con discapacidad?'} idQuestion={'ambienteAdaptado'}/>
                    </div>
                    <Requisitos handleC={handleC} />
                    &nbsp;
                    <button className={`submit_button ${st.botonContrast}`} type="submit">Terminar Creación de la Oferta</button>
                    <br/>
                </form>
            </div>
        </div>
    );
};

export default RegistroOferta;