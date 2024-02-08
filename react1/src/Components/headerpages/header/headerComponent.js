import React from "react";
import LinkItem from "./linkItem";

function HeaderComponent({dropDownMenuEIRef, handleMenuEI, smallScreenMenuVisible, setSmallScreenMenuVisible, admin,
cliente, empresa, nosesion}) {
    return(
        <div className="inicio">
            <div className="titulo-icono-container">
                <h1 className="titulo1">EMPLEO INCLUSIVO</h1>
                <h1 className="titulo2">EI</h1>
                <img src="/images/menup.png" alt=""  ref={dropDownMenuEIRef} className={`iconmenu image_class ${admin? 'hidden':''}`} onClick={handleMenuEI}/>
            </div>
            <nav className={`navbar_container ${smallScreenMenuVisible ? 'active' : 'inactive'}`} id="navbar">
            <ul className="ul_container" onClick={()=>setSmallScreenMenuVisible(false)}>
                {!admin && <LinkItem to={"/"} txt={"Inicio"}/>}
                {empresa && (<><LinkItem to={"/buscarEmpleados"} txt={"Buscar Empleados"}/> 
                 <LinkItem to={"/busquedadeempleo"} txt={"Ver Ofertas"}/><LinkItem to={"/ofertasCreadas"} txt={"Ofertas Creadas"}/>
                 <LinkItem to={"/registroOfertaTrabajo"} txt={"Crear Oferta"}/></>)}
                {cliente && (<><LinkItem to={"/busquedadeempleo"} txt={"Buscar Empleo"}/>  <LinkItem to={"/misFavoritos"} txt={"Favoritos"}/></>)}
                {nosesion && (<><LinkItem to={"/busquedadeempleo"} txt={"Buscar Empleo"}/> <LinkItem to={"/paraempresas"} txt={"Para Empresas"}/></>)}
            </ul>
            </nav>
        </div>
    );
}

export default HeaderComponent;