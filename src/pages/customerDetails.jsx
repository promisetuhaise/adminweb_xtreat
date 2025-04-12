// pages/customerDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import StatsCard from "../components/Cards";
import CustomerDetailCard from "../components/customer_details";
import DeliveryDetailsCard from "../components/DeliveryDetailsCard";

export default function CustomerDetails() {
  // Pull the `customer` object from location.state
  const location = useLocation();
  const { customer } = location.state || {};

  const statsData = [
    { title: "Items Purchased", value: "1,250" },
    { title: "Total Spend",    value: "UGX 12,345" },
    { title: "Orders Made",    value: "8,765" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 bg-gray-100 ml-[80px] overflow-y-auto">
          {/* Layout: 
              Left column => CustomerDetailCard + DeliveryDetailsCard
              Right column => StatsCards + Transaction History/Cart cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Left column */}
            <div className="lg:col-span-1 space-y-4">
              <CustomerDetailCard customer={customer} />
              <DeliveryDetailsCard details={customer?.deliveryDetails} />
            </div>

            {/* Right column */}
            <div className="lg:col-span-3 space-y-4">
              {/* Three stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statsData.map((stat) => (
                  <StatsCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                  />
                ))}
              </div>

              {/* Transaction History and Cart divided into a 3-column grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Transaction History Card spanning two columns */}
                <div className="bg-white p-4 rounded shadow col-span-3 md:col-span-2">
                  <h2 className="text-sm font-semibold mb-2">
                    Transaction History
                  </h2>
                  <p className="text-[12px] text-gray-700">
                    Placeholder for transaction history data...
                  </p>
                </div>
                {/* Cart Card spanning one column */}
                <div className="bg-white p-4 rounded shadow col-span-3 md:col-span-1">
                  <h2 className="text-sm font-semibold mb-2">
                    Cart
                  </h2>
                  <p className="text-[12px] text-gray-700">
                    Cart Details
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Any additional sections remain unchanged */}
        </main>
      </div>
    </div>
  );
}
