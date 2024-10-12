import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for routing to signup
import '../../styles/Login.css'; // Import the CSS file

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default to employee login
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (role === 'employee') {
                // Employee login API
                response = await axios.post('http://localhost:5000/api/employee/login', { email, password });

                // Store employee data in localStorage
                const employee = response.data.employee;
                localStorage.setItem('employee', JSON.stringify(employee));

                // Check the employee's role from the response data
                if (employee.role === 'admin') {
                    // Redirect to admin dashboard if role is admin
                    navigate('/dashboard');
                } else {
                    // Redirect to employee dashboard if role is not admin
                    navigate('/employee/apply-leave');
                }
            } else {
                // Patient login API
                response = await axios.post('http://localhost:5000/api/patient/login', { email, password });

                // Store patient data in localStorage
                const patient = response.data.patient;
                localStorage.setItem('patient', JSON.stringify(patient));

                // Redirect to patient dashboard after login
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                {/* Buttons for selecting role */}
                <div className="form-group">
                    <label>Select Role</label>
                    <div className="role-buttons">
                        <button
                            type="button"
                            className={`role-button ${role === 'employee' ? 'active' : ''}`}
                            onClick={() => setRole('employee')}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            className={`role-button ${role === 'patient' ? 'active' : ''}`}
                            onClick={() => setRole('patient')}
                        >
                            Patient
                        </button>
                    </div>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>

                {/* Conditionally render "Sign Up" message if the patient role is selected */}
                {role === 'patient' && (
                    <div className="signup-link">
                        <p>Don't have an account? <Link to="/patient/signup">Sign Up</Link></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
