import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes  } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);

    // Navigate to search results page with query
    onSearch(searchTerm);
    navigate(`/search_products?query=${searchTerm}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex ml-auto mr-[calc(-25vw)] items-center relative navBar-search">
        <form onSubmit={handleSearchSubmit}>
          <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-[10px_30px] w-[40vw] rounded-full box-border focus:outline-none pl-10"
              placeholder="Search..."
          />
          <div className="absolute right-8 top-[0.6rem] flex items-center">
              <div className="w-4 h-[1.6rem] items-center align-middle">
                {searchTerm && (
                <FaTimes
                    className="text-gray-500 cursor-pointer w-4 h-4 hover:text-blue-500"
                    onClick={clearSearch}
                />
                )}
              </div>                            
              <div className="w-4 h-[1.5rem] items-center align-middle">
                <FaSearch
                  className="ml-4 bottom-3 text-gray-500 cursor-pointer w-4 h-4 hover:text-blue-500"
                  onClick={handleSearchSubmit}
                /> 
              </div>             
          </div>
        </form>
    </div>
  );
};

export default SearchBar;
