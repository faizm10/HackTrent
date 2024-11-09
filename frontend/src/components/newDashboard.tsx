// components/Dashboard.tsx
import React from 'react';
import AnnualSummaryChart from "@/components/Graphs/PieChart";
import ElectricityIntensityChart from "@/components/Graphs/BarGraph";
import MonthlyUsageChart from '@/components/Graphs/MonthlyUsageChart';
import Usage from "@/components/Usage";
import DropdownComponent from "@/components/DropdownComponent";

interface DashboardProps {
  formData: {
    companyName: string;
    region: string;
    wasteType: string;
    startYear: string;
    monthlyUsage: number[];
    floorArea: string;
    numEmployees: string;
    workHours: string;
  };
  comparisonType: string;
  setComparisonType: (value: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ formData, comparisonType, setComparisonType }) => {
  return (
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
          <Usage formData={formData} />
          <div className="mt-8">
            <AnnualSummaryChart monthlyUsage={formData.monthlyUsage} />
          </div>
          <div className="mt-8">
            <ElectricityIntensityChart
              monthlyUsage={formData.monthlyUsage}
              floorArea={Number(formData.floorArea)}
            />
            <MonthlyUsageChart monthlyUsage={formData.monthlyUsage} />
          </div>
        </>
      ) : (
        <>
          {/* Placeholder components or mock data for "Other Companies" comparison */}
          <Usage
            formData={{
              companyName: "Other Company",
              region: "Toronto",
              wasteType: formData.wasteType,
              startYear: formData.startYear,
              monthlyUsage: [300, 320, 290, 310, 300, 330, 340, 360, 320, 300, 310, 290],
              floorArea: "500",
              numEmployees: "200",
              workHours: "40",
            }}
          />
          <div className="mt-8">
            <AnnualSummaryChart
              monthlyUsage={[100, 200, 150, 250, 300, 200, 400, 500, 450, 300, 200, 150]}
              title="Custom Quarterly Usage Distribution"
              width="500px"
              height="500px"
              colors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
            />
          </div>
          <div className="mt-8">
            <ElectricityIntensityChart
              monthlyUsage={[100, 200, 150, 250, 300, 200, 400, 500, 450, 300, 200, 150]}
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
  );
};

export default Dashboard;
