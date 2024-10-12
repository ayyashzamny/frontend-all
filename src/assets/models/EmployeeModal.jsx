import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Row and Col from Bootstrap
import Swal from 'sweetalert2'; // For showing alerts

const EmployeeModal = ({ show, handleClose, employee, onSave, isViewing }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        date_of_joining: '',
        salary: '',
        leave_balance: '',
        password: '', // New field for password
        confirm_password: '' // New field for confirm password
    });

    useEffect(() => {
        if (employee) {
            setEmployeeData({
                ...employee,
                date_of_joining: employee.date_of_joining
                    ? new Date(employee.date_of_joining).toISOString().slice(0, 10)
                    : '',
                password: '', // Reset password when editing
                confirm_password: '' // Reset confirm password when editing
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // If adding a new employee, check if the passwords match
        if (!employee && employeeData.password !== employeeData.confirm_password) {
            Swal.fire('Error!', 'Passwords do not match!', 'error');
            return;
        }

        // Pass the employee data to the onSave handler
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

                    {/* Password fields (only show when adding new employee) */}
                    {!isViewing && !employee && (
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={employeeData.password}
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
                                            value={employeeData.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    )}

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
