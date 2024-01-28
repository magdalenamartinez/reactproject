// paraempresas.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/index.css';

function ParaEmpresas() {
  return (
    <div className='paraempresas'>
    <div className="letras">
    
         <div className="contenedor">
                <h1 className='text_fourth'>En Empleo Inclusivo tenemos un propósito claro, promover la inclusión laboral de manera sencilla y
                    efectiva para las empresas. </h1>
                <br/>
                <h2 className='text_fourth'>Únete a nosotros para un mundo laboral más inclusivo y enriquecedor</h2>
            </div>
            <div className="comun center">
              <div className='dch'>
                <Link to="/registroEmpresas" className="link-center">Nueva Cuenta <br/> Empresarial</Link>
              </div>
              <div className='dch'>
                <Link to="/inicioSesionEmpresa" className="link-center">Ya tengo una <br/>Cuenta</Link>
              </div>
            </div>
                <h1 className='text_fourth'>¿Por qué somos la opción ideal?</h1>
                <br/>
                <h2 className='text_fourth'>Buscamos un futuro laboral más equitativo y enriquecedor.</h2>
                <br/>
                <h1 className='text_fourth'>Tu contribución importa</h1>
                </div></div>
           
  );
};

export default ParaEmpresas;
