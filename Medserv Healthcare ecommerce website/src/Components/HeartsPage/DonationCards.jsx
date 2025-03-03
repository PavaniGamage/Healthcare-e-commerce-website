import React from "react";
import { useLocation } from "react-router-dom";
import donationsData from "./donations.json";

const DonationCard = () => {
  const location = useLocation();

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-14 mt-20 space-x-6">
        <a
          href="/make-donation"
          className={`px-7 py-3 text-2xl font-bold ${
            location.pathname === "/make-donation"
              ? "text-darkBlue underline"
              : "text-gray-500 hover:text-darkBlue hover:underline"
          }`}
          style={{ textUnderlineOffset: "10px" }}
        >
          Looking For Support
        </a>

        <a
          href="/fulfilled-donation"
          className={`px-7 py-3 text-2xl font-bold no-underline ${
            location.pathname === "/fulfilled-donation"
              ? "text-darkBlue underline"
              : "text-gray-500 hover:text-darkBlue hover:underline"
          }`}
          style={{ textUnderlineOffset: "10px" }}
        >
          Fulfilled
        </a>
      </div>

      {/* Donation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        {donationsData.map((donation) => (
          <div
            key={donation.id}
            className="border-2 border-darkBlue rounded-lg p-6 shadow-md text-center"
          >
            <img
              src={donation.image}
              alt={`Donation request for ${donation.amount}`}
              className="w-full h-60 object-cover mb-1 rounded"
            />
            <p className="text-sm">
              Amount:{" "}
              <span className="text-darkBlue font-semibold text-lg">
                {donation.amount}
              </span>
            </p>
            <p className="text-sm">
              Requested on:{" "}
              <span className="text-black text-medium">
                {donation.requestedDate}
              </span>
            </p>
            <a href="/donation">
              <button
                className="bg-darkBlue text-white px-5 py-1 mt-2 text-base font-medium rounded focus:outline-none cursor-pointer hover:bg-[#3ebfd6]"
                style={{ border: "none" }}
              >
                Donate
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCard;
