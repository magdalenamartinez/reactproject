import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomModal2 from '../funcionalidades/modal/custommodal2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../funcionalidades/userContext';
import completeDelete from '../data/deleteProfile';
import getProfile from '../data/getProfile';
import Spinner from '../spinner';
import { useStyle } from '../styleContext';
function EnterpriseProfile() {
    const navigate = useNavigate();
    const [img, setImg] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [data, setData] = useState(null);
    const [isStored, setStored] = useState(false);

    const {userData, logout} = useUser();

    const handleDelete = () => {
        setShowPopUp(true);
    }

    
    useEffect(() => {
        const stored = async() => {
            if (userData && !data) {
                await getProfile(userData.id, 'empresas', setData, userData.token);
                setStored(true);
            }
        }
        if (!isStored) {
            stored();
        }
    }, [userData, data, isStored]);

    useEffect(() => {
        if (data) {
            const srcImg = (userData.image) ? `https://backend-empleoinclusivo.onrender.com/uploads/${data.image}` : "/images/user.png";
            setImg(srcImg);
        }
    }, [data, userData]);

    const confirmDelete = async() => {
        await completeDelete(userData.id, 'empresas', handleLogout);
     }

     const handleLogout = () => {
        logout();
        navigate("/");
    }; 

    const {style} = useStyle();
    
    const st = {
        botonContrastBig: style.highContrast ? 'botonBig_Contrast' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
        botonDark: style.darkMode ? 'botonBig_dark' : '',
      };

    if (!data) {
        return (<Spinner/>);
    }
    return(
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
                    </div>
                    <div className='right-big'>
                        <h2 className='paragraph_big'>{data.name}</h2>
                        <p className='paragraph'>Tipo de Empresa:&nbsp;   {data.tipo_empresa}</p>
                        <p className='paragraph'>Sector de la Industria:&nbsp;  {data.sector}</p>
                        <p className='paragraph'>Ubicación de la Empresa:&nbsp;  {data.provincia}, {data.codpostal}</p>
                    </div>
                </div>
                <div>
                    <Link className="link_container link_normal" to="/editarPerfilEmpresa" type='button'>
                    <span className='link-gradient'>Editar Perfil</span></Link>                        
                </div>
            </div>
            </div>
            <div className='bloque_profile'>
                <div className='leftright profilelr'>
                    <div className='left'>
                        {(data.video) && (
                                <video controls className="videoPresentacion form_video" id="videoPlayer" src={`https://backend-empleoinclusivo.onrender.com/uploads/${data.video}`}></video>
                        )}
                        <Link className={`button_big ${st.botonContrastBig} ${st.botonDark}`} style={{height:'500px'}} to="/ofertasCreadas">Ver Ofertas de<br/> Trabajo Creadas</Link>
                        <Link className={`button_big ${st.botonContrastBig} ${st.botonDark}`} style={{height:'500px'}} to='/buscarEmpleados'>Búsqueda de<br/>Empleados</Link>
                    </div>
                    <div className='right'>
                    <Link className={`button_big ${st.botonContrastBig} ${st.botonDark}`} to="/registroOfertaTrabajo">Crear Nueva Oferta<br/> de trabajo</Link>
                    <Link className={`button_big ${st.botonContrastBig}  ${st.botonDark}`} style={{height:'700px'}} to="/beneficiosInclusion">Beneficios de la<br/>Inclusión</Link>
                    <Link className={`button_big ${st.botonContrastBig} ${st.botonDark}`} to="/favoritosEmpresa">Ver Candidatos<br/>Guardados</Link>
                    </div>
                </div>
            </div>
            <div className='bloque_profile'>
                <button  onClick={handleLogout} className={`submit_button ${st.botonContrast}`} type='button'>Cerrar Sesión</button>
                <br/><br/>
                <button  onClick={handleDelete} className={`submit_button ${st.botonContrast}`} type='button'>Eliminar Cuenta</button>
            </div>  
            <CustomModal2
                isOpen={showPopUp}
                onClose={() => setShowPopUp(false)}
                title="Ha seleccionado la opción Eliminar Cuenta"
                paragraph="Atención: Se borrarán todos los datos de la Empresa y no podrá volver a acceder a la cuenta. 
                ¿Desea Continuar?"
                buttonText="Quiero Eliminar La Cuenta"
                onClick={confirmDelete}
            />
        </div>
    </div>

    )
};

export default EnterpriseProfile;