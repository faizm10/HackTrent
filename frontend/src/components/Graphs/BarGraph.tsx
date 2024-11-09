// components/ElectricityIntensityChart.tsx
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

// Register necessary components for the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ElectricityIntensityChartProps {
  monthlyUsage: number[];
  floorArea: number; // in square meters
  title?: string; // Chart title
  width?: string; // Chart width
  height?: string; // Chart height
  color?: string; // Bar color
}

const ElectricityIntensityChart: React.FC<ElectricityIntensityChartProps> = ({
  monthlyUsage,
  floorArea,
  title = "Monthly Electricity Intensity (kWh/m²)",
  width = "400px",
  height = "400px",
  color = "rgba(255, 99, 132, 0.5)", // Default color
}) => {
  const labels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Calculate electricity intensity (kWh/m²) for each month
  const electricityIntensity = monthlyUsage.map((usage) =>
    (usage / floorArea).toFixed(2)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Electricity Intensity (kWh/m²)",
        data: electricityIntensity,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Intensity (kWh/m²)",
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ElectricityIntensityChart;
