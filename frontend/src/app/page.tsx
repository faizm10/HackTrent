// pages/Home.tsx
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
  const [comparisonType, setComparisonType] = useState("My Company"); // New state for filtering comparison type
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleFormSubmit = () => {
    setShowGraph(true);
  };

  const isFormComplete =
    companyName &&
    region &&
    wasteType &&
    startYear &&
    monthlyUsage.every((value) => value) && // Ensure all monthly usage fields are filled
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
                  monthlyUsage: monthlyUsage.map(Number),
                  floorArea,
                  numEmployees,
                  workHours,
                }}
              />
              <div className="mt-8">
                <AnnualSummaryChart monthlyUsage={monthlyUsage.map(Number)} />
              </div>
              <div className="mt-8">
                <ElectricityIntensityChart
                  monthlyUsage={monthlyUsage.map(Number)}
                  floorArea={Number(floorArea)}
                />
                <MonthlyUsageChart monthlyUsage={monthlyUsage}/>
              </div>
              
            </>
          ) : (
            <>
              {/* Placeholder components or mock data for "Other Companies" comparison */}
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
