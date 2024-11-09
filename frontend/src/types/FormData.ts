// types/FormData.ts
export interface FormData {
    companyName: string;
    region: string;
    wasteType: string;
    startYear: string;
    monthlyUsage: string[]; // Monthly electricity usage as an array
    floorArea: string;
    numEmployees: string;
    workHours: string;
  }
  