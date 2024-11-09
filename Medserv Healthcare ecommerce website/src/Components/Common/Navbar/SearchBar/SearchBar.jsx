import React, { useState } from 'react';
import { FaAlignCenter, FaSearch, FaTimes  } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex ml-auto mr-[calc(-25vw)] items-center relative navBar-search">
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-[10px_30px] w-[40vw] rounded-full box-border focus:outline-none pl-10"
            placeholder="Search..."
        />
        <div className="absolute right-5 top-3 transform -translate-y-0 flex items-center">
            {searchTerm && (
            <FaTimes
                className="text-gray-500 cursor-pointer w-4 h-4 hover:text-blue-500"
                onClick={clearSearch}
            />
            )}
            <FaSearch
              className="ml-3.5 bottom-3 text-gray-500 cursor-pointer w-4 h-4 hover:text-blue-500"
              onClick={handleSearchSubmit}
            />
        </div>
    </div>
  );
};

export default SearchBar;
