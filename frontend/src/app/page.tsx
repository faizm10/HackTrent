"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

import { Image } from "@nextui-org/react";
import Usage  from "../component/Dashboard";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8 space-y-12">
      {/* Welcome Message and Paragraph */}
      <div className="w-full">
        <h1 className="text-5xl font-extrabold text-left text-indigo-700">
          <Typewriter
            words={["Welcome to EcoTrack!"]}
            loop={false}
            typeSpeed={100}
            deleteSpeed={50}
            cursor
          />
        </h1>

        <p className="text-left mt-6 max-w-3xl text-lg text-gray-800">
          EcoTrack is your all-in-one solution for tracking and managing energy usage and waste. By providing your company information, region, and waste type, we can help you calculate and monitor your electricity/natural gas consumption trends over time.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col md:flex-row gap-12 w-full">
        {/* Left Column: Inputs outside the form */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Company Name Input */}
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Region Dropdown */}
          <div className="mb-4">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              Select Region:
            </label>
            <select id="region" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition">
              <option value="">Select a city</option>
              <option value="toronto">Toronto</option>
              <option value="ottawa">Ottawa</option>
              <option value="mississauga">Mississauga</option>
              <option value="brampton">Brampton</option>
              <option value="hamilton">Hamilton</option>
            </select>
          </div>

          {/* Waste Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
              Waste Type:
            </label>
            <select id="wasteType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition">
              <option value="">Select waste type</option>
              <option value="electricity">Electricity</option>
              <option value="naturalGas">Natural Gas</option>
            </select>
          </div>

          {/* Starting Year Dropdown */}
          <div className="mb-4">
            <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
              Starting Year:
            </label>
            <select id="startYear" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition">
              <option value="">Select starting year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>

        <p className="text-center text-xl mb-5">Welcome To Your Dashboard</p>
      </main>
      <Usage/>

    </div>
  );
};

export default Home;
