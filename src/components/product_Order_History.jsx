// components/OrderHistory.jsx

import React, { useState } from "react";

export default function OrderHistory({ orderHistory }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = orderHistory.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Helper function to determine the text color based on status.
  const getStatusTextColor = (status) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === "delivered") {
      return "text-green-500";
    } else if (normalizedStatus === "pending") {
      return "text-yellow-500";
    } else if (normalizedStatus === "cancelled") {
      return "text-red-500";
    } else if (normalizedStatus === "returned") {
        return "text-gray-500";
    } else {
      return "text-gray-800";
    }
  };

  // Helper function to determine the circle's background color based on status.
  const getStatusCircleColor = (status) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === "delivered") {
      return "bg-green-500";
    } else if (normalizedStatus === "pending") {
      return "bg-orange-300";
    } else if (normalizedStatus === "cancelled") {
      return "bg-red-500";
    } else if (normalizedStatus === "returned") {
        return "bg-gray-500";
    } else {
      return "bg-gray-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-sm font-semibold mb-2">Order History</h2>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-[12px]">Order ID</th>
            <th className="px-4 py-2 text-left text-[12px]">Date</th>
            <th className="px-4 py-2 text-left text-[12px]">Customer</th>
            <th className="px-4 py-2 text-left text-[12px]">Quantity</th>
            <th className="px-4 py-2 text-left text-[12px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(({ id, date, quantity, customer, status }) => (
            <tr key={id} className="even:bg-gray-100">
              <td className="px-4 py-2 text-[11px]">{id}</td>
              <td className="px-4 py-2 text-[11px]">{date}</td>
              <td className="px-4 py-2 text-[11px]">{customer}</td>
              <td className="px-4 py-2 text-[11px]">{quantity}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full ${getStatusCircleColor(status)}`}></span>
                  <span className={`ml-2 ${getStatusTextColor(status)} text-[11px]`}>
                    {status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-5 py-1 bg-gray-200 text-gray-700 text-[12px] rounded disabled:opacity-50 mr-2"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-5 py-1 rounded ${
                currentPage === page
                  ? "bg-[#f9622c] text-white text-[12px]"
                  : "bg-gray-200 text-gray-700 text-[12px]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-5 py-1 bg-gray-200 text-gray-700 text-[12px] rounded disabled:opacity-50 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
