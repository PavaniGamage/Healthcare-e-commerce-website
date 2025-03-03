import React from "react";
import fulfilledData from "./fulfilled.json";

const FulfilledCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-14 mt-20 space-x-6">
        <a
          href="/make-donation"
          className="px-7 py-3 text-2xl font-bold text-gray-500 hover:text-darkBlue no-underline hover:underline"
          style={{ textUnderlineOffset: "10px" }}
        >
          Looking For Support
        </a>

        <a
          href="/fulfilled-donation"
          className="px-7 py-3 text-2xl font-bold text-gray-500 hover:text-darkBlue no-underline hover:underline"
          style={{ textUnderlineOffset: "10px" }}
        >
          Fulfilled
        </a>
      </div>

      {/* Fulfilled Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        {fulfilledData.map((donation) => (
          <div
            key={donation.id}
            className="border-2 border-darkBlue bg-green-50 rounded-lg p-6 shadow-md text-center"
          >
            <img
              src={donation.image}
              alt={`Donation request for ${donation.amount}`}
              className="w-full h-60 object-cover mb-1 rounded"
            />
            <p className="text-sm">
              Amount:{" "}
              <span className="text-green font-semibold text-lg">
                {donation.amount}
              </span>
            </p>
            <p className="text-sm">
              Requested on:{" "}
              <span className="text-black text-medium">
                {donation.requestedDate}
              </span>
            </p>
            {/* Replacing Donate button with a checkmark ✅ */}
            <div className="text-3xl text-green-650 mt-2">✅</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FulfilledCard;
