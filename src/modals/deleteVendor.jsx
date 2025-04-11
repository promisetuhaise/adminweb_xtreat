import React from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

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

const trashCanStyles = `
@keyframes openCloseLid {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
`;

export default function DeleteVendor({ vendor, onClose, onDeleteConfirm, onDeleteError }) {
  const handleDelete = async () => {
    // Immediately close the modal
    onClose();

    try {
      const response = await authFetch(
        `https://api-xtreative.onrender.com/vendors/${vendor.id}/delete/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting vendor");
      }

      toast.success("Vendor Deleted Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });

      if (onDeleteConfirm) {
        onDeleteConfirm(); // Update list
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete vendor. Please try again.", {
        position: "bottom-right",
      });
      if (onDeleteError) {
        onDeleteError(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal Container */}
      <div className="relative bg-white rounded p-10 w-[440px] shadow-xl flex flex-col items-center">
        <style>{trashCanStyles}</style>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Trash Can Animation */}
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
            <rect x="30" y="40" width="40" height="40" fill="#f9622c" />
            <rect
              x="28"
              y="30"
              width="44"
              height="10"
              fill="#f9622c"
              style={{
                transformOrigin: "28px 30px",
                animation: "openCloseLid 2s ease forwards",
              }}
            />
          </svg>
        </div>

        <h2 className="text-[15px] font-semibold text-gray-800 mb-2 text-center">
          Delete Vendor
        </h2>

        <p className="text-gray-600 text-[12px] text-center mb-4">
          Are you sure you want to delete this vendor? This action cannot be undone.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-[#f9622c] text-white text-sm rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
