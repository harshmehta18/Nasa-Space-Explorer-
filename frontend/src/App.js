// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import APOD from './components/APOD';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import DataVisualization from './components/DataVisualization';
import EPIC from './components/EPIC'; 
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apod" element={<APOD />} />
                <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
                <Route path="/data-visualization" element={<DataVisualization />} />
                <Route path="/epic" element={<EPIC />} />
            </Routes>
        </Router>
    );
}

export default App;