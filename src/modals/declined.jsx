import React from "react";
import { FaTimes } from "react-icons/fa";

const circleXStyles = `
@keyframes drawCircle {
  0% {
    stroke-dashoffset: 282.743;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes drawX {
  0% {
    stroke-dashoffset: 56.569;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeInText {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export default function Declined({ onClose }) {
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
        <style>{circleXStyles}</style>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Circle + X Mark Container */}
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
              stroke="#f9622c"
              strokeWidth="2"
              strokeDasharray="282.743"
              strokeDashoffset="282.743"
              style={{ animation: "drawCircle 1s ease forwards" }}
            />

            {/* First X stroke with ID */}
            <path
              id="xLine"
              d="M30 30 L70 70"
              stroke="#f9622c"
              strokeWidth="2"
              strokeDasharray="56.569"
              strokeDashoffset="56.569"
              style={{
                animation: "drawX 0.8s ease forwards 0.5s",
              }}
            />

            {/* Second X stroke */}
            <path
              d="M70 30 L30 70"
              stroke="#f9622c"
              strokeWidth="2"
              strokeDasharray="56.569"
              strokeDashoffset="56.569"
              style={{
                animation: "drawX 0.8s ease forwards 0.7s",
              }}
            />

           
          </svg>
        </div>

        {/* Informative Heading */}
        <h2 className="text-[15px] font-semibold text-gray-800 mb-2 text-center">
          Vendor Request Declined
        </h2>

        {/* Informative Subtext */}
        <p className="text-gray-600 text-[12px] text-center mb-4">
          Unfortunately, the vendor's request has been declined.
        </p>
      </div>
    </div>
  );
}
