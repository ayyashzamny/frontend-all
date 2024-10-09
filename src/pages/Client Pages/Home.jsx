// src/pages/Home.js
import React from 'react';
import '../../styles/Home.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="hero-section text-center text-white d-flex align-items-center">
                    <div className="container">
                        <h1 className="display-4">Welcome to the Medical Appointment System</h1>
                        <p className="lead">Book appointments easily with trusted specialists, at your convenience.</p>
                        <button className="btn btn-primary btn-lg mt-4">Book Appointment</button>
                    </div>
                </section>

                {/* Services Section */}
                <section className="services-section py-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Specialized Doctors</h5>
                                        <p className="card-text">Connect with highly qualified doctors across multiple specialties.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Easy Booking</h5>
                                        <p className="card-text">Book appointments online, quickly and easily, from anywhere.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">24/7 Support</h5>
                                        <p className="card-text">Our support team is available round the clock to assist you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
