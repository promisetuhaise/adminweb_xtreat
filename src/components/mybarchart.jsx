import React from "react";
import { Bar } from "react-chartjs-2";

const MyBarChart = ({ data, chartWidth }) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: chartWidth, height: 250, borderRadius: 10 }}>
      <Bar key={JSON.stringify(data)} data={data} options={options} />
    </div>
  );
};

export default MyBarChart;
