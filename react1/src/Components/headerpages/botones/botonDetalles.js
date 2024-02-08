import React from "react";

const DetailsButton = ({ onClick, notext }) => (
  <span onClick={onClick} className="link_container_info">
    <i className="icon_class ver_mas fa-solid fa-plus"></i>
    {!notext &&<div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Vea los Detalles de la Oferta</span></div>}
  </span>
);

export default DetailsButton;