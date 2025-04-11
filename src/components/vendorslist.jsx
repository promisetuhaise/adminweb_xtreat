// src/components/VendorsList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
import ApproveVendor from "../components/approveVendor";
import Approved from "../modals/approved";
import ApprovalError from "../modals/approvalError";
import Declined from "../modals/declined";
import DeclineError from "../modals/declinedError";
import DeleteVendor from "../modals/deleteVendor"; // Assumed to be adapted for onDeleteConfirm
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

// CustomCheckbox component using Tailwind peer classes
const CustomCheckbox = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer hidden"
    />
    <div className="w-3 h-3 border border-gray-600 rounded-sm flex items-center justify-center peer-checked:bg-[#f9622c] peer-checked:border-white">
      <svg
        className="hidden w-3 h-3 text-white peer-checked:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </label>
);

// Utility to get initials from a full name
const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function VendorsList() {
  const navigate = useNavigate();

  // Data + loading/error
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShopAddress, setSelectedShopAddress] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Selection
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Approval panel & modals
  const [showApproveVendor, setShowApproveVendor] = useState(false);
  const [activeVendor, setActiveVendor] = useState(null);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const [showApprovalError, setShowApprovalError] = useState(false);
  // Decline modal states
  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const [showDeclineError, setShowDeclineError] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDeleteVendor, setActiveDeleteVendor] = useState(null);

  // Pagination / entries‑per‑page
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch vendors from API
  const fetchVendors = () => {
    setLoading(true);
    fetch("https://api-xtreative.onrender.com/vendors/list/")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching vendors");
        return res.json();
      })
      .then((data) => {
        // sort newest first by id (highest id = newest)
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setVendors(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchVendors();
  }, []);

  // Polling every 60 seconds for updates
  useEffect(() => {
    const intervalId = setInterval(fetchVendors, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Derived lists for filter options
  const shopAddresses = ["All", ...new Set(vendors.map((v) => v.shop_address))];
  const statuses = ["All", "pending", "Approved"];

  const filteredVendors = vendors.filter((vendor) => {
    const name = vendor.username.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesName = name.includes(term);
    const matchesAddress =
      selectedShopAddress === "All" || vendor.shop_address === selectedShopAddress;
    const matchesStatus =
      selectedStatus === "All" ||
      vendor.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesName && matchesAddress && matchesStatus;
  });

  // Pagination math
  const totalPages = Math.ceil(filteredVendors.length / entriesPerPage) || 1;
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset page on filter/page-size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedShopAddress, selectedStatus, entriesPerPage]);

  // Selection helpers
  const allSelected =
    paginatedVendors.length > 0 &&
    paginatedVendors.every((v) => selectedContacts.includes(v.user_email));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSel = [
        ...new Set([
          ...selectedContacts,
          ...paginatedVendors.map((v) => v.user_email),
        ]),
      ];
      setSelectedContacts(newSel);
    } else {
      setSelectedContacts((prev) =>
        prev.filter((email) => !paginatedVendors.some((v) => v.user_email === email))
      );
    }
  };

  const handleSelectContact = (email) => {
    setSelectedContacts((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  // Optimistic delete handler that, upon a successful API call,
  // adds the vendor back to the list.
  const handleDeleteVendor = (vendor) => {
    // Save the current vendors list in case a rollback is needed
    const previousVendors = [...vendors];

    // Optimistically remove the vendor from state
    setVendors((prev) => prev.filter((v) => v.id !== vendor.id));
    setShowDeleteModal(false);

    // Call the delete API
    fetch(`https://api-xtreative.onrender.com/vendors/${vendor.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");

        // If deletion is successful, add the vendor back
        // (This simulates re-adding the vendor even when the delete API returns a success.)
        setVendors((prev) => {
          // Avoid duplicate in case the vendor was already re-added
          if (!prev.some((v) => v.id === vendor.id)) {
            return [...prev, vendor];
          }
          return prev;
        });
      })
      .catch((err) => {
        // On error, rollback the optimistic removal
        setVendors(previousVendors);
        console.error("Failed to delete vendor:", err);
      });
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="min-h-screen bg-gray-100 p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-sm font-poppins">
      {/* Header */}
      <header className="mb-4 flex justify-between items-center border-b border-gray-300 pb-2">
        <h1 className="font-semibold text-base text-gray-800">
          Vendors ({vendors.length})
        </h1>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 text-xs pl-10 pr-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:border-[#280300]"
          />
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-3 space-y-2">
        {/* Shop Address Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-xs text-gray-600">Shop Address:</label>
          <select
            value={selectedShopAddress}
            onChange={(e) => setSelectedShopAddress(e.target.value)}
            className="text-[12px] border border-gray-300 py-1 px-2 rounded-full focus:outline-none"
          >
            {shopAddresses.map((addr) => (
              <option key={addr} value={addr}>
                {addr}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-xs text-gray-600">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-[12px] border border-gray-300 py-1 px-2 rounded-full focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Entries Per Page */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Entries per page:</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="text-[11px] border border-gray-300 py-1 px-2 rounded-full focus:outline-none"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchVendors}
          className="flex items-center text-gray-600 hover:text-gray-800 text-xs"
        >
          <span className="mr-1">Refresh</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#f9622c"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114 0M20 15a9 9 0 01-14 0"
            />
          </svg>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-[#eee]">
              <th className="p-2 w-8">
                <CustomCheckbox checked={allSelected} onChange={handleSelectAll} />
              </th>
              <th className="p-2 text-xs font-semibold text-gray-600">Name</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Shop</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Shop Address</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Email</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Phone</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Status</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Action</th>
              <th className="p-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedVendors.map((vendor) => {
              const initials = getInitials(vendor.username);
              const statusLower = vendor.status.toLowerCase();
              const isPending = statusLower === "pending";
              const isApproved = statusLower === "approved";

              return (
                <tr
                  key={vendor.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-2">
                    <CustomCheckbox
                      checked={selectedContacts.includes(vendor.user_email)}
                      onChange={() => handleSelectContact(vendor.user_email)}
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#280300] text-xs font-bold text-orange-300">
                        {initials}
                      </div>
                      <div className="text-gray-700 text-[11px]">
                        {vendor.username}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-gray-700 text-[11px]">{vendor.shop_name}</td>
                  <td className="p-2 text-gray-700 text-[11px]">{vendor.shop_address}</td>
                  <td className="p-2 text-gray-700 text-[11px]">{vendor.user_email}</td>
                  <td className="p-2 text-gray-700 text-[11px]">{vendor.phone_number}</td>
                  <td className="p-2 text-gray-700 text-[11px]">
                    <div className="flex items-center space-x-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isPending
                            ? "bg-orange-500"
                            : isApproved
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span className={isPending || isApproved ? "text-gray-700" : ""}>
                        {vendor.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 text-gray-700 text-xs">
                    <button
                      onClick={() => {
                        setActiveVendor(vendor);
                        if (isPending) {
                          setShowApproveVendor(true);
                        } else if (isApproved) {
                          navigate("/Vendors/details", { state: { vendor } });
                        }
                      }}
                      className="hover:text-[#f9622c]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => {
                        setActiveDeleteVendor(vendor);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-end p-2 text-xs text-gray-600 space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded-full ${
                page === currentPage
                  ? "bg-[#f9622c] text-white"
                  : "hover:bg-[#f9622c] hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* ApproveVendor Panel */}
      {showApproveVendor && (
        <ApproveVendor
          vendor={activeVendor}
          onClose={() => setShowApproveVendor(false)}
          onApproveSuccess={() => {
            // Optimistically update vendor status locally for approval
            setVendors((prev) =>
              prev.map((v) =>
                v.id === activeVendor.id ? { ...v, status: "Approved" } : v
              )
            );
            setShowApproveVendor(false);
            setShowApprovedModal(true);
          }}
          onApproveError={() => {
            setShowApproveVendor(false);
            setShowApprovalError(true);
          }}
          onDeclineSuccess={() => {
            // Optimistically update vendor status locally for decline
            setVendors((prev) =>
              prev.map((v) =>
                v.id === activeVendor.id ? { ...v, status: "Declined" } : v
              )
            );
            setShowApproveVendor(false);
            setShowDeclinedModal(true);
          }}
          onDeclineError={() => {
            setShowApproveVendor(false);
            setShowDeclineError(true);
          }}
        />
      )}

      {/* DeleteVendor Modal */}
      {showDeleteModal && (
        <DeleteVendor
          vendor={activeDeleteVendor}
          onClose={() => setShowDeleteModal(false)}
          // Pass onDeleteConfirm callback that does the optimistic deletion,
          // and then re-adds the vendor to the list even when deletion is successful.
          onDeleteConfirm={() => handleDeleteVendor(activeDeleteVendor)}
        />
      )}

      {/* Success & Error Modals for Approve */}
      {showApprovedModal && <Approved onClose={() => setShowApprovedModal(false)} />}
      {showApprovalError && <ApprovalError onClose={() => setShowApprovalError(false)} />}

      {/* Success & Error Modals for Decline */}
      {showDeclinedModal && <Declined onClose={() => setShowDeclinedModal(false)} />}
      {showDeclineError && <DeclineError onClose={() => setShowDeclineError(false)} />}
    </div>
  );
}
