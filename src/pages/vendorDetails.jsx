// pages/Vendors.js
import React from "react";
import { useLocation } from "react-router-dom"; // import useLocation to retrieve state
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import StatsCard from "../components/Cards";
import VendorDetailCard from "../components/vendor_details"; 
import VendorDetailsProducts from "../components/vendor_details_products";

const Vendors = () => {
  // Retrieve the vendor from the navigation state.
  const location = useLocation();
  const { vendor } = location.state || {};

  const statsData = [
    { title: "Items in Stock",     value: "1,250" },
    { title: "Total Sales",        value: "UGX 12,345" },
    { title: "Accounting Revenue", value: "UGX 8,765" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 ml-[80px] overflow-y-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {statsData.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
              />
            ))}
          </div>

          {/* Vendor details section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left card: pass the vendor prop to VendorDetailCard */}
            <VendorDetailCard vendor={vendor} />

            {/* Right card: spans the remaining 2 columns.
                Optionally, if VendorDetailsProducts needs vendor data, pass it here as well */}
            <div className="lg:col-span-2 p-4 bg-white shadow rounded">
              <VendorDetailsProducts vendor={vendor} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vendors;
