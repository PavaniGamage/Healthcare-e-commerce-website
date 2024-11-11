import React, { useEffect, useState } from 'react';
import './Shop.css';
import Pagination from './Components/Pagination.jsx';
import Item from '../Item/Item.jsx';
import ItemForRent from '../Item/ItemForRent.jsx';
import createProductsArray from '../../../Assets/Shop/AllProducts/AllProducts.js';
import { FaAngleDown } from 'react-icons/fa';

const Shop = ({ category1 }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const filteredProducts = allProducts.filter(item => item.category1 === category1);

  // Pagination: Calculate the current items to display
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
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
          <FaAngleDown className='category-sort-FaAngleDown' />
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
