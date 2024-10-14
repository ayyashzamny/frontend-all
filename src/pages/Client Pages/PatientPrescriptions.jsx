// src/components/PatientPrescriptions.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Badge, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header'; // Adjust the import path if needed
import Footer from '../../components/Footer'; // Adjust the import path if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientName, setPatientName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if patient is logged in
        const patient = localStorage.getItem('patient');
        if (!patient) {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            const patientObj = JSON.parse(patient);
            setPatientName(patientObj.name);
            fetchPatientPrescriptions(patientObj.patient_id); // Fetch prescriptions for the logged-in patient
        }
    }, [navigate]);

    // Fetch patient's prescriptions
    const fetchPatientPrescriptions = async (patient_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/patient-prescriptions/${patient_id}`);
            setPrescriptions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setLoading(false);
        }
    };

    // Format date into readable format
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // Function to render status as a styled badge
    const renderStatusBadge = (status) => {
        if (status === 'Pending') {
            return <Badge bg="warning">Pending</Badge>;
        } else if (status === 'Dispensed') {
            return <Badge bg="success">Dispensed</Badge>;
        } else {
            return <Badge bg="secondary">Unknown</Badge>;
        }
    };

    return (
        <>
            <Header /> {/* Include the Header component */}
            <Container className="mt-5">
                <h2 className="text-center mb-4">Prescriptions for {patientName}</h2>
                {loading ? (
                    <p className="text-center">Loading prescriptions...</p>
                ) : (
                    <>
                        {prescriptions.length > 0 ? (
                            <Row>
                                {prescriptions.map((prescription) => (
                                    <Col md={6} key={prescription.prescription_id} className="mb-4">
                                        <Card className="shadow-sm">
                                            <Card.Header>
                                                <h3 className="mb-0">{prescription.medicine_name}</h3>
                                                <small>Prescribed by: Dr. Joe</small>
                                            </Card.Header>
                                            <Card.Body>
                                                <p><strong>Dosage:</strong> {prescription.dosage}</p>
                                                <p><strong>Frequency:</strong> {prescription.frequency}</p>
                                                <p><strong>Date:</strong> {formatDate(prescription.prescription_date)}</p>
                                                <p><strong>Status:</strong> {renderStatusBadge(prescription.status)}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p className="text-center">You have no prescriptions yet.</p>
                        )}
                    </>
                )}
            </Container>
            <Footer /> {/* Include the Footer component */}
        </>
    );
};

export default PatientPrescriptions;
