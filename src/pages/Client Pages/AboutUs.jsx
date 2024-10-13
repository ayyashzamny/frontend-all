import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutUs = () => {
    return (
        <>
            <Header />
            <main className="about-us-page">
                {/* Hero Section */}
                <section className="about-hero-section d-flex align-items-center">
                    <div className="container text-center text-white">
                        <h1 className="display-4">About Us</h1>
                        <p className="lead">We are committed to providing exceptional healthcare services with a patient-first approach.</p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mission-section py-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Our Mission</h5>
                                        <p className="card-text">
                                            To revolutionize healthcare by delivering patient-centered care with integrity, transparency, and respect.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Our Vision</h5>
                                        <p className="card-text">
                                            Creating a healthier tomorrow by innovating and transforming the way healthcare is delivered.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Our Values</h5>
                                        <p className="card-text">
                                            Compassion, innovation, collaboration, and excellence in everything we do.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-section py-5 bg-light">
                    <div className="container text-center">
                        <h2 className="mb-5">Meet Our Team</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="team-member card shadow border-0">
                                    <div className="card-body">
                                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3"/>
                                        <h5 className="card-title">Dr. Sarah Johnson</h5>
                                        <p className="card-text">Chief Medical Officer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-member card shadow border-0">
                                    <div className="card-body">
                                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3"/>
                                        <h5 className="card-title">John Doe</h5>
                                        <p className="card-text">Chief Executive Officer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-member card shadow border-0">
                                    <div className="card-body">
                                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3"/>
                                        <h5 className="card-title">Jane Smith</h5>
                                        <p className="card-text">Chief Technology Officer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section py-5">
                    <div className="container text-center">
                        <h2 className="mb-5">Our Impact</h2>
                        <div className="row">
                            <div className="col-md-3">
                                <h3 className="display-4">10+</h3>
                                <p className="lead">Years of Experience</p>
                            </div>
                            <div className="col-md-3">
                                <h3 className="display-4">500+</h3>
                                <p className="lead">Doctors & Specialists</p>
                            </div>
                            <div className="col-md-3">
                                <h3 className="display-4">100k+</h3>
                                <p className="lead">Happy Patients</p>
                            </div>
                            <div className="col-md-3">
                                <h3 className="display-4">50+</h3>
                                <p className="lead">Clinics Worldwide</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials-section py-5 bg-light">
                    <div className="container text-center">
                        <h2 className="mb-5">What Our Patients Say</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <blockquote className="blockquote">
                                    <p>"The care I received was exceptional, from the doctors to the support staff. They truly care about their patients."</p>
                                    <footer className="blockquote-footer">Emily Johnson</footer>
                                </blockquote>
                            </div>
                            <div className="col-md-6">
                                <blockquote className="blockquote">
                                    <p>"Highly professional and compassionate. I felt like I was in safe hands every step of the way."</p>
                                    <footer className="blockquote-footer">Michael Smith</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AboutUs;
