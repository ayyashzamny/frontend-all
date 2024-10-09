import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EmployeeModal from '../../assets/models/EmployeeModal'; // Modal for Add, Edit, and View Employee
import AccountCreationModal from '../../assets/models/AccountCreationModal'; // Modal for creating an account

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [accountModalOpen, setAccountModalOpen] = useState(false); // For account creation modal
    const [selectedEmployee, setSelectedEmployee] = useState(null); // For editing and viewing
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false); // For view-only mode

    // API base URL from environment variables (if needed)
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    // Fetch all employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/employees`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle opening the modal for adding or editing an employee
    const handleOpenModal = (employee = null, viewOnly = false) => {
        setSelectedEmployee(employee);
        setIsEditing(!!employee && !viewOnly); // If employee is passed and not in view-only mode, it's editing
        setIsViewing(viewOnly); // If viewOnly is true, open in view mode
        setModalOpen(true);
    };

    // Handle opening the modal for account creation
    const handleOpenAccountModal = () => {
        setAccountModalOpen(true);
    };

    // Handle saving employee details
    const handleSaveEmployee = async (employeeData) => {
        if (isEditing) {
            // Updating an existing employee
            try {
                await axios.put(`${apiBaseUrl}/api/employees/${employeeData.employee_id}`, employeeData);
                setEmployees(employees.map(employee => employee.employee_id === employeeData.employee_id ? employeeData : employee));
                Swal.fire('Success!', 'Employee updated successfully.', 'success');
            } catch (error) {
                console.error('Error updating employee:', error);
                Swal.fire('Error!', 'There was a problem updating the employee.', 'error');
            }
        } else {
            // Adding a new employee
            try {
                const response = await axios.post(`${apiBaseUrl}/api/employees`, employeeData);
                setEmployees([...employees, response.data]);
                Swal.fire('Success!', 'Employee added successfully.', 'success');
            } catch (error) {
                console.error('Error adding employee:', error);
                Swal.fire('Error!', 'There was a problem adding the employee.', 'error');
            }
        }
        setModalOpen(false); // Close the modal after saving
    };

    return (
        <div className="container mt-4">
            <h2>Employees List</h2>
            <button className="btn btn-primary mb-3" onClick={() => handleOpenModal()}>+ Add Employee</button>
            <button className="btn btn-secondary mb-3 ms-2" onClick={handleOpenAccountModal}>+ Create Account</button> {/* New button for account creation */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee.employee_id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.role}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <button className="btn btn-info me-2" onClick={() => handleOpenModal(employee, true)}>View</button>
                                    <button className="btn btn-warning me-2" onClick={() => handleOpenModal(employee, false)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <EmployeeModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    employee={selectedEmployee}
                    onSave={handleSaveEmployee}
                    isViewing={isViewing} // Pass the isViewing prop
                />
            )}

            {accountModalOpen && (
                <AccountCreationModal
                    show={accountModalOpen}
                    handleClose={() => setAccountModalOpen(false)}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default EmployeesList;
