import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminSidebar.css'; // Sidebar custom styles
import logo from '../assets/images/logo.png'; // Add your logo here

const AdminSidebar = () => {
    const [isLeaveDropdownOpen, setIsLeaveDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Use navigate to redirect

    const toggleLeaveDropdown = () => {
        setIsLeaveDropdownOpen(!isLeaveDropdownOpen);
    };

    // Handle Logout function
    const handleLogout = () => {
        // Clear local storage (or any authentication tokens)
        localStorage.removeItem('employee'); // Assuming 'employee' is the key for storing logged-in user data

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="admin-sidebar">
            <div className="sidebar-logo">
                {/* Your logo here */}
                <img src={logo} alt="MediX Logo" className="logo-img" />
            </div>

            <ul className="sidebar-nav">
                <li>
                    <Link to="/dashboard" className="nav-link">
                        <i className="fas fa-tachometer-alt"></i> {/* Dashboard icon */}
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/appointments" className="nav-link">
                        <i className="fas fa-calendar-check"></i> {/* Appointments icon */}
                        Appointments
                    </Link>
                </li>
                <li>
                    <Link to="/patients" className="nav-link">
                        <i className="fas fa-procedures"></i> {/* Patients icon */}
                        Patients
                    </Link>
                </li>
                <li>
                    <Link to="/doctors" className="nav-link">
                        <i className="fas fa-user-md"></i> {/* Doctors icon */}
                        Doctors
                    </Link>
                </li>
                <li>
                    <Link to="/employees" className="nav-link">
                        <i className="fas fa-users"></i> {/* Employees icon */}
                        Employees
                    </Link>
                </li>
                {/* Dropdown for Leave Requests */}
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        onClick={toggleLeaveDropdown}
                    >
                        <i className="fas fa-file-alt"></i> {/* Leave Requests icon */}
                        Leave Requests
                    </button>
                    <ul className={`dropdown-menu ${isLeaveDropdownOpen ? 'show' : ''}`}>
                        <li>
                            <Link to="/pending-leaves" className="dropdown-item">
                                Pending Requests
                            </Link>
                        </li>
                        <li>
                            <Link to="/approved-rejected-leaves" className="dropdown-item">
                                Approved/Rejected Requests
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <button className="nav-link logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> {/* Logout icon */}
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
