"use client";
import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import DropdownComponent from "@/components/DropdownComponent";
import InputComponent from "@/components/InputComponent";
import Usage from "@/components/Usage";
import AnnualSummaryChart from "@/components/Graphs/PieChart";
import ElectricityIntensityChart from "@/components/Graphs/BarGraph";

import MonthlyUsageChart from '@/components/Graphs/MonthlyUsageChart';
import LandingPage from "@/components/LandingPage";
import Link from "next/link";

import Papa from "papaparse";
import { Button } from "@nextui-org/react";
const Home: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [startYear, setStartYear] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [numEmployees, setnumEmployees] = useState("");
  const [workHours, setworkHours] = useState("");
  const [monthlyUsage, setMonthlyUsage] = useState(Array(12).fill("")); // Monthly electricity usage
  const [showGraph, setShowGraph] = useState(false);
  const [comparisonType, setComparisonType] = useState("My Company");
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
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

  const handleFormSubmit = () => {
    loadCsvData(region, startYear); // Load data for specific year
    setShowGraph(true);
  };

  const isFormComplete =
    companyName &&
    region &&
    wasteType &&
    startYear &&
    monthlyUsage.every((value) => value) &&
    floorArea &&
    numEmployees &&
    workHours;

  if (!hasMounted) {
    return null;
  }

  const handleMonthlyUsageChange = (index: number, value: string) => {
    const updatedUsage = [...monthlyUsage];
    updatedUsage[index] = value;
    setMonthlyUsage(updatedUsage);
  };

  // Calculate display values for monthly usage, floor area, employees, and work hours based on filtered data
  const displayMonthlyUsage = filteredData.map(row => Number(row["Monthly Electricity Use (kWh)"]));
  const displayFloorArea = filteredData.length > 0 ? Number(filteredData[0]["Gross Floor Area (m²)"]) : Number(floorArea);
  const displayNumEmployees = filteredData.length > 0 ? Number(filteredData[0]["Number of Employees"]) : Number(numEmployees);
  const displayWorkHours = filteredData.length > 0 ? Number(filteredData[0]["Operating Hours per Week"]) : Number(workHours);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8">
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
        <Link href="/DynamicChartPage">Go to Dynamic Chart Page</Link>
      </div>

      {!showGraph && (
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
              options={[
                "Toronto",
                "Ottawa",
                "Mississauga",
                "Brampton",
                "Hamilton",
                "Markham",
              ]}
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
              <h2 className="text-2xl font-semibold text-indigo-700">
                Monthly Electricity Usage (kWh)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
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
                ].map((month, index) => (
                  <InputComponent
                    key={month}
                    label={month}
                    id={`electricityUsage-${index}`}
                    value={monthlyUsage[index]}
                    placeholder={`Enter usage for ${month}`}
                    onChange={(e) =>
                      handleMonthlyUsageChange(index, e.target.value)
                    }
                    type="number"
                  />
                ))}
              </div>
            </div>
          )}

          {wasteType === "Electricity" && (
            <div className="space-y-4 mt-6">
              <InputComponent
                label="Floor Area (m²)"
                id="floorArea"
                value={floorArea}
                placeholder="Enter your floor area in m²"
                onChange={(e) => setFloorArea(e.target.value)}
                type="number"
              />
              <InputComponent
                label="Number of Employees"
                id="numEmployees"
                value={numEmployees}
                placeholder="Enter the number of employees"
                onChange={(e) => setnumEmployees(e.target.value)}
                type="number"
              />
              <InputComponent
                label="Working Hours per Week"
                id="workHours"
                value={workHours}
                placeholder="Enter working hours per week"
                onChange={(e) => setworkHours(e.target.value)}
                type="number"
              />
            </div>
          )}

          <div className="w-full flex justify-center mt-6">
            {/* <Link href="/DynamicChartPage" passHref>
              <button
                disabled={!isFormComplete}
                className={`w-full md:w-48 bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition ${
                  !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isFormComplete ? handleFormSubmit : undefined} // Only call if form is complete
              >
                Confirm
              </button>
            </Link> */}

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
      )}

      {showGraph && (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            Data for {region} ({startYear})
          </h2>
          <div className="flex justify-center mb-4">
            <DropdownComponent
              label="Comparison Type"
              options={["My Company", "Other Companies"]}
              selected={comparisonType}
              onSelect={setComparisonType}
            />
          </div>
          {comparisonType === "My Company" ? (
            <>
              <Usage
                formData={{
                  companyName,
                  region,
                  wasteType,
                  startYear,
                  monthlyUsage: displayMonthlyUsage,
                  floorArea: displayFloorArea,
                  numEmployees: displayNumEmployees,
                  workHours: displayWorkHours,
                }}
              />
              <div className="mt-8">
                <AnnualSummaryChart monthlyUsage={displayMonthlyUsage} />
              </div>
              <div className="mt-8">
                <ElectricityIntensityChart
                  monthlyUsage={displayMonthlyUsage}
                  floorArea={displayFloorArea}
                />
                <MonthlyUsageChart monthlyUsage={monthlyUsage} />
              </div>
            </>
          ) : (
            // Code for displaying data for "Other Companies"
            <>
              <Usage
                formData={{
                  companyName: "Other Company",
                  region: "Toronto",
                  wasteType,
                  startYear,
                  monthlyUsage: [
                    300, 320, 290, 310, 300, 330, 340, 360, 320, 300, 310, 290,
                  ],
                  floorArea: "500",
                  numEmployees: "200",
                  workHours: "40",
                }}
              />
              <div className="mt-8">
                <AnnualSummaryChart
                  monthlyUsage={[
                    100, 200, 150, 250, 300, 200, 400, 500, 450, 300, 200, 150,
                  ]}
                  title="Custom Quarterly Usage Distribution"
                  width="500px"
                  height="500px"
                  colors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
                />
              </div>
              <div className="mt-8">
                <ElectricityIntensityChart
                  monthlyUsage={[
                    100, 200, 150, 250, 300, 200, 400, 500, 450, 300, 200, 150,
                  ]}
                  floorArea={1000}
                  title="Custom Electricity Intensity"
                  width="800px"
                  height="500px"
                  color="rgba(54, 162, 235, 0.6)"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
