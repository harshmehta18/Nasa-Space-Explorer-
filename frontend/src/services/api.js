
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002';

export const getAPOD = async () => {
    const response = await axios.get(`${API_BASE_URL}/apod`);
    return response.data;
};

export const getMarsRoverPhotos = async (rover, earth_date) => {
    const response = await axios.get(`${API_BASE_URL}/mars-rover-photos`, {
        params: { rover, earth_date },
    });
    return response.data;
};