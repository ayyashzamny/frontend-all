import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayout from '../../components/AdminLayout';

const PendingLeaveRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        fetchPendingLeaveRequests();
    }, []);

    const fetchPendingLeaveRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaverequests');
            const pending = response.data.filter(request => request.status === 'Pending');
            setPendingRequests(pending);
        } catch (error) {
            console.error('Error fetching leave requests', error);
        }
    };

    const updateRequestStatus = async (leaveId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/leaverequests/${leaveId}/status`, { status });
            Swal.fire('Success!', `Request marked as ${status}.`, 'success');
            fetchPendingLeaveRequests();  // Refresh data after status update
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire('Error!', 'There was a problem updating the status.', 'error');
        }
    };

    const confirmUpdateStatus = (leaveId, status) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${status === 'Approved' ? 'approve' : 'reject'} this leave request.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status === 'Approved' ? 'approve' : 'reject'} it!`,
        }).then((result) => {
            if (result.isConfirmed) {
                updateRequestStatus(leaveId, status);
            }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h2>Pending Leave Requests</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.length > 0 ? (
                            pendingRequests.map(request => (
                                <tr key={request.leave_id}>
                                    <td>{request.employee_id}</td>
                                    <td>{formatDate(request.start_date)}</td>
                                    <td>{formatDate(request.end_date)}</td>
                                    <td>{request.leave_type}</td>
                                    <td>{request.reason}</td>
                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => confirmUpdateStatus(request.leave_id, 'Approved')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmUpdateStatus(request.leave_id, 'Rejected')}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No pending leave requests</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default PendingLeaveRequests;
