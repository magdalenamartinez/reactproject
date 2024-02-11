import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomModal2 from '../funcionalidades/modal/custommodal2.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../funcionalidades/userContext.js';
import completeDelete from '../data/deleteProfile.js';
import handleActive from '../data/setActive.js';
import getProfile from '../data/getProfile.js';
import Spinner from '../spinner.js';
import { useStyle } from '../styleContext.js';
function UserProfile() {
    const navigate = useNavigate();

    const [url, setUrl] = useState("#");
    const [img, setImg] = useState("");
    const [fileName, setFile] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isStored, setStored] = useState(false);
    const [data, setData] = useState(null);

    const {userData, logout} = useUser();



    useEffect(() => {
        const stored = async() => {
            if (userData && !data) {
                await getProfile(userData.id, 'clientes', setData, userData.token);
                setStored(true);
            }
        }
        if (!isStored) {
            stored();
        }
    }, [userData, data, isStored]);

    useEffect(() => {
        if (data) {
            const fileName = data.curriculumName;
            setFile(fileName);
            const url = data.curriculum ? `https://backend-empleoinclusivo.onrender.com/download/${data.curriculum}?curriculumName=${data.curriculumName}` : '';
            const srcImg = (data.image) ? `https://backend-empleoinclusivo.onrender.com/uploads/${data.image}` : "../images/user.png";
            setUrl(url);
            setImg(srcImg);
            setIsSearching(data.active);
        }
    }, [data, userData]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleDelete = () => {
        setShowPopUp(true);
    }

    const confirmDelete = async() => {
       await completeDelete(userData.id, 'clientes', handleLogout);
    }

    const handleBusquedaEmpleo = async() => {
        await handleActive(userData.id, setIsSearching);
    };

    const {style} = useStyle();
    
    const st = {
        botonContrast: style.highContrast ? 'botonBig_Contrast' : '',
      };

    if (!data) {
        return <Spinner/>;
    }

    return (
        <div className='contenedor'>
            <div className='profile'>
               <div className=' text_container'>
                <div className='bloque_profile color_background'>
                    <h1 className='title_container_big'>Perfil de {data.user}</h1>
                   <div className='leftright profilelr'>
                        <div className='left'>
                        <div className="image-container">
                            <img className="image" src={img} alt="imagen de perfil" />
                        </div>
                        <div className='container_radio'>
                            <input id="searchRadio" className="radio_button"  onChange={handleBusquedaEmpleo} checked={isSearching} type="checkbox" />
                            <label htmlFor="searchRadio" className="form_label">En Búsqueda de Empleo</label>
                        </div>
                        </div>
                        <div className='right-big'>
                            <h2 className='paragraph_big'>{data.name}</h2>
                            <p className='paragraph'>Correo Electrónico:&nbsp;   {data.correo}</p>
                            <p className='paragraph'>Teléfono:&nbsp;  {data.tlf}</p>
                            <p className='paragraph'>Ciudad:&nbsp;  {data.ciudad}</p>
                        </div>
                    </div>
                    <div>
                        <Link className="link_container link_normal" to="/editarPerfil" type='button'>
                            <span className='link-gradient'>Editar Perfil</span></Link>                        
                    </div>
                </div>
                </div>
                <div className='bloque_profile'>
                    <div className='leftright profilelr'>
                        <div className='left'>
                            <Link className={`button_big ${st.botonContrast}`} style={{height:'500px'}} to="/misFavoritos">Ver Ofertas de<br/> Trabajo Guardadas</Link>
                            <Link className={`button_big ${st.botonContrastBig} ${st.botonDark}`} to="/conversaciones/user">Ver Conversaciones<br/>Con Empresas</Link>
                        </div>
                        <div className='right'>
                        { (data.curriculum !== '') && (
                            <Link className={`button_big ${st.botonContrast}`} id="linkDownload" to={`${url}`} onError={(e)=>e.target.to="#"}>Descargar Archivo</Link>
                        )}
                            <Link className={`button_big ${st.botonContrast}`} style={{height:'500px'}} to="/busquedadeempleo">Buscar<br/> Empleo</Link>
                            {(data.video) && (
                                <video controls className="form_video" id="videoPlayer" src={`https://backend-empleoinclusivo.onrender.com/uploads/${data.video}`}></video>
                            )}
                        </div>
                    </div>
                </div>
                <div className='bloque_profile'>
                <button  onClick={handleLogout} className="submit_button" type='button'>Cerrar Sesión</button>
                <br/><br/>
                <button  onClick={handleDelete} className="submit_button" type='button'>Eliminar Cuenta</button>
                </div>  
            </div>
            <CustomModal2
                isOpen={showPopUp}
                onClose={() => setShowPopUp(false)}
                title="Ha seleccionado la opción Eliminar Cuenta"
                paragraph="Atención: Se borrarán todos sus datos y no podrá volver a acceder a su cuenta. 
                ¿Desea Continuar?"
                buttonText="Quiero Eliminar Mi Cuenta"
                onClick={confirmDelete}
            />
        </div>

    );

}

export default UserProfile; 