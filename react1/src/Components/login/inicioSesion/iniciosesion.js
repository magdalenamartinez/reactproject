// iniciosesion.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/index.css';
import '../../../css/iniciosesion.css';

function InicioSesion() {
  return (
            <div className='contenedor'>
                <div className="circulos_inicio_sesion">
                    <Link className="circulo" to="/registroUsuario"><span className='texto_circulo'>Nueva Cuenta</span></Link>
                    <Link className="circulo" to="/tengoCuenta"><span className='texto_circulo'>Ya Tengo Cuenta</span></Link>
                    <Link className="circulo" to="/paraEmpresas"><span className='texto_circulo'>Soy Una Empresa</span></Link>
                </div>
            </div>
  );
};

export default InicioSesion;
