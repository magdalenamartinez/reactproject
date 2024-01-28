import React from 'react';

function DatosPrincipales({inputTitle, inputDescription, inputDate, inputSalary, handleC}) {
  return (
    <div className='izq'>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="user" >Título de la Oferta</label>
            <div className="input_group">
                <input type="text" className="form_input big" onChange={handleC} name="titulo_oferta" id="titulo_oferta" defaultValue={inputTitle? inputTitle:''} required/>
            </div>
        </div>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="descripcion_oferta" >Descripción de la Oferta</label>
            <div className="input_group">
                <textarea type="text" className="form_textarea form_input big" onChange={handleC} name="descripcion_oferta" defaultValue={inputDescription? inputDescription:''} id="descripcion_oferta" required/>
            </div>
        </div>
        <div className="form_group" id="">
            <label className="form_label" htmlFor="fechaInicio" >Fecha de Inicio de la Oferta:</label>
            <div className="input_group mini">
                <input className="form_input" type="date" id="fechaInicio" onChange={handleC} name="fechaInicio" defaultValue={inputDate? inputDate:''} required/>
            </div>
        </div>
        <div className="form_group mini" id="">
            <label className="form_label" htmlFor="salario" >Salario</label>
            <div className="input_group ">
                <input type="decimal" className="form_input" id="fechaInicio" onChange={handleC} defaultValue={inputSalary? inputSalary:''} name="salario"/><span>&nbsp;€</span>
            </div>
        </div>
    </div>
  );
}

export default DatosPrincipales;
