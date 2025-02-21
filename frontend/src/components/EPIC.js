import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EPIC = () => {
    const [epicData, setEpicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEPICData = async () => {
            try {
                const response = await axios.get('http://localhost:5002/epic');
                setEpicData(response.data);
            } catch (err) {
                setError('Failed to fetch EPIC data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEPICData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="epic-container">
            <h1>Earth Polychromatic Imaging Camera (EPIC)</h1>
            <p>Explore stunning images of Earth captured by NASA's DSCOVR satellite.</p>
            <div className="epic-gallery">
                {epicData.map((image) => (
                    <div key={image.identifier} className="epic-item">
                        <img
                            src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(0, 4)}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/png/${image.image}.png`}
                            alt={image.caption}
                            className="epic-image"
                        />
                        <p className="epic-caption">
                            Captured on: {new Date(image.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EPIC;