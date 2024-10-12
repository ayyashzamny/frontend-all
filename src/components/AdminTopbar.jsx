import React, { useEffect, useState } from 'react';
import '../styles/AdminTopbar.css'; // We'll style it separately
import AdminAvatar from '../assets/images/admin-avatar.png';

const AdminTopbar = () => {
    const [adminName, setAdminName] = useState('Admin');

    useEffect(() => {
        // Fetch the admin's name from localStorage
        const employee = JSON.parse(localStorage.getItem('employee'));
        if (employee && employee.role === 'admin') {
            setAdminName(employee.name || 'Admin');
        }
    }, []);

    return (
        <div className="admin-topbar">
            <div className="topbar-title">
                <h4>Admin Panel</h4>
            </div>
            <div className="topbar-user">
                <span className="username">Welcome, {adminName}</span>
                <img
                    src={AdminAvatar}
                    alt="Admin Avatar"
                    className="user-avatar"
                />
            </div>
        </div>
    );
};

export default AdminTopbar;
