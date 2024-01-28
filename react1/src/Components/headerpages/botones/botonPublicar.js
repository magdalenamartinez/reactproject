import React from "react";

const PublishButton = ({ onClick, iconClass }) => (
  <span onClick={onClick} className="link_container_info">
    <i className={`icon_class eye_animation fa-solid ${iconClass}`}></i>
    <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Publique su Oferta</span></div>
  </span>
);

export default PublishButton;
