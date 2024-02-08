import React from "react";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import { useRef } from "react";
import { format } from 'date-fns';

function BarrasChart({numOfertasPorFecha, fechas}) {

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        const formattedFechas = fechas.map(fecha => format(new Date(fecha), 'dd/MM/yyyy'));
        const data = {
            labels: formattedFechas.map((fecha, index) => `${fecha}\n(${numOfertasPorFecha[index]})`),
            datasets: [{
                label: "Número de ofertas por fecha",
                data: numOfertasPorFecha,
                backgroundColor: "white",
                borderColor: "#7fd5ff",
                borderWidth: 1
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Gráfico Número de Ofertas por Fecha",
                    color: "white",
                    font: {
                        size: 20
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
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Fecha (Número de ofertas)',
                        color: 'white',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        color: 'white',
                       
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Número de ofertas',
                        color: 'white',
                        font: {
                            size: 16
                        }
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            indexAxis: 'x',
            barThickness: 20
        };

        const ctx = chartRef.current.getContext("2d");
        let chartInstance = new Chart(ctx, {
            type: "bar",
            data: data,
            options: options
        });

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [fechas, numOfertasPorFecha]);

    return (
        <canvas ref={chartRef} className="barras_chart" />
    );

}

export default BarrasChart;
