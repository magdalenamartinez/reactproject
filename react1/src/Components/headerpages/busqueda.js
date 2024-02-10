import React, { useState } from "react";
import { useStyle } from '../styleContext.js';

function Busqueda({handleSearch}) {
    const [dropDown, setDropDown] = useState(false);
    const {style} = useStyle();

    const st = {
      busquedaContrast: style.highContrast ? 'busquedaContrast' : '',
      busquedaDark: style.darkMode ? 'busquedaDark' : '',
    };

    const handleKey = async(event) => {
        if (event.key === 'Enter') {
            handleChange(event);
        }
    }

    const handleChange = (e) => {
        const search = document.getElementById('searchText').value;
        handleSearch(search);
      }
      
    return(
        <div className="contenedor formc">
            <div className='busqueda_izq'>
                <form action="/busqueda" method="get" className={`form_search `}>
                            <input type="text" className={`texto_barra ${st.busquedaContrast} ${st.busquedaDark}`} name="searchText" id="searchText" placeholder="Buscar..." 
                            onKeyDown={handleKey}/>
                            <button className="button_class" type="button" onClick={handleChange}>
                                <img className="image_search" src="/images/lupa2.png" alt=""/>
                            </button>
                    </form> 
            </div>
            <div className='busqueda_dch' >
            <button className={`button_class`} onClick={() => setDropDown(!dropDown)}>
                </button>
            </div>
        </div>
    );
}

export default Busqueda;