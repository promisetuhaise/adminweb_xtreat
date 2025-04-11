import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import store from "../assets/store.png";

/**
 * A drop‑in replacement for fetch that automatically
 * pulls your access token out of localStorage and
 * injects it into the Authorization header.
 */
async function authFetch(input, init = {}) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found. Please log in again.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...init.headers,
  };

  return fetch(input, { ...init, headers });
}

export default function ApproveVendor({
  onClose,
  vendor,
  onApproveSuccess,
  onApproveError,
  onDeclineSuccess,
  onDeclineError,
}) {
  const [isApproving, setIsApproving] = useState(false);
  const [isrejecting, setIsrejecting] = useState(false);

  const handleApprove = async () => {
    if (!vendor) return;

    try {
      setIsApproving(true);

      const response = await authFetch(
        `https://api-xtreative.onrender.com/accounts/${vendor.id}/approve-vendor/`,
        {
          method: "POST",
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized – please log in again.");
      }
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to approve vendor: ${errText}`);
      }

      onApproveSuccess && onApproveSuccess();
      onClose();
    } catch (error) {
      console.error("Approval error:", error);
      onClose();
      onApproveError && onApproveError(error.message);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDecline = async () => {
    if (!vendor) return;

    try {
      setIsrejecting(true);

      const response = await authFetch(
        `https://api-xtreative.onrender.com/accounts/${vendor.id}/reject_vendor/`,
        {
          method: "POST",
          body: JSON.stringify({ status: "Rejected" }),
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized – please log in again.");
      }
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to reject vendor: ${errText}`);
      }

      onDeclineSuccess && onDeclineSuccess();
      onClose();
    } catch (error) {
      console.error("Decline error:", error);
      onClose();
      onDeclineError && onDeclineError(error.message);
    } finally {
      setIsrejecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm h-full bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#280300]">
          <h2 className="text-white text-[10px]">
            {vendor
              ? `Vendor Application for ${vendor.username}`
              : "Vendor Details"}
          </h2>
          <button onClick={onClose}>
            <HiOutlineX className="text-white w-5 h-5" />
          </button>
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

          <h3 className="text-[12px] font-semibold text-[#280300]">
            {vendor?.shop_name || "Shop Name"}
          </h3>
          {vendor?.tagline && (
            <p className="text-[10px] text-gray-500">by {vendor.tagline}</p>
          )}

          <div className="flex items-start mt-3">
            <FaMapMarkerAlt className="text-[#f9622c] w-3 h-3 mr-2" />
            <p className="text-[11px] text-gray-700">
              {vendor?.shop_address}
            </p>
          </div>

          <div className="flex items-start mt-3">
            <FaEnvelope className="text-[#f9622c] w-3 h-3 mr-2" />
            <p className="text-[11px] text-gray-700">{vendor?.user_email}</p>
          </div>

          <div className="flex items-start mt-3">
            <FaPhoneAlt className="text-[#f9622c] w-3 h-3 mr-2" />
            <p className="text-[11px] text-gray-700">
              {vendor?.phone_number}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-[11px] mb-1">Description :</h4>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              {vendor?.shop_description || "No description available."}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="flex items-center justify-center w-full h-8 bg-[#f9622c] text-white text-[11px] rounded-md"
              onClick={handleApprove}
              disabled={isApproving || isrejecting}
            >
              <FaCheck className="mr-1" />
              {isApproving ? "Approving..." : "Approve"}
            </button>
            <button
              className="flex items-center justify-center w-full h-8 bg-[#fff] text-[#280300] text-[11px] rounded-md border border-[#280300]"
              onClick={handleDecline}
              disabled={isrejecting || isApproving}
            >
              <FaTimes className="mr-1" />
              {isrejecting ? "rejecting..." : "Decline"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
