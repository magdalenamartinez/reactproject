import React from 'react';
import { useStyle } from '../../styleContext';
function DatosPrincipales({inputTitle, inputDescription, inputDate, inputSalary, handleC}) {

    
const {style} = useStyle();

const st = {
  inputContrast: style.highContrast ? 'inputContrast' : '',
  inputDark: style.darkMode ? 'inputDark' : '',
};


  return (
    <div className='izq'>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="user" >Título de la Oferta</label>
            <div className="input_group">
                <input type="text" className={`form_input big ${st.inputContrast} ${st.inputDark}`} onChange={handleC} name="titulo_oferta" id="titulo_oferta" defaultValue={inputTitle? inputTitle:''} required/>
            </div>
        </div>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="descripcion_oferta" >Descripción de la Oferta</label>
            <div className="input_group">
                <textarea type="text" className={`form_textarea form_input big ${st.inputContrast} ${st.inputDark}`} onChange={handleC} name="descripcion_oferta" defaultValue={inputDescription? inputDescription:''} id="descripcion_oferta" required/>
            </div>
        </div>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="fechaInicio" >Fecha de Inicio de la Oferta:</label>
            <div className="input_group mini">
                <input className={`form_input ${st.inputContrast} ${st.inputDark}`} type="date" id="fechaInicio" onChange={handleC} name="fechaInicio" defaultValue={inputDate? inputDate:''} required/>
            </div>
        </div>
        <div className="form_group mini" id="">
            <label className="form_label" htmlFor="salario" >Salario</label>
            <div className="input_group ">
                <input type="decimal" className={`form_input ${st.inputContrast} ${st.inputDark}`} id="fechaInicio" onChange={handleC} defaultValue={inputSalary? inputSalary:''} name="salario"/><span>&nbsp;€</span>
            </div>
        </div>
    </div>
  );
}

export default DatosPrincipales;
