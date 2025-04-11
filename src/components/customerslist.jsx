// src/components/CustomersList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
// Assuming a delete modal for Customers is available
import DeleteCustomer from "../modals/deleteCustomer";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

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

export default function CustomersList() {
  const navigate = useNavigate();

  // Data + loading/error
  const [Customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Selection
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDeleteCustomer, setActiveDeleteCustomer] = useState(null);

  // Pagination / entries‑per‑page
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Base API URL for activation/deactivation endpoints
  const API_BASE_URL = "https://api-xtreative.onrender.com";

  // Fetch logic extracted so we can re‑use on Refresh
  const fetchCustomers = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/customers/list/`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching Customers");
        return res.json();
      })
      .then((data) => {
        // sort newest first by id (highest id = newest)
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setCustomers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Derived lists for filters
  const addresses = ["All", ...new Set(Customers.map((c) => c.address))];
  const statuses = ["All", "active", "inactive"];

  const filteredCustomers = Customers.filter((customer) => {
    const name = customer.username.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesName = name.includes(term);
    const matchesAddress =
      selectedAddress === "All" || customer.address === selectedAddress;
    const matchesStatus =
      selectedStatus === "All" ||
      customer.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesName && matchesAddress && matchesStatus;
  });

  // Pagination math
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage) || 1;
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset to page 1 whenever filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAddress, selectedStatus, entriesPerPage]);

  // Selection helpers
  const allSelected =
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) => selectedContacts.includes(c.user_email));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSel = [
        ...new Set([
          ...selectedContacts,
          ...paginatedCustomers.map((c) => c.user_email),
        ]),
      ];
      setSelectedContacts(newSel);
    } else {
      setSelectedContacts((prev) =>
        prev.filter(
          (email) =>
            !paginatedCustomers.some((c) => c.user_email === email)
        )
      );
    }
  };

  const handleSelectContact = (email) => {
    setSelectedContacts((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  // Toggle activation status for a customer by calling the API endpoints
  const handleToggleActivation = async (id) => {
    // Find the customer for the given id
    const customer = Customers.find((cust) => cust.id === id);
    if (!customer) return;

    // Retrieve the access token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentication token missing. Please log in again.");
      return;
    }

    // Determine the endpoint based on current customer status
    const statusLower = customer.status.toLowerCase();
    const endpoint =
      statusLower === "active"
        ? `${API_BASE_URL}/customers/${id}/deactivate/`
        : `${API_BASE_URL}/customers/${id}/activate/`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Refresh the customer list on successful toggle
        fetchCustomers();
      } else {
        const errorData = await response.json();
        alert("Toggle failed: " + (errorData.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Toggle activation error:", error);
      alert("An error occurred while updating the status.");
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="min-h-screen bg-gray-100 p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-sm font-poppins">
      {/* Header */}
      <header className="mb-4 flex justify-between items-center border-b border-gray-300 pb-2">
        <h1 className="font-semibold text-base text-gray-800">
          Customers ({Customers.length})
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
            placeholder="Search Customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 text-xs pl-10 pr-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:border-[#280300]"
          />
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-3 space-y-2">
        {/* Address Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-xs text-gray-600">Address:</label>
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="text-[12px] border border-gray-300 py-1 px-2 rounded-full focus:outline-none"
          >
            {addresses.map((addr) => (
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

        {/* Refresh */}
        <button
          onClick={fetchCustomers}
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
              <th className="p-2 text-xs font-semibold text-gray-600">Address</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Email</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Phone</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Status</th>
              <th className="p-2 text-xs font-semibold text-gray-600">Action</th>
              <th className="p-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => {
              const initials = getInitials(customer.username);
              const statusLower = customer.status.toLowerCase();
              const isActive = statusLower === "active";
              // For phone, join country code with phone number
              const phoneDisplay = `${customer.country_code}${customer.phone_number}`;

              return (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-2">
                    <CustomCheckbox
                      checked={selectedContacts.includes(customer.user_email)}
                      onChange={() => handleSelectContact(customer.user_email)}
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#280300] text-xs font-bold text-orange-300">
                        {initials}
                      </div>
                      <div className="text-gray-700 text-[11px]">
                        {customer.username}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-gray-700 text-[11px]">
                    {customer.address}
                  </td>
                  <td className="p-2 text-gray-700 text-[11px]">
                    {customer.user_email}
                  </td>
                  <td className="p-2 text-gray-700 text-[11px]">
                    {phoneDisplay}
                  </td>
                  <td className="p-2 text-gray-700 text-[11px]">
                    <div className="flex items-center space-x-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-gray-700">
                        {customer.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 text-gray-700 text-xs flex items-center space-x-2">
                    {/* View Details Icon */}
                    <button
                      onClick={() =>
                        navigate("/Customers/details", { state: { customer } })
                      }
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
                    {/* Toggle Activation Icon */}
                    <button
                      onClick={() => handleToggleActivation(customer.id)}
                      className="hover:text-[#f9622c]"
                    >
                      {/* If the customer is active, show the 'toggle on' icon in #f9622c color */}
                      {isActive ? (
                        <FaToggleOn className="h-4 w-4" style={{ color: "#f9622c" }} />
                      ) : (
                        <FaToggleOff className="h-4 w-4" style={{ color: "gray" }} />
                      )}
                    </button>
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => {
                        setActiveDeleteCustomer(customer);
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

      {/* DeleteCustomer Modal */}
      {showDeleteModal && (
        <DeleteCustomer
          customer={activeDeleteCustomer}
          onClose={() => setShowDeleteModal(false)}
          onDeleteSuccess={() => {
            setShowDeleteModal(false);
            fetchCustomers();
          }}
          onDeleteError={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
