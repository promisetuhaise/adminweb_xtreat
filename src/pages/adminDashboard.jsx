// pages/AdminDashboard.js
import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import StatsCardsGrid from "../components/cardgrid";

const AdminDashboard = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 ml-[80px]">
          <StatsCardsGrid />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
