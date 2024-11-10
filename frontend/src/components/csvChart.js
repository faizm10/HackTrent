import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import DropdownComponent from './DropdownComponent';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

const CsvChart = () => {
  const [chartData, setChartData] = useState(null);
  const [region, setRegion] = useState("Toronto"); // Default region
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // Fetch the single CSV file
    fetch(`/Data/NEW_cities.csv`)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            setCsvData(results.data); // Store all CSV data
          }
        });
      });
  }, []);

  useEffect(() => {
    // Filter data based on selected region
    if (csvData.length && region) {
      const filteredData = csvData.filter(row => row.Location === region);

      // Map data for Chart.js
      const labels = filteredData.map(row => `${row.Year}-${row.Month}`);
      const electricityUse = filteredData.map(row => row['Monthly Electricity Use (kWh)']);
      const intensity = filteredData.map(row => row['Electricity Use Intensity (kWh/m²)']);
      const floorArea = filteredData.map(row => row['Gross Floor Area (m²)']);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Monthly Electricity Use (kWh)',
            data: electricityUse,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Electricity Use Intensity (kWh/m²)',
            data: intensity,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Gross Floor Area (m²)',
            data: floorArea,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1
          }
        ]
      });
    }
  }, [region, csvData]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <DropdownComponent 
        label="Region" 
        options={["Toronto", "Ottawa", "Mississauga"]} 
        selected={region} 
        onSelect={setRegion} 
      />
      
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default CsvChart;
