'use client'
import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CsvRow {
  "Company Name": string;
  Location: string;
  Year: string;
  Month: string;
  "Gross Floor Area (m²)": string;
  "Monthly Electricity Use (kWh)": string;
  "Electricity Use Intensity (kWh/m²)": string;
  "Operating Hours per Week": string;
  "Number of Employees": string;
}

const Home: React.FC = () => {
  const [filteredData, setFilteredData] = useState<CsvRow[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/data", {
        params: {
          year: selectedYear,
          location: selectedLocation,
        },
      });
      setFilteredData(response.data);
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const chartData = {
    labels: filteredData.map((row) => row.Month),
    datasets: [
      {
        label: "Monthly Electricity Use (kWh)",
        data: filteredData.map((row) => parseFloat(row["Monthly Electricity Use (kWh)"] || "0")),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Electricity Use Analysis</h1>

      {/* Filter Inputs */}
      <div>
        <label>
          Year:
          <input type="text" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} />
        </label>
        <button onClick={handleFetchData}>Submit</button>
      </div>

      {/* Chart Display */}
      <div style={{ width: "600px", height: "400px" }}>
        {filteredData.length > 0 ? (
          <Bar data={chartData} options={{ responsive: true }} />
        ) : (
          <p>No data available for selected filters.</p>
        )}
      </div>

      {/* Raw Data Display */}
      {/* <h2>Raw Data</h2>
      // <pre>{JSON.stringify(filteredData, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
