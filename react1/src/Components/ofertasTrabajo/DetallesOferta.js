import Inclusividad from './Registro/QuestionDetalles';

function DetallesOferta({oferta}) {
    const class1 = "green_icon fa-solid fa-circle-check";
    const class2 = "red_icon fa-solid fa-circle-xmark";
    const classAux = oferta.politicasInclusivas=== 0? class2 : class1;
    const classAux2 = oferta.instalacionesAccesibles=== 0 ? class2 : class1;
    const classAux3 = oferta.formacionInclusividad=== 0 ? class2: class1;
    const classAux4 = oferta.mentoresApoyo===0 ? class2 : class1;
    const classAux5 = oferta.ambienteAdaptado=== 0 ? class2 : class1;
  
    return(
        <div className="detalles_container">
            <h1 className="paragraph_label">Detalles de la Oferta</h1>
            <div>
                <p className="form_label">Requisitos</p>
                <p className="paragraph_input paragraph_detalles">{oferta.requisitosSolicitante}</p>
            </div>
            <div className="leftright">
                <div className="left">
                    <p className="form_label">Fecha de Comienzo:</p>
                    <p className="paragraph_input paragraph_detalles">
                        {oferta.fechaInicio && typeof oferta.fechaInicio === 'string'
                            ? new Date(oferta.fechaInicio).toLocaleDateString('es-ES')
                            : 'Fecha no válida'}
                        </p>
                </div>
                <div className="left">
                    <p className="form_label">Ubicación del Puesto</p>
                    <p className="paragraph_input paragraph_detalles">{oferta.provincia}</p>
                </div>
                <div className="right-little">
                    <p className="form_label">Salario: </p>
                    <p className="paragraph_input paragraph_detalles">{oferta.salario}</p>
                </div>
            </div>
            {oferta.calendarioEventos && (<div>
                <p className="form_label">Calendario de Eventos</p>
                <p className="paragraph_input paragraph_detalles">{oferta.calendarioEventos}</p>
            </div>)}
            <div className="preguntas">
                <p className="form_label">Inclusividad</p>
                <Inclusividad classAux={classAux} htmlText={"politicasInclusivas"} text={"La empresa tiene políticas inclusivas"}/>
                <Inclusividad classAux={classAux2} htmlText={"instalacionesAccesibles"} text={"Ofrecen instalaciones accesibles"}/>
                <Inclusividad classAux={classAux3} htmlText={"formacionInclusividad"} text={"La empresa fomenta la inclusividad hacia compañeros con discapacidad"}/>
                <Inclusividad classAux={classAux4} htmlText={"mentoresApoyo"} text={"Se ofrecen programas de mentoría o apoyo para empleados con discapacidad intelectual"}/>
                <Inclusividad classAux={classAux5} htmlText={"ambienteAdaptado"} text={"El entorno de trabajo está adaptado para ser inclusivo para personas con discapacidad"}/>
            </div>
        </div>
    )
}

export default DetallesOferta;