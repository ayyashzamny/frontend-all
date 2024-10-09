import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

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
        available_to: ''
    });

    useEffect(() => {
        if (doctor) {
            setFormData(doctor); // Populate modal with doctor data when viewing or editing
        }
    }, [doctor]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
