import React from 'react';
import '../../styles/ContactUs.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactUs = () => {
    return (
        <>
            <Header />
            <main className="contact-us-page">
                {/* Hero Section */}
                <section className="contact-hero-section d-flex align-items-center">
                    <div className="container text-center text-white">
                        <h1 className="display-4">Get in Touch</h1>
                        <p className="lead">We're here to help you. Reach out to us anytime and we’ll happily answer your questions.</p>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="contact-form-section py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <h2 className="text-center mb-4">Contact Us</h2>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Your Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Your Message</label>
                                        <textarea className="form-control" id="message" rows="5" placeholder="Type your message"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section className="contact-info-section py-5 bg-light">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Call Us</h5>
                                        <p className="card-text">+1 234 567 890</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Email Us</h5>
                                        <p className="card-text">support@yourcompany.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <h5 className="card-title">Visit Us</h5>
                                        <p className="card-text">1234 Main St, Your City, Your Country</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="map-section py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Find Us Here</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                {/* Embedded Google Maps iframe */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.95592831535236!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9f9b0b8a736!2s1234+Main+St%2C+Your+City+VIC+3000%2C+Australia!5e0!3m2!1sen!2sus!4v1532581295621"
                                    width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactUs;
