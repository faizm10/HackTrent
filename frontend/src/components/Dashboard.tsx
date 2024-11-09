'use client'
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

const Usage = () => {
  // Sample labels for each month
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Mock data for energy usage of two companies
  const companyAData = [300, 280, 320, 310, 295,345,256,225,64,4,64,3]; // Energy usage for Company A
  const companyBData = [250, 260, 290, 300, 280,400,35,23,523,6,325,52]; // Energy usage for Company B

  // Chart options for the double line chart
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Energy Usage Comparison Between Company A and Company B',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 400,
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
        label: 'Company A',
        data: companyAData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Company B',
        data: companyBData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Inline styles for layout
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px',
    },
    chartBox: {
      padding: '20px',
      backgroundColor: '#f3f3f3',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header} className=" text-2xl">Energy Usage Dashboard</h1>

      <div style={styles.chartBox}>
        <h2>Energy Usage Comparison</h2>
        <Line options={lineChartOptions} data={energyComparisonData} />
      </div>
    </div>
  );
};

export default Usage;
