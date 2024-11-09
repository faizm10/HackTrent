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

// Updated FormData interface to include monthlyUsage as an array of numbers
interface FormData {
  companyName: string;
  region: string;
  wasteType: string;
  startYear: string;
  monthlyUsage: number[]; // Array of monthly electricity usage values
  floorArea: string;
  numEmployees: string;
  workHours: string;
}

interface UsageProps {
  formData: FormData;
}

const Usage: React.FC<UsageProps> = ({ formData }) => {
  // Sample labels for each month
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Mock data for comparison
  const companyAData = [300, 280, 320, 310, 295, 345, 256, 225, 64, 4, 64, 3];
  const companyBData = formData.monthlyUsage; // Directly using the array of monthly usage values

  // Chart options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Energy Usage Comparison Between Company A and Submitted Data',
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

  // Data for the double line chart
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
        label: 'Submitted Data',
        data: companyBData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Line options={lineChartOptions} data={energyComparisonData} />
    </div>
  );
};

export default Usage;
