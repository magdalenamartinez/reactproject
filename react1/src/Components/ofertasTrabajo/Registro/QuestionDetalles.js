import React from "react";
function Inclusividad({classAux, htmlText, text}) {

    return(
        <div className='form_group'>
            <i className={classAux}></i>
            <label className="paragraph_input paragraph_detalles" htmlFor={htmlText}>{text}</label>
        </div>
    );
}

export default Inclusividad;