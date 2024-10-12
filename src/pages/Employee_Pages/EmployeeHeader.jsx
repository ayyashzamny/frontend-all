import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear employee data from localStorage
        localStorage.removeItem('employee');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <header className="employee-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/employee/dashboard" className="navbar-brand">Employee Dashboard</Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/employee/apply-leave" className="nav-link">Apply Leave</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/employee/applied-leaves" className="nav-link">My Leaves</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default EmployeeHeader;
