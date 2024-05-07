import React, { useState } from 'react';
import './Admin.css';
import UserDetail from './UserDetail'; // Import the UserDetail component
import OrderDetail from './OrderDetail';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('add'); // State to track active tab

    // State for add product form
    const [addFormData, setAddFormData] = useState({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    // State for delete product form
    const [deleteFormData, setDeleteFormData] = useState({
        id: ''
    });

    // Handler for add product form inputs
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for delete product form inputs
    const handleDeleteChange = (e) => {
        const { name, value } = e.target;
        setDeleteFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for adding a new product
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://con-be.onrender.com/products/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            console.log('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error.message);
        }

        // Reset the form after submission
        setAddFormData({
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: ''
        });
    };

    // Handler for deleting a product
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://con-be.onrender.com/products/${deleteFormData.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }


        setDeleteFormData({
            id: ''
        });
    };

    const [isadmin,setIsAdmin] = useState(false);
    const [admincred,setAdminCred] = useState({
        "username": "",
        "password": ""
    })

    const handleAdminLogin = () => {
        if(admincred.username=="admin" && admincred.password == "1234")
            setIsAdmin(true);
    }

    const handleAdminChange = (e) => {
        const {name, value} = e.target;
        setAdminCred(cr => ({
            ...cr,
            [name]:value
        }))
    }

    return (
        <div className='relative'>
            {
                !isadmin ?
                <div className='bg-white absolute inset-0 mx-auto flex justify-center items-center'>
                    <form onSubmit={handleAdminLogin} className='w-80'>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={admincred.username}
          onChange={handleAdminChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={admincred.password}
          onChange={handleAdminChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
                    </div>
                :
                null
            }
        <div>

        </div>
            <nav className='admin__nav'>
                <ul>
                    <li><a href="#" onClick={() => setActiveTab('add')}>Add Product</a></li>
                    <li><a href="#" onClick={() => setActiveTab('delete')}>Delete Product</a></li>
                    <li><a href="#" onClick={() => setActiveTab('user')}>User Details</a></li>
                    <li><a href="#" onClick={() => setActiveTab('order')}>Order Details</a></li>
                </ul>
            </nav>

            <br />
            <br />
            <div className="admin__container">
                {activeTab === 'add' && (
                    <>
                        <h2>Add products</h2>
                        <br />
                        <form className="admin__form" onSubmit={handleAddSubmit}>
                            {/* Form fields for adding product */}
                            <div>
                                <label>ID:</label>
                                <input type="number" name="id" value={addFormData.id} onChange={handleAddChange} />
                            </div>
                            <div>
                                <label>Title:</label>
                                <input type="text" name="title" value={addFormData.title} onChange={handleAddChange} />
                            </div>
                            <div>
                                <label>Price:</label>
                                <input type="number" name="price" value={addFormData.price} onChange={handleAddChange} />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input type="text" name="description" value={addFormData.description} onChange={handleAddChange} />
                            </div>
                            <div>
                                <label>Category:</label>
                                <input type="text" name="category" value={addFormData.category} onChange={handleAddChange} />
                            </div>
                            <div>
                                <label>Image URL:</label>
                                <input type="text" name="image" value={addFormData.image} onChange={handleAddChange} />
                            </div>
                            <br />
                            <button type="submit">Add Product</button>
                        </form>
                    </>
                )}
                {activeTab === 'delete' && (
                    <>
                        <h2>Delete Product</h2>
                        <br />
                        <form className="admin__form" onSubmit={handleDeleteSubmit}>
                            {/* Form fields for deleting product */}
                            <div>
                                <label>ID:</label>
                                <input type="number" name="id" value={deleteFormData.id} onChange={handleDeleteChange} />
                            </div>
                            <br />
                            <button type="submit">Delete Product</button>
                        </form>
                    </>
                )}

                {activeTab === 'user' && ( // Corrected syntax for conditional rendering
                    <UserDetail />
                )}
                {activeTab === 'order' && (
                    <OrderDetail />
                )}
            </div>
        </div>
    );
};

export default Admin;
