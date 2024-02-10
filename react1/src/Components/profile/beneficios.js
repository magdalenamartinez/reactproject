import React from "react";
import { useState, useEffect } from "react";
function BeneficiosInclusion() {
    const [sectionsVisible, setSectionsVisible] = useState({});

    useEffect(() => {
        const handleScroll = () => {
        const newSectionsVisible = {};
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            newSectionsVisible[section.id] = sectionTop < windowHeight * 0.8;
        });
        setSectionsVisible(newSectionsVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="contenedor beneficios_container">
        <div className="beneficiosimagen">
        <h1 className="title_beneficios title_extrabig height_container">Beneficios de la Inclusión</h1>
        </div>
      {/* Sección 1 */}
      <section className={`section ${sectionsVisible.section1 ? 'visible' : ''}`} id="section1">
        <h2 className="title_container">Oportunidad y Equidad</h2>
        <p className="paragraph_beneficios" id="paragraph1">
            La inclusión en el empleo brinda oportunidades a personas que pueden enfrentar barreras adicionales
            debido a su discapacidad. Al ofrecerles empleo, no solo estamos cumpliendo con nuestro deber de
            proporcionar igualdad de oportunidades sino que también estamos reconociendo su valía componente
            miembros activos y productivos de la sociedad.
        </p>
           <p className="paragraph_beneficios"> Estas personas al igual que cualquier otro individuo 
            tienen responsabilidades económicas y aspiraciones profesionales que deben atenderse.</p>
        <div className="img_beneficios_container ">
            <img className="img_beneficios" src="/images/beneficios.jpg" alt="Imagen 1"/>
        </div>
      </section>

      {/* Sección 2 */}
      <section className={`section ${sectionsVisible.section2 ? 'visible' : ''}`} id="section2">
    <div className="beneficiosimagen2">
      <h2 className="title_container">Fomento de la Empatía y de la Inclusión</h2>
        <p className="paragraph_beneficios colorstrong" id="paragraph1">
           Al interactuar diariamente con personas con discapacidad en el entorno laboral, nos brinda una valiosa 
           oportunidad para desarrollar habilidades de empatía y de comprensión. A medida que trabajamos codo a codo con
           compañeros que tienen discapacidad aprendemos a apreciar la diversidad al ver que se enfrentan a distintos
           desafios que ni conociamos.
        </p>
           <p className="paragraph_beneficios colorstrong"> Esta experiencia nos enriquece como seres humanos 
           y fortalece la comprensión y el entendimiento.</p>
      </div>
      </section>

      {/* Sección 3 */}
      <section className={`section ${sectionsVisible.section3 ? 'visible' : ''}`} id="section3">
      <h2 className="title_container">Justicia y Equidad</h2>
        <p className="paragraph_beneficios" id="paragraph1">
           La inclusión de personas con discapacidad en el empleo es un acto de justicia y equidad. Algo
           que debería ser normal en nuestra llamada sociedad moderna.
        </p>
           <p className="paragraph_beneficios">Al eliminar barreras y prejuicios injustos, creamos un
           entorno donde todas las personas, independientemente de sus capacidades, pueden alcanzar
           su máximo potencial y contribuir significativamente al bienestar colectivo.</p>
      </section>
    </div>
  );

}

export default BeneficiosInclusion;