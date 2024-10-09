// src/pages/CreateEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        date_of_joining: '',
        salary: '',
        leave_balance: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/employees/register', employee);
            alert('Employee account created successfully');
        } catch (error) {
            alert('Error creating employee account');
        }
    };

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container">
            <h2>Create Employee Account</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(employee).map((field) => (
                    field !== 'password' ? (
                        <div className="form-group" key={field}>
                            <label>{field.replace('_', ' ').toUpperCase()}</label>
                            <input
                                type={field === 'date_of_joining' ? 'date' : 'text'}
                                name={field}
                                className="form-control"
                                value={employee[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : (
                        <div className="form-group" key={field}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={employee.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="btn btn-primary">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
