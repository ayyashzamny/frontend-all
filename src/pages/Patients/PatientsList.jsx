import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PatientModal from '../../assets/models/PatientModal'; // For Add, Edit, and View modal

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null); // For editing and viewing
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false); // For view-only mode

    // API base URL from environment variables (if needed)
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    // Fetch all patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/patients`);
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    // Handle opening the modal for adding or editing a patient
    const handleOpenModal = (patient = null, viewOnly = false) => {
        setSelectedPatient(patient);
        setIsEditing(!!patient && !viewOnly); // If patient is passed and not in view-only mode, it's editing
        setIsViewing(viewOnly); // If viewOnly is true, open in view mode
        setModalOpen(true);
    };

    // Handle saving patient details
    const handleSavePatient = async (patientData) => {
        if (isEditing) {
            // Updating an existing patient
            try {
                await axios.put(`${apiBaseUrl}/api/patients/${patientData.patient_id}`, patientData);
                setPatients(patients.map(patient => patient.patient_id === patientData.patient_id ? patientData : patient));
                Swal.fire('Success!', 'Patient updated successfully.', 'success');
            } catch (error) {
                console.error('Error updating patient:', error);
                Swal.fire('Error!', 'There was a problem updating the patient.', 'error');
            }
        } else {
            // Adding a new patient
            try {
                const response = await axios.post(`${apiBaseUrl}/api/patients`, patientData);
                setPatients([...patients, response.data]);
                Swal.fire('Success!', 'Patient added successfully.', 'success');
            } catch (error) {
                console.error('Error adding patient:', error);
                Swal.fire('Error!', 'There was a problem adding the patient.', 'error');
            }
        }
        setModalOpen(false); // Close the modal after saving
    };

    return (
        <div className="container mt-4">
            <h2>Patients List</h2>
            <button className="btn btn-primary mb-3" onClick={() => handleOpenModal()}>+ Add Patient</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map(patient => (
                            <tr key={patient.patient_id}>
                                <td>{patient.name}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phone}</td>
                                <td>
                                    <button className="btn btn-info me-2" onClick={() => handleOpenModal(patient, true)}>View</button>
                                    <button className="btn btn-warning me-2" onClick={() => handleOpenModal(patient, false)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No patients found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <PatientModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    patient={selectedPatient}
                    onSave={handleSavePatient}
                    isViewing={isViewing} // Pass the isViewing prop
                />
            )}
        </div>
    );
};

export default PatientsList;
