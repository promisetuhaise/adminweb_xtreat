import React, { useState, useEffect } from "react";
import StatsCard from "../components/Cards";
import AnalyticsCharts from "../components/2cardgrid";

const StatsCardsGrid = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statsData, setStatsData] = useState([]);
  const [vendorStats, setVendorStats] = useState({});

  const generateStatsData = (date) => {
    const day = date.getDate();
    const formattedDate = date.toLocaleDateString();
    return [
      {
        title: "Total Sales",
        value: `UGX ${89200 + day}`,
        timeframe: `for ${formattedDate}`,
      },
      {
        title: "Orders",
        value: 6521 + day,
        timeframe: `for ${formattedDate}`,
      },
      {
        title: "New Users",
        value: 5 + day,
        timeframe: `for ${formattedDate}`,
      },
      {
        title: "Total Earnings",
        value: `UGX ${162000 + day}`,
        timeframe: `for ${formattedDate}`,
      },
    ];
  };

  const generateVendorStats = (date) => {
    const day = date.getDate();
    return {
      applications: 10 + (day % 6),
      pendingPayouts: 30 + (day % 5),
      loanRequests: 5 + (day % 5),
    };
  };

  const formattedDate = selectedDate.toLocaleDateString();

  useEffect(() => {
    setStatsData(generateStatsData(selectedDate));
    setVendorStats(generateVendorStats(selectedDate));
  }, [selectedDate]);

  return (
    <div>
      {/* Calendar Input */}
      <div className="mb-1">
        <input
          type="date"
          id="datePicker"
          className="border border-gray-300 rounded font-poppins text-[10px] text-gray-500"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((item, idx) => (
          <StatsCard
            key={idx}
            title={item.title}
            value={item.value}
            timeframe={item.timeframe}
          />
        ))}
      </div>

      {/* Vendors & Charts */}
      <AnalyticsCharts
        formattedDate={formattedDate}
        vendorStats={vendorStats}
      />
    </div>
  );
};

export default StatsCardsGrid;
