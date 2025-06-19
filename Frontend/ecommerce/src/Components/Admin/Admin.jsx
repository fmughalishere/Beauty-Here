import './Admin.css'; 
import { Routes, Route, NavLink } from 'react-router-dom';
import AddProduct from './AddProduct';
import ListProducts from './ListProducts';
import { FaPlus, FaList } from 'react-icons/fa';

const Admin = () => {
    return (
        <div className="admin-panel">
            <div className="admin-sidebar">
                <nav>
                    <NavLink to="add" className="sidebar-option">
                        <FaPlus />
                        <p>Add Product</p>
                    </NavLink>
                    <NavLink to="list" className="sidebar-option">
                        <FaList />
                        <p>List Products</p>
                    </NavLink>
                </nav>
            </div>
            <div className="admin-main-content">
                <Routes>
                    <Route path="/" element={<ListProducts />} /> 
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/list" element={<ListProducts />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;