import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/login.jsx';
import AdminDashboard from './pages/adminDashboard.jsx';
import Vendors from './pages/vendors.jsx';
import Customers from './pages/customers.jsx';
import Products from './pages/products.jsx';
import ProductDetails from './pages/products_details_product.jsx';
import VendorsDetails from './pages/vendorDetails.jsx';
import CustomerDetails from './pages/customerDetails.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/index.css';
import OrderList from './pages/OrderList.jsx';
import OrderDetailsPage from './pages/OrderDetailsPage.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/Vendors" element={<Vendors />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Vendors/details" element={<VendorsDetails />} />
        <Route path="/Customers/details" element={<CustomerDetails />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
        <Route path="/products/product/:publicId/:slug" element={<ProductDetails />} />


      </Routes>

      {/* ToastContainer should be outside of <Routes> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
