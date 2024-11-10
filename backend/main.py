from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from your React app

# Load CSV data
df = pd.read_csv('data/NEW_cities.csv')

@app.route('/data', methods=['GET'])
def get_data():
    # Get filter parameters from the request
    year = request.args.get('year')
    location = request.args.get('location')

    # Apply filtering based on year and location
    filtered_df = df
    if year:
        filtered_df = filtered_df[filtered_df['Year'] == year]
    if location:
        filtered_df = filtered_df[filtered_df['Location'] == location]

    # Convert filtered data to JSON format
    data = filtered_df.to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
