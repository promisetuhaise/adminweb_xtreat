// pages/ProductDetails.jsx

import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import OrderHistory from "../components/product_Order_History";
import StatsCard from "../components/Cards";
import ReviewsRatings from "../components/product_review_ratings";
import Loader from "../pages/Loader";
import { ProductContext } from "../context/productcontext";

// icons
import { FaSearchPlus, FaTimes } from "react-icons/fa";

export default function ProductDetails() {
  const location = useLocation();
  const { selectedProduct, selectedVendorId } = useContext(ProductContext);
  const { product: locationProduct } = location.state || {};
  const product = selectedProduct || locationProduct || null;

  const [showZoom, setShowZoom] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [vendorError, setVendorError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch vendor details if a vendor ID is selected.
  useEffect(() => {
    let isMounted = true;
    
    const fetchVendor = async () => {
      if (!selectedVendorId) {
        if (isMounted) setVendor(null);
        return;
      }

      try {
        const res = await fetch(`https://api-xtreative.onrender.com/vendors/${selectedVendorId}/details/`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (isMounted) setVendor(data);
      } catch (err) {
        console.error("Error fetching vendor: ", err);
        if (isMounted) setVendorError("Unable to load vendor details");
      }
    };

    fetchVendor();

    // Optional minimum loading delay of 1000ms.
    const delayTimeout = setTimeout(() => {
      if (isMounted) {
        // We do not clear the loading state here—this effect will be combined with the next.
        // This delay ensures the Loader shows for a minimum period.
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(delayTimeout);
    };
  }, [selectedVendorId]);

  // Combined loading check: loader remains until a product is available and,
  // if a vendor is required, either vendor details or an error is set.
  useEffect(() => {
    if (product && (!selectedVendorId || vendor || vendorError !== null)) {
      setLoading(false);
    }
  }, [product, vendor, vendorError, selectedVendorId]);

  if (loading || !product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Header />
        <Loader />
      </div>
    );
  }

  const {
    product_image_url,
    name,
    price,
    description,
    size,
    color,
    material,
    country_of_origin, // Note: updated key per your code sample
    created_at,
    orderHistory,
    // Assuming these custom fields are provided by the endpoint:
    custom_color,
    custom_size
  } = product;

  const addDate = created_at ? new Date(created_at).toLocaleDateString() : "";

  const orderHistoryData = orderHistory || [
    { id: "ORD1001", date: "03-05-2025", quantity: 2, customer: "Aisha Nambatya", status: "delivered" },
    { id: "ORD1002", date: "02-20-2025", quantity: 1, customer: "Janet Amara", status: "cancelled" },
    { id: "ORD1003", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1004", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "delivered" },
    { id: "ORD1005", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1006", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "delivered" },
    { id: "ORD1007", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "pending" },
    { id: "ORD1008", date: "01-15-2025", quantity: 4, customer: "Willian Jenny", status: "returned" },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 items-stretch">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 ml-[80px]">
              <div className="bg-white p-4 rounded flex flex-col items-center h-full">
                {product_image_url && (
                  <div className="relative group w-full flex justify-center mb-4">
                    <img
                      src={product_image_url}
                      alt={name}
                      className="object-cover h-30 w-full rounded p-5"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => setShowZoom(true)}
                    >
                      <FaSearchPlus className="text-white text-2xl" />
                    </div>
                  </div>
                )}
                {/* Item Details */}
                <div className="w-full text-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[13px] font-semibold text-[#280300] ml-4">{name}</h3>
                    <span className="text-[13px] font-semibold text-[#280300] mr-5">
                      {price && `UGX ${price}`}
                    </span>
                  </div>
                  <div className="mb-4 ml-4">
                    <h4 className="text-[11px] font-semibold text-gray-600">Description</h4>
                    <p className="text-[11px] text-gray-700 mt-1">{description}</p>
                  </div>
                  <table className="table-auto w-full ml-2">
                    <tbody>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Size:</td>
                        <td className="py-1 text-[11px]">
                          {size === "custom" ? custom_size : size}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Color:</td>
                        <td className="py-1 text-[11px]">
                          {color === "custom" ? custom_color : color}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Material:</td>
                        <td className="py-1 text-[11px]">{material}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Country of Origin:</td>
                        <td className="py-1 text-[11px]">{country_of_origin}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 text-[11px]">Add Date:</td>
                        <td className="py-1 text-[11px]">{addDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="my-4 border-gray-300" />
                  <div className="ml-2">
                    <h4 className="text-[11px] font-semibold text-gray-600 mb-2">Vendor Information</h4>
                    {vendorError ? (
                      <div className="text-[10px] text-red-500 mb-2">{vendorError}</div>
                    ) : vendor && vendor.id ? (
                      <table className="table-auto w-full">
                        <tbody>
                          <tr>
                            <td className="font-medium py-1 text-[11px]">Shop:</td>
                            <td className="py-1 text-[11px]">{vendor.shop_name}</td>
                          </tr>
                          <tr>
                            <td className="font-medium py-1 text-[11px]">Vendor:</td>
                            <td className="py-1 text-[11px]">{vendor.username}</td>
                          </tr>
                          <tr>
                            <td className="font-medium py-1 text-[11px]">Location:</td>
                            <td className="py-1 text-[11px]">{vendor.shop_address}</td>
                          </tr>
                          <tr>
                            <td className="font-medium py-1 text-[11px]">Email:</td>
                            <td className="py-1 text-[11px]">{vendor.user_email}</td>
                          </tr>
                          <tr>
                            <td className="font-medium py-1 text-[11px]">Phone:</td>
                            <td className="py-1 text-[11px]">{vendor.phone_number}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-[11px] text-gray-600">
                        No vendor information available
                      </div>
                    )}
                  </div>
                  <div className="mt-10 -ml-2 w-full flex justify-center">
                    <button className="flex items-center px-10 py-2 bg-red-500 text-[11px] text-white font-semibold rounded hover:bg-red-600">
                      Delete this product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsData.map((stat) => (
                  <StatsCard key={stat.title} title={stat.title} value={stat.value} />
                ))}
              </div>
              <OrderHistory orderHistory={orderHistoryData} />
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
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {product_image_url && (
              <img
                src={product_image_url}
                alt={name}
                className="max-w-full max-h-screen rounded shadow-lg"
              />
            )}
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
