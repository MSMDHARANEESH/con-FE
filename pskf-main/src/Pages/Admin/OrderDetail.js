// OrderDetail.js
import React, { useState, useEffect } from 'react';
import "./OrderDetails.css"

const OrderDetail = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('name');

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch('http://localhost:3030/summary');
            if (!response.ok) {
                throw new Error('Failed to fetch order data');
            }
            const orderData = await response.json();
            setOrders(orderData);
        } catch (error) {
            console.error('Error fetching order data:', error.message);
        }
    };

    const filteredOrders = orders.filter(order => {
        const categoryValue = order[searchCategory].toLowerCase();
        return categoryValue.includes(searchTerm.toLowerCase());
    });

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    return (
        <div className="order-detail-container">
            <h2>Order Details</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <select value={searchCategory} onChange={handleCategoryChange}>
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="address">Address</option>
                </select>
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.name}</td>
                            <td>{order.phone}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
