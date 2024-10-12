import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const ApprovedRejectedLeaveRequests = () => {
    const [approvedRejectedRequests, setApprovedRejectedRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in and has the 'admin' role
        const employee = JSON.parse(localStorage.getItem('employee'));

        if (!employee || employee.role !== 'admin') {
            navigate('/login'); // Redirect to login if not an admin
        } else {
            fetchApprovedRejectedRequests(); // Fetch leave requests if the user is an admin
        }
    }, [navigate]);

    const fetchApprovedRejectedRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaverequests');
            const approvedRejected = response.data.filter(request => request.status === 'Approved' || request.status === 'Rejected');
            setApprovedRejectedRequests(approvedRejected);
        } catch (error) {
            console.error('Error fetching leave requests', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h2>Approved and Rejected Leave Requests</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
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
                                    <td>{request.employee_id}</td>
                                    <td>{formatDate(request.start_date)}</td>
                                    <td>{formatDate(request.end_date)}</td>
                                    <td>{request.leave_type}</td>
                                    <td>{request.status}</td>
                                    <td>{request.reason}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No approved or rejected leave requests</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ApprovedRejectedLeaveRequests;
