// utils/getMonthlyUsageData.ts

interface MonthlyData {
  CompanyName: string;
  Location: string;
  Year: number;
  Month: string;
  MonthlyElectricityUse: number;
}

export const getMonthlyUsageData = (
  data: MonthlyData[],
  city: string,
  year: number
): number[] => {
  const monthlyUsage = Array(12).fill(0);

  data.forEach((entry) => {
    if (entry.Location === city && entry.Year === year) {
      const monthIndex = new Date(`${entry.Month} 1, ${year}`).getMonth(); // Convert month to index
      monthlyUsage[monthIndex] += entry.MonthlyElectricityUse;
    }
  });

  return monthlyUsage;
};
