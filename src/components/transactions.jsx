import React from "react";

const dummyTransactions = [
  {
    name: "Alinatwe Robinah",
    message: "Deposited UGX 20000 into their account",
    time: "2 min ago",
    type: "customer", // Marked as vendor
  },
  {
    name: "Nakungu Esther",
    message: "Withdrew UGX 50000 from her wallet",
    time: "10 min ago",
    type: "customer", // Marked as customer
  },
  {
    name: "Agaba Jennifer",
    message: "Received a payout of UGX 300000",
    time: "30 min ago",
    type: "vendor", // Marked as vendor
  },
  {
    name: "Mike Allen",
    message: "Bought 'Blue T-Shirt' for UGX 250000",
    time: "1 hour ago",
    type: "customer", // Marked as customer
  },
];

const RecentTransactions = ({ transactions = dummyTransactions }) => {
  const getAvatarLetter = (transaction) => {
    return transaction.type === "vendor" ? "V" : "C";
  };

  return (
    <div className="bg-white rounded shadow p-6 mt-2">
      {/* Header */}
      <h2 className="font-semibold text-gray-500 mb-4 text-[12px]">
        Recent Transactions
      </h2>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#f9622c] flex items-center justify-center">
              <span className="text-[#280300] font-semibold text-[15px]">
                {getAvatarLetter(transaction)}
              </span>
            </div>

            {/* Details */}
            <div>
              <p className="text-[#280300] font-semibold text-[11px]">
                {transaction.name}
              </p>
              <p className="text-black-500 text-[10px]">
                {transaction.message}
              </p>
              <p className="text-gray-400 text-[10px]">
                {transaction.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Link */}
      <p className="text-[#f9622c] mt-4 cursor-pointer hover:underline text-[10px]">
        View all
      </p>
    </div>
  );
};

export default RecentTransactions;
