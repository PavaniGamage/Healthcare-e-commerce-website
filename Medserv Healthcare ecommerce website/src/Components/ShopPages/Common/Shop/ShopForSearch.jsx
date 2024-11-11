import React, { useEffect, useState } from 'react';
import './Shop.css';
import Pagination from './Components/Pagination.jsx';
import Item from '../Item/Item.jsx';
import ItemForRent from '../Item/ItemForRent.jsx';
import createProductsArray from '../../../Assets/Shop/AllProducts/AllProducts.js';
import { FaAngleDown } from 'react-icons/fa';

const ShopForSearch = ({ queryForSearch }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await createProductsArray();
      setAllProducts(products);
    };

    fetchProducts();
  }, [queryForSearch]);

  // Filter products based on the search query
  const filteredProducts = allProducts.filter(item =>
    item.name.toLowerCase().includes(queryForSearch.toLowerCase())
  );

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
        {currentProducts.length > 0 ? (
          currentProducts.map((item, i) => (
            item.itemType === 'Rent' ? (
              <ItemForRent key={i} {...item} />
            ) : (
              <Item key={i} {...item} />
            )
          ))
        ) : (
          <p>No products found for "{queryForSearch}"</p>
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