import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  userDataset: number[];
  companyDataset: number[];
}

const BarChart: React.FC<BarChartProps> = ({ labels, userDataset, companyDataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Electricity Use Intensity (User Data)",
        data: userDataset,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Company Data (Reference)",
        data: companyDataset,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Electricity Use Intensity (kWh/m²)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "EUI (kWh/m²)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
