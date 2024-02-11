import React from "react";
import { useState, useEffect } from "react";
import { prevPage, nextPage } from "../ofertasTrabajo/paginacion";
import { indicesCalculados } from "../ofertasTrabajo/paginacion";
import { useUser } from '../funcionalidades/userContext.js';
import Spinner from "../spinner.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../admin/chat/chatComponent.js";
import getConversacionesApply from "./getConversaciones.js";
import deleteConversationApply from "./deleteApplyConver.js";
function Conversaciones() {
    const [dataObtained, setDatos] = useState(false);
    const [hideRead, SetHideRead] = useState(false);
    const [currentPagina, setCurrentPagina] = useState(1);
    const [conversaciones, setConversaciones] = useState([]);    
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [deleteStates, setDeleteStates] = useState({});
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);
    const {userData} = useUser();
    const navigate = useNavigate();
    const { type } = useParams();

    const getConversaciones = async() => {
        //si pongo type=empresa se recogen los id_selected que tengan ese id_empresa
        //si pongo type=cliente se recogen los id_empresa que tengan ese id_selected
        await getConversacionesApply(userData.id, type, setConversaciones, setDeleteStates);
        setDatos(true);
    }   
    useEffect(()=> {
        if (!dataObtained && userData) {
            getConversaciones();
        }
    },[dataObtained, userData, type]);

    useEffect(()=> {
        if (dataObtained) {
            const valor = indicesCalculados(currentPagina, dataPorPagina, conversaciones);
            setNumDatos(conversaciones.length);
            setCurrentData(valor);
            setDatosObtenidosFinal(true);
        }
    },[dataObtained, currentPagina]);

    useEffect(() => {
        const interval = setInterval(() => {
            getConversaciones();
        }, 30000);
       
    return () => clearInterval(interval);
    }, []);

    if (!datosObtenidosFinal||!userData) {
        return(<Spinner/>)
    }

    const handleConversation = (id, user) => {
        if (type === 'empresa') {//empresa/cliente/user/tipo
            navigate(`/chatEmpresaCliente/${userData.id}/${id}/${user}/${type}`);
        } else {
            navigate(`/chatEmpresaCliente/${id}/${userData.id}/${user}/${type}`);
        }
    }

    const deleteConver = async(id) => {
        await deleteConversationApply(id, userData.id, type, setDeleteStates);
    }
      
    return (

         <div className="contenedor">
                <p className="verLeidos" onClick={()=>SetHideRead(!hideRead)}>{hideRead? 'Mostrar Todos':'Mostrar Sólo Chats No Leídos'}</p>
                <ChatComponent conversaciones={conversaciones} handleConversation={handleConversation} deleteConversation={deleteConver} deleteStates={deleteStates} hide={hideRead? true:false}/>
                <div className="form_group">
                    <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                    <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, conversaciones)} disabled={currentPagina === Math.ceil(numDatos / dataPorPagina)}>Siguiente</button>
            </div>
            </div>
  );
}

export default Conversaciones;