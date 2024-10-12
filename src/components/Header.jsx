// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Optional: Custom styles if needed
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Icons for logout and login buttons
import logo from '../assets/images/logo.png'; // Add your logo here

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in (either employee or patient)
        const employee = localStorage.getItem('employee');
        const patient = localStorage.getItem('patient');
        setIsLoggedIn(!!employee || !!patient); // Set logged-in state
    }, []);

    // Logout function
    const handleLogout = () => {
        // Clear localStorage (for both employee and patient)
        localStorage.removeItem('employee');
        localStorage.removeItem('patient');

        // Reload the page to reflect changes
        window.location.reload();
    };

    return (
        <header className="bg-white shadow">
            <nav className="navbar navbar-expand-lg navbar-light container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Medical Appointment Logo" width="150" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/book">Book Appointment</Link>
                        </li>
                        {/* Conditionally render "My Bookings" link if logged in */}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link text-primary" to="/my-bookings">My Bookings</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/contact">Contact</Link>
                        </li>

                    </ul>
                </div>
                {/* Show Logout or Login Button based on logged-in status */}
                <div className="d-flex ms-auto">
                    {isLoggedIn ? (
                        <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" /> Logout
                        </button>
                    ) : (
                        <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => navigate('/login')}>
                            <FaSignInAlt className="me-2" /> Login
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
