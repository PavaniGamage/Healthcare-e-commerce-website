import React, { useEffect, useState } from 'react';
import './Shop.css';
import Pagination from './Components/Pagination.jsx';
import Item from '../Item/Item.jsx';
import ItemForRent from '../Item/ItemForRent.jsx';
import createProductsArray from '../../../Assets/Shop/AllProducts/AllProducts.js';
import { FaAngleDown } from 'react-icons/fa';

const ShopForSearch = ({ queryForSearch, queryMinPrice, queryMaxPrice }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction (ascending)  
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await createProductsArray();
      setAllProducts(products);
    };

    fetchProducts();
  }, [queryForSearch]);

  // Filter products based on the search query
  const filteredProducts1 = allProducts.filter(item =>
    item.name?.toLowerCase().includes(queryForSearch.toLowerCase()) ||
    item.keywords.toLowerCase().includes(queryForSearch.toLowerCase()) ||
    item.availability?.toLowerCase().includes(queryForSearch.toLowerCase()) ||
    item.category2?.toLowerCase().includes(queryForSearch.toLowerCase())  
  );

  let filteredProducts = filteredProducts1;

  // Default values for min and max price
  const minPrice = Number(queryMinPrice) || 0; 
  const maxPrice = Number(queryMaxPrice) || Infinity;
  
  // filter based on min max prices
  if (queryMaxPrice || queryMinPrice) {
    filteredProducts = filteredProducts.filter(item => {
      return item.price > minPrice && item.price < maxPrice;
    });
  }

  // Sorting logic
  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        comparison = nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  // Apply sorting
  const sortedProducts = sortProducts(filteredProducts);

  // Pagination: Calculate the current items to display
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='shop'>
      <div className='sort'>
        <div className='category-index-sort'>
          <p>
            <span>Displaying {currentProducts.length} </span> out of {filteredProducts.length} products
          </p>
        </div>
        <div className='category-sort'>
          <p>Sort by</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='appearance-none border border-gray-300 rounded-lg p-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          {/* <FaAngleDown className='category-sort-FaAngleDown' /> */}
          <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
            {sortDirection === 'asc' ? 'ASC' : 'DESC'}
          </button>
        </div>
      </div>

      <div className='filters'>
        <p>Filters: </p>
        <div>
          <dl className='sort-filters-words'>
            {queryForSearch && <dd>{queryForSearch}</dd>} 
            {queryMinPrice !== undefined && <dd>Min Price: {queryMinPrice <= 0 ? 0 : queryMinPrice}</dd>}
            {queryMaxPrice && <dd>Max Price: {queryMaxPrice > 100000 ? 100000 : queryMaxPrice}</dd>}
          </dl>
        </div>
      </div>

      <div className='shop-items-container'>        
        {currentProducts.length > 0 ? (
          <div className='shop-items'>
            { currentProducts.map((item, i) => (
              item.itemType === 'Rent' ? (
                <ItemForRent key={i} {...item} />
              ) : (
                <Item key={i} {...item} />
              )
            )) } 
          </div>
        ) : (
          <div className='shop-items-p'>
            <p>No products found for "{queryForSearch}"</p>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ShopForSearch; 