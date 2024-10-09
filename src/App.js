// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Client Pages/Home';
import AddDoctorPage from './pages/Doctors/DoctorPage';
import PatientsPage from './pages/Patients/PatientsPage';
import AppointmentPage from './pages/Appointments/AppointmentPage';
import AllDoctors from './pages/Bookings/AllDoctors';
// import login from './pages/auth/LoginPage';
import EmployeeLogin from './pages/auth/CreateEmployee';
import PatientLogin from './pages/auth/CreatePatient';
import EmployeeList from './pages/Employees/EmployeesPage';
import PandingLeaves from './pages/LeaveRequests/PendingLeaveRequests';
import ApprovedRejectedLeave from './pages/LeaveRequests/ApprovedRejectedLeave';
import LeaveApplication from './pages/Employee_Pages/ApplyLeave';
import EmployeeLeaves from './pages/Employee_Pages/EmployeeLeaves';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<AddDoctorPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/book" element={<AllDoctors />} />
        {/* <Route path="/login" element={<login />} /> */}
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/pending-leaves" element={<PandingLeaves />} />
        <Route path="/approved-rejected-leaves" element={<ApprovedRejectedLeave />} />
        <Route path="/employee/apply-leave" element={<LeaveApplication />} />
        <Route path="/employee/applied-leaves" element={<EmployeeLeaves />} />
      </Routes>
    </Router>
  );
}

export default App;
