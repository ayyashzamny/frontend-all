import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const AccountCreationModal = ({ show, handleClose, employees }) => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Update email when an employee is selected
    const handleEmployeeChange = (e) => {
        const employeeId = e.target.value;
        setSelectedEmployeeId(employeeId);
        const selectedEmployee = employees.find(emp => emp.employee_id === parseInt(employeeId));
        setEmail(selectedEmployee ? selectedEmployee.email : '');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire('Error!', 'Passwords do not match!', 'error');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', {
                email,
                password,
                role: 'employee',
                person_id: selectedEmployeeId
            });
            Swal.fire('Success!', 'Account created successfully.', 'success');
            handleClose();
        } catch (error) {
            // Display the real SQL error message from the backend
            const errorMessage = error.response?.data?.error || 'There was a problem creating the account.';
            Swal.fire('Error!', errorMessage, 'error');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Employee Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Employee</Form.Label>
                        <Form.Control as="select" value={selectedEmployeeId} onChange={handleEmployeeChange} required>
                            <option value="">-- Select an Employee --</option>
                            {employees.map(employee => (
                                <option key={employee.employee_id} value={employee.employee_id}>
                                    {employee.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AccountCreationModal;
