import React from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiShoppingCart,
  FiBox, // Icon for Products
  FiShoppingBag,
  FiUsers,
  FiFileText,
  FiSettings,
  FiCreditCard, // New icon for Loans
  FiDollarSign, // New icon for Finance
  FiLogOut,    // New icon for Logout
} from "react-icons/fi";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/admin-dashboard" className="sidebar-btn">
          <FiGrid size={15} />
          <span>Dashboard</span>
        </Link>

        <Link to="/orders" className="sidebar-btn">
          <FiShoppingCart size={15} />
          <span>Orders</span>
        </Link>
        <Link to="/products" className="sidebar-btn">
          <FiBox size={15} />
          <span>Products</span>
        </Link>
       
        <Link to="/vendors" className="sidebar-btn">
          <FiShoppingBag size={15} />
          <span>Vendors</span>
        </Link>
        <Link to="/Customers" className="sidebar-btn">
          <FiUsers size={15} />
          <span>Customers</span>
        </Link>
        <Link to="/loans" className="sidebar-btn">
          <FiCreditCard size={15} />
          <span>Loans</span>
        </Link>
        <Link to="/finance" className="sidebar-btn finance-btn">
          <FiDollarSign size={24} />
          <span>Finance</span>
        </Link>
        <Link to="/reports" className="sidebar-btn">
          <FiFileText size={15} />
          <span>Reports</span>
        </Link>
        <Link to="/settings" className="sidebar-btn">
          <FiSettings size={15} />
          <span>Settings</span>
        </Link>
      </div>
      <div className="sidebar-bottom">
        <Link to="/logout" className="sidebar-btn">
          <FiLogOut size={15} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
