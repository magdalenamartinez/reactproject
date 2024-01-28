import React from "react";


function DescriptionCliente({cliente}) {

    return(
        <div className="right-verybig">
            <h1 className="title_container" style={{margin: '0px'}}>{cliente.name}</h1>
            <div className="description_container">
            <p className="">Correo Electrónico: {cliente.correo}</p>                                
            <p className="">Nº de Teléfono: {cliente.tlf}</p>                                
            <p className="">Provincia: {cliente.provincia}, Código Postal: {cliente.codpostal}</p>                                
            </div>
        </div>
        
)}

export default DescriptionCliente;