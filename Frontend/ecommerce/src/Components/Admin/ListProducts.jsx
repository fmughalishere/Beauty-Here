import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListProduct.css';
import { FaTrash } from 'react-icons/fa';

const ListProducts = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/product/list');
            if (response.data.success) {
                setList(response.data.data);
            } else {
                alert("Error fetching product list");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the products.");
        }
    };

    const removeProduct = async (productId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/product/remove', { id: productId });
            if (response.data.success) {
                alert("Product removed successfully!");
                await fetchList(); 
            } else {
                alert("Error removing product");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while removing the product.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const baseURL = "http://localhost:5000/images/";

    return (
        <div className="list-product">
            <h2>All Products List</h2>
            <div className="list-table">
                <div className="list-table-header">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p>Action</p>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-row">
                        <img src={baseURL + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <FaTrash className="action-icon" onClick={() => removeProduct(item._id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProducts;