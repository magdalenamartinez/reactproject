// LogoutLink.js
import React from "react";

const LogoutLink = ({ onLogout }) => (
  <a href="/" onClick={onLogout} >
    Cerrar Sesión
  </a>
);

export default LogoutLink;
