import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DoctorModal from '../../assets/models/DoctorModal'; // For Add, Edit, and View modal

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null); // For editing and viewing
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false); // For view-only mode

    // API base URL from environment variables (if needed)
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    // Fetch all doctors on component mount
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/doctors`); // Use dynamic API base URL
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    // Handle opening the modal for adding or editing a doctor
    const handleOpenModal = (doctor = null, viewOnly = false) => {
        setSelectedDoctor(doctor);
        setIsEditing(!!doctor && !viewOnly); // If doctor is passed and not in view-only mode, it's editing
        setIsViewing(viewOnly); // If viewOnly is true, open in view mode
        setModalOpen(true);
    };

    // Define the missing `handleSaveDoctor` function here
    const handleSaveDoctor = async (doctorData) => {
        if (isEditing) {
            // Updating an existing doctor
            try {
                await axios.put(`${apiBaseUrl}/api/doctors/${doctorData.doctor_id}`, doctorData);
                setDoctors(doctors.map(doctor => doctor.doctor_id === doctorData.doctor_id ? doctorData : doctor));
                Swal.fire('Success!', 'Doctor updated successfully.', 'success');
            } catch (error) {
                console.error('Error updating doctor:', error);
                Swal.fire('Error!', 'There was a problem updating the doctor.', 'error');
            }
        } else {
            // Adding a new doctor
            try {
                const response = await axios.post(`${apiBaseUrl}/api/doctors`, doctorData);
                setDoctors([...doctors, response.data]);
                Swal.fire('Success!', 'Doctor added successfully.', 'success');
            } catch (error) {
                console.error('Error adding doctor:', error);
                Swal.fire('Error!', 'There was a problem adding the doctor.', 'error');
            }
        }
        setModalOpen(false); // Close the modal after saving
    };

    return (
        <div className="container mt-4">
            <h2>Doctors List</h2>
            <button className="btn btn-primary mb-3" onClick={() => handleOpenModal()}>
                <i className="fas fa-plus"></i> Add Doctor
            </button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.length > 0 ? (
                        doctors.map(doctor => (
                            <tr key={doctor.doctor_id}>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phone}</td>
                                <td>
                                    <button className="btn btn-info me-2" onClick={() => handleOpenModal(doctor, true)}>View</button>
                                    <button className="btn btn-warning me-2" onClick={() => handleOpenModal(doctor, false)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No doctors found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <DoctorModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    doctor={selectedDoctor}
                    onSave={handleSaveDoctor}
                    isViewing={isViewing} // Pass the isViewing prop
                />
            )}
        </div>
    );
};

export default DoctorList;
