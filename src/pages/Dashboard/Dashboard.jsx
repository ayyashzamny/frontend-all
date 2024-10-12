import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
            setEmployee(JSON.parse(storedEmployee));
        } else {
            // If no employee data in localStorage, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('employee');
        navigate('/login');
    };

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard">
            <h2>Welcome, {employee.name}</h2>
            <p>Email: {employee.email}</p>
            <p>Role: {employee.role}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
