import React from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Inline CSS for our circle & cross animations.
 * You can move this into a dedicated .css file if desired.
 */
const circleCrossStyles = `
@keyframes drawCircle {
  0% {
    stroke-dashoffset: 280;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes drawCross {
  0% {
    stroke-dashoffset: 42;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
`;

export default function ApprovalError({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded p-10 w-[440px] shadow-xl flex flex-col items-center">
        {/* Inject our inline animation styles */}
        <style>{circleCrossStyles}</style>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Circle + Cross Container */}
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg
            className="w-24 h-24"
            viewBox="0 0 100 100"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#DC2626" // Red color for error
              strokeWidth="2"
              strokeDasharray="282.743"
              strokeDashoffset="282.743"
              style={{ animation: "drawCircle 1s ease forwards" }}
            />
            {/* Cross Lines */}
            <path
              d="M35 35 L65 65"
              stroke="#DC2626"
              strokeWidth="2"
              strokeDasharray="42"
              strokeDashoffset="42"
              style={{ animation: "drawCross 1s ease forwards 0.5s" }}
            />
            <path
              d="M65 35 L35 65"
              stroke="#DC2626"
              strokeWidth="2"
              strokeDasharray="42"
              strokeDashoffset="42"
              style={{ animation: "drawCross 1s ease forwards 0.5s" }}
            />
          </svg>
        </div>

        {/* Informative Heading */}
        <h2 className="text-[15px] font-semibold text-gray-800 mb-2 text-center">
          Approval Error
        </h2>

        {/* Informative Subtext */}
        <p className="text-gray-600 text-[12px] text-center mb-4">
          There was an error approving the vendor request. Please try again later.
        </p>
      </div>
    </div>
  );
}
