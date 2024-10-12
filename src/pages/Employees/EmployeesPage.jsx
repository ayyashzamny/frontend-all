import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import EmployeesList from './EmployeesList';

const EmployeesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in and has the 'admin' role
        const employee = JSON.parse(localStorage.getItem('employee'));

        // Redirect to login page if not logged in or if the role is not 'admin'
        if (!employee || employee.role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <AdminLayout>
            <EmployeesList />
        </AdminLayout>
    );
};

export default EmployeesPage;
