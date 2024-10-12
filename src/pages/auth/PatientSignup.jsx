import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/PatientSignup.css'; // Import the CSS file for styling

const PatientSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        insurance_details: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            // Send POST request to create patient account
            await axios.post('http://localhost:5000/api/patients', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                dob: formData.dob,
                insurance_details: formData.insurance_details,
                emergency_contact_name: formData.emergency_contact_name,
                emergency_contact_phone: formData.emergency_contact_phone,
                password: formData.password,
            });

            // Redirect to login page after successful signup
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-box">
                <h2>Create Your Account</h2>
                <p className="description">
                    Fill in the form below to create your patient account. It only takes a few moments.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Insurance Details</label>
                        <textarea
                            name="insurance_details"
                            value={formData.insurance_details}
                            onChange={handleChange}
                            placeholder="Enter your insurance details"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Emergency Contact Name</label>
                            <input
                                type="text"
                                name="emergency_contact_name"
                                value={formData.emergency_contact_name}
                                onChange={handleChange}
                                placeholder="Enter emergency contact name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact Phone</label>
                            <input
                                type="text"
                                name="emergency_contact_phone"
                                value={formData.emergency_contact_phone}
                                onChange={handleChange}
                                placeholder="Enter emergency contact phone"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="signup-button">Create Account</button>
                </form>

                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default PatientSignup;
