// frontend/src/components/APOD.js
import React, { useEffect, useState } from 'react';
import { getAPOD } from '../services/api';

const APOD = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const data = await getAPOD();
                setApodData(data);
            } catch (err) {
                setError('Failed to fetch APOD data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchAPOD();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="apod-container">
            <h1 className="apod-title">{apodData.title}</h1>
            <div className="apod-media">
                {apodData.media_type === 'image' ? (
                    <img src={apodData.url} alt={apodData.title} className="apod-image" />
                ) : (
                    <iframe
                        title={apodData.title}
                        src={apodData.url}
                        frameBorder="0"
                        allowFullScreen
                        className="apod-video"
                    />
                )}
            </div>
            <p className="apod-explanation">{apodData.explanation}</p>
        </div>
    );
};

export default APOD;