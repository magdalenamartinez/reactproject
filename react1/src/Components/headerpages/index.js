import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalManager from '../funcionalidades/modal/modal.js';
import { useStyle } from '../styleContext.js';
const Index = () => {
 const {style} = useStyle();
  return (
    <div className="index_class">
    <div className="index">
        <div className="contenedor">
          <div className="comun">
            <div className="izq">
              <h1 className='text_first'>
                En Empleo Inclusivo,
                todos tenemos oportunidades, sin excepción
              </h1>
            </div>
            <div className="dch">
              <img src="/images/1.png" alt="" className="img1" />
              <img src="/images/2.png" alt="" className="img2" />
              <img src3="/images/3.png" alt="" className="img3" />
            </div>
          </div>
          <div className="contenedor">
            <div className='comun'>
                <p className='text_second'>
                  En nuestro portal, creemos que la diversidad es la clave para un mundo laboral
                  más enriquecedor y equitativo.
                  Aquí no vemos discapacidades sino las capacidades únicas de cada individuo.
                </p>
            </div>
          </div>
          <div className="contendor">
            <div className="comun">
              <div className="izq">
                  <img src="/images/4.png" alt="" className="img2" />
                  <img src="/images/5.png" alt="" className="img1" />
              </div>
            <div className='dch'>
              <div className="text_third">
                <h1>
                  Nuestro compromiso es unir a personas talentosas con discapacidades
                  con empleadores que valoran la inclusión
                </h1>
              </div>
            </div>
            </div>
          </div>
          <div className='contenedor'>
            <h1 className="text_fourth">Explora, conecta y descubre tu potencial en Empleo Inclusivo.</h1>
            <h2 className='text_fourth'>Porque tú también importas.</h2>
            <Link to="/busquedadeempleo" className={` ${style.highContrast ? 'linkAcc_container link_high_contrast' : 'link_container link_normal'}`}>
              <span className={style.highContrast? 'link-contrast':"link-gradient"}>Buscar Empleo</span></Link>
          </div>
        </div>
     </div>
     <div>
      <ModalManager/>
    </div>
    </div>
  );
};

export default Index;
