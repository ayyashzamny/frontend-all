// src/pages/CreatePatient.js
import React, { useState } from 'react';
import axios from 'axios';

const CreatePatient = () => {
    const [patient, setPatient] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        insurance_details: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/patients/register', patient);
            alert('Patient account created successfully');
        } catch (error) {
            alert('Error creating patient account');
        }
    };

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container">
            <h2>Create Patient Account</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(patient).map((field) => (
                    field !== 'password' ? (
                        <div className="form-group" key={field}>
                            <label>{field.replace('_', ' ').toUpperCase()}</label>
                            <input
                                type={field === 'dob' ? 'date' : 'text'}
                                name={field}
                                className="form-control"
                                value={patient[field]}
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
                                value={patient.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="btn btn-primary">Create Patient</button>
            </form>
        </div>
    );
};

export default CreatePatient;
