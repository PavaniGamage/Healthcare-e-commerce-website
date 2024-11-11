import React, { useEffect, useState } from 'react';
import './WebPages CSS/Shop.css'
import { useLocation } from 'react-router-dom';
import Shop from '../Components/ShopPages/Common/Shop/ShopForSearch';
import LeftMarginForSearchProducts from '../Components/ShopPages/Common/LeftMarginForShop/LeftMarginForSearchProducts';

const SearchProducts = ({}) => {
  const location = useLocation();

  // Get the query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // Set the query
  const [queryForSearch, setQuery] = useState(query);

  useEffect(() => {
    setQuery(query); 
  }, [query]);
  
  return (
    <div className='shop-container'> 
        <div className='left-margin'>
            <LeftMarginForSearchProducts/>
        </div>
        <div className='shop'>
            <Shop queryForSearch={queryForSearch}/>
        </div>
    </div>
  )
}

export default SearchProducts