"use client";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Home: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [startYear, setStartYear] = useState('');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [floorArea, setFloorArea] = useState('');
  const [numEmployees, setnumEmployees] = useState('');
  const [workHours, setworkHours] =useState('');

  const handleFormSubmit = () => {
    const formData = {
      companyName,
      region,
      wasteType,
      startYear,
      electricityUsage,
      floorArea,
      numEmployees,
      workHours,
    };
  
    localStorage.setItem('ecoTrackFormData', JSON.stringify(formData));
  };
  

  const isFormComplete = companyName && region && wasteType && startYear && electricityUsage && floorArea && numEmployees && workHours;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Welcome Message and Paragraph */}
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
          EcoTrack is your all-in-one solution for tracking and managing energy usage and waste. By providing your company information, region, and waste type, we can help you calculate and monitor your electricity/water consumption trends over time.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl space-y-6">
        {/* Company Name Input */}
        <div className="space-y-4">
          <div className="w-full">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 ml-1">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Dropdowns for Region, Waste Type, and Start Year */}
          <div className="flex space-x-4 justify-center"> {/* Center the dropdowns */}
            {/* Region Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-[Buttonfont] bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  {region ? region : "Select Region"}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg border border-gray-200 mt-1 p-2 w-48">
                  <DropdownMenuLabel className="text-gray-700 font-semibold">Ontario Cities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRegion('Toronto')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Toronto</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion('Ottawa')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Ottawa</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion('Mississauga')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Mississauga</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion('Brampton')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Brampton</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion('Hamilton')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Hamilton</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion('Markham')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Markham</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Waste Type Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-[Buttonfont] bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  {wasteType ? wasteType : "Select Waste Type"}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg border border-gray-200 mt-1 p-2 w-48">
                  <DropdownMenuLabel className="text-gray-700 font-semibold">Waste Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setWasteType('Electricity')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Electricity</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setWasteType('Water')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">Water</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Starting Year Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-[Buttonfont] bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  {startYear ? startYear : "Select Starting Year"}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg border border-gray-200 mt-1 p-2 w-48">
                  <DropdownMenuLabel className="text-gray-700 font-semibold">Starting Year</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStartYear('2020')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">2020</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStartYear('2021')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">2021</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStartYear('2022')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">2022</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStartYear('2023')} className="hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200">2023</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Electricity Specific Input */}
        {wasteType === 'Electricity' && (
          <div className="space-y-4 mt-6">
            <div className="w-full">
              <label htmlFor="electricityUsage" className="block text-sm font-medium text-gray-700 ml-1">Electricity Usage (kWh):</label>
              <input
                type="number"
                id="electricityUsage"
                value={electricityUsage}
                onChange={(e) => setElectricityUsage(e.target.value)}
                placeholder="Enter your electricity usage in kWh"
                className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="w-full">
              <label htmlFor="floorArea" className="block text-sm font-medium text-gray-700 ml-1">Floor Area (m^2):</label>
              <input 
              type="number"
              id="floorArea"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              placeholder="Enter your floor area in m^2"
              className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="w-full">
              <label htmlFor="numEmployees" className="block text-sm font-medium text-gray-700 ml-1">Number of Employees:</label>
              <input 
              type="number"
              id="numEmployees"
              value={numEmployees}
              onChange={(e) => setnumEmployees(e.target.value)}
              placeholder="Enter the number of employees in your company"
              className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="w-full">
              <label htmlFor="workHours" className="block text-sm font-medium text-gray-700 ml-1">Working hours per week:</label>
              <input 
              type="number"
              id="workHours"
              value={workHours}
              onChange={(e) => setworkHours(e.target.value)}
              placeholder="Enter the number of employees in your company"
              className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        )}

        {/* Button Section - Centered under the inputs */}
        <div className="w-full flex justify-center mt-6"> {/* Centering the button */}
          <button
            disabled={!isFormComplete}
            className={`w-full md:w-48 bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleFormSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
