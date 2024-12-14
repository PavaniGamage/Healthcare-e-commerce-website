import React, { useEffect, useState } from 'react';
import './WebPages CSS/Shop.css'
import { useLocation } from 'react-router-dom';
import Shop from '../Components/ShopPages/Common/Shop/ShopForSearch';
import LeftMarginForSearchProducts from '../Components/ShopPages/Common/LeftMarginForShop/LeftMarginForSearchProducts';

const SearchProducts = ({}) => {
  const location = useLocation();
  const [queryMinPrice, setQueryMinPrice] = useState('');
  const [queryMaxPrice, setQueryMaxPrice] = useState('');

  // Get the query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // Set the query
  const [queryForSearch, setQuery] = useState(query);

  useEffect(() => {
    setQuery(query); 
    setQueryMinPrice('');
    setQueryMaxPrice('');
    console.log('Filters reset due to location or category change.');
  }, [query]);

  // Define the onSearch function
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  };

  // Handle price range
  const handlePrice = (minPrice, maxPrice) => {
    console.log('Main Shop received price range: ', minPrice, '-', maxPrice);
    setQueryMinPrice(minPrice);
    setQueryMaxPrice(maxPrice);
  };
  
  return (
    <div className='shop-container'> 
        <div className='left-margin'>
            <LeftMarginForSearchProducts onSearch={handleSearch} onPrice={handlePrice}/>
        </div>
        <div className='shop'>
            <Shop queryForSearch={queryForSearch} queryMinPrice={queryMinPrice} queryMaxPrice={queryMaxPrice}/>
        </div>
    </div>
  )
}

export default SearchProducts