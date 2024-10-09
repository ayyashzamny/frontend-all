import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';  // Import Row and Col from Bootstrap

const EmployeeModal = ({ show, handleClose, employee, onSave, isViewing }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        date_of_joining: '',
        salary: '',
        leave_balance: ''
    });

    useEffect(() => {
        if (employee) {
            // If there's a date_of_joining, format it correctly for the date input
            setEmployeeData({
                ...employee,
                date_of_joining: employee.date_of_joining
                    ? new Date(employee.date_of_joining).toISOString().slice(0, 10)
                    : ''
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(employeeData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isViewing ? 'View Employee' : employee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={employeeData.name}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={employeeData.email}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={employeeData.phone}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    value={employeeData.role}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    value={employeeData.department}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Joining</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date_of_joining"
                                    value={employeeData.date_of_joining}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="salary"
                                    value={employeeData.salary}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Leave Balance</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="leave_balance"
                                    value={employeeData.leave_balance}
                                    onChange={handleChange}
                                    disabled={isViewing}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {!isViewing && (
                        <Button variant="primary" type="submit">
                            {employee ? 'Update' : 'Add'}
                        </Button>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeModal;
