import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Icons for logout and login buttons
import logo from '../../assets/images/logo.png'; // Add your logo here

const DoctorHeader = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in as a doctor
        const doctor = localStorage.getItem('doctor');
        setIsLoggedIn(!!doctor); // Set logged-in state based on doctor presence
    }, []);

    // Logout function
    const handleLogout = () => {
        // Clear doctor session from localStorage
        localStorage.removeItem('doctor');

        // Redirect to login page after logout
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <nav className="navbar navbar-expand-lg navbar-light container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Medical Appointment Logo" width="150" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/add-prescription">
                                Add Prescription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/all-patients">
                                All Patients
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/view-prescriptions">
                                View Prescriptions
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Show Logout or Login Button based on doctor's login status */}
                <div className="d-flex ms-auto">
                    {isLoggedIn ? (
                        <button
                            className="btn btn-outline-danger d-flex align-items-center"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt className="me-2" /> Logout
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-primary d-flex align-items-center"
                            onClick={() => navigate('/login')}
                        >
                            <FaSignInAlt className="me-2" /> Login
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default DoctorHeader;
