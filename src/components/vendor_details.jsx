// src/components/VendorDetailCard.jsx
import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import store from "../assets/store.png";

export default function VendorDetailCard({ vendor }) {
  return (
    <div className="bg-white shadow-lg rounded max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#280300] rounded-t">
        <h2 className="text-white text-sm font-medium">
          {vendor ? `${vendor.username}'s Details` : "Vendor Details"}
        </h2>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-center justify-center bg-gray-50 p-10 mb-4">
          <img
            src={store}
            alt="Store Logo"
            className="w-auto"
            style={{ maxHeight: "5rem" }}
          />
        </div>

        <h3 className="text-sm font-semibold text-[#280300]">
          {vendor?.shop_name || "Shop Name"}
        </h3>
        {vendor?.tagline && (
          <p className="text-xs text-gray-500 mb-2">by {vendor.tagline}</p>
        )}

        {/* New Vendor Name Row with Icon */}
        <div className="flex items-center mt-3">
          <FaUser className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-xs text-gray-700">
            {vendor?.username || "Vendor Name not available"}
          </p>
        </div>

        <div className="flex items-start mt-3">
          <FaMapMarkerAlt className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-xs text-gray-700">
            {vendor?.shop_address || "Shop address not available"}
          </p>
        </div>

        <div className="flex items-start mt-3">
          <FaEnvelope className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-xs text-gray-700">
            {vendor?.user_email || "Email not available"}
          </p>
        </div>

        <div className="flex items-start mt-3">
          <FaPhoneAlt className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-xs text-gray-700">
            {vendor?.phone_number || "Phone not available"}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-xs mb-1">Description:</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {vendor?.shop_description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
