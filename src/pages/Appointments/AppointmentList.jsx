import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';
import { FaUser, FaCalendarAlt, FaClock, FaUserMd, FaMoneyBillAlt } from 'react-icons/fa';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/apointPaiDoc');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleChangeStatus = async (appointmentId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/appointmentStatus/${appointmentId}`, { status: newStatus });
            Swal.fire('Success!', 'Appointment status updated.', 'success');
            fetchAppointments(); // Refresh the list
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'PPP'); // User-friendly date format
        } catch (error) {
            console.error('Invalid date:', dateString);
            return 'Invalid date';
        }
    };

    const renderStatusBadge = (status) => {
        let className = '';
        if (status === 'Pending') className = 'badge bg-warning text-dark';
        else if (status === 'Confirmed') className = 'badge bg-success';
        else if (status === 'Cancelled') className = 'badge bg-danger';
        return <span className={className}>{status}</span>;
    };

    const renderPaymentBadge = (paymentStatus) => (
        <span className={`badge ${paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
            {paymentStatus}
        </span>
    );

    const renderStatusOptions = (appointment) => (
        <select
            value={appointment.status}
            onChange={(e) => handleChangeStatus(appointment.appointment_id, e.target.value)}
            className="form-select"
        >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Appointments</h2>
            <div className="row">
                {appointments.length > 0 ? (
                    appointments.map(appointment => (
                        <div key={appointment.appointment_id} className="col-md-4 mb-4">
                            <div className="appointment-card card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Appointment</h5>
                                    <p className="card-text">
                                        <FaUser /> <strong>Patient:</strong> {appointment.patient_name}
                                    </p>
                                    <p className="card-text">
                                        <FaUserMd /> <strong>Doctor:</strong> {appointment.doctor_name}
                                    </p>
                                    <p className="card-text">
                                        <FaCalendarAlt /> <strong>Date:</strong> {formatDate(appointment.appointment_date)}
                                    </p>
                                    <p className="card-text">
                                        <FaClock /> <strong>Time:</strong> {appointment.appointment_time}
                                    </p>
                                    <p className="card-text">
                                        <FaMoneyBillAlt /> <strong>Payment:</strong> {renderPaymentBadge(appointment.payment_status)}
                                        (${appointment.payment_amount.toFixed(2)})
                                    </p>
                                    <p><strong>Status:</strong> {renderStatusBadge(appointment.status)}</p>
                                    <div className="mt-3">
                                        {renderStatusOptions(appointment)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default AppointmentList;
