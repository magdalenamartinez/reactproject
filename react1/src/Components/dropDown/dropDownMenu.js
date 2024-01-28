import React from "react";
import "../../css/dropdown.css";
import DropDownItem from "./dropDownItem.js";

function DropDownMenu({ openclass, profile, logout, favoritos }) {

    const handleLogout = () => {
        localStorage.removeItem(logout);
        window.location.href = '/';
    };
    
        
  return (
    <div className={openclass} id="drop_menu">
      <ul className="list_drop_down">
      <DropDownItem link={profile} icon={"icons_class fa-solid fa-user"} text="Ver Perfil" />
      <DropDownItem link={favoritos} icon={"icons_class fa-solid fa-heart"} text="Ver Favoritos" />
        <li className="dropDownItem">
            <i className="icons_class fa-solid fa-right-from-bracket"></i>
            <span onClick={handleLogout} className="link_drop">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
