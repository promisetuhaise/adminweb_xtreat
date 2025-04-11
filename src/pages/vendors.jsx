import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

import VendorsList from "../components/vendorslist";

const Vendors = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-1 overflow-auto ml-[65px] bg-gray-100">
          <VendorsList />
        </main>
      </div>
    </div>
  );
};

export default Vendors;
