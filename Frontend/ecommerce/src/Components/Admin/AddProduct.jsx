import React, { useState } from 'react';
import './AddProduct.css'; 
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Skincare" 
    });
    const [imagePreview, setImagePreview] = useState(null);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onImageChangeHandler = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post('http://localhost:5000/api/product/add', formData);
            if (response.data.success) {
                alert("Product Added Successfully!");
                setData({ name: "", description: "", price: "", category: "Skincare" });
                setImage(null);
                setImagePreview(null);
            } else {
                alert("Failed to add product: " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("An error occurred while adding the product.");
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-container">
                <form className="add-product-form" onSubmit={onSubmitHandler}>
                    <h2>Add New Product</h2>
                    
                    <div className="form-group upload-area">
                        <label htmlFor="image">
                            {imagePreview ? <img src={imagePreview} alt="Preview" /> : <FaUpload />}
                        </label>
                        <input onChange={onImageChangeHandler} type="file" id="image" hidden required />
                        <p>Upload Product Image</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Product Description</label>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" placeholder="Write content here" required></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Product Category</label>
                            <select onChange={onChangeHandler} value={data.category} name="category">
                                <option value="Skincare">Skincare</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Haircare">Haircare</option>
                                <option value="Fragrance">Fragrance</option>
                                <option value="Nails">Nails</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Product Price</label>
                            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
                        </div>
                    </div>
                    
                    <button type="submit" className="add-btn">ADD PRODUCT</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;