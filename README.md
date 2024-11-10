# **EcoTrack – AI-Driven Resource Efficiency Tracker for Offices**

**EcoTrack** is a web application that empowers office managers to monitor and reduce resource consumption, making workplaces more sustainable. With AI-powered insights and trend visualization, EcoTrack helps users optimize energy, water, and paper usage, ultimately lowering costs and environmental impact.

---

## **Challenge Category**
**Environmental Impact**: EcoTrack addresses sustainability goals by helping offices track and reduce their resource usage, promoting greener practices in daily operations.
**Artificial Intelligence**: An intelligent assistant that provides instant feedback and actionable tips to optimize office resource usage and reduce environmental impact.

---

## **Features**

- **Resource Tracking**: Input monthly data for energy, water, and paper usage, providing a centralized resource management tool for offices.
- **Usage Trends**: Visualize resource consumption trends over time with clear, interactive charts that identify areas for improvement.
- **AI-Powered Efficiency Suggestions**: Receive actionable tips powered by AI to reduce resource wastage, helping offices save on utilities and reduce their environmental footprint.

---

## **Technologies Used**

**Frontend**
- **React**: For building dynamic and responsive UI components.
- **Next.js**: Framework for server-side rendering and optimizing page load speeds.
- **Chart.js**: For creating interactive charts that visualize usage trends.
- **Framer**: For adding animations and enhancing user experience.

**Backend**
- **Python**: Used for data processing and AI-based suggestions.
- **Flask**: A lightweight backend framework for handling API requests and processing resource data.
  
**Data Analysis**
- **Pandas**: Used for data parsing and statistical analysis to generate monthly averages and usage patterns.

---

## **Getting Started**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/faizm10/HackTrent
   ```
   
2. **Navigate** into the project directory:
   ```bash
   cd EcoTrack
   ```

3. **Install frontend dependencies**:
   ```bash
   npm install
   ```

4. **Install backend dependencies** (create and activate a virtual environment):
   ```bash
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

5. **Run the backend server**:
   ```bash
   python main.py
   ```
   The backend server should now be running on `http://localhost:5000`.

6. **Run the frontend**:
   ```bash
   npm run dev
   ```
   Your app should now be running on `http://localhost:3000`.

---

## **Usage**

1. **Enter Resource Data**:
   - Log your office’s monthly resource usage for energy, water, and paper.

2. **View Usage Trends**:
   - Access the dashboard to track resource usage trends over time, making it easy to identify periods of high or low consumption.

3. **AI-Powered Suggestions**:
   - Receive simple, AI-driven recommendations based on your data to help improve efficiency and reduce resource wastage.

---

## **Project Structure**

```
EcoTrack/
├── frontend/
│   ├── components/         # React components for UI elements and charts
│   ├── pages/              # Next.js pages for routing
│   ├── public/             # Static assets such as images and icons
│   ├── lib/                # Libraries and helper functions for frontend logic
│   ├── styles/             # CSS and styling files
│   └── utils/              # Utility functions used across the frontend
├── backend/
│   ├── main.py             # Main backend server file using Flask
│   ├── requirements.txt    # Python dependencies for the backend
│   └── utils/              # Utility functions for data processing
├── README.md               # Project README with setup and usage instructions
└── LICENSE                 # Project license file
```

---

## **Contributing**

EcoTrack welcomes contributions to enhance functionality and usability. Here’s how you can contribute:

1. **Fork the repository** on GitHub.
2. **Create a branch**: `git checkout -b your-branch-name`
3. **Commit your changes**: `git commit -m "Add a brief description of your changes"`
4. **Push to the branch**: `git push origin your-branch-name`
5. **Open a pull request** on GitHub to submit your changes for review.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---

## **Future Scope and Improvements**
1. **Expand AI Recommendations**: Leverage more detailed data analytics to generate tailored recommendations.
2. **Add Real-Time Monitoring**: Implement live data tracking for more immediate insights.
3. **Integrate with IoT**: Incorporate IoT sensors to automate data collection for even more accurate insights.

---

## **HackTrent Submission Requirements**

- **Project Name and Description**: EcoTrack – AI-Driven Resource Efficiency Tracker for Offices.
- **Challenge Category**: Environmental Impact + Artificial intelligence
- **Features and Functionality**: See **Features** section above.
- **Demo Video**: [Link to video showcasing EcoTrack in action (add after recording)].
- **Code Repository**: [GitHub repository](https://github.com/faizm10/HackTrent).
- **Code Repository**: [DevPost]().
- **Technical Documentation**: Refer to **Project Structure** and **Usage** sections for setup and architecture details.
- **Future Scope and Improvements**: See **Future Scope and Improvements** section.
