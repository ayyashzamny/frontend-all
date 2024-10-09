import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import AppointmentList from './AppointmentList';
import '../../styles/AppointmentPage.css';


const AddDoctorPage = () => {
    return (
        <AdminLayout>
            <AppointmentList />

        </AdminLayout>
    );
};

export default AddDoctorPage;
