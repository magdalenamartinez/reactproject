import React, { useEffect, useState } from "react";
import getNum from "../data/getNum";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import DonutChart from "./chartRedondo";
import getByFecha from "../data/getByFecha";
import BarrasChart from "./chartBarras";
function DashBoard() {
    const [numOfertas, setNumOfertas] = useState(0);
    const [numClientes, setNumClientes] = useState(0);
    const [numEmpresas, setNumEmpresas] = useState(0);
    const [numOfertasPorFecha, setNumOfertasPorFecha] = useState([]);
    const [fechas, setFechas] = useState([]);

    useEffect(()=>{
        const getNumAll = async() => {
            await getNum(setNumOfertas, setNumClientes, setNumEmpresas);
            await getByFecha(setNumOfertasPorFecha, setFechas);
        }
        getNumAll();
    },[])

    return(
        <>
    <div className="dashboard">
       <Sidebar/>
        <div className="contenedor dashboard_container">
            <div className="cuadro_contador">
                <h1>Número de <br/> Ofertas Creadas<br/> {numOfertas}</h1>
            </div>
            <div className="cuadro_contador">
                <h1>Número de <br/>Clientes Registrados <br/>{numClientes}</h1>                
            </div>
            <div className="cuadro_contador">
            <h1>Número de <br/>Empresas Registradas <br/>{numEmpresas}</h1>
            </div>
        </div>
    </div>
    <div className="dashboard">
        <div className="contenedor dashboard_container">
            <BarrasChart numOfertasPorFecha={numOfertasPorFecha} fechas={fechas}/>
            <DonutChart numClientes={numClientes} numOfertas={numOfertas} numEmpresas={numEmpresas}/>
        </div>
    </div>
    </>
    );
}

export default DashBoard;