import React from 'react';
import { FiShoppingCart } from "react-icons/fi";

function LowerBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-darkBlue sm:p-2">
      {/* Left part - Empty */}
      <div className="flex-1"></div>
      
      {/* Middle part - Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          className="w-full h-8  max-w-lg p-2 pl-4 border bg-white rounded-3xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Right part - Buttons */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <button className="bg-darkYellow text-sm font-md text-white px-5 py-1 rounded-3xl hover:bg-yellow transition-colors">
          Upload Prescription
        </button>
        <div className="text-white font-bold px-4 py-2 hover:text-darkYellow transition-colors">
  <FiShoppingCart className="text-xl hover:cursor-pointer" />
</div>

      </div>
    </div>
  );
}

export default LowerBar;

