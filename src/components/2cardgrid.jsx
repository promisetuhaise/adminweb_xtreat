import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RecentTransactions from "../components/transactions";

// Dummy data for the entire year (Revenue)
const dummyRevenueData = [
  { date: "2025-01", revenue: 4000 },
  { date: "2025-02", revenue: 3000 },
  { date: "2025-03", revenue: 5000 },
  { date: "2025-04", revenue: 7000 },
  { date: "2025-05", revenue: 6000 },
  { date: "2025-06", revenue: 8000 },
  { date: "2025-07", revenue: 6500 },
  { date: "2025-08", revenue: 7200 },
  { date: "2025-09", revenue: 7800 },
  { date: "2025-10", revenue: 8200 },
  { date: "2025-11", revenue: 9000 },
  { date: "2025-12", revenue: 9500 },
];

// Dummy data for Total Sales Volume (Cumulative Sales)
const dummySalesData = [
  { date: "2025-01", salesVolume: 10000 },
  { date: "2025-02", salesVolume: 8000 },
  { date: "2025-03", salesVolume: 12000 },
  { date: "2025-04", salesVolume: 18000 },
  { date: "2025-05", salesVolume: 13000 },
  { date: "2025-06", salesVolume: 17000 },
  { date: "2025-07", salesVolume: 16000 },
  { date: "2025-08", salesVolume: 18000 },
  { date: "2025-09", salesVolume: 19000 },
  { date: "2025-10", salesVolume: 20000 },
  { date: "2025-11", salesVolume: 21000 },
  { date: "2025-12", salesVolume: 22000 },
];

// Dummy vendor stats
const dummyVendorStats = {
  totalVendors: 120,
  applications: 50,
  pendingPayouts: 20,
  loanRequests: 10,
};

const AnalyticsCharts = ({
  formattedDate,
  vendorStats = dummyVendorStats,
  revenueData = dummyRevenueData,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Debugging vendor stats: log total vendors whenever it changes
  useEffect(() => {
    console.log("Total Vendors:", vendorStats?.totalVendors || 0);
  }, [vendorStats?.totalVendors]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Compute baseline for revenue chart based on selected month
  const baselineRevenue =
    selectedMonth !== "All"
      ? revenueData.find((d) => d.date === selectedMonth)?.revenue
      : null;

  const revenueChartData = revenueData.map((item) => ({
    ...item,
    baseline: baselineRevenue,
  }));

  // Compute baseline for sales chart based on selected month
  const baselineSales =
    selectedMonth !== "All"
      ? dummySalesData.find((d) => d.date === selectedMonth)?.salesVolume
      : null;

  const salesChartData = dummySalesData.map((item) => ({
    ...item,
    baseline: baselineSales,
  }));

  return (
    <div className="font-poppins text-[10px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Left Card: Total Sales Volume & Revenue Charts */}
        <div className="bg-white rounded shadow p-6">
          {/* Total Sales Volume Bar Chart */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-500 text-[12px]">
                Total Sales Volume
              </h3>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border rounded p-1 text-[10px]"
              >
                <option value="All">All Months</option>
                {dummySalesData.map((item) => (
                  <option key={item.date} value={item.date}>
                    {item.date}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar
                  dataKey="salesVolume"
                  fill="#f9622c"
                  stroke="#f9622c"
                  name="Sales Volume"
                />
                {baselineSales && (
                  <Bar
                    dataKey="baseline"
                    fill="#fff"
                    stroke="#f9622c"
                    name={`Baseline (${selectedMonth})`}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Area Chart below Total Sales Volume */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-500 text-[12px]">
                Revenue
              </h3>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border rounded p-1 text-[10px]"
              >
                <option value="All">All Months</option>
                {revenueData.map((item) => (
                  <option key={item.date} value={item.date}>
                    {item.date}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#280300"
                  fill="#f9622c"
                  name="Revenue"
                />
                {baselineRevenue && (
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="#f9622c"
                    fill="#fff"
                    name={`Baseline (${selectedMonth})`}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Card: Vendor Stats and Recent Transactions */}
        <div className="grid grid-cols-1">
          {/* Vendor Stats Cards */}
          <div className="grid grid-cols-2 gap-2">
            {/* Vendor Card 1: Total Vendors */}
            <div className="bg-white rounded shadow p-4 h-28 flex flex-col justify-center items-center">
              <p className="text-[#280300] font-bold text-[18px]">
                {vendorStats?.totalVendors || 0}
              </p>
              <p className="text-[13px] font-semibold text-gray-500">
                Total Vendors
              </p>
              <p className="text-[10px] text-green-700">for {formattedDate}</p>
            </div>
            {/* Vendor Card 2: Applications */}
            <div className="bg-white rounded shadow p-4 h-28 flex flex-col justify-center items-center">
              <p className="text-[#280300] font-bold text-[18px]">
                {vendorStats?.applications || 0}
              </p>
              <p className="text-[13px] font-semibold text-gray-500">
                Applications
              </p>
              <p className="text-[10px] text-green-700">for {formattedDate}</p>
            </div>
            {/* Vendor Card 3: Pending Payouts */}
            <div className="bg-white rounded shadow p-4 h-28 flex flex-col justify-center items-center">
              <p className="text-[#280300] font-bold text-[18px]">
                {vendorStats?.pendingPayouts || 0}
              </p>
              <p className="text-[13px] font-semibold text-gray-500">
                Pending Payouts
              </p>
              <p className="text-[10px] text-green-700">for {formattedDate}</p>
            </div>
            {/* Vendor Card 4: Loan Requests */}
            <div className="bg-white rounded shadow p-4 h-28 flex flex-col justify-center items-center">
              <p className="text-[#280300] font-bold text-[18px]">
                {vendorStats?.loanRequests || 0}
              </p>
              <p className="text-[13px] font-semibold text-gray-500">
                Loan Requests
              </p>
              <p className="text-[10px] text-green-700">for {formattedDate}</p>
            </div>
          </div>

          {/* Recent Transactions Component */}
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
