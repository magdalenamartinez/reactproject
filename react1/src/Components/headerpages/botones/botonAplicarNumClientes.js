import React from "react";

const ApplyButtonNumClientes = ({ onClick, classT, num}) => (
  <span onClick={onClick} className="link_container_info">
    <i className={`icon_class ${classT} fa-solid fa-user-tie`}><span> {num}</span></i>
    <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Ver Solicitudes</span></div>
  </span>
);

export default ApplyButtonNumClientes;
