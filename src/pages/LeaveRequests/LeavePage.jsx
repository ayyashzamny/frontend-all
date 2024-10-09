import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import PandingLeaves from './PendingLeaveRequests';

const LeavePage = () => {
    return (
        <AdminLayout>
            <PandingLeaves />
        </AdminLayout>
    );
};

export default LeavePage;
