import React from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Inline CSS for our circle & check animations.
 * You can also move this into a dedicated .css file if you prefer.
 */
const circleCheckStyles = `
@keyframes drawCircle {
  0% {
    stroke-dashoffset: 280;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes drawCheck {
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
`;

export default function Approved({ onClose }) {
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
        <style>{circleCheckStyles}</style>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Circle + Check + Confetti Container */}
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          {/* Animated Circle & Check (SVG) */}
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
              style={{
                animation: "drawCircle 1s ease forwards",
              }}
            />
            {/* Check Mark */}
            <path
              d="M35 50 L45 60 L65 40"
              stroke="#f9622c"
              strokeWidth="2"
              fill="none"
              strokeDasharray="50"
              strokeDashoffset="50"
              style={{
                animation: "drawCheck 1s ease forwards 0.5s",
              }}
            />
          </svg>

          {/* Confetti (positioned absolutely around the circle) */}
          <div className="pointer-events-none absolute inset-0">
            <span
              className="absolute w-2 h-2 bg-red-400 rounded-sm"
              style={{ top: "0px", left: "10%", transform: "rotate(15deg)" }}
            />
            <span
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{ top: "5%", left: "70%", transform: "rotate(-10deg)" }}
            />
            <span
              className="absolute w-2 h-2 bg-blue-400 rounded-sm"
              style={{ top: "80%", left: "90%", transform: "rotate(25deg)" }}
            />
            <span
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{ top: "75%", left: "5%", transform: "rotate(45deg)" }}
            />
            <span
              className="absolute w-2 h-2 bg-green-400 rounded-sm"
              style={{ top: "20%", left: "90%", transform: "rotate(5deg)" }}
            />
            <span
              className="absolute w-2 h-2 bg-pink-400 rounded-sm"
              style={{ top: "50%", left: "0%", transform: "rotate(-25deg)" }}
            />
          </div>
        </div>

        {/* Informative Heading */}
        <h2 className="text-[15px] font-semibold text-gray-800 mb-2 text-center">
          Vendor Request Approved!
        </h2>

        {/* Informative Subtext */}
        <p className="text-gray-600 text-[12px] text-center mb-4">
          The vendor's request has been successfully approved.
        </p>
      </div>
    </div>
  );
}
