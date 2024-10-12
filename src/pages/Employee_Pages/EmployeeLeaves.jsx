import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeHeader from './EmployeeHeader';  // Header for employee
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components for modal and form
import { useNavigate } from 'react-router-dom';

const EmployeeLeaves = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null); // To store the leave selected for editing
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        leave_type: '',
        reason: ''
    });

    // Logged-in employee data from localStorage
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        const storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
            const employee = JSON.parse(storedEmployee);
            setEmployeeData(employee);
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    }, [navigate]);

    useEffect(() => {
        if (employeeData) {
            fetchEmployeeLeaves();
        }
    }, [employeeData]);

    const fetchEmployeeLeaves = async () => {
        try {
            // Fetch all leave requests from the API
            const response = await axios.get('http://localhost:5000/api/leaverequests');

            // Filter leave requests to show only those with employee_id of the logged-in employee
            const filteredLeaves = response.data.filter(leave => leave.employee_id === employeeData.employee_id);

            setLeaves(filteredLeaves);  // Set filtered leaves
        } catch (error) {
            console.error('Error fetching leave requests', error);
        }
    };

    const handleEditLeave = (leave) => {
        setSelectedLeave(leave);  // Set the selected leave request for editing
        setFormData({
            start_date: leave.start_date.split('T')[0],  // Ensure it's in YYYY-MM-DD format
            end_date: leave.end_date.split('T')[0],      // Ensure it's in YYYY-MM-DD format
            leave_type: leave.leave_type,
            reason: leave.reason
        });
        setShowModal(true);  // Show the edit modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        // Show confirmation dialog before saving changes
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save these changes to the leave request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                // Make a PUT request to update the leave request
                await axios.put(`http://localhost:5000/api/leaverequests/${selectedLeave.leave_id}`, formData);
                Swal.fire('Success!', 'Leave request updated successfully.', 'success');
                fetchEmployeeLeaves();  // Refresh the leaves after updating
                setShowModal(false);  // Close the modal
            } catch (error) {
                Swal.fire('Error!', 'There was a problem updating the leave request.', 'error');
                console.error('Error:', error.response || error.message);
            }
        } else {
            Swal.fire('Cancelled', 'Your changes were not saved.', 'info');
        }
    };

    const handleDeleteLeave = async (leaveId) => {
        // Show confirmation dialog before deleting
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this leave request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                // Make a DELETE request to remove the leave request
                await axios.delete(`http://localhost:5000/api/leaverequests/${leaveId}`);
                Swal.fire('Deleted!', 'Leave request has been deleted.', 'success');
                fetchEmployeeLeaves();  // Refresh the leaves after deletion
            } catch (error) {
                Swal.fire('Error!', 'There was a problem deleting the leave request.', 'error');
                console.error('Error:', error.response || error.message);
            }
        } else {
            Swal.fire('Cancelled', 'Leave request was not deleted.', 'info');
        }
    };

    return (
        <>
            <EmployeeHeader />  {/* Employee Header */}
            <div className="container mt-5">
                <h2>My Applied Leaves</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length > 0 ? (
                            leaves.map(leave => (
                                <tr key={leave.leave_id}>
                                    <td>{leave.start_date.split('T')[0]}</td> {/* Display in YYYY-MM-DD format */}
                                    <td>{leave.end_date.split('T')[0]}</td>   {/* Display in YYYY-MM-DD format */}
                                    <td>{leave.leave_type}</td>
                                    <td>{leave.status}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        {leave.status === 'Pending' ? (
                                            <>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={() => handleEditLeave(leave)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteLeave(leave.leave_id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button className="btn btn-secondary" disabled>
                                                Non-editable
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No leaves applied.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Leave Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Leave Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="leave_type"
                                value={formData.leave_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="Annual">Annual</option>
                                <option value="Sick">Sick</option>
                                <option value="Maternity">Maternity</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reason</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmployeeLeaves;
