// src/components/vendor_details_products.jsx
import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaFilter,
} from "react-icons/fa";

// Helper function: parse "dd/mm/yyyy" to a Date object
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// Helper function: extract numerical price from a formatted price string (e.g., "UGX 35000" or "80000.00")
function extractPrice(priceStr) {
  return Number(priceStr.replace(/[^\d.]/g, ""));
}

// Helper function: get relative time ago from a date string (e.g., "2d ago")
function getTimeAgo(dateString) {
  const createdDate = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - createdDate) / 1000);

  const intervals = [
    { unit: "y", seconds: 31536000 },
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count}${interval.unit} ago`;
    }
  }
  return "Just now";
}

export default function VendorDetailsProducts({ vendor }) {
  // State for fetched products (fetched from API)
  const [products, setProducts] = useState([]);
  // States for loading and error when fetching products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and dropdown visibility
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterMaterial, setFilterMaterial] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterOption, setFilterOption] = useState(""); // Sorting option

  // Fetch the public products list from API on component mount
  useEffect(() => {
    setLoading(true);
    fetch("https://api-xtreative.onrender.com/products/listing/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        return response.json();
      })
      .then((data) => {
        // If a vendor is provided, filter products by vendor id.
        // The API returns vendor id as a number.
        const vendorProducts = vendor
          ? data.filter(
              (product) => Number(product.vendor) === Number(vendor.id)
            )
          : data;
        // Sort products so that the newest (based on addDate or created_at) show at the top.
        const sortedVendorProducts = vendorProducts.sort((a, b) => {
          const dateA = a.addDate ? parseDate(a.addDate) : new Date(a.created_at);
          const dateB = b.addDate ? parseDate(b.addDate) : new Date(b.created_at);
          return dateB - dateA;
        });
        setProducts(sortedVendorProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [vendor]);

  // Apply additional filters on the products obtained from the API
  let filteredProducts = products.filter((product) => {
    if (
      filterCategory &&
      product.category.toLowerCase() !== filterCategory.toLowerCase()
    )
      return false;
    if (
      filterColor &&
      product.color.toLowerCase() !== filterColor.toLowerCase()
    )
      return false;
    if (
      filterMaterial &&
      product.material.toLowerCase() !== filterMaterial.toLowerCase()
    )
      return false;
    if (
      filterSize &&
      product.size &&
      product.size.toString() !== filterSize
    )
      return false;
    return true;
  });

  // Apply sorting based on the filter option, if chosen
  if (filterOption === "Latest") {
    filteredProducts = filteredProducts.sort((a, b) => {
      const dateA = a.addDate ? parseDate(a.addDate) : new Date(a.created_at);
      const dateB = b.addDate ? parseDate(b.addDate) : new Date(b.created_at);
      return dateB - dateA;
    });
  } else if (filterOption === "This Month") {
    // Include products added in the current month of the current year
    const now = new Date();
    filteredProducts = filteredProducts.filter((product) => {
      const date = product.addDate
        ? parseDate(product.addDate)
        : new Date(product.created_at);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });
  } else if (filterOption === "PriceLowHigh") {
    filteredProducts = filteredProducts.sort(
      (a, b) => extractPrice(a.price) - extractPrice(b.price)
    );
  }

  if (loading)
    return <p className="text-xs text-gray-600">Loading products...</p>;
  if (error)
    return <p className="text-xs text-red-600">Error: {error}</p>;

  return (
    // Wrap entire component with Poppins font (ensure it's loaded in your CSS/Tailwind config)
    <div className="w-full font-poppins" style={{ fontFamily: "Poppins" }}>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-semibold">Products</h2>
        <div className="relative">
          <button
            className="flex items-center text-[10px] border px-3 py-1 rounded text-gray-600 bg-white hover:bg-gray-50 transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="mr-1" />
            Filters
          </button>
          {/* Dropdown filters */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="p-3">
                {/* Category Filter */}
                <div className="mb-2">
                  <label className="block text-[10px] text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full text-[10px] border rounded px-2 py-1"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="fashion">Fashion</option>
                    <option value="hand bag">Hand Bag</option>
                    <option value="cap">Cap</option>
                  </select>
                </div>
                {/* Color Filter */}
                <div className="mb-2">
                  <label className="block text-[10px] text-gray-600 mb-1">
                    Color
                  </label>
                  <select
                    className="w-full text-[10px] border rounded px-2 py-1"
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="red">Red</option>
                    <option value="black">Black</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                {/* Material Filter */}
                <div className="mb-2">
                  <label className="block text-[10px] text-gray-600 mb-1">
                    Material
                  </label>
                  <select
                    className="w-full text-[10px] border rounded px-2 py-1"
                    value={filterMaterial}
                    onChange={(e) => setFilterMaterial(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="leather">Leather</option>
                    <option value="cloth">Cloth</option>
                    <option value="fabric">Fabric</option>
                  </select>
                </div>
                {/* Size Filter */}
                <div className="mb-2">
                  <label className="block text-[10px] text-gray-600 mb-1">
                    Size
                  </label>
                  <select
                    className="w-full text-[10px] border rounded px-2 py-1"
                    value={filterSize}
                    onChange={(e) => setFilterSize(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="32">32</option>
                    <option value="small">Small</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                {/* Sorting Filter */}
                <div className="mb-2">
                  <label className="block text-[10px] text-gray-600 mb-1">
                    Filter By
                  </label>
                  <select
                    className="w-full text-[10px] border rounded px-2 py-1"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Latest">Latest</option>
                    <option value="This Month">This Month</option>
                    <option value="PriceLowHigh">Price: Low to High</option>
                  </select>
                </div>
                <button
                  className="w-full mt-2 text-[10px] bg-[#f9622c] text-white rounded px-2 py-1"
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Check if there are products to display */}
      {filteredProducts.length === 0 ? (
        <div className="p-4 text-center text-gray-600 text-xs">
          No products found.
        </div>
      ) : (
        // Table Container
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="min-w-full text-[10px] text-left text-gray-600">
            <thead className="bg-gray-50 uppercase text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </th>
                <th scope="col" className="px-4 py-3">
                  Product
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Add Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Duration
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  {/* Product Name & Details */}
                  <td className="px-4 py-3 flex items-center space-x-2 min-w-[200px]">
                    <img
                      src={product.product_image_url || tshirtImg}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800 text-[11px]">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {product.size ? `size: ${product.size} | ` : ""}
                        {product.color ? `color: ${product.color} | ` : ""}
                        {product.material
                          ? `material: ${product.material}`
                          : ""}
                      </span>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3">{product.category}</td>
                  {/* Add Date */}
                  <td className="px-4 py-3">
                    {product.addDate ||
                      new Date(product.created_at).toLocaleDateString()}
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    {product.status === "active" ? (
                      <span className="inline-flex items-center px-2 py-1 text-[10px] rounded bg-green-100 text-green-700">
                        <FaCheckCircle className="mr-1" /> Posted
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-[10px] rounded bg-red-100 text-red-700">
                        <FaExclamationCircle className="mr-1" />{" "}
                        {product.status}
                      </span>
                    )}
                  </td>
                  {/* Duration column: Show time since created_at */}
                  <td className="px-4 py-3">
                    {getTimeAgo(product.created_at)}
                  </td>
                  {/* Price column */}
                  <td className="px-4 py-3">
                    UGX {extractPrice(product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
