// // pages/Analytics.tsx
// import React from 'react';
// import MonthlyUsageChart from '@/components/Graphs/MonthlyUsageChart';
// import ElectricityIntensityChart from '@/components/Graphs/BarGraph';
// import AnnualSummaryChart from '@/components/Graphs/PieChart';


// const AnalyticsPage: React.FC = () => {
//   const monthlyUsage = [300, 280, 320, 310, 295, 345, 256, 225, 64, 4, 64, 3]; // Example data
//   const floorArea = 2000; // Example floor area in square meters
//   const numEmployees = 150; // Example number of employees
//   const benchmarkIntensity = 0.15; // Example benchmark intensity

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Energy Usage Analytics</h1>
//       <MonthlyUsageChart monthlyUsage={monthlyUsage} />
//       <ElectricityIntensityChart monthlyUsage={monthlyUsage} floorArea={floorArea} />
//       <AnnualSummaryChart monthlyUsage={monthlyUsage} />
//     </div>
//   );
// };

// export default AnalyticsPage;
