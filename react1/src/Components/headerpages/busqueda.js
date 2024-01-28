import React from "react";

function Busqueda() {
    return(
        <div className="contenedor formc">
            <div className='busqueda_izq'>
                <form action="/busqueda" method="get" className='form_search'>
                            <input type="text" className="texto_barra" name="q" placeholder="Buscar..." />
                            <button className="button_class" type="submit">
                                <img className="image_search" src="/images/lupa2.png" alt=""/>
                            </button>
                    </form> 
            </div>
            <div className='busqueda_dch'>
            <button className="button_class">
                <img className="image_search" src="/images/filtros.png" alt=""/>
            </button>
            </div>
        </div>
    );
}

export default Busqueda;