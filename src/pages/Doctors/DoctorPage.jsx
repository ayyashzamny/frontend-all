import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import DoctorList from './DoctorList';

const AddDoctorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const employee = JSON.parse(localStorage.getItem('employee'));

        // Redirect to login page if no employee is logged in or if the role is not 'admin'
        if (!employee || employee.role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <AdminLayout>
            <DoctorList />
        </AdminLayout>
    );
};

export default AddDoctorPage;
