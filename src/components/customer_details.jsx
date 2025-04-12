import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaTimes, // Imported additional icon for inactive status
} from "react-icons/fa";

export default function CustomerDetailCard({ customer }) {
  // 1) Determine display name
  const displayName = customer?.name || customer?.username || "Customer";

  // 2) Derive user status (defaults to "inactive")
  const status = customer?.status ? customer.status.toLowerCase() : "inactive";
  const isActive = status === "active";

  return (
    <div className="bg-white shadow-lg rounded max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#280300] rounded-t">
        <h2 className="text-white text-sm font-medium">
          {customer ? `${displayName}'s Details` : "Customer Details"}
        </h2>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Large circle with user silhouette, plus conditional status icon */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#ccc] text-white">
            {/* User silhouette */}
            <FaUser className="w-12 h-12" />

            {/* Conditional status icon:
                Render checkmark if active, otherwise an "X" icon */}
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#f9622c] flex items-center justify-center ring-2 ring-white">
              {isActive ? (
                <svg
                  className="w-4 h-4 text-[white]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <FaTimes className="w-4 h-4 text-[white]" />
              )}
            </div>
          </div>
        </div>

        {/* Display Name */}
        <h3 className="text-[13px] font-semibold text-[#280300]">
          {displayName}
        </h3>

        {/* Phone */}
        <div className="flex items-center mt-3">
          <FaPhoneAlt className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-[11px] text-gray-700">
            {customer?.phone_number || "Phone not available"}
          </p>
        </div>

        {/* Address */}
        <div className="flex items-start mt-3">
          <FaMapMarkerAlt className="text-[#f9622c] w-3 h-3 mr-2" />
          <p className="text-[11px] text-gray-700">
            {customer?.address || "Address not available"}
          </p>
        </div>

        <div className="flex items-start mt-3">
        <FaEnvelope className="text-[#f9622c] w-3 h-3 mr-2" />

          <p className="text-[11px] text-gray-700">
            {customer?.user_email || "Email not available"}
          </p>
        </div>
    </div>
</div>
  );
}
