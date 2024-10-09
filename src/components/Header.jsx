// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Optional: Custom styles if needed
import logo from '../assets/images/logo.png'; // Add your logo here

const Header = () => {
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
                        <li className="nav-item">
                            <Link className="nav-link text-primary" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

