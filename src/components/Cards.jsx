// components/StatsCard.js
import React from "react";

const StatsCard = ({ title, value, timeframe }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col font-poppins">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-gray-500 font-semibold text-[13px]">{title}</h2>
      </div>

      {/* Value */}
      <div className="mb-2 font-bold text-[#280300]">{value}</div>
      
      {/* Timeframe positioned at the bottom right */}
      <div className="self-end text-[10px] text-green-700">{timeframe}</div>
    </div>
  );
};

export default StatsCard;
