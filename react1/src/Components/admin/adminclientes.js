import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { useUser } from "../funcionalidades/userContext";
import getAllAdmin from "./getAllAdmin";
import BloqueAdmin from "./adminBloque.js";
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import Spinner from "../spinner.js";
import deleteData from "./deletedata.js";
import CustomModal2 from "../funcionalidades/modal/custommodal2.js";

function AdminClientes() {
    const [currentPagina, setCurrentPagina] = useState(1);
    const [detalles, setDetalles] = useState({});
    const [data, setData] = useState([]);
    const dataPorPagina = 5;
    const [numDatos, setNumDatos] = useState(0);
    const [dataObtained, setObtainedData] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const [datosObtenidosFinal, setDatosObtenidosFinal] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const [deleteStates, setDeleteStates] = useState({});
    const {userData} = useUser();
    const getData = async() => {
        await getAllAdmin(userData, 'clientes', setData, setObtainedData, setDeleteStates);
    }
    useEffect(() => {
        getData();
      }, []);
    useEffect(()=> {

    if (dataObtained) {
        const valor = indicesCalculados(currentPagina, dataPorPagina, data);
        setNumDatos(data.length);
        setCurrentData(valor);
        setDatosObtenidosFinal(true);
    }
    }, [dataObtained, currentPagina])

    const handleDelete = async(id) => {
        setDeleteStates(prevStates => ({
            ...prevStates,
            [id]: !prevStates[id],
        }));
        await deleteData(id, userData, 'clientes');
        await getData();
        setCurrentData(indicesCalculados(currentPagina, dataPorPagina, data));
        setCurrentPagina(1);
    }

    const handleConfirm = () => {
        setShowPopUp(false);
        handleDelete(idToDelete);
    }

    const handleCancel = () => {
        setShowPopUp(false);
    }

    if(!datosObtenidosFinal) {
        return(
          <Spinner/>
        );}


    return(
        <div className="dashboard">
            <Sidebar/>
            <div className="contenedor">
                <BloqueAdmin currentData={currentData} setDetalles={setDetalles} detalles={detalles} isCliente={true} term={'titulo_oferta'} deleteStates={deleteStates} setShowPopUp={setShowPopUp} setIdToDelete={setIdToDelete}/>
                <div className="form_group">
                    <button className="form_button disabled_button" onClick={() => prevPage(currentPagina, setCurrentPagina)} disabled={currentPagina === 1}>Anterior</button>
                    <button className="form_button disabled_button" onClick={() => nextPage(currentPagina, setCurrentPagina, dataPorPagina, data)} disabled={currentPagina === Math.ceil(numDatos / dataPorPagina)}>Siguiente</button>
                </div>
            </div>
            <CustomModal2
                isOpen={showPopUp}
                onClose={() => setShowPopUp(false)}
                title={`¿Confirmar la Eliminación?`}
                confirmText="Sí"
                onConfirm={handleConfirm}
                cancelText={"No"}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default AdminClientes;