import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Badge } from 'react-bootstrap'; // Import Bootstrap's Badge component
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const ApprovedRejectedLeaveRequests = () => {
    const [approvedRejectedRequests, setApprovedRejectedRequests] = useState([]);
    const [employees, setEmployees] = useState([]); // Store employee data here
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in and has the 'admin' role
        const employee = JSON.parse(localStorage.getItem('employee'));

        if (!employee || employee.role !== 'admin') {
            navigate('/login'); // Redirect to login if not an admin
        } else {
            fetchApprovedRejectedRequests(); // Fetch leave requests if the user is an admin
            fetchEmployees(); // Fetch employee data
        }
    }, [navigate]);

    const fetchApprovedRejectedRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaverequests');
            const approvedRejected = response.data.filter(request => ['Approved', 'Rejected', 'Pending'].includes(request.status)); // Include Pending
            setApprovedRejectedRequests(approvedRejected);
        } catch (error) {
            console.error('Error fetching leave requests', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data); // Store employee data
        } catch (error) {
            console.error('Error fetching employee data', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getEmployeeName = (employeeId) => {
        const employee = employees.find(emp => emp.employee_id === employeeId);
        return employee ? employee.name : 'Unknown';
    };

    // Function to render status with color-coded badges
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Approved':
                return <Badge bg="success">Approved</Badge>; // Green badge
            case 'Rejected':
                return <Badge bg="danger">Rejected</Badge>; // Red badge
            case 'Pending':
                return <Badge bg="warning">Pending</Badge>; // Yellow badge
            default:
                return <Badge bg="secondary">Unknown</Badge>; // Grey badge for unknown status
        }
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h2>Approved, Rejected, and Pending Leave Requests</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedRejectedRequests.length > 0 ? (
                            approvedRejectedRequests.map(request => (
                                <tr key={request.leave_id}>
                                    <td>{getEmployeeName(request.employee_id)}</td> {/* Fetch and display employee name */}
                                    <td>{formatDate(request.start_date)}</td>
                                    <td>{formatDate(request.end_date)}</td>
                                    <td>{request.leave_type}</td>
                                    <td>{renderStatusBadge(request.status)}</td> {/* Render status with colored badges */}
                                    <td>{request.reason}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No approved, rejected, or pending leave requests</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ApprovedRejectedLeaveRequests;
