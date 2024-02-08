import React, { useState, useEffect, useRef } from "react";
import {Chart} from "chart.js/auto";

function DonutChart({ numOfertas, numClientes, numEmpresas }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const data = {
            labels: ["Nº Ofertas", "Nº Clientes", "Nº Empresas"],
            datasets: [{
                data: [numOfertas, numClientes, numEmpresas], 
                backgroundColor: ["#89d8ff", "#611668", "#480e7e"],
                borderWidth: 0
            }],
        };

        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Gráfico Número de Ofertas, Clientes y Empresas',
                    color: 'white',
                    font: {
                        size: 20, 
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'white',
                        font: {
                            size: 16 
                        }
                    }
                },
            },
        };

        const ctx = chartRef.current.getContext("2d");
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: data,
            options: options,
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [numOfertas, numClientes, numEmpresas]);

    return (
         <canvas ref={chartRef} style={{ width: "20px", height: "20px" }} className="donut_chart"/>
    )
}

export default DonutChart;
