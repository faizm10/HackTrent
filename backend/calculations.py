import pandas as pd

# Load the data
file_path = '/Users/mohammedsalih/Desktop/Self codes/Hackaton/HackTrent/backend/Data/newmock.csv'
electricity_data = pd.read_csv(file_path)

# Define the benchmark for electricity use intensity
benchmark_intensity = 100

# Calculate wastage per company
electricity_data['Electricity Wastage (kWh)'] = electricity_data.apply(
    lambda row: (row['Electricity Use Intensity (kWh/m²)'] - benchmark_intensity) * row['Gross Floor Area (m²)']
    if row['Electricity Use Intensity (kWh/m²)'] > benchmark_intensity else 0,
    axis=1
)

# Display or save the updated data
print(electricity_data[['Company Name', 'Electricity Wastage (kWh)']])

# Calculate electricity use intensity if it's not already in the dataset
electricity_data['Electricity Use Intensity (kWh/m²)'] = electricity_data['Annual Electricity Use (kWh)'] / electricity_data['Gross Floor Area (m²)']

# Display the data with the calculated intensity per company
print(electricity_data[['Company Name', 'Electricity Use Intensity (kWh/m²)']])


