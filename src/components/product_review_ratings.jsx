// components/ReviewsRatings.jsx

import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // For displaying star icons

export default function ReviewsRatings() {
  // This data mimics what is shown in the screenshot:
  const reviews = [
    {
      name: "Alinatwe Joel",
      rating: 5,
      ratingText: "Excellent Quality",
      location: "Uganda",
      date: "16-11-2023",
      review:
        "Medium thickness. Did not shrink after wash. Good elasticity. XL size perfectly fits for 5.10 height and heavy body. Did not fade after wash. Only for maroon color t-shirt; color lightly gone in first wash but not faded. I bought 5 t-shirts in different colours. Highly recommended at such a low price.",
    },
    {
      name: "Ahumuza Lillian",
      rating: 4,
      ratingText: "Good Quality",
      location: "Rwanda",
      date: "21-11-2023",
      review:
        "I liked the t-shirt; it's pure cotton and skin friendly, but the size is smaller compared to standard. Best rated.",
    },
    {
      name: "Ahumuza Melan",
      rating: 4,
      ratingText: "Good Quality",
      location: "Rwanda",
      date: "21-12-2024",
      review:
        "I liked the t-shirt; it's pure cotton and skin friendly, but the size is smaller compared to standard. Best rated.",
    },
    {
      name: "Ahumuza Melan",
      rating: 4,
      ratingText: "Good Quality",
      location: "Rwanda",
      date: "21-12-2024",
      review:
        "I liked the t-shirt; it's pure cotton and skin friendly, but the size is smaller compared to standard. Best rated.",
    },
    {
      name: "Ahumuza Ian",
      rating: 4,
      ratingText: "Good Quality",
      location: "Rwanda",
      date: "21-11-2025",
      review:
        "I liked the t-shirt; it's pure cotton and skin friendly, but the size is smaller compared to standard. Best rated.",
    },
  ];

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust this number as needed
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = reviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Helper function to compute initials from the name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    }
    // Take the first letter of the first and last name parts.
    return (
      nameParts[0][0].toUpperCase() +
      nameParts[nameParts.length - 1][0].toUpperCase()
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-base sm:text-sm font-semibold mb-4">
        Reviews &amp; Ratings({reviews.length})
      </h2>

      {currentPageData.map((review, index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
        >
          {/* Reviewer Info */}
          <div className="flex items-center mb-2">
            {/* Initials Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#280300] flex items-center justify-center mr-3">
              <span className="text-[12px] font-bold text-[#f9622c]">
                {getInitials(review.name)}
              </span>
            </div>
            <div>
              <h3 className="text-[11px] font-medium leading-tight">
                {review.name}
              </h3>
              {/* Star Icons */}
              <div className="flex text-yellow-500 text-[12px]">
                {Array(review.rating)
                  .fill(null)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
            </div>
          </div>

          {/* Rating Text */}
          <p className="text-[11px] font-semibold text-gray-800 mb-1">
            {review.ratingText}
          </p>

          {/* Location and Date */}
          <p className="text-[11px] text-gray-600 mb-2">
            Reviewed in {review.location} on {review.date}
          </p>

          {/* Review Body */}
          <p className="text-[11px] text-gray-700">{review.review}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-5 py-1 bg-gray-200 text-gray-700 text-[12px] rounded disabled:opacity-50 mr-2"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-5 py-1 rounded ${
                currentPage === page
                  ? "bg-[#f9622c] text-white text-[12px]"
                  : "bg-gray-200 text-gray-700 text-[12px]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-5 py-1 bg-gray-200 text-gray-700 text-[12px] rounded disabled:opacity-50 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
