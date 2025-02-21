import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">NASA Space Explorer</div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/apod">Astronomy Picture of the Day</Link>
                </li>
                <li>
                    <Link to="/mars-rover-photos">Mars Rover Photos</Link>
                </li>
                <li>
                    <Link to="/data-visualization">Data Visualization</Link>
                </li>
                <li>
                    <Link to="/epic">EPIC Images</Link> 
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;