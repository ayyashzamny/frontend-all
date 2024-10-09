import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import PatientsList from './PatientsList';


const PatientsPage = () => {
    return (
        <AdminLayout>
            <PatientsList />
        </AdminLayout>
    );
};

export default PatientsPage;
