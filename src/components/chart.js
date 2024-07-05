'use client'
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const chartRef = useRef(null);

  // Exemple de données pour le graphique
  const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril'],
    datasets: [
      {
        label: 'Dépenses prévues',
        data: [5000, 7000, 8000, 6000],
        backgroundColor: '#001952',
      },
      {
        label: 'Dépenses réelles',
        data: [4500, 6500, 8500, 7000],
        backgroundColor: '#A3AED0',
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
        text: 'Dépenses prévues vs Dépenses réelles',
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

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default BarChart;