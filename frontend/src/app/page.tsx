"use client";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import DropdownComponent from "@/components/DropdownComponent";
import InputComponent from "@/components/InputComponent";
import LineChart from "@/components/Graphs/DoubleLineChart";
import Link from "next/link";

const Home: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [startYear, setStartYear] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [csvData, setCsvData] = useState<CsvRow[]>([]); // Store all CSV data
  const [filteredData, setFilteredData] = useState<CsvRow[]>([]); // Store only the data for the selected year
  const [hasMounted, setHasMounted] = useState(false);
  
  interface CsvRow {
    "Company Name": string;
    "Location": string;
    "Year": string;
    "Month": string;

    "Gross Floor Area (m²)": string;
    "Monthly Electricity Use (kWh)": string;
    "Electricity Use Intensity (kWh/m²)": string;
    "Operating Hours per Week": string;
    "Number of Employees": string;
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const loadCsvData = (region: string, year: string) => {
    const filePath = `/Data/NEW_${region.toLowerCase()}.csv`;
  

    Papa.parse<CsvRow>(filePath, {
      download: true,
      header: true,
      complete: (result) => {
        // Filter data for the specific year before setting it
        const yearFilteredData = result.data.filter(row => row["Year"] === year);
        setFilteredData(yearFilteredData); // Store only the data for the selected year
        console.log("Filtered data:", yearFilteredData);
      },
      error: (error) => {
        console.error("Error loading CSV file:", error);
      },
    });
  };
  const [monthlyData, setMonthlyData] = useState<number[]>(Array(12).fill(0));
  const [companyData] = useState<number[]>([
    70, 65, 78, 85, 60, 62, 70, 75, 80, 78, 74, 68,
  ]); // Mocked company data

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleFormSubmit = () => {
    setShowGraph(true);
  };

  const handleMonthlyDataChange = (index: number, value: string) => {
    const updatedData = [...monthlyData];
    updatedData[index] = parseFloat(value) || 0;
    setMonthlyData(updatedData);
  };

  // Calculate display values for monthly usage, floor area, employees, and work hours based on filtered data
  const displayMonthlyUsage = filteredData.map(row => Number(row["Monthly Electricity Use (kWh)"]));
  const displayFloorArea = filteredData.length > 0 ? Number(filteredData[0]["Gross Floor Area (m²)"]) : Number(floorArea);
  const displayNumEmployees = filteredData.length > 0 ? Number(filteredData[0]["Number of Employees"]) : Number(numEmployees);
  const displayWorkHours = filteredData.length > 0 ? Number(filteredData[0]["Operating Hours per Week"]) : Number(workHours);
  const isFormComplete = companyName && region && wasteType && startYear;

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8">
      {!showGraph && (
        <div className="w-full max-w-4xl space-y-6">
      <div className="w-full text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700">
          <Typewriter
            words={["Welcome to EcoTrack!"]}
            loop={false}
            typeSpeed={100}
            deleteSpeed={50}
            cursor
          />
        </h1>
        <p className="mt-4 text-lg text-gray-800 max-w-3xl mx-auto">
          EcoTrack is your all-in-one solution for tracking and managing energy
          usage and waste.
        </p>
      </div>

      {!showGraph ? (
        <div className="w-full max-w-4xl space-y-6">
          <InputComponent
            label="Company Name"
            id="companyName"
            value={companyName}
            placeholder="Enter your company name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="flex space-x-4 justify-center">
            <DropdownComponent
              label="Region"
              options={["Toronto", "Ottawa", "Mississauga"]}
              selected={region}
              onSelect={setRegion}
            />
            <DropdownComponent
              label="Starting Year"
              options={["2020", "2021", "2022", "2023"]}
              selected={startYear}
              onSelect={setStartYear}
            />
            <DropdownComponent
              label="Waste Type"
              options={["Electricity", "Water"]}
              selected={wasteType}
              onSelect={setWasteType}
            />
          </div>

          <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold text-indigo-700">
              Enter Monthly Data for {wasteType} (kWh)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {months.map((month, index) => (
                <InputComponent
                  key={month}
                  label={month}
                  id={`monthlyData-${index}`}
                  value={monthlyData[index].toString()}
                  placeholder={`Enter usage for ${month}`}
                  onChange={(e) =>
                    handleMonthlyDataChange(index, e.target.value)
                  }
                  type="number"
                />
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center mt-6">
            <button
              disabled={!isFormComplete}
              className={`w-full md:w-48 bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition ${
                !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleFormSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            Monthly Data for {region} ({startYear})
          </h2>
          <div className="mt-8">
            <LineChart
              labels={months}
              userDataset={monthlyData}
              companyDataset={companyData}
              chartTitle={`Monthly ${wasteType} Usage Comparison for ${companyName}`}
              xAxisLabel="Months"
              yAxisLabel={`${wasteType} Usage (kWh)`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
