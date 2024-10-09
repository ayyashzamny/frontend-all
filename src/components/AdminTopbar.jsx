import React from 'react';
import '../styles/AdminTopbar.css'; // We'll style it separately
import AdminAvatar from '../assets/images/admin-avatar.png';

const AdminTopbar = () => {
    return (
        <div className="admin-topbar">
            <div className="topbar-title">
                <h4>Admin Panel</h4>
            </div>
            <div className="topbar-user">
                <span className="username">Welcome, Admin</span>
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
