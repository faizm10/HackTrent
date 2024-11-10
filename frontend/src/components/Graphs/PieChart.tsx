"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  monthlyData: number[];
}

const PieChart: React.FC<PieChartProps> = ({ monthlyData }) => {
  // Calculate the sum of electricity usage for every 3 months
  const quarterlyData = [
    monthlyData.slice(0, 3).reduce((acc, val) => acc + val, 0),
    monthlyData.slice(3, 6).reduce((acc, val) => acc + val, 0),
    monthlyData.slice(6, 9).reduce((acc, val) => acc + val, 0),
    monthlyData.slice(9, 12).reduce((acc, val) => acc + val, 0),
  ];

  // Chart data configuration
  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"], // Representing the quarters
    datasets: [
      {
        label: "Electricity Usage (kWh)",
        data: quarterlyData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
