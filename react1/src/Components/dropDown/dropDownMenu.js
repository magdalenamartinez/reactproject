import React from "react";
import "../../css/dropdown.css";
import DropDownItem from "./dropDownItem.js";
import { useNavigate } from 'react-router-dom';

function DropDownMenu({ openclass, profile, logout, favoritos, admin, chat}) {
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/");
  }
        
  return (
    <div className={openclass} id="drop_menu">
      <ul className="list_drop_down">
      {!admin && <>
      <DropDownItem link={profile} icon={"icons_class fa-solid fa-user"} text="Ver Perfil"/>
      <DropDownItem link={favoritos} icon={"icons_class fa-solid fa-heart"} text="Ver Favoritos" />
      <DropDownItem link={chat} icon={"icons_class fa-solid fa-comments"} text="Chats" />
      
      </>}
        <li className="dropDownItem">
            <i className="icons_class fa-solid fa-right-from-bracket"></i>
            <span onClick={handleLogout} className="link_drop">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
