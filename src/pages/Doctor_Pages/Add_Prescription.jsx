import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './DoctorHeader';
import { useNavigate } from 'react-router-dom';

const AddPrescription = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        medicine_name: '',
        dosage: '',
        frequency: '',
        prescription_date: '',
        status: 'Pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const doctor = JSON.parse(localStorage.getItem('doctor'));
        if (doctor) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                doctor_id: doctor.doctor_id,
                prescription_date: new Date().toISOString().split('T')[0], // Set today's date as default
            }));
        } else {
            navigate('/login');
        }

        // Fetch patients
        axios.get('http://localhost:5000/api/patients')
            .then((response) => setPatients(response.data))
            .catch((error) => console.error('Error fetching patients:', error));
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/prescriptions', formData);
            Swal.fire('Success!', 'Prescription added successfully', 'success');

            // Reset the form without reloading the page
            setFormData({
                patient_id: '',
                doctor_id: formData.doctor_id, // Keep the logged-in doctor's ID
                medicine_name: '',
                dosage: '',
                frequency: '',
                prescription_date: new Date().toISOString().split('T')[0], // Reset to today's date
                status: 'Pending',
            });

        } catch (error) {
            Swal.fire('Error!', 'There was an issue adding the prescription', 'error');
        }
    };

    const dosageOptions = ['1 tablet', '2 tablets', '1 tsp', '2 tsp', '1 injection']; // Sample options for Dosage
    const frequencyOptions = ['Once a day', 'Twice a day', 'Every 6 hours', 'Every 12 hours', 'Weekly']; // Sample options for Frequency

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Prescription</h2>
                <form onSubmit={handleSubmit} className="shadow p-4 rounded">
                    <div className="mb-3">
                        <label className="form-label">Patient</label>
                        <select
                            name="patient_id"
                            value={formData.patient_id}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Patient</option>
                            {patients.map((patient) => (
                                <option key={patient.patient_id} value={patient.patient_id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Medicine Name</label>
                        <input
                            type="text"
                            name="medicine_name"
                            value={formData.medicine_name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dosage</label>
                        <select
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Dosage</option>
                            {dosageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Frequency</label>
                        <select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Frequency</option>
                            {frequencyOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Prescription Date</label>
                        <input
                            type="date"
                            name="prescription_date"
                            value={formData.prescription_date}
                            onChange={handleChange}
                            className="form-control"
                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Prescription</button>
                </form>
            </div>
        </>
    );
};

export default AddPrescription;
