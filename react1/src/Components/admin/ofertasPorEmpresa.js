import React, {useState, useEffect} from "react";
import Sidebar from "./sidebar";
import { useUser } from "../funcionalidades/userContext";
import getAllAdmin from "./getAllAdmin";
import BloqueAdmin from "./adminBloque.js";
import { indicesCalculados, nextPage, prevPage } from "../ofertasTrabajo/paginacion";
import Spinner from "../spinner.js";
import deleteData from "./deletedata.js";
import CustomModal2 from "../funcionalidades/modal/custommodal2.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function OfertasPorEmpresa() {
    const { empresaName, empresaId } = useParams();
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
        console.log(empresaName, empresaId);
        await getAllAdmin(userData, 'oferta_empleo-id', setData, setObtainedData, setDeleteStates, empresaId);
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
        await deleteData(id, userData, 'oferta_empleo');
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
            <div className="contenedor"> <h1>Ofertas de la Empresa "{empresaName}"</h1>
                <Link className='back_link' to='/adminEmpresas'><i className="fa-solid fa-circle-chevron-left"></i></Link>
                <BloqueAdmin currentData={currentData} setDetalles={setDetalles} detalles={detalles} isOferta={true} term={'titulo_oferta'} deleteStates={deleteStates} setShowPopUp={setShowPopUp} setIdToDelete={setIdToDelete}/>
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

export default OfertasPorEmpresa;