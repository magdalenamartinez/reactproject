import React, { useEffect, useState } from "react";
import { indicesCalculados, nextPage, prevPage } from "./paginacion";
import CustomModal2 from "../funcionalidades/modal/custommodal2";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../funcionalidades/userContext.js';
import getOfertas from "./getOfertas.js";
import sendChangesToServer from "./sendChanges.js";
import Bloque from "../headerpages/bloques.js";
import Spinner from "../spinner.js";
function OfertasCreadas() {
    const navigate = useNavigate();
    const [currentPagina, setCurrentPagina] = useState(1);
    const [idEmpresa, setEnterpriseId] = useState("");
    const [ofertas, setOfertas] = useState([]);
    const [detalles, setDetalles] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [idOfertaOperation, setIdOfertaOperation] = useState(null);
    const [optionText, setOptionText] = useState("");
    const [action, setAction] = useState("");
    const [publishStates, setPublishStates] = useState({});
    const [deleteStates, setDeleteStates] = useState({});
    const ofertasPorPagina = 2;
    const {userData} = useUser();

    const getOffers = async() => {
        await getOfertas(idEmpresa, setOfertas, setPublishStates, setDeleteStates);
    }

    useEffect(() => {
        const handleExit = () => {
            navigate("/");
        };

        if (userData) {
            if (userData.typeUser === 1) {
                handleExit();
            } else {
                setEnterpriseId(userData.id);
                getOffers();
            }
        }
        
    }, [idEmpresa, userData]);

    let currentOfertas = indicesCalculados(currentPagina, ofertasPorPagina, ofertas);

    const handleOperation = (ofertaId, operation) => {
        setIdOfertaOperation(ofertaId);
        setAction(operation)
    }

    const handleConfirm  = async() => {
        setShowPopUp(false);
        if (action === 'delete' && idOfertaOperation) {
            setDeleteStates(prevStates => ({
                ...prevStates,
                [idOfertaOperation]: !prevStates[idOfertaOperation],
            }));
            await sendChangesToServer(idOfertaOperation, action, idEmpresa);
            await getOffers();
            currentOfertas = indicesCalculados(currentPagina, ofertasPorPagina, ofertas);
            setCurrentPagina(1);
        }else if (action === 'publish' && idOfertaOperation) {
            setPublishStates(prevStates => ({
                ...prevStates,
                [idOfertaOperation]: !prevStates[idOfertaOperation],
            }));
            await sendChangesToServer(idOfertaOperation, action, idEmpresa);
        }
    };

    const handleCancel = () => {
        setShowPopUp(false)
        setIdOfertaOperation(null);
    }
    if(!userData) {
        return(
          <Spinner/>
        );}

    return (
        <div className="contenedor">
            <Link className='back_link' to='/perfilEmpresa'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <h1 className="title_container">Ofertas Creadas</h1>
            <Bloque currentData={currentOfertas} setDetalles={setDetalles} detalles={detalles} userData={userData} favTable={'favoritos'} isOferta={true}
            deleteStates={deleteStates} publishStates={publishStates} handleOperation={handleOperation} setShowPopUp={setShowPopUp} setOptionText={setOptionText}/>
            <div className="form_group">
                <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, ofertasPorPagina, ofertas)} disabled={currentPagina === Math.ceil(ofertas.length / ofertasPorPagina)}>Siguiente</button>
            </div>
            <CustomModal2
                isOpen={showPopUp}
                onClose={() => setShowPopUp(false)}
                title={`Ha seleccionado la opción ${optionText}`}
                paragraph="¿Desea Continuar?"
                confirmText="Confirmar"
                onConfirm={handleConfirm}
                cancelText={"Cancelar"}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default OfertasCreadas;
