// pages/ProductDetails.js
import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";


const ProductDetails = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
      </div>
    </div>
  );
};

export default ProductDetails;
