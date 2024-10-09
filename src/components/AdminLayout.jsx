import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import '../styles/AdminLayout.css'; // Layout-specific styles

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="main-content">
                <AdminTopbar />
                <div className="content-body">
                    {children} {/* This will render the specific page content, like forms */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
