import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { format, addDays } from 'date-fns';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for login redirection
import '../../../styles/DoctorBookingModal.css'; // Import custom CSS

const DoctorBookingModal = ({ show, handleClose, doctor }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [appointmentType, setAppointmentType] = useState('InPerson'); // Default to InPerson
    const [availableTimes, setAvailableTimes] = useState([]); // All possible times
    const [bookedTimes, setBookedTimes] = useState([]); // Track already booked time slots
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if the user is logged in
    const [patient, setPatient] = useState(null); // Store logged-in patient details

    const navigate = useNavigate(); // To redirect to login page if needed

    useEffect(() => {
        // Check if the patient is logged in
        const storedPatient = localStorage.getItem('patient');
        if (storedPatient) {
            setIsLoggedIn(true);
            setPatient(JSON.parse(storedPatient));
        } else {
            setIsLoggedIn(false);
        }
    }, []); // Run once when the modal is mounted

    useEffect(() => {
        if (selectedDate) {
            fetchBookedTimes();
            const times = getTimeSlots();
            setAvailableTimes(times); // Set all possible times
        }
    }, [selectedDate]);

    // Fetch booked times for the selected doctor and date
    const fetchBookedTimes = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/appointments/booked-times?doctor_id=${doctor.doctor_id}&appointment_date=${selectedDate}`
            );
            setBookedTimes(response.data); // Assume response contains an array of booked time slots
        } catch (error) {
            console.error('Error fetching booked times:', error);
        }
    };

    // Generate next 5 days for date selection starting from tomorrow
    const getNextFiveDays = () => {
        const days = [];
        for (let i = 1; i <= 5; i++) { // Start from 1 to skip today
            days.push(addDays(new Date(), i));
        }
        return days;
    };

    // Generate 15-minute time slots based on doctor's availability
    const getTimeSlots = () => {
        const slots = [];
        const startTime = new Date(`1970-01-01T${doctor.available_from}`);
        const endTime = new Date(`1970-01-01T${doctor.available_to}`);

        let currentTime = startTime;

        while (currentTime <= endTime) {
            slots.push(format(currentTime, 'HH:mm'));
            currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment by 15 minutes
        }

        return slots;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!patient) {
            Swal.fire({
                icon: 'warning',
                title: 'You need to login',
                text: 'Please login to book an appointment.',
                showConfirmButton: true,
            });
            return;
        }

        const appointmentData = {
            patient_id: patient.patient_id, // Get patient_id from the logged-in patient
            doctor_id: doctor.doctor_id,
            appointment_date: selectedDate,
            appointment_time: selectedTime,
            appointment_type: appointmentType,
            status: 'Pending',
            payment_status: 'Paid',
            payment_amount: doctor.consultation_fee
        };

        try {
            await axios.post('http://localhost:5000/api/appointments', appointmentData);
            Swal.fire({
                icon: 'success',
                title: 'Appointment booked successfully!',
                showConfirmButton: true,
                timer: 2000
            });
            handleClose();
        } catch (error) {
            console.error('Error booking appointment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to book appointment',
                text: 'Please try again later.',
                showConfirmButton: true,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg"> {/* Enlarging the modal */}
            <Modal.Header closeButton>
                <Modal.Title>Book Appointment with Dr. {doctor.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoggedIn ? (
                    <Form onSubmit={handleSubmit}>
                        {/* Appointment Type Selection using buttons */}
                        <Form.Group className="mb-3">
                            <Form.Label>Select Appointment Type</Form.Label>
                            <div className="selection-container">
                                <button
                                    type="button"
                                    className={`type-box ${appointmentType === 'InPerson' ? 'selected' : ''}`}
                                    onClick={() => setAppointmentType('InPerson')}
                                >
                                    InPerson
                                </button>
                                <button
                                    type="button"
                                    className={`type-box ${appointmentType === 'Virtual' ? 'selected' : ''}`}
                                    onClick={() => setAppointmentType('Virtual')}
                                >
                                    Virtual
                                </button>
                            </div>
                        </Form.Group>

                        {/* Date selection in boxes */}
                        <Form.Group className="mb-3">
                            <Form.Label>Select Date</Form.Label>
                            <div className="date-box-container">
                                {getNextFiveDays().map((date) => (
                                    <button
                                        type="button"
                                        key={date}
                                        className={`date-box ${selectedDate === format(date, 'yyyy-MM-dd') ? 'selected' : ''}`}
                                        onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                                    >
                                        {format(date, 'PPP')}
                                    </button>
                                ))}
                            </div>
                        </Form.Group>

                        {/* Time slot selection */}
                        {selectedDate && (
                            <Form.Group className="mb-3">
                                <Form.Label>Select Time</Form.Label>
                                <div className="time-slot-container">
                                    {availableTimes.length > 0 ? (
                                        availableTimes.map((time) => (
                                            <button
                                                type="button"
                                                key={time}
                                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                                onClick={() => setSelectedTime(time)}
                                                disabled={bookedTimes.includes(time)} // Disable the button if the time is booked
                                            >
                                                {time} {bookedTimes.includes(time) ? '(Booked)' : ''}
                                            </button>
                                        ))
                                    ) : (
                                        <p>No available time slots.</p>
                                    )}
                                </div>
                            </Form.Group>
                        )}

                        <Button variant="primary" type="submit" disabled={!selectedDate || !selectedTime}>
                            Confirm Booking
                        </Button>
                    </Form>
                ) : (
                    <div className="login-reminder">
                        <p>Please <button className="btn btn-link" onClick={() => navigate('/login')}>login</button> to book an appointment.</p>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default DoctorBookingModal;
