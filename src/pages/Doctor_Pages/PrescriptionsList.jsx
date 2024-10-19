import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation and success messages
import Header from './DoctorHeader';

const PrescriptionTable = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [patients, setPatients] = useState([]); // To store patient details
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]); // To store filtered prescriptions for the logged-in doctor
    const [selectedPrescription, setSelectedPrescription] = useState(null); // To store the selected prescription for editing
    const [showEditModal, setShowEditModal] = useState(false); // Control modal visibility
    const navigate = useNavigate(); // Use navigate for redirection

    useEffect(() => {
        const doctor = JSON.parse(localStorage.getItem('doctor'));
        if (!doctor) {
            // If no doctor is found in localStorage, redirect to login page
            navigate('/login');
        } else {
            // Fetch prescriptions
            axios.get(`http://localhost:5000/api/prescriptions`)
                .then(response => {
                    // Filter prescriptions that belong to the logged-in doctor
                    const doctorPrescriptions = response.data.filter(prescription => prescription.doctor_id === doctor.doctor_id);
                    setPrescriptions(doctorPrescriptions); // Set filtered prescriptions
                    setFilteredPrescriptions(doctorPrescriptions);
                })
                .catch(error => console.error('Error fetching prescriptions:', error));

            // Fetch patients
            axios.get('http://localhost:5000/api/patients')
                .then(response => {
                    setPatients(response.data); // Store the patient data
                })
                .catch(error => console.error('Error fetching patients:', error));
        }
    }, [navigate]);

    // Function to handle opening the edit modal
    const handleEditClick = (prescription) => {
        setSelectedPrescription({
            ...prescription,
            prescription_date: prescription.prescription_date.split('T')[0], // Format date for the input field
        });
        setShowEditModal(true);
    };

    // Function to handle closing the edit modal
    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedPrescription(null);
    };

    // Function to handle prescription update from the modal
    const handleSaveChanges = () => {
        // Show confirmation before saving
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save the changes?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with saving
                axios.put(`http://localhost:5000/api/prescriptions/${selectedPrescription.prescription_id}`, selectedPrescription)
                    .then(() => {
                        setPrescriptions(prevPrescriptions =>
                            prevPrescriptions.map(prescription =>
                                prescription.prescription_id === selectedPrescription.prescription_id ? selectedPrescription : prescription
                            )
                        );
                        handleCloseModal();
                        // Show success message
                        Swal.fire('Saved!', 'Your changes have been saved successfully.', 'success');
                    })
                    .catch(error => {
                        console.error('Error updating prescription:', error);
                        Swal.fire('Error!', 'There was an error updating the prescription.', 'error');
                    });
            }
        });
    };

    const handleChange = (e) => {
        setSelectedPrescription({
            ...selectedPrescription,
            [e.target.name]: e.target.value,
        });
    };

    // Helper function to format date as DD/MM/YYYY
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to get the patient name by patient_id
    const getPatientName = (patient_id) => {
        const patient = patients.find(p => p.patient_id === patient_id);
        return patient ? patient.name : 'Unknown'; // Return the patient name or 'Unknown' if not found
    };

    // Predefined options for Dosage, Frequency, and Status
    const dosageOptions = ['1 tablet', '2 tablets', '5 ml', '10 ml', '1 injection'];
    const frequencyOptions = ['Once a day', 'Twice a day', 'Every 6 hours', 'Every 8 hours'];
    const statusOptions = ['Pending', 'Dispensed'];

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Prescriptions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Medicine</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Date</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPrescriptions.length > 0 ? (
                            filteredPrescriptions.map((prescription) => (
                                <tr key={prescription.prescription_id}>
                                    <td>{getPatientName(prescription.patient_id)}</td> {/* Get the patient name */}
                                    <td>{prescription.medicine_name}</td>
                                    <td>{prescription.dosage}</td>
                                    <td>{prescription.frequency}</td>
                                    <td>{formatDate(prescription.prescription_date)}</td>

                                    <td>
                                        <Button variant="warning" onClick={() => handleEditClick(prescription)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No prescriptions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing prescription */}
            {selectedPrescription && (
                <Modal show={showEditModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Prescription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Medicine Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="medicine_name"
                                    value={selectedPrescription.medicine_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Dosage</Form.Label>
                                <Form.Select
                                    name="dosage"
                                    value={selectedPrescription.dosage}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Dosage</option>
                                    {dosageOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Frequency</Form.Label>
                                <Form.Select
                                    name="frequency"
                                    value={selectedPrescription.frequency}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Frequency</option>
                                    {frequencyOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Prescription Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="prescription_date"
                                    value={selectedPrescription.prescription_date}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={selectedPrescription.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default PrescriptionTable;
