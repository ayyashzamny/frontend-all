// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import the enhanced CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/book">Book Appointment</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="/services/general-care">General Care</a></li>
                        <li><a href="/services/specialist-care">Specialist Care</a></li>
                        <li><a href="/services/diagnostics">Diagnostics</a></li>
                        <li><a href="/services/emergency">Emergency</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <ul>
                        <li>Email: info@medicalapp.com</li>
                        <li>Phone: +123-456-7890</li>
                        <li>Address: 123 Medical Lane, Health City</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Medical Appointment System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
