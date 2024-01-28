import React from "react";

const EditButton = ({ onClick }) => (
  <span onClick={onClick} className="icon_class link_container_info">
    <i className="pencil  fa-solid fa-pen"><span className="line"></span></i>
    <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Modifique su Oferta</span></div>
  </span>
);

export default EditButton;
