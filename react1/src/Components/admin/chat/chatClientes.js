import React, { useEffect, useState } from "react";
import ChatComponent from "./chatComponent";
import { useUser } from "../../funcionalidades/userContext";
import getConversationsAdmin from "./getConvAdmin";
import Spinner from "../../spinner";
import Sidebar from "../sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { indicesCalculados, nextPage, prevPage } from "../../ofertasTrabajo/paginacion";
import deleteConversation from "./deleteConver";

function ChatClientes() {
    const [dataObtained, setDatos] = useState(false);
    const [currentPagina, setCurrentPagina] = useState(1);
    const [hideRead, SetHideRead] = useState(false);
    const [conversaciones, setConversaciones] = useState([]);    
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [deleteStates, setDeleteStates] = useState({});
    const [currentData, setCurrentData] = useState([]);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);
    const {userData} = useUser();
    const navigate = useNavigate();
    const { table,type } = useParams();
    const getConversaciones = async() => {
        await getConversationsAdmin(userData.id, userData.token, table, setConversaciones, setDeleteStates);
        setDatos(true);
    }   
    useEffect(()=> {
        if (!dataObtained && userData) {
            getConversaciones();
        }
    },[dataObtained, userData, table, type]);

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
        }, 10000);
       
    return () => clearInterval(interval);
    }, []);

    if (!datosObtenidosFinal) {
        return(<Spinner/>)
    }

    const handleConversation = (id, user) => {
        navigate(`/conversacionById/${id}/${type}/${user}`);
    }

    const deleteConver = async(id) => {
        await deleteConversation(id, 'chat_messages', setDeleteStates);
    }

    return(
        <div className="dashboard">
            <Sidebar/>
            <div className="contenedor">
                <p className="verLeidos" onClick={()=>SetHideRead(!hideRead)}>{hideRead? 'Mostrar Todos':'Mostrar Sólo Chats No Leídos'}</p>
                <ChatComponent conversaciones={conversaciones} handleConversation={handleConversation} deleteConversation={deleteConver} deleteStates={deleteStates} hide={hideRead? true:false}/>
                <div className="form_group">
                    <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                    <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, conversaciones)} disabled={currentPagina === Math.ceil(numDatos / dataPorPagina)}>Siguiente</button>
            </div>
            </div>
        </div>
    );
}

export default ChatClientes;