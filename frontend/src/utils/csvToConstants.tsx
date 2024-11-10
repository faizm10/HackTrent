// import * as fs from 'fs';
// import * as path from 'path';
// import * as Papa from 'papaparse';

// interface CsvRow {
//   "Company Name": string;
//   Location: string;
//   Year: string;
//   Month: string;
//   "Gross Floor Area (m²)": string;
//   "Monthly Electricity Use (kWh)": string;
//   "Electricity Use Intensity (kWh/m²)": string;
//   "Operating Hours per Week": string;
//   "Number of Employees": string;
// }

// // Read CSV file content
// const csvFilePath = path.resolve(__dirname, './path/to/NEW_toronto.csv');
// const csvContent = fs.readFileSync(csvFilePath, 'utf8');

// // Parse CSV content
// const parsedData: CsvRow[] = Papa.parse<CsvRow>(csvContent, {
//   header: true,
//   skipEmptyLines: true,
// }).data;

// // Export parsed data as constants
// export const COMPANY_DATA = parsedData.map(row => ({
//   companyName: row["Company Name"],
//   location: row.Location,
//   year: parseInt(row.Year, 10),
//   month: row.Month,
//   grossFloorArea: parseFloat(row["Gross Floor Area (m²)"]),
//   monthlyElectricityUse: parseFloat(row["Monthly Electricity Use (kWh)"]),
//   electricityUseIntensity: parseFloat(row["Electricity Use Intensity (kWh/m²)"]),
//   operatingHoursPerWeek: parseInt(row["Operating Hours per Week"], 10),
//   numberOfEmployees: parseInt(row["Number of Employees"], 10),
// }));

// // Optional: Separate constants for different fields
// export const COMPANY_NAMES = COMPANY_DATA.map(data => data.companyName);
// export const LOCATIONS = COMPANY_DATA.map(data => data.location);
// export const YEARS = COMPANY_DATA.map(data => data.year);
// export const MONTHLY_ELECTRICITY_USE = COMPANY_DATA.map(data => data.monthlyElectricityUse);
