import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Badge, Table } from 'react-bootstrap';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [leaveRequests, setLeaveRequests] = useState({ approved: 0, pending: 0, rejected: 0 });
    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const [pendingAppointments, setPendingAppointments] = useState(0);
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [doctorSchedules, setDoctorSchedules] = useState([]);

    useEffect(() => {
        fetchCounts();
        fetchLeaveRequests();
        fetchAppointments();
        fetchRecentAppointments();
        fetchDoctorSchedules();
    }, []);

    const fetchCounts = async () => {
        try {
            const employeeRes = await axios.get('http://localhost:5000/api/employees');
            const doctorRes = await axios.get('http://localhost:5000/api/doctors');
            const patientRes = await axios.get('http://localhost:5000/api/patients');

            setEmployeeCount(employeeRes.data.length);
            setDoctorCount(doctorRes.data.length);
            setPatientCount(patientRes.data.length);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchLeaveRequests = async () => {
        try {
            const leaveRes = await axios.get('http://localhost:5000/api/leaverequests');
            const approved = leaveRes.data.filter(leave => leave.status === 'Approved').length;
            const pending = leaveRes.data.filter(leave => leave.status === 'Pending').length;
            const rejected = leaveRes.data.filter(leave => leave.status === 'Rejected').length;

            setLeaveRequests({ approved, pending, rejected });
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const appointmentRes = await axios.get('http://localhost:5000/api/appointments');
            const totalAppointments = appointmentRes.data.length;
            const pending = appointmentRes.data.filter(appointment => appointment.status === 'Pending').length;

            setAppointmentsCount(totalAppointments);
            setPendingAppointments(pending);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchRecentAppointments = async () => {
        try {
            const recentRes = await axios.get('http://localhost:5000/api/appointments?limit=5');
            setRecentAppointments(recentRes.data);
        } catch (error) {
            console.error('Error fetching recent appointments:', error);
        }
    };

    const fetchDoctorSchedules = async () => {
        try {
            const scheduleRes = await axios.get('http://localhost:5000/api/doctors');
            setDoctorSchedules(scheduleRes.data);
        } catch (error) {
            console.error('Error fetching doctor schedules:', error);
        }
    };

    const leavePieData = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                data: [leaveRequests.approved, leaveRequests.pending, leaveRequests.rejected],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            },
        ],
    };

    const appointmentsLineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Appointments',
                data: [12, 19, 3, 5, 2, 3, 18, 25, 14, 19, 22, 30], // Example data, replace with real data
                fill: false,
                borderColor: '#007bff',
                tension: 0.1,
            },
        ],
    };

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h5>Total Employees</h5>
                            <h2><Badge bg="primary">{employeeCount}</Badge></h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h5>Total Doctors</h5>
                            <h2><Badge bg="info">{doctorCount}</Badge></h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h5>Total Patients</h5>
                            <h2><Badge bg="success">{patientCount}</Badge></h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h5>Total Appointments</h5>
                            <h2><Badge bg="dark">{appointmentsCount}</Badge></h2>
                            <h6>Pending: <Badge bg="warning">{pendingAppointments}</Badge></h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Leave Requests</h5>
                            {/* Reducing Pie chart size */}
                            <div style={{ height: '200px', width: '200px', margin: '0 auto' }}>
                                <Pie data={leavePieData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Appointments Over Time</h5>
                            <div style={{ height: '300px' }}>
                                <Line data={appointmentsLineData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Recent Appointments</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAppointments.map((appointment, index) => (
                                        <tr key={index}>
                                            <td>{appointment.patient_name}</td>
                                            <td>{appointment.doctor_name}</td>
                                            <td>{appointment.appointment_date}</td>
                                            <td><Badge bg={appointment.status === 'Pending' ? 'warning' : 'success'}>{appointment.status}</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Doctor Schedules</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Available From</th>
                                        <th>Available To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctorSchedules.map((schedule, index) => (
                                        <tr key={index}>
                                            <td>Dr. {schedule.name}</td>
                                            <td>{schedule.available_from}</td>
                                            <td>{schedule.available_to}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
