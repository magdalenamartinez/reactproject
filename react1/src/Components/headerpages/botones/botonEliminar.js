import React from "react";

const DeleteButton = ({ onClick, notext }) => (
  <span onClick={onClick} className="link_container_info">
    <i className="icon_class trash fa-solid fa-trash"></i>
    {!notext && <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Elimine su Oferta</span></div>}
  </span>
);

export default DeleteButton;
