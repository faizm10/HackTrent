import React, { useState, useEffect } from "react";
import DropdownComponent from "@/components/DropdownComponent";
import MonthlyUsageChart from "@/components/Graphs/MonthlyUsageChart";

interface DataType {
  CompanyName: string;
  Location: string;
  Year: number;
  Month: string;
  MonthlyElectricityUsage: number;
  ElectricityUseIntensity: number;
  OperatingHoursPerWeek: number;
  NumberOfEmployees: number;
}

const DynamicDashboard: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("Toronto");
  const [selectedYear, setSelectedYear] = useState<number>(2020);

  // Fetch data from the public directory
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/data_toronto.csv");
      const csvText = await response.text();
      const parsedData = parseCSVData(csvText);
      setData(parsedData);
    };

    fetchData();
  }, []);

  // Utility function to parse CSV data into JSON format
  const parseCSVData = (csvText: string): DataType[] => {
    const rows = csvText.split("\n").slice(1); // remove header
    return rows.map((row) => {
      const [CompanyName, Location, Year, Month, MonthlyElectricityUsage, ElectricityUseIntensity, OperatingHoursPerWeek, NumberOfEmployees] = row.split(",");
      return {
        CompanyName,
        Location,
        Year: parseInt(Year),
        Month,
        MonthlyElectricityUsage: parseFloat(MonthlyElectricityUsage),
        ElectricityUseIntensity: parseFloat(ElectricityUseIntensity),
        OperatingHoursPerWeek: parseInt(OperatingHoursPerWeek),
        NumberOfEmployees: parseInt(NumberOfEmployees),
      };
    });
  };

  // Filter data based on selected city and year
  const filteredData = data.filter(
    (entry) => entry.Location === selectedCity && entry.Year === selectedYear
  );

  // Extract monthly usage data for the chart
  const monthlyUsage = filteredData.map((entry) => entry.MonthlyElectricityUsage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700">
        Dynamic Monthly Electricity Usage
      </h1>

      {/* City and Year Selection */}
      <div className="flex space-x-4">
        <DropdownComponent
          label="City"
          options={Array.from(new Set(data.map((item) => item.Location)))}
          selected={selectedCity}
          onSelect={setSelectedCity}
        />
        <DropdownComponent
          label="Year"
          options={Array.from(new Set(data.map((item) => item.Year.toString())))}
          selected={selectedYear.toString()}
          onSelect={(year) => setSelectedYear(parseInt(year))}
        />
      </div>

      {/* Render Monthly Usage Chart */}
      <div className="w-full mt-6">
        {monthlyUsage.length > 0 ? (
          <MonthlyUsageChart
            monthlyUsage={monthlyUsage}
            title={`${selectedCity} - ${selectedYear} Monthly Electricity Usage`}
          />
        ) : (
          <p>No data available for the selected city and year.</p>
        )}
      </div>
    </div>
  );
};

export default DynamicDashboard;
