// pages/ProductDetails.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import OrderHistory from "../components/product_Order_History";
import StatsCard from "../components/Cards";
import ReviewsRatings from "../components/product_review_ratings"; // Import the ReviewsRatings component

// icons
import { FaSearchPlus, FaTimes } from "react-icons/fa";

// Import your local image
import defaultProductImage from "../assets/sweater.jpg";

export default function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};

  // State for toggling the zoom modal
  const [showZoom, setShowZoom] = useState(false);

  // Fallback values
  const title = product?.name || "Leather Shirt";
  const price = product?.price ? `UGX ${product.price}` : "UGX 25,000";
  const description =
    product?.description ||
    "Discover the perfect balance of practicality and style with our Sleek Urban Tote—where everyday convenience meets modern elegance.";
  const addDate = product?.addDate || "22-05-2025";
  const size = product?.size || "37";
  const color = product?.color || "Black";
  const material = product?.material || "Cotton";
  const country = product?.countryOfOrigin || "Uganda";

  // Example order history (replace or extend with real data)
  const orderHistoryData = product?.orderHistory || [
    { id: "ORD1001", date: "03-05-2025", quantity: 2, customer: "Aisha Nambatya", status: "delivered" },
    { id: "ORD1002", date: "02-20-2025", quantity: 1, customer: "Janet Amara", status: "cancelled" },
    { id: "ORD1003", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1004", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "delivered" },
    { id: "ORD1005", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1006", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "delivered" },
    { id: "ORD1007", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1008", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "returned" },
  ];

  // Dummy stat cards data
  const statsData = [
    { title: "Inventory", value: "50" },
    { title: "Delivered", value: "06" },
    { title: "Pending", value: "03" },
    { title: "Returned", value: "01" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {/* Added 'items-stretch' to ensure grid items are stretched equally */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 items-stretch">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 bg-gray-100 ml-[80px]">
              <div className="bg-white p-4 rounded flex flex-col items-center h-full">
                {/* Product Image with hover overlay showing zoom icon */}
                <div className="relative group w-full flex justify-center mb-4">
                  <img
                    src={defaultProductImage}
                    alt={title}
                    className="object-cover h-30 w-full rounded p-5"
                  />
                  {/* Overlay icon changes to zoom icon on hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => setShowZoom(true)}
                  >
                    <FaSearchPlus className="text-white text-2xl" />
                  </div>
                </div>
                {/* Item Details */}
                <div className="w-full text-gray-700">
                  {/* Name and Price */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[13px] font-semibold text-[#280300] ml-4">
                      {title}
                    </h3>
                    <span className="text-[13px] font-semibold text-[#280300] mr-5">
                      {price}
                    </span>
                  </div>
                  {/* Description */}
                  <div className="mb-4 ml-4">
                    <h4 className="text-[11px] font-semibold text-gray-600">
                      Description
                    </h4>
                    <p className="text-[11px] text-gray-700 mt-1">
                      {description}
                    </p>
                  </div>
                  {/* Specs Table */}
                  <table className="table-auto w-full ml-2">
                    <tbody>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Size:</td>
                        <td className="py-1 text-[11px]">{size}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Color:</td>
                        <td className="py-1 text-[11px]">{color}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Material:</td>
                        <td className="py-1 text-[11px]">{material}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Country of Origin:</td>
                        <td className="py-1 text-[11px]">{country}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Add Date:</td>
                        <td className="py-1 text-[11px]">{addDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Separator */}
                  <hr className="my-4 border-gray-300" />
                  {/* Vendor Information using a Table */}
                  <div className="ml-2">
                    <h4 className="text-[11px] font-semibold text-gray-600 mb-2">
                      Vendor Information
                    </h4>
                    <table className="table-auto w-full">
                      <tbody>
                        <tr>
                          <td className="font-medium py-1 text-[11px]">Shop:</td>
                          <td className="py-1 text-[11px] flex items-center">
                            <span className="mr-1" />Ayeeshah Muha and Family
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-1 text-[11px]">Vendor:</td>
                          <td className="py-1 text-[11px] flex items-center">
                            <span className="mr-1" />Aisha Nambatya
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-1 text-[11px]">Location:</td>
                          <td className="py-1 text-[11px] flex items-center">
                            <span className="mr-1" />Kiti
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-1 text-[11px]">Email:</td>
                          <td className="py-1 text-[11px] flex items-center">
                            <span className="mr-1" />nambatyaaiha73@gmail.com
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-1 text-[11px]">Phone:</td>
                          <td className="py-1 text-[11px] flex items-center">
                            <span className="mr-1" />0700990653
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Delete Button at the Bottom of Item Details */}
                  <div className="mt-10 -ml-2 w-full flex justify-center">
                    <button className="flex items-center px-10 py-2 bg-red-500 text-[11px] text-white font-semibold rounded hover:bg-red-600">
                      <span className="mr-2" />
                      Delete this product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Stat Cards, Order History & Reviews */}
            <div className="lg:col-span-2">
              {/* Stat Cards Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsData.map((stat) => (
                  <StatsCard key={stat.title} title={stat.title} value={stat.value} />
                ))}
              </div>
              {/* Order History Section */}
              <OrderHistory orderHistory={orderHistoryData} />
              {/* Reviews & Ratings Section using ReviewsRatings component */}
              <ReviewsRatings />
            </div>
          </div>
        </main>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setShowZoom(false)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing modal on image click
          >
            <img
              src={defaultProductImage}
              alt={title}
              className="max-w-full max-h-screen rounded shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600"
              onClick={() => setShowZoom(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
