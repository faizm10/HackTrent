'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EnergyComparisonGraphProps {
  formData: number[];  // Data from form input
  mockData: number[];  // Mock data for comparison
}

const EnergyComparisonGraph: React.FC<EnergyComparisonGraphProps> = ({ formData, mockData }) => {
  // Sample labels for each month
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Chart options for the double line chart
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Energy Usage Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy Usage (kWh)',
        },
      },
    },
  };

  // Data configuration for the double line chart
  const energyComparisonData = {
    labels,
    datasets: [
      {
        label: 'Form Input Data',
        data: formData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Mock Data',
        data: mockData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
      <Line options={lineChartOptions} data={energyComparisonData} />
    </div>
  );
};

export default EnergyComparisonGraph;
