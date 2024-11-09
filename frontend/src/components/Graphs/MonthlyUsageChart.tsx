// components/MonthlyUsageChart.tsx
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
} from 'chart.js';

// Register necessary scales and elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyUsageChartProps {
  monthlyUsage: number[];
}

const MonthlyUsageChart: React.FC<MonthlyUsageChartProps> = ({ monthlyUsage }) => {
  const labels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Electricity Usage (kWh)',
        data: monthlyUsage,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={{ responsive: true }} />;
};

export default MonthlyUsageChart;
