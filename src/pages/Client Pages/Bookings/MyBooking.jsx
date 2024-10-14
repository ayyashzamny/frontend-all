import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../../components/Header'; // Import the Header component
import Footer from '../../../components/Footer'; // Import the Footer component

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if patient is logged in
        const patient = localStorage.getItem('patient');
        if (!patient) {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            fetchAllAppointments(); // Fetch all appointments from the backend
        }
    }, [navigate]);

    // Fetch all appointments from the backend
    const fetchAllAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/appointments'); // Fetch all records
            const allAppointments = response.data;
            filterAppointments(allAppointments); // Filter based on patient ID
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    // Filter appointments based on the logged-in patient
    const filterAppointments = (allAppointments) => {
        const patient = JSON.parse(localStorage.getItem('patient'));
        const filteredAppointments = allAppointments.filter(
            (appointment) => appointment.patient_id === patient.patient_id
        );
        setAppointments(filteredAppointments);
        setLoading(false);
    };

    // Delete an appointment if it is still pending
    const handleDelete = async (appointment_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/api/appointments/${appointment_id}`); // Delete appointment
                Swal.fire('Deleted!', 'Your appointment has been deleted.', 'success');
                fetchAllAppointments(); // Refresh the list after deletion
            }
        } catch (error) {
            Swal.fire('Error!', 'There was an issue deleting the appointment.', 'error');
            console.error('Error deleting appointment:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderStatusBadge = (status) => {
        if (status === 'Confirmed') return <span className="text-success">Confirmed</span>;
        if (status === 'Cancelled') return <span className="text-danger">Cancelled</span>;
        return <span className="text-warning">Pending</span>;
    };

    return (
        <>
            <Header /> {/* Include the Header component */}

            <main className="container py-4">
                <h2 className="text-center mb-4">Your Appointments</h2>
                {loading ? (
                    <p className="text-center">Loading appointments...</p>
                ) : (
                    <>
                        {appointments.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Doctor</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th> {/* Add Action column */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((appointment) => (
                                            <tr key={appointment.appointment_id}>
                                                <td>{appointment.doctor_name || 'N/A'}</td>
                                                <td>{formatDate(appointment.appointment_date)}</td>
                                                <td>{appointment.appointment_time}</td>
                                                <td>${appointment.payment_amount.toFixed(2)}</td>
                                                <td>{renderStatusBadge(appointment.status)}</td>
                                                <td>
                                                    {appointment.status === 'Pending' && (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(appointment.appointment_id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">You have no appointments yet.</p>
                        )}
                    </>
                )}
            </main>

            <Footer /> {/* Include the Footer component */}
        </>
    );
};

export default PatientAppointments;
