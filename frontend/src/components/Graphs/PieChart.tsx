// components/AnnualSummaryChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register ArcElement, Tooltip, Legend, and Title for chart title
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface AnnualSummaryChartProps {
  monthlyUsage: number[]; // Monthly usage data for calculating quarterly usage
  title?: string; // Chart title
  width?: string; // Chart width
  height?: string; // Chart height
  colors?: string[]; // Colors for the chart segments
}

const AnnualSummaryChart: React.FC<AnnualSummaryChartProps> = ({
  monthlyUsage,
  title = 'Quarterly Energy Usage Distribution',
  width = '400px',
  height = '400px',
  colors = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 99, 132, 0.6)',
  ],
}) => {
  const quarterlyUsage = [
    monthlyUsage.slice(0, 3).reduce((a, b) => a + b, 0),  // Q1
    monthlyUsage.slice(3, 6).reduce((a, b) => a + b, 0),  // Q2
    monthlyUsage.slice(6, 9).reduce((a, b) => a + b, 0),  // Q3
    monthlyUsage.slice(9, 12).reduce((a, b) => a + b, 0), // Q4
  ];

  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Quarterly Energy Usage (kWh)',
        data: quarterlyUsage,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AnnualSummaryChart;
