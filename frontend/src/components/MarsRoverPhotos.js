// frontend/src/components/MarsRoverPhotos.js
import React, { useState } from 'react';
import { getMarsRoverPhotos } from '../services/api';

// Define available cameras for each rover
const roverCameras = {
    curiosity: [
        { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
        { value: 'MAST', label: 'Mast Camera' },
        { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
        { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
        { value: 'MARDI', label: 'Mars Descent Imager' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
    ],
    opportunity: [
        { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
        { value: 'PANCAM', label: 'Panoramic Camera' },
        { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' },
    ],
    spirit: [
        { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
        { value: 'PANCAM', label: 'Panoramic Camera' },
        { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' },
    ],
};

const MarsRoverPhotos = () => {
    const [rover, setRover] = useState('curiosity');
    const [camera, setCamera] = useState('FHAZ'); // Default camera
    const [earthDate, setEarthDate] = useState('2023-10-01');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noPhotosMessage, setNoPhotosMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setNoPhotosMessage(''); // Reset the no photos message

        try {
            const data = await getMarsRoverPhotos(rover, earthDate, camera);
            if (data.photos.length === 0) {
                setNoPhotosMessage('No photos available for the selected date, rover, and camera. Please select another combination.');
            } else {
                setNoPhotosMessage(''); // Clear the message if photos are found
            }
            setPhotos(data.photos);
        } catch (err) {
            setError('Failed to fetch Mars Rover photos. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mars-rover-photos-container">
            <h1>Mars Rover Photos</h1>
            <form onSubmit={handleSubmit} className="rover-form">
                <label>
                    Rover:
                    <select value={rover} onChange={(e) => setRover(e.target.value)}>
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </label>
                <label>
                    Camera:
                    <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                        {roverCameras[rover].map((cam) => (
                            <option key={cam.value} value={cam.value}>
                                {cam.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Earth Date:
                    <input
                        type="date"
                        value={earthDate}
                        onChange={(e) => setEarthDate(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Photos'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {noPhotosMessage && <div className="no-photos-message">{noPhotosMessage}</div>}

            <div className="photo-grid">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo-item">
                        <img src={photo.img_src} alt={`Mars Rover ${rover}`} />
                        <p>Camera: {photo.camera.full_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarsRoverPhotos;