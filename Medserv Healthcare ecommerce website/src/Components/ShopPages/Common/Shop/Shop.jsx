import React, { useEffect, useState } from 'react';
import './Shop.css';
import Pagination from './Components/Pagination.jsx';
import Item from '../Item/Item.jsx';
import ItemForRent from '../Item/ItemForRent.jsx';
import createProductsArray from '../../../Assets/Shop/AllProducts/AllProducts.js';
import { FaAngleDown } from 'react-icons/fa';

const Shop = ({ category1, queryKeyword }) => {
  const [allProducts, setAllProducts] = useState([]); // for fetching data
  const [currentPage, setCurrentPage] = useState(1);  // for pagination
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction (ascending)  
  const productsPerPage = 20;

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await createProductsArray();
      setAllProducts(products);
      console.log(products);
    };

    fetchProducts();
  }, []); 

  // Filter products based on the category
  const filteredProducts1 = allProducts.filter(item => item.category1 === category1);
  
  // Filter products based on the search keyword
  console.log("Search term received in LeftMargin:", queryKeyword);
  const filteredProducts2 = allProducts.filter(item =>
    item.name?.toLowerCase().includes(queryKeyword.toLowerCase()) ||
    item.keywords.toLowerCase().includes(queryKeyword.toLowerCase()) ||
    item.availability?.toLowerCase().includes(queryKeyword.toLowerCase()) 
  );

  // Conditional filtering based on whether the queryKeyword is empty
  const filteredProducts = queryKeyword.trim() === "" ? filteredProducts1 : filteredProducts2;

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

      <div className='shop-items'>
        {currentProducts.map((item, i) => {
          if (category1 === 'Rent') {
            if (category1 === item.category1) {
              return (
                <ItemForRent
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  category1={item.category1}
                  category2={item.category2}
                  dailyRental={item.DaillyRental}
                />
              );
            } else {
              return null;
            }
          } else {
            if (category1 === item.category1) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  category1={item.category1}
                  category2={item.category2}
                />
              );
            } else {
              return null;
            }
          }
        })}
      </div>

      {/* <div className='lordmore'>
        <p>Explore more</p>
        <FaAngleDown className='category-sort-FaAngleDown' />
      </div> */}
       {/* Pagination Component */}
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Shop;
