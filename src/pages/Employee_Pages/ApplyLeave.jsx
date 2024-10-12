import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; // Header for employee

const ApplyLeave = () => {
    const navigate = useNavigate(); // Hook to redirect
    const [employeeData, setEmployeeData] = useState(null); // Store employee data
    const [leaveData, setLeaveData] = useState({
        employee_id: '',  // Initially empty, will be set after fetching the logged-in employee data
        start_date: '',
        end_date: '',
        leave_type: 'Annual',  // Default to Annual
        status: 'Pending',  // Default to Pending
        reason: ''
    });

    // Get today's date in YYYY-MM-DD format for setting the minimum start date
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
            const employee = JSON.parse(storedEmployee);
            setEmployeeData(employee); // Set the employee data from localStorage
            setLeaveData(prevData => ({
                ...prevData,
                employee_id: employee.employee_id // Set employee_id for the leave request
            }));
        } else {
            // Redirect to login page if the user is not logged in
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ask for confirmation before applying for the leave
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to apply for this leave?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, apply!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                // Submit the leave request
                await axios.post('http://localhost:5000/api/leaverequests', leaveData);

                // Show success confirmation
                Swal.fire('Success!', 'Leave applied successfully.', 'success').then(() => {
                    // Refresh the page after successful submission
                    window.location.reload();
                });
            } catch (error) {
                Swal.fire('Error!', 'There was a problem applying for the leave.', 'error');
                console.error('There was a problem applying for the leave:', error);
            }
        } else {
            Swal.fire('Cancelled', 'Your leave request was not applied.', 'info');
        }
    };

    return (
        <>
            <EmployeeHeader /> {/* Employee Header */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Apply for Leave</h2>
                {employeeData ? (
                    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                        <div className="form-group mb-3">
                            <label htmlFor="start_date" className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="start_date"
                                name="start_date"
                                value={leaveData.start_date}
                                onChange={handleChange}
                                min={today}  // Restricting to future dates
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="end_date" className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="end_date"
                                name="end_date"
                                value={leaveData.end_date}
                                onChange={handleChange}
                                min={leaveData.start_date || today}  // End date should not be before start date
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="leave_type" className="form-label">Leave Type</label>
                            <select
                                className="form-select"
                                id="leave_type"
                                name="leave_type"
                                value={leaveData.leave_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="Annual">Annual</option>
                                <option value="Sick">Sick</option>
                                <option value="Maternity">Maternity</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="reason" className="form-label">Reason</label>
                            <textarea
                                className="form-control"
                                id="reason"
                                name="reason"
                                rows="4"
                                value={leaveData.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Apply</button>
                    </form>
                ) : (
                    <p className="text-center">Redirecting to login...</p>
                )}
            </div>
        </>
    );
};

export default ApplyLeave;
