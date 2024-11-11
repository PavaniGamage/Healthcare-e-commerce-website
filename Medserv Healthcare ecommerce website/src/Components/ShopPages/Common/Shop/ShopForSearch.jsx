import React, { useEffect, useState } from 'react';
import './Shop.css';
import Item from '../Item/Item.jsx';
import ItemForRent from '../Item/ItemForRent.jsx';
import createProductsArray from '../../../Assets/Shop/AllProducts/AllProducts.js';
import { FaAngleDown } from 'react-icons/fa';

const ShopForSearch = ({ queryForSearch  }) => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await createProductsArray();
      setAllProducts(products);
      console.log(products);
      console.log( "Received for Search in Shop:", {queryForSearch});
    };

    fetchProducts();
  }, [queryForSearch]); 

  // Filter products based on the search query
  const filteredProducts = allProducts.filter(item =>
    item.name.toLowerCase().includes(queryForSearch.toLowerCase())
  );

  return (
    <div className='shop'>
      <div className='sort'>
        <div className='category-index-sort'>
          <p>
            <span>Displaying {filteredProducts.length} </span> out of {allProducts.length} products
          </p>
        </div>
        <div className='category-sort'>
          <p>Sort by</p>
          <FaAngleDown className='category-sort-FaAngleDown' />
        </div>
      </div>

      <div className='shop-items'>
        
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => {
            if (item.itemType === 'Rent') {
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
                )
              } })
        ) : (
          <p>No products found for "{queryForSearch}"</p>
        )}
      </div>

      <div className='lordmore'>
        <p>Explore more</p>
        <FaAngleDown className='category-sort-FaAngleDown' />
      </div>
    </div>
  );
};

export default ShopForSearch;