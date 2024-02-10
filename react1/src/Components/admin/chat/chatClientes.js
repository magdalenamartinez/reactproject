import React, { useEffect, useState } from "react";
import ChatComponent from "./chatComponent";
import { useUser } from "../../funcionalidades/userContext";
import getConversationsAdmin from "./getConvAdmin";
import Spinner from "../../spinner";
import Sidebar from "../sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { indicesCalculados, nextPage, prevPage } from "../../ofertasTrabajo/paginacion";

function ChatClientes() {
    const [dataObtained, setDatos] = useState(false);
    const [currentPagina, setCurrentPagina] = useState(1);
    const [conversaciones, setConversaciones] = useState([]);    
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);
    const {userData} = useUser();
    const navigate = useNavigate();
    const { table,type } = useParams();
    const getConversaciones = async() => {
        await getConversationsAdmin(userData.id, userData.token, table, setConversaciones);
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
        if (dataObtained) {
        const interval = setInterval(() => {
            getConversaciones();
        }, 30000);
       
    return () => clearInterval(interval);}
    }, []);

    if (!datosObtenidosFinal) {
        return(<Spinner/>)
    }

    const handleConversation = (id, user) => {
        navigate(`/conversacionById/${id}/${type}/${user}`);
    }

    return(
        <div className="dashboard">
            <Sidebar/>
            <div className="contenedor">
                <ChatComponent conversaciones={conversaciones} handleConversation={handleConversation}/>
                <div className="form_group">
                    <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                    <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, conversaciones)} disabled={currentPagina === Math.ceil(numDatos / dataPorPagina)}>Siguiente</button>
            </div>
            </div>
        </div>
    );
}

export default ChatClientes;