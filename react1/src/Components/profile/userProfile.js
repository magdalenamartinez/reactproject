import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserData, setUserData } from '../funcionalidades/setUserData';
import CustomModal2 from '../funcionalidades/modal/custommodal2.js';
import '../../css/profile.css'
import { useNavigate } from 'react-router-dom';
import config from '../config.js';
function UserProfile() {
    const navigate = useNavigate();
    const [userData, setLocalUserData] = useState(null);
    const [url, setUrl] = useState("#");
    const [img, setImg] = useState("");
    const [fileName, setFile] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isStored, setStored] = useState(false);

    const getInfo = async(id, tableName) => {
        try {
            const response = await fetch(`${config.apiUrl}/infoRoute/get-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, table:tableName}),
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                   console.log(responseData.data);
                   setLocalUserData(responseData.data);
                }
            }
        } catch (error) {
            // Manejar errores
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const stored = async() => {
            const storedUserData = getUserData();
            if (storedUserData) {
                await getInfo(storedUserData.id, 'clientes');
            }
            setStored(true);
        }
        if (!isStored) {
            stored();
        }
    }, []);

    useEffect(() => {
        if (userData) {
            const fileName = userData.curriculumName;
            setFile(fileName);
            const url = userData.curriculum ? `${config.apiUrl}/download/${userData.curriculum}` : '';
            const srcImg = (userData.image) ? `${config.apiUrl}/uploads/${userData.image}` : "../images/user.png";
            
            setUrl(url);
            setImg(srcImg);
            setIsSearching(userData.active );

        }
    }, [userData]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
    };

    const handleDelete = () => {
        setShowPopUp(true);
    }

    const completeDelete = async() => {
        const response = await fetch(`${config.apiUrl}/deleteRoute/delete-data`, {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({id: userData.id, table: 'clientes'}),});
            if (response.ok) {
                localStorage.removeItem('userData');
                localStorage.setItem('deletedAccount', 'true');
                navigate('/');
            } else {
                console.log('Se ha producido un error');
                alert('Se ha producido un error al intentar eliminar la Cuenta. Vuelva a Intentarlo.');
            }
    }

    const handleBusquedaEmpleo = async() => {
        
        try {
            const response = await fetch(`${config.apiUrl}/clientRoute/change-active`, {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id: userData.id})
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                setIsSearching(prevState => !prevState);
            } else {
                console.log('error');
            }
          }
        } catch (error) {
          console.log('Se ha producido un error', error);
        }
    };

    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='contenedor'>
            <div className='profile'>
               <div className=' text_container'>
                <div className='bloque_profile color_background'>
                    <h1 className='title_container_big'>Perfil de {userData.user}</h1>
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
                            <h2 className='paragraph_big'>{userData.name}</h2>
                            <p className='paragraph'>Correo Electrónico:&nbsp;   {userData.correo}</p>
                            <p className='paragraph'>Teléfono:&nbsp;  {userData.tlf}</p>
                            <p className='paragraph'>Ciudad:&nbsp;  {userData.ciudad}</p>
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
                            <Link className="button_big" style={{height:'500px'}} to="/misFavoritos">Ver Ofertas de<br/> Trabajo Guardadas</Link>
                            <Link className="button_big" to='/estadisticasPerfil'>Estadísticas de<br/> Mi Cuenta</Link>
                        </div>
                        <div className='right'>
                        { (userData.curriculum !== '') && (
                            <Link className="button_big" id="linkDownload" to={`${url}?curriculumName=${userData.curriculumName}`}>Descargar Archivo</Link>
                        )}
                            <Link className="button_big" style={{height:'500px'}} to="/busquedadeempleo">Buscar<br/> Empleo</Link>
                            {(userData.video) && (
                                <video controls className="form_video" id="videoPlayer" src={userData.video?`${config.apiUrl}/uploads/${userData.video}`:''}></video>
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
                onClick={completeDelete}
            />
        </div>

    );

}

export default UserProfile; 