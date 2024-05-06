
import React, { useState, useEffect } from 'react';
import './UserDetail.css'; // Import the CSS file

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('firstName');

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost:3030/user');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    let filteredUsers = users;
    if (searchQuery && selectedCategory) {
        filteredUsers = users.filter((user) =>
            user[selectedCategory]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="user-detail-container">
            <h2>User Details</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="mobileNumber">Mobile Number</option>
                </select>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobileNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetail;
