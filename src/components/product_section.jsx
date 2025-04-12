import React, { useState, useMemo } from "react";
import { FaStar, FaSyncAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../pages/Loader"; // Ensure the import path is correct
import { slugify } from "../utils/slugify";
import Fuse from "fuse.js";

const OFFSET = 10000; // same offset trick as before

const ProductSection = ({ products, filters }) => {
  // First apply the filters (except the search term for now)  
  const basicFilteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      let match = true;
      // Filter by dynamic price range
      match =
        match &&
        Number(product.price) >= filters.minPrice &&
        Number(product.price) <= filters.maxPrice;
      // Filter by rating (if a rating is set, show products with rating >= selection)
      if (filters.selectedRating)
        match = match && (product.rating ?? 0) >= filters.selectedRating;
      // Filter by category if not "All Categories"
      if (
        filters.selectedCategories &&
        !filters.selectedCategories.includes("All Categories") &&
        product.category
      ) {
        match = match && filters.selectedCategories.includes(product.category);
      }
      // NEW: Filter by size if not "All Sizes" and if product has a size property.
      if (
        filters.selectedSizes &&
        !filters.selectedSizes.includes("All Sizes") &&
        product.size
      ) {
        match = match && filters.selectedSizes.includes(product.size);
      }
      return match;
    });
  }, [products, filters.minPrice, filters.maxPrice, filters.selectedRating, filters.selectedCategories, filters.selectedSizes]);

  // Now perform fuzzy search on the already filtered list.
  // Fuse options can be tuned; here we search on the "name" key.
  const fuseOptions = {
    keys: ["name"],
    threshold: 0.3, // Adjust this value for fuzziness: lower is stricter, higher is more relaxed.
  };

  const filteredProducts = useMemo(() => {
    if (filters.searchTerm) {
      const fuse = new Fuse(basicFilteredProducts, fuseOptions);
      // Fuse returns an array of results; map each result to its item.
      return fuse.search(filters.searchTerm).map((result) => result.item);
    }
    return basicFilteredProducts;
  }, [basicFilteredProducts, filters.searchTerm]);

  // Pagination calculations on filtered products
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const idxLast = currentPage * productsPerPage;
  const idxFirst = idxLast - productsPerPage;
  const currentProducts = filteredProducts.slice(idxFirst, idxLast);

  // Handlers for pagination and entries
  const handlePrevClick = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNextClick = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handleEntriesChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // If no products are present, show a loading indicator.
  if (!products.length) return <Loader />;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">
            Products ({filteredProducts.length})
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="text-[11px] text-gray-700">Entries per page:</span>
            <select
              value={productsPerPage}
              onChange={handleEntriesChange}
              className="border rounded px-2 py-1 text-[11px] text-gray-700"
            >
              {[10, 20, 30, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setCurrentPage(1)}
            className="flex items-center space-x-1 text-[11px] text-gray-700 hover:text-orange-600"
            title="Refresh"
          >
            <span>Refresh</span>
            <FaSyncAlt className="text-[#f9622c]" />
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-150" />

      {/* PRODUCT GRID */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => {
            const publicId = product.id + OFFSET;
            const imgSrc = product.product_image_url || product.product_image;
            const rating = product.rating ?? 0;
            const reviews = product.reviews ?? 0;
            return (
              <Link
                key={product.id}
                to={`/products/product/${publicId}/${slugify(product.name)}`}
                className="relative rounded-lg overflow-hidden block hover:shadow-lg transition-shadow"
              >
                <div className="h-40 w-full rounded">
                  <img src={imgSrc} alt={product.name} className="object-contain w-full h-full" />
                </div>
                <div className="p-2 space-y-1 text-center">
                  <h3 className="text-[10px] font-small text-gray-600 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center text-gray-600 text-[10px]">
                    <FaStar className="text-yellow-400 mr-1" size={12} />
                    <span>{rating} ({reviews})</span>
                  </div>
                  <div className="text-[11px] font-semibold text-gray-600">
                    UGX {Number(product.price).toLocaleString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-gray-600">
          No products match your criteria.
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50 text-[11px]"
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 border rounded text-[11px] ${
                page === currentPage
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50 text-[11px]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
