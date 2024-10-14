import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import { Modal, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Header from './DoctorHeader';

const PatientCards = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]); // Store filtered patients
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state to handle API requests
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const navigate = useNavigate(); // To handle redirection

    useEffect(() => {
        const doctor = JSON.parse(localStorage.getItem('doctor'));
        if (!doctor) {
            // If no doctor is found in localStorage, redirect to login page
            navigate('/login');
        } else {
            // Fetch patients if the user is logged in
            axios.get('http://localhost:5000/api/patients')
                .then(response => {
                    setPatients(response.data);
                    setFilteredPatients(response.data); // Initialize filtered patients with all patients
                })
                .catch(error => console.error('Error fetching patients:', error));
        }
    }, [navigate]);

    // Function to handle search query change and filter patients
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = patients.filter(patient =>
            patient.name.toLowerCase().includes(query)
        );
        setFilteredPatients(filtered);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Check if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleViewPrescriptions = (patient) => {
        setSelectedPatient(patient);
        setLoading(true); // Set loading to true while fetching
        // Fetch patient's prescriptions
        axios.get(`http://localhost:5000/api/prescriptionByPatient?patient_id=${patient.patient_id}`)
            .then(response => {
                setPrescriptions(response.data);
                setShowModal(true); // Set modal to open even if no prescriptions exist
            })
            .catch(error => console.error('Error fetching prescriptions:', error))
            .finally(() => {
                setLoading(false); // Stop loading once the request is complete
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPatient(null); // Reset selected patient
        setPrescriptions([]); // Clear prescriptions when modal closes
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Patients</h2>

                {/* Search bar for filtering patients */}
                <div className="mb-4">
                    <FormControl
                        type="text"
                        placeholder="Search by patient name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="row">
                    {filteredPatients.map((patient) => (
                        <div className="col-md-4 mb-4" key={patient.patient_id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{patient.name}</h5>
                                    <p className="card-text">Age: {calculateAge(patient.dob)}</p>
                                    <p className="card-text">Phone: {patient.phone}</p>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleViewPrescriptions(patient)}
                                    >
                                        View Prescriptions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal to show prescriptions */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Prescriptions for {selectedPatient?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading prescriptions...</p>
                    ) : prescriptions.length > 0 ? (
                        <ul>
                            {prescriptions.map((prescription, index) => (
                                <li key={index}>
                                    <strong>{prescription.medicine_name}</strong> - {prescription.dosage}, {prescription.frequency} <br />
                                    Date: {new Date(prescription.prescription_date).toLocaleDateString()} <br />
                                    Status: {prescription.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No prescriptions available for this patient.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PatientCards;
