import React, { useEffect, useState } from "react";
import DatosPrincipales from "./Registro/DatosPrincipales";
import ImagenOferta from "./Registro/ImagenOferta";
import Ubicacion from "./Registro/Ubicacion";
import Calendario from "./Registro/Calendario";
import Question from "./Registro/Question";
import Requisitos from "./Registro/Requisitos";
import { handle_delete_image} from "../funcionalidades/handleDelete/handleDeleteImage";
import InputChange2 from "../funcionalidades/inputChange/inputChange2";
import inputFunction from "../funcionalidades/inputChange/inputFunction";
import useInitialOfertState from "../funcionalidades/initialOfertstate.js";
import handleChange from "../profile/editarFunctions/handleChange";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditOferta() {
  const navigate = useNavigate();

  const [modifiedFields, setModifiedFields] = useState({});
  const [idOferta, setIdOferta] = useState(null);
  const [oferta, setOferta] = useState(null);
  const [ofertaData, setOfertaData] = useState(null);
  const [formValues, setFormValues] = useInitialOfertState(ofertaData);
  const [deleteImage, setDeleteImage] = useState(false);
  const [idOfertaObtained, setIdOfertaObtained] = useState(false);
  

  useEffect(() => {
    // Obtener el idOferta de localStorage
    const getOferta = async () => {
      try {
          const response = await fetch('https://backend-empleoinclusivo.onrender.com/ofertaRoute/get-one-oferta', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ id_oferta: idOferta }),
          });
          
          if (response.ok) {
              console.log('ok');
              const responseData = await response.json();
              console.log(responseData);
              if (responseData.success) {
                  console.log("Datos de la Oferta", responseData.data);
                  setOferta(responseData.data);
                  setOfertaData(responseData.data[0]);
                }

          }
      } catch (error) {
        console.log('Se ha producido un error ', error);
      }
  };
    const id = localStorage.getItem('idOferta');
    setIdOferta(id);
    if (idOferta && !idOfertaObtained) {
        setIdOfertaObtained(true);
        getOferta();
    }
  }, [idOferta, ofertaData, idOfertaObtained]);


function handleC(event) {
    handleChange(event, setFormValues, setModifiedFields);
}

const handleDeleteImage = () => {
  handle_delete_image();
  setDeleteImage(true);
}
const handleSubmit = async (event) => {
      event.preventDefault();
      const form = document.getElementById('form_id');
      const formData = new FormData(form);

      formData.append('imageInput', formValues.imageInput);
      formData.append('deleteImage', deleteImage);
      
      formData.append('modifiedFields', JSON.stringify(modifiedFields));
      formData.append('p1', ofertaData.politicasInclusivas === (null||-1)? 0:-1);
      formData.append('p2', ofertaData.instalacionesAccesibles=== (null||-1)? 0:-1);
      formData.append('p3', ofertaData.formacionInclusividad === (null||-1)? 0:-1);
      formData.append('p4', ofertaData.mentoresApoyo === (null||-1) ? 0:-1);
      formData.append('p5', ofertaData.ambienteAdaptado === (null||-1)? 0:-1);
      console.log( ofertaData.politicasInclusivas === (null||-1)? 0:-1)
      formData.append('id_oferta', ofertaData.id);

      try {
          const response = await fetch('https://backend-empleoinclusivo.onrender.com/ofertaRoute/update-data-oferta', {
              method: 'POST',
              body: formData,
          });
          if (response.ok) {
              const responseData = await response.json();
          
              if (responseData.success) {
                localStorage.removeItem('idOferta');
                navigate("/ofertasCreadas");
              } else {
                localStorage.removeItem('idOferta');
                console.log('Se ha producido un error al intentar editar la oferta');
                document.getElementById("messageError").classList.remove('hidden');
              }
          }
          
      } catch (error) {
          localStorage.removeItem('idOferta');
          document.getElementById("messageError").classList.remove('hidden');
          console.error("Se ha producido un error: ", error);
      }
};

const handleExit = () => {
  localStorage.removeItem('idOferta');
  navigate("/ofertasCreadas");
}

if (oferta === null) {
  return(
      <div>
          <h1>Cargando</h1>
      </div>
  )
}


  return (
    <div className="contenedor margen">
        <Link className='back_link' to='/ofertasCreadas'><i class="fa-solid fa-circle-chevron-left"></i></Link>
    <div className="formulario form_container_big" >
        <h1 className="title_container_big">Editar Oferta de Empleo</h1>
        <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar editar la Oferta</p></div>
        <form className="form_class_big" id="form_id" onSubmit= {handleSubmit} action="/ofertaRoute/update-data-oferta" encType='multipart/form-data' method="post">
            <div className="bloque_form" id="empresa">
                <h1 className='title_container'>Datos Principales</h1>
                <div className='comun'>
                   <DatosPrincipales handleC={handleC} inputTitle={ofertaData.titulo_oferta} inputDescription={ofertaData.descripcion_oferta} inputDate={new Date(ofertaData.fechaInicio).toISOString().split('T')[0]} inputSalary={ofertaData.salario}/>
                   <ImagenOferta handleC={handleC} handleDeleteImage={handleDeleteImage} setDeleteImage={setDeleteImage} imageValue={ofertaData.image? `http://localhost:5000/uploads/${ofertaData.image}`:'/images/uploadimage2.png'} InputChange2={InputChange2} inputFunction={inputFunction}/>
                </div>
            </div>
            <Ubicacion setFormValues={setFormValues} handleC={handleC} inputProvince={ofertaData.provincia} inputPostalCode={ofertaData.codpostal}/>
            <Calendario handleC={handleC} inputCalendar={ofertaData.calendarioEventos}/>
            <div className='bloque_form'>
                    <h1 className='title_container'>Preguntas sobre Inclusividad</h1>
                    <Question handleC={handleC} questionText={'¿La Empresa tiene políticas inclusivas?'} idQuestion={'politicasInclusivas'} valueCheck={ofertaData.politicasInclusivas === 0}/>
                    <Question handleC={handleC} questionText={'¿Ofrecen instalaciones accesibles?'} idQuestion={'instalacionesAccesibles'} valueCheck={ofertaData.instalacionesAccesibles === 0}/>
                    <Question handleC={handleC} questionText={'¿La empresa fomenta la inclusividad hacia compañeros con discapacidad?'} idQuestion={'formacionInclusividad'} valueCheck={ofertaData.formacionInclusividad === 0}/>
                    <Question handleC={handleC} questionText={'¿Se ofrecen programas de mentoría o apoyo para empleados con discapacidad intelectual?'} idQuestion={'mentoresApoyo'} valueCheck={ofertaData.mentoresApoyo === 0}/>
                    <Question handleC={handleC} questionText={'¿El entorno de trabajo está adaptado para ser inclusivo para personas con discapacidad?'} idQuestion={'ambienteAdaptado'} valueCheck={ofertaData.ambienteAdaptado === 0}/>
            </div>
            <Requisitos handleC={handleC} inputRequisitos={ofertaData.requisitosSolicitante}/>
            &nbsp;
            <button className="submit_button" type="submit">Terminar Edición</button>
            &nbsp;
            <button className="submit_button mini" type="button" onClick={handleExit}>Cancelar Edición</button>
            <br/>
        </form>
    </div>
  </div>  
  );
}

export default EditOferta;
