import React from "react";

const FavButton = ({ onClick,classT}) => (
  <span onClick={onClick} className="link_container_info">
    <i className={`icon_class ${classT} fa-solid fa-heart`}></i>
    <div className="info_link"><i className="icon_link fa-solid fa-circle-info"></i><span>Añadir a Favoritos</span></div>
  </span>
);

export default FavButton;
