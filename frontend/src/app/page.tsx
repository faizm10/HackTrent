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

  const isFormComplete = companyName && region && wasteType && startYear;

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
