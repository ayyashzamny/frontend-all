import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Badge, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header'; // Adjust the import path if needed
import Footer from '../../components/Footer'; // Adjust the import path if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [doctors, setDoctors] = useState([]); // To store the list of doctors
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
            fetchAllData(patientObj.patient_id); // Fetch all prescriptions and doctors
        }
    }, [navigate]);

    // Fetch all prescriptions and doctors, then filter by patient_id
    const fetchAllData = async (patient_id) => {
        try {
            // Fetch all prescriptions
            const prescriptionsResponse = await axios.get('http://localhost:5000/api/prescriptions');
            const filteredPrescriptions = prescriptionsResponse.data.filter(prescription => prescription.patient_id === patient_id);

            // Fetch all doctors
            const doctorsResponse = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(doctorsResponse.data); // Store doctors list

            setPrescriptions(filteredPrescriptions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // Format date into readable format
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // Function to get doctor name by doctor_id
    const getDoctorName = (doctor_id) => {
        const doctor = doctors.find(doc => doc.doctor_id === doctor_id);
        return doctor ? doctor.name : 'Unknown'; // Return doctor name or 'Unknown' if not found
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
                                                <small>Prescribed by: Dr. {getDoctorName(prescription.doctor_id)}</small> {/* Display matched doctor's name */}
                                            </Card.Header>
                                            <Card.Body>
                                                <p><strong>Dosage:</strong> {prescription.dosage}</p>
                                                <p><strong>Frequency:</strong> {prescription.frequency}</p>
                                                <p><strong>Date:</strong> {formatDate(prescription.prescription_date)}</p>

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
