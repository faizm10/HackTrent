"use client";
import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import Papa from "papaparse";
import DropdownComponent from "@/components/DropdownComponent";
import InputComponent from "@/components/InputComponent";
import LineChart from "@/components/Graphs/DoubleLineChart";
import PieChart from "@/components/Graphs/PieChart";
// import Link from "next/link";
import BarChart from "@/components/Graphs/BarGraphs";
import WaterBarGraph from "@/components/Graphs/WaterBarGraph";
import GetSuggestions from "./states/getSuggestion";

interface CsvRow {
  "Company Name": string;
  Location: string;
  Year: string;
  Month: string;
  "Gross Floor Area (m²)": string;
  "Monthly Electricity Use (kWh)": string;
  "Electricity Use Intensity (kWh/m²)": string;
  "Operating Hours per Week": string;
  "Monthly Water Use (L)"?: string;
  "Water Use Intensity (L/m²)"?: string;
  "Number of Employees": string;
}

const Home: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [startYear, setStartYear] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  // const [monthlyAverages, setMonthlyAverages] = useState<number[]>(Array(12).fill(0)); // Added state for monthly averages
  const [monthlyAverages, setMonthlyAverages] = useState<number[]>(Array(12).fill(0)); // Added state for monthly averages
  const [intensityAverages, setIntensityAverages] = useState<number[]>(Array(12).fill(0));
  const [monthlyData, setMonthlyData] = useState<number[]>(Array(12).fill(""));

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
  const [floorArea, setFloorArea] = useState("");
  const [employees, setEmployees] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [euiData, setEuiData] = useState<number[]>(Array(12).fill(0));
  const [wuiData, setWuiData] = useState<number[]>(Array(12).fill(0));
  const [wasteData, setWasteData] = useState<number[]>(Array(12).fill(0))

  useEffect(() => {
    if (wasteType === "Water" && floorArea && parseFloat(floorArea) > 0) {
      // Calculate WUI based on monthlyData and floorArea
      const calculatedWUI = monthlyData.map((usage) =>
        usage && parseFloat(floorArea) > 0 ? usage / parseFloat(floorArea) : 0
      );
      setWuiData(calculatedWUI); // Set WUI data
  
      // Calculate waste as 20% of WUI
      const calculatedWaste = calculatedWUI.map((wui) => wui * 0.2);
      setWasteData(calculatedWaste); // Set waste data
  
      console.log("Water Use Intensity (L/m²):", calculatedWUI);
      console.log("Waste Water Intensity (L/m²):", calculatedWaste);
    }
  }, [monthlyData, floorArea, wasteType]);

  const handleFormSubmit = () => {
    if (region && startYear) {
      loadCsvData(region, startYear); // Load data for the specified region and year
      setShowGraph(true);
    }
  };

  const handleMonthlyDataChange = (index: number, value: string) => {
    const updatedData = [...monthlyData];
    updatedData[index] = parseFloat(value) || 0;
    setMonthlyData(updatedData);
  };

  const loadCsvData = (region: string, year: string) => {
    const filePrefix = wasteType === "Electricity" ? "NEW1" : "NEW2";
    const filePath = `/Data/${filePrefix}_${region.toLowerCase()}.csv`;

    Papa.parse<CsvRow>(filePath, {
      download: true,
      header: true,
      complete: (result) => {
        const yearFilteredData = result.data.filter((row) => row.Year === year);

        const monthlySums: { [key: string]: { useSum: number; intensitySum: number; count: number } } = {};

        yearFilteredData.forEach((row) => {
          const month = row.Month;
        
          // Use optional chaining and default to 0 if the value is missing
          const usage = wasteType === "Electricity"
            ? parseFloat(row["Monthly Electricity Use (kWh)"] ?? "0")
            : parseFloat(row["Monthly Water Use (L)"] ?? "0");
        
          const intensity = wasteType === "Electricity"
            ? parseFloat(row["Electricity Use Intensity (kWh/m²)"] ?? "0")
            : parseFloat(row["Water Use Intensity (L/m²)"] ?? "0");
        
          if (!monthlySums[month]) {
            monthlySums[month] = { useSum: 0, intensitySum: 0, count: 0 };
          }
          monthlySums[month].useSum += usage;
          monthlySums[month].intensitySum += intensity;
          monthlySums[month].count += 1;
        });

        const averages = months.map((month) =>
          monthlySums[month]
            ? monthlySums[month].useSum / monthlySums[month].count
            : 0
        );
        const intensityAverages = months.map((month) =>
          monthlySums[month] ? monthlySums[month].intensitySum / monthlySums[month].count : 0
        );

        setMonthlyAverages(averages);
        setIntensityAverages(intensityAverages);

        console.log(`${wasteType} Usage Averages (${wasteType === "Electricity" ? "kWh" : "L"}):`, averages);
        console.log(`${wasteType} Use Intensity Averages (${wasteType === "Electricity" ? "kWh/m²" : "L/m²"}):`, intensityAverages);
      },
      error: (error) => {
        console.error("Error loading CSV file:", error);
      },
    });
  };

  const isFormComplete = companyName && region && wasteType && startYear;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8 cursor-leaf">
      {!showGraph ? (
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
              EcoTrack is your all-in-one solution for tracking and managing
              energy usage and waste.
            </p>
          </div>
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
              options={["Toronto", "Ottawa", "Mississauga", "Hamilton"]}
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

          {wasteType === "Electricity" && (
            <div className="space-y-4 mt-6">
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
              <h2 className="text-2xl font-semibold text-indigo-700">
                Enter Additional Data for Electricity
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputComponent
                  label="Number of Employees"
                  id="employees"
                  value={employees}
                  placeholder="Enter number of employees"
                  onChange={(e) => setEmployees(e.target.value)}
                />
                <InputComponent
                  label="Floor Area (m²)"
                  id="floorArea"
                  value={floorArea}
                  placeholder="Enter gross floor area"
                  onChange={(e) => setFloorArea(e.target.value)}
                />
                <InputComponent
                  label="Operating Hours per Week"
                  id="workHours"
                  value={workHours}
                  placeholder="Enter weekly operating hours"
                  onChange={(e) => setWorkHours(e.target.value)}
                />
              </div>
            </div>
          )}
          {wasteType === "Water" && (
            <div className="space-y-4 mt-6">
              <div className="space-y-4 mt-6">
                <h2 className="text-2xl font-semibold text-indigo-700">
                  Enter Monthly Data for {wasteType} (L)
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
              <h2 className="text-2xl font-semibold text-indigo-700">
                Enter Additional Data for Water
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputComponent
                  label="Number of Employees"
                  id="employees"
                  value={employees}
                  placeholder="Enter number of employees"
                  onChange={(e) => setEmployees(e.target.value)}
                />
                <InputComponent
                  label="Floor Area (m²)"
                  id="floorArea"
                  value={floorArea}
                  placeholder="Enter gross floor area"
                  onChange={(e) => setFloorArea(e.target.value)}
                />
                <InputComponent
                  label="Operating Hours per Week"
                  id="workHours"
                  value={workHours}
                  placeholder="Enter weekly operating hours"
                  onChange={(e) => setWorkHours(e.target.value)}
                />
              </div>
            </div>
          )}

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
        <div className="w-full mt-6">
          <div className="w-full text-left">
            <h1 className="mb-8 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 hover:cursor-pointer transition-all duration-500 ease-in-out">
              EcoTrack Dashboard
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            Monthly Data for {region} ({startYear})
          </h2>
          <GetSuggestions
            region={region}
            startYear={startYear}
            wasteType={wasteType}
            companyName={companyName}
            // monthlyData={monthlyData}
            // companyData={companyData}
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* LineChart - Reduced width */}
            <div className="w-full max-w-full sm:max-w-[650px] mx-auto cursor-pointer">
              <LineChart
                labels={months}
                userDataset={monthlyData}
                companyDataset={monthlyAverages} // Use monthly averages here
                chartTitle={`Monthly ${wasteType} Usage Comparison for ${companyName}`}
                xAxisLabel="Months"
                yAxisLabel={`${
                  wasteType === "Electricity"
                    ? "Electricity Usage (kWh)"
                    : "Water Usage (L)"
                }`}
                region={region}
              />
            </div>

            {/* PieChart - Centered */}
            <div className="mt-2 max-w-[300px] h-[300px] mx-auto hover:cursor-pointer">
              <PieChart monthlyData={monthlyData} />
            </div>
          </div>
          <div className="mt-8">
            {/* New BarChart component */}
            <div className="mt-2 max-w-[800px] h-[400px] mx-auto hover:cursor-pointer">
              {wasteType === "Electricity" ? 
              <BarChart
                labels={months}
                userDataset={euiData}
                companyDataset={intensityAverages}
              />
                  : <WaterBarGraph
                  labels={months}
                  userDataset={wuiData} // Pass WUI data as userDataset
                  companyDataset={wasteData} // Pass waste data as companyDataset
                />
                  }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
