// frontend/src/components/DataVisualization.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataVisualization = () => {
    const [neoData, setNeoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNeoData = async () => {
            try {
                // Fetch Near Earth Objects (NeoWs) data from NASA API
                const response = await axios.get(
                    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-07&api_key=${process.env.REACT_APP_NASA_API_KEY}`
                );
                setNeoData(response.data.near_earth_objects);
            } catch (err) {
                setError('Failed to fetch Near Earth Objects data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNeoData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    // Process data for the chart
    const chartData = {
        labels: Object.keys(neoData), // Dates
        datasets: [
            {
                label: 'Number of Near Earth Objects',
                data: Object.values(neoData).map((objects) => objects.length), // Number of objects per day
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Near Earth Objects',
            },
        },
    };

    return (
        <div className="data-visualization-container">
            <h2>Near Earth Objects (NeoWs) Visualization</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DataVisualization;