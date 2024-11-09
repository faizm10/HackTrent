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
  // Sample data for demonstration
  const labels = ['January', 'February', 'March', 'April', 'May'];
  const energyData = [300, 280, 320, 310, 295];
  const waterData = [120, 110, 130, 125, 118];
  const paperData = [40, 35, 45, 42, 37];

  // Chart options with animation for tension effect
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resource Usage Over Time',
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 400,
      },
    },
  };

  // Data configurations for each chart
  const energyChartData = {
    labels,
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: energyData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const waterChartData = {
    labels,
    datasets: [
      {
        label: 'Water Usage (Gallons)',
        data: waterData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const paperChartData = {
    labels,
    datasets: [
      {
        label: 'Paper Usage (Reams)',
        data: paperData,
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
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
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
      <h1 style={styles.header}>Office Resource Usage Dashboard</h1>

      <div style={styles.gridContainer}>
        {/* Energy Usage Chart */}
        <div style={styles.chartBox}>
          <h2>Energy Usage</h2>
          <Line options={chartOptions} data={energyChartData} />
        </div>

        {/* Water Usage Chart */}
        <div style={styles.chartBox}>
          <h2>Water Usage</h2>
          <Line options={chartOptions} data={waterChartData} />
        </div>

        {/* Paper Usage Chart */}
        <div style={styles.chartBox}>
          <h2>Paper Usage</h2>
          <Line options={chartOptions} data={paperChartData} />
        </div>
      </div>
    </div>
  );
};

export default Usage;
