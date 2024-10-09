import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import EmployeesList from './EmployeesList';

const EmployeesPage = () => {
    return (
        <AdminLayout>
            <EmployeesList />
        </AdminLayout>
    );
};

export default EmployeesPage;
