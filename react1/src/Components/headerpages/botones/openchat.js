import React from "react";

const OpenChat = ({ onClick, notext }) => (
  <span onClick={onClick} className="link_container_info">
    <i className="icon_class fa-solid fa-comment"></i>
    {!notext && <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Responder</span></div>}
  </span>
);

export default OpenChat;
