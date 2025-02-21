// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAPOD, getMarsRoverPhotos } from '../services/api';

const Home = () => {
    const [apodData, setApodData] = useState(null);
    const [marsRoverData, setMarsRoverData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch APOD data
                const apodResponse = await getAPOD();
                setApodData(apodResponse);
                const marsRoverResponse = await getMarsRoverPhotos('curiosity', new Date().toISOString().split('T')[0]);
                setMarsRoverData(marsRoverResponse.photos[0]); 
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-container">
            {/* Main Content Section */}
            <main className="home-content">
                {/* About NASA Section */}
                <section className="home-section">
                    <h2>About NASA</h2>
                    <p>
                        The National Aeronautics and Space Administration (NASA) is the United States government agency responsible
                        for the nation's civilian space program and for aeronautics and aerospace research. Since its establishment
                        in 1958, NASA has been at the forefront of space exploration, scientific discovery, and technological
                        innovation.
                    </p>
                </section>

                {/* Our Mission Section */}
                <section className="home-section">
                    <h2>Our Mission</h2>
                    <p>
                        NASA's mission is to drive advances in science, technology, and exploration to enhance knowledge, education,
                        innovation, economic vitality, and stewardship of Earth. From landing humans on the Moon to sending rovers
                        to Mars, NASA continues to push the boundaries of what's possible.
                    </p>
                </section>

                {/* Explore More Section */}
                <section className="home-section">
                    <h2>Explore More</h2>
                    <p>
                        Use this platform to explore NASA's vast collection of space data. Check out the Astronomy Picture of the
                        Day, view images captured by Mars rovers, and learn about near-Earth objects. The universe is waiting for
                        you!
                    </p>  
                </section>
            </main>
            {/* Latest News Section */}
            <section className="news-updates">
                <h2>Latest News from NASA</h2>
                <div className="news-grid">
                <div className="news-item">
                     <h3>
                       <a
                        href="https://www.nasa.gov/psyche"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="news-link"
                       >
                        NASA's Psyche Mission
                      </a>
                     </h3>
                      <p>
                        
                         NASA's Psyche mission, set to launch in 2023, will explore a unique metal-rich asteroid named Psyche,
                        located in the asteroid belt between Mars and Jupiter. This mission aims to provide insights into   
                        the building blocks of planet formation.
                     </p>
                </div>
                    <div className="news-item">
                        <h3>
                            <a
                                href="https://www.nasa.gov/mission_pages/webb/main/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                James Webb Space Telescope
                            </a>
                        </h3>
                        <p>
                            The James Webb Space Telescope, launched in December 2021, is providing unprecedented views of the universe,
                            from the formation of galaxies to the atmospheres of exoplanets.
                        </p>
                    </div>
                    <div className="news-item">
                        <h3>
                            <a
                                href="https://www.nasa.gov/perseverance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                Mars Sample Return Mission
                            </a>
                        </h3>
                        <p>
                            NASA and ESA are collaborating on the Mars Sample Return mission, which will bring samples from Mars back to
                            Earth for detailed analysis.
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Missions Section */}
            <section className="upcoming-missions">
                <h2>Upcoming Missions</h2>
                <div className="missions-grid">
                    <div className="mission-item">
                        <h3>Europa Clipper</h3>
                        <p>
                            Scheduled for launch in 2024, the Europa Clipper mission will explore Jupiter's moon Europa to investigate
                            its potential to support life.
                        </p>
                        <a
                            href="https://www.nasa.gov/europa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mission-link"
                        >
                            Learn More
                        </a>
                    </div>
                    <div className="mission-item">
                        <h3>DART Mission</h3>
                        <p>
                            The Double Asteroid Redirection Test (DART) mission, launched in 2021, aims to test planetary defense
                            techniques by impacting an asteroid.
                        </p>
                        <a
                            href="https://www.nasa.gov/dart"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mission-link"
                        >
                            Learn More
                        </a>
                    </div>
                    <div className="mission-item">
                        <h3>Lunar Gateway</h3>
                        <p>
                            The Lunar Gateway is a planned space station in orbit around the Moon, serving as a staging point for lunar
                            and deep-space exploration.
                        </p>
                        <a
                            href="https://www.nasa.gov/gateway"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mission-link"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;