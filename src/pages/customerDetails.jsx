// pages/customerDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";


export default function CustomerDetails() {
  // pull the `customer` object out of location.state
  const location = useLocation();
  const { customer } = location.state || {};

 

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        
      </div>
    </div>
  );
}
