import React from "react";

const ApplyButton = ({ onClick, classT}) => (
  <span onClick={onClick} className="link_container_info">
    <i className={`icon_class ${classT} fa-solid fa-handshake`}></i>
    <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Quiero Solicitar el Puesto</span></div>
  </span>
);

export default ApplyButton;
