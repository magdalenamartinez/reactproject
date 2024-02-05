// iniciosesion.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyle } from '../../styleContext';

function InicioSesion() {
  const {style} = useStyle();
  const st = {
    circuloContrast: style.highContrast ? 'circuloContrast' : '',
    circuloDark: style.darkMode ? 'circuloDark' : '',
  };
  return (
            <div className='contenedor'>
                <div className="circulos_inicio_sesion">
                    <Link className={`circulo ${st.circuloContrast} ${st.circuloDark}`} to="/registroUsuario"><span className='texto_circulo'>Nueva Cuenta</span></Link>
                    <Link className={`circulo ${st.circuloContrast} ${st.circuloDark}`} to="/tengoCuenta"><span className='texto_circulo'>Ya Tengo Cuenta</span></Link>
                    <Link className={`circulo ${st.circuloContrast} ${st.circuloDark}`} to="/paraEmpresas"><span className='texto_circulo'>Soy Una Empresa</span></Link>
                </div>
            </div>
  );
};

export default InicioSesion;
