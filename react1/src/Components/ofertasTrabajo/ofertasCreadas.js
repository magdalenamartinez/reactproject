import React, { useEffect, useState } from "react";
import { getEnterpriseData } from "../funcionalidades/setEnterpriseData";
import { indicesCalculados, nextPage, prevPage } from "./paginacion";
import DetallesOferta from "./DetallesOferta";
import CustomModal2 from "../funcionalidades/modal/custommodal2";
import Image_Oferta from "../headerpages/image_oferta";
import Description_Oferta from "../headerpages/description_ofert";
import DetailsButton from "../headerpages/botones/botonDetalles";
import DeleteButton from "../headerpages/botones/botonEliminar";
import EditButton from "../headerpages/botones/botonEditar";
import PublishButton from "../headerpages/botones/botonPublicar";
import { Link } from 'react-router-dom';

function OfertasCreadas() {
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
    const ofertasPorPagina = 5;

    const sendChangesToServer = async () => {
        try {
           await fetch('/ofertaRoute/operation-ofertas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id:  idOfertaOperation, action: action}),
                });
              
            console.log('Datos enviados al Server');
        } catch {
            console.error('Error al enviar cambios al server');
        }
    };

    useEffect(() => {
        const handleExit = () => {
            window.location.href = "/";
        };
        
        const getOfertas = async () => {
            try {
                const response = await fetch('/ofertaRoute/get-ofertas', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id_empresa: idEmpresa }),
                });
                
                if (response.ok) {
                    console.log('ok');
                    const responseData = await response.json();
                    console.log(responseData);
                    if (responseData.success) {
                        console.log("Datos de las Ofertas", responseData.data);
                        setOfertas(responseData.data);
                        const initialPublishStates = responseData.data.reduce((acumulador, oferta) => {
                          acumulador[oferta.id] = oferta.publish;
                          return acumulador;
                        }, {});
                        setPublishStates(initialPublishStates);
                      
                        const initialDeleteStates = responseData.data.reduce((acumulador, oferta) => {
                          acumulador[oferta.id] = false;
                          return acumulador;
                        }, {});
                        setDeleteStates(initialDeleteStates);
                      }

                }
            } catch (error) {
                // Manejar errores
            }
        };
        const id = getEnterpriseData().id;
        if (!id) {
            handleExit();
        } else {
            setEnterpriseId(id);
            getOfertas();
        }
    }, [idEmpresa]);

    const setDetallesById = (ofertaId) => {
        //cierro los detalles
        setDetalles(prevDetalles => {
            const updatedDetalles = Object.keys(prevDetalles).reduce((acumulador, key) => {
                acumulador[key] = false;
                return acumulador;
              }, {});

              //abro los detalles de la oferta en cuestion
              updatedDetalles[ofertaId] =!prevDetalles[ofertaId];
              localStorage.setItem('ofertaDetallesId', ofertaId);

              return updatedDetalles;
        })
       
    };

    const currentOfertas = indicesCalculados(currentPagina, ofertasPorPagina, ofertas);
    const handleEditOferta = (idOferta) => {
        localStorage.setItem('idOferta', idOferta);
        window.location.href = "/editOferta";
    }

    const handleOperation = (ofertaId, operation) => {
        setIdOfertaOperation(ofertaId);
        setAction(operation)
    }

    function handleConfirm  () {
        setShowPopUp(false);
        if (action === 'delete' && idOfertaOperation) {
            // Actualiza el estado antes de la confirmación
            setDeleteStates(prevStates => ({
                ...prevStates,
                [idOfertaOperation]: !prevStates[idOfertaOperation],
            }));
            sendChangesToServer();
                        
        }else if (action === 'publish' && idOfertaOperation) {
            // Publica Oferta
            setPublishStates(prevStates => ({
                ...prevStates,
                [idOfertaOperation]: !prevStates[idOfertaOperation],
            }));
            console.log(idOfertaOperation);
            sendChangesToServer();
        }
    };

    const handleCancel = () => {
        setShowPopUp(false)
        //Para cancelar la edicion o la publicacion
        setIdOfertaOperation(null);
    }

    return (
        <div className="contenedor">
             <Link className='back_link' to='/perfilEmpresa'><i className="fa-solid fa-circle-chevron-left"></i></Link>
        <ul className="ul_class"> 
            <h1 className="title_container">Ofertas Creadas</h1>
            {currentOfertas.map((oferta) =>  {return deleteStates[oferta.id] === false && (
                <div  key={oferta.id} className="redimensionar_bloque">
                <li className="bloque_view round_bloque" style={{listStyle:'none'}}>
                    <div className="leftright" style={{maxWidth:'100%'}}>
                        <Image_Oferta oferta={oferta}/>
                        <Description_Oferta oferta={oferta}/>
                        <div className="right-little">
                            {/*Modificar, Ver más, Publicar, Borrar*/}
                            <EditButton onClick={() => handleEditOferta(oferta.id)}/>
                            <DetailsButton onClick={() => setDetallesById(oferta.id)}/>
                            <PublishButton onClick={() => {handleOperation(oferta.id, "publish"); 
                            if (!publishStates[oferta.id]) {setOptionText("Publicar Oferta");} else {setOptionText("Dejar de Publicar Oferta");} setShowPopUp(true);}}
                            iconClass={`fa-eye${publishStates[oferta.id] ? '' : '-slash'}`}/>
                            <DeleteButton onClick={()=> {handleOperation(oferta.id, 'delete'); setShowPopUp(true); setOptionText("Eliminar Oferta");}}/>
                           </div>
                    </div>
                </li> {detalles[oferta.id] && <DetallesOferta oferta={oferta}/>}
                </div>
           )})}
        </ul>
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
