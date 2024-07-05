'use client'
import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend);

const ProjectTasksPieChart = () => {
    const chartRef = useRef(null);

    // Exemple de données pour le graphique en secteurs
    const data = {
        labels: ['Analyse', 'Développement', 'Tests', 'Déploiement'],
        datasets: [
            {
                label: 'Répartition des tâches dans le projet',
                data: [20, 30, 25, 25], // Exemple de répartition en pourcentage
                backgroundColor: [
                    '#1E3A8A',
                    '#10B981',
                    '#F59E0B',
                    '#7C3AED',
                ],
                hoverOffset: 4,
            },
        ],
    };

    // Options pour personnaliser le graphique
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Répartition des tâches dans le projet',
            },
        },
    };

    useEffect(() => {
        const chartInstance = chartRef.current;
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <Pie ref={chartRef} data={data} options={options} />
    );
};

export default ProjectTasksPieChart;
