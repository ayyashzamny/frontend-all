// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient'); // Default role as patient
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
                role
            });
            // Store token and navigate based on role
            localStorage.setItem('token', response.data.token);
            if (role === 'admin') {
                navigate('/doctors');
            } else if (role === 'employee') {
                navigate('/appointments');
            } else {
                navigate('/');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Select Role</label>
                    <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="patient">Patient</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
