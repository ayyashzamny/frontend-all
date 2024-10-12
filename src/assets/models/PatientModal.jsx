import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PatientModal = ({ show, handleClose, patient, onSave, isViewing }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        insurance_details: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        password: '', // For password
        confirm_password: '' // For confirm password
    });

    useEffect(() => {
        if (patient) {
            // Format the dob field properly and reset passwords when editing
            setFormData({
                ...patient,
                dob: patient.dob ? new Date(patient.dob).toISOString().slice(0, 10) : '',
                password: '', // Reset password when editing
                confirm_password: '' // Reset confirm password when editing
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match when adding
        if (!patient && formData.password !== formData.confirm_password) {
            Swal.fire('Error!', 'Passwords do not match!', 'error');
            return;
        }

        onSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isViewing ? 'View Patient' : patient ? 'Edit Patient' : 'Add New Patient'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={12}>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={12}>
                            <Form.Group controlId="insurance_details">
                                <Form.Label>Insurance Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="insurance_details"
                                    value={formData.insurance_details}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="emergency_contact_phone">
                                <Form.Label>Emergency Contact Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emergency_contact_phone"
                                    value={formData.emergency_contact_phone}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="emergency_contact_name">
                                <Form.Label>Emergency Contact Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emergency_contact_name"
                                    value={formData.emergency_contact_name}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>



                    {/* Password fields (only for adding new patients, not for editing) */}
                    {!patient && (
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="confirm_password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    {!isViewing && (
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {patient ? 'Update Patient' : 'Add Patient'}
                            </Button>
                        </Modal.Footer>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PatientModal;
