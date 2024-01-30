import { Link } from 'react-router-dom';
import { getEnterpriseData } from '../funcionalidades/setEnterpriseData';
import { useEffect, useState } from 'react';
import CustomModal2 from '../funcionalidades/modal/custommodal2';
import { useNavigate } from 'react-router-dom';

function EnterpriseProfile() {
    const navigate = useNavigate();
    const [img, setImg] = useState("");
    const enterpriseData = getEnterpriseData();
    const [showPopUp, setShowPopUp] = useState(false);

    const handleDelete = () => {
        setShowPopUp(true);
    }

    useEffect(() => {
        const enterpriseData = getEnterpriseData();
        if (enterpriseData) {
            const srcImg = (enterpriseData.image) ? `https://backend-empleoinclusivo.onrender.com/uploads/${enterpriseData.image}` : "../images/user.png";
            setImg(srcImg);
        }
    }, [enterpriseData]);

    const completeDelete = async() => {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/deleteRoute/delete-data', {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({id: enterpriseData.id, table: 'empresas'}),});
            if (response.ok) {
                localStorage.removeItem('enterpriseData');
                localStorage.setItem('deletedAccount', 'true');
                navigate('/');
                //FALTA POPUP
            } else {
                console.log('Se ha producido un error');
                alert('Se ha producido un error al intentar eliminar la Cuenta. Vuelva a Intentarlo.');
            }
    }
    
    const handleLogout = () => {
        localStorage.removeItem('enterpriseData');
        // Redirigir a la página de inicio u otra página después del logout
        navigate('/'); // Cambia '/' con la ruta deseada
      };  

    if (!enterpriseData) {
        return <div>Cargando...</div>;
    }
    return(
        <div className='contenedor'>
        <div className='profile'>
        <div className=' text_container'>
           <div className='bloque_profile color_background'>
                <h1 className='title_container_big'>Perfil de {enterpriseData.user}</h1>
               <div className='leftright profilelr'>
                    <div className='left'>
                    <div className="image-container">
                            <img className="image" src={img} alt="imagen de perfil" />
                        </div>
                    </div>
                    <div className='right-big'>
                        <h2 className='paragraph_big'>{enterpriseData.name}</h2>
                        <p className='paragraph'>Tipo de Empresa:&nbsp;   {enterpriseData.tipo_empresa}</p>
                        <p className='paragraph'>Sector de la Industria:&nbsp;  {enterpriseData.sector}</p>
                        <p className='paragraph'>Ubicación de la Empresa:&nbsp;  {enterpriseData.provincia}, {enterpriseData.codpostal}</p>
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
                        {(enterpriseData.video) && (
                                <video controls className="videoPresentacion" id="videoPlayer" src={`https://backend-empleoinclusivo.onrender.com/uploads/${enterpriseData.video}`}></video>
                        )}
                        <Link className="button_big" style={{height:'500px'}} to="/ofertasCreadas">Ver Ofertas de<br/> Trabajo Creadas</Link>
                        <Link className="button_big" to='/estadisticasPerfil'>Estadísticas de<br/>Inclusión</Link>
                        <Link className="button_big" style={{height:'500px'}} to='/buscarEmpleados'>Búsqueda de<br/>Empleados</Link>
                    </div>
                    <div className='right'>
                    <Link className="button_big" to="/registroOfertaTrabajo">Crear Nueva Oferta<br/> de trabajo</Link>
                    <Link className="button_big" style={{height:'700px'}} to="/beneficiosInclusion">Beneficios de la<br/>Inclusión</Link>
                    <Link className="button_big" to="/registroOfertaTrabajo">Ver Candidatos<br/>Guardados</Link>
                    </div>
                </div>
            </div>
            <div className='bloque_profile'>
                <button  onClick={handleLogout} className="submit_button" type='button'>Cerrar Sesión</button>
                <br/><br/>
                <button  onClick={handleDelete} className="submit_button" type='button'>Eliminar Cuenta</button>
            </div>  
            <CustomModal2
                isOpen={showPopUp}
                onClose={() => setShowPopUp(false)}
                title="Ha seleccionado la opción Eliminar Cuenta"
                paragraph="Atención: Se borrarán todos los datos de la Empresa y no podrá volver a acceder a la cuenta. 
                ¿Desea Continuar?"
                buttonText="Quiero Eliminar La Cuenta"
                onClick={completeDelete}
            />
        </div>
    </div>

    )
};

export default EnterpriseProfile;