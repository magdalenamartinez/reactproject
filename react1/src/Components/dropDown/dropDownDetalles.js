import React from "react";
import "../../css/dropdown.css";
import DropDownItem from "./dropDownItem.js";

function DropDownDetalles({ openclass}) {

        
  return (
    <div className={openclass} id="drop_menu">
      <ul className="list_drop_down">
        <DropDownItem link="#" icon={"icons_class fa-solid fa-user"} text="Ver Perfil" />
      </ul>
    </div>
  );
}

export default DropDownDetalles;
