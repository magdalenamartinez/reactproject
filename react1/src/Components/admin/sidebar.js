import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return(
        <>
         <div className="sidebar">
         <div className="sidebar_object">
                <i className="fa-solid fa-table-columns"></i>
                <Link to="/dashboard_admin" className="link_dash"> Página Principal</Link>
            </div>
            <div className="sidebar_object">
                <i className="fa-solid fa-user"></i>
                <Link to="/adminClientes" className="link_dash"> Gestionar Clientes</Link>
            </div>
            <div className="sidebar_object">
                <i className="fa-solid fa-briefcase"></i>
                <Link to="/adminEmpresas" className="link_dash"> Gestionar Empresas</Link>
            </div>
            <div className="sidebar_object">
                <i className="fa-solid fa-tag"></i>
                <Link to="/adminOfertas" className="link_dash"> Gestionar Ofertas</Link>
            </div>
        </div>
        </>
    );
}

export default Sidebar;