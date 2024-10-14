import React, { useState, useEffect } from 'react';
import { FaStethoscope, FaDollarSign, FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import DoctorBookingModal from './DoctorBookingModal'; // Import the booking modal component
import '../../../styles/AllDoctor.css'; // Import the CSS for styling

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State to store filtered doctors
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        handleSearch(); // Call filtering when the search term changes
    }, [searchTerm, doctors]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors'); // Fetch doctor data
            setDoctors(response.data);
            setFilteredDoctors(response.data); // Initially show all doctors
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSearch = () => {
        const search = searchTerm.toLowerCase();
        const filtered = doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(search) || doctor.specialty.toLowerCase().includes(search)
        );
        setFilteredDoctors(filtered);
    };

    const handleDoctorClick = (doctor) => {
        setSelectedDoctor(doctor);
        setModalOpen(true); // Open modal for booking
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDoctor(null); // Close modal
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Choose a Doctor</h2>

                {/* Search Bar */}
                <div className="search-bar mb-4">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by doctor name or specialty"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Doctor List */}
                <div className="row">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <div key={doctor.doctor_id} className="col-md-4 mb-4">
                                <div className="card doctor-card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Dr. {doctor.name}</h5>
                                        <p className="card-text">
                                            <FaStethoscope className="me-2 text-info" />
                                            <strong>Specialty:</strong> {doctor.specialty}
                                        </p>
                                        <p className="card-text">
                                            <FaCalendarAlt className="me-2 text-info" />
                                            <strong>Available From:</strong> {doctor.available_from} to {doctor.available_to}
                                        </p>
                                        <p className="card-text">
                                            <FaDollarSign className="me-2 text-info" />
                                            <strong>Consultation Fee:</strong> ${doctor.consultation_fee.toFixed(2)}
                                        </p>
                                        <p className="card-text">
                                            <FaClock className="me-2 text-info" />
                                            <strong>Experience:</strong> {doctor.years_of_experience} years
                                        </p>
                                        <button className="btn btn-primary mt-3 w-100" onClick={() => handleDoctorClick(doctor)}>
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No doctors available.</p>
                    )}
                </div>
            </div>
            {selectedDoctor && (
                <DoctorBookingModal
                    show={modalOpen}
                    doctor={selectedDoctor}
                    handleClose={handleModalClose}
                />
            )}
            <Footer />
        </>
    );
};

export default DoctorList;
