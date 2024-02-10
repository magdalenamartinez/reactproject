import React from "react";

const ChatButton = ({ onClick, notext }) => (
  <span onClick={onClick} className="link_container_info">
    <i class="icon_class fa-solid fa-envelope"></i>
    {!notext && <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Elimine su Oferta</span></div>}
  </span>
);

export default ChatButton;
