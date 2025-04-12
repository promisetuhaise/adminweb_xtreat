import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import FilterAndCard from "../components/filterCard";

const Products = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top: Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar />

        <main className="flex-1 p-4 bg-gray-100 ml-[50px] overflow-y-auto">
        <FilterAndCard />
        </main>
        
      </div>
    </div>
  );
};

export default Products;
