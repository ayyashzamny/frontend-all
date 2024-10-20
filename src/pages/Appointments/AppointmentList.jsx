import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format, parseISO, addDays } from 'date-fns';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/apointPaiDoc');
            const sortedAppointments = response.data.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date)); // Sort by date descending
            setAppointments(sortedAppointments); // Set sorted appointments
            setFilteredAppointments(sortedAppointments); // Initially show all appointments
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

    // Generate next 5 days including today
    const getNextFiveDays = () => {
        const days = [];
        for (let i = 0; i <= 5; i++) {
            days.push(addDays(new Date(), i));
        }
        return days;
    };

    // Filter appointments by selected date
    const handleDateFilter = (date) => {
        setSelectedDate(date);
        const filtered = appointments.filter(
            (appointment) => format(new Date(appointment.appointment_date), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')
        );
        setFilteredAppointments(filtered);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Appointments</h2>

            {/* Date Filter Buttons */}
            <div className="date-filter-buttons mb-4">
                {getNextFiveDays().map((date) => (
                    <button
                        key={date}
                        className={`btn btn-primary m-2 ${selectedDate === format(date, 'yyyy-MM-dd') ? 'active' : ''}`}
                        onClick={() => handleDateFilter(date)}
                    >
                        {format(date, 'PPP')}
                    </button>
                ))}
            </div>

            {filteredAppointments.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment Status</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={appointment.appointment_id}>
                                <td>{appointment.patient_name}</td>
                                <td>Dr. {appointment.doctor_name}</td>
                                <td>{formatDate(appointment.appointment_date)}</td>
                                <td>{appointment.appointment_time}</td>
                                <td>{renderPaymentBadge(appointment.payment_status)}</td>
                                <td>${appointment.payment_amount.toFixed(2)}</td>
                                <td>{renderStatusBadge(appointment.status)}</td>
                                <td>{renderStatusOptions(appointment)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointments found for the selected date.</p>
            )}
        </div>
    );
};

export default AppointmentList;
