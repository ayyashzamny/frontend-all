import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2 for alerts

const DoctorModal = ({ show, handleClose, doctor, onSave, isViewing }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        bio: '',
        years_of_experience: '',
        consultation_fee: '',
        email: '',
        phone: '',
        available_from: '',
        available_to: '',
        password: '', // Password field for new doctor
        confirm_password: '', // Confirm password field
    });

    // Populate the form data when doctor data is provided (in edit mode)
    useEffect(() => {
        if (doctor) {
            setFormData({
                ...doctor,
                password: '', // Clear password fields for security
                confirm_password: '',
            });
        }
    }, [doctor]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password only for new doctor creation (not for edit)
        if (!doctor && formData.password !== formData.confirm_password) {
            Swal.fire('Error!', 'Passwords do not match!', 'error');
            return;
        }

        // Pass the form data back to the parent component
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isViewing ? 'Doctor Details' : (doctor ? 'Edit Doctor' : 'Add New Doctor')}</Modal.Title>
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
                            <Form.Group controlId="specialty">
                                <Form.Label>Specialty</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="years_of_experience">
                                <Form.Label>Years of Experience</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="years_of_experience"
                                    value={formData.years_of_experience}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="consultation_fee">
                                <Form.Label>Consultation Fee</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="consultation_fee"
                                    value={formData.consultation_fee}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
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
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="available_from">
                                <Form.Label>Available From</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="available_from"
                                    value={formData.available_from}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="available_to">
                                <Form.Label>Available To</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="available_to"
                                    value={formData.available_to}
                                    onChange={handleChange}
                                    readOnly={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="bio" className="mt-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            readOnly={isViewing}
                        />
                    </Form.Group>

                    {/* Password fields (only show when adding a new doctor) */}
                    {!isViewing && !doctor && (
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
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
                                    <Form.Group className="mb-3">
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
                        </>
                    )}

                    {!isViewing && (
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {doctor ? 'Update Doctor' : 'Add Doctor'}
                            </Button>
                        </Modal.Footer>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DoctorModal;
