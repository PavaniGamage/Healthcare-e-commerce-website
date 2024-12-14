import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './WebPages CSS/Shop.css'
import PersonalCareLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/PersonalCareLeftMargin.jsx'
import WellnessLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/WellnessLeftMargin.jsx'
import MedicalDevicesLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/MedicalDevicesLeftMargin.jsx'
import RentLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/RentLeftMargin.jsx'
import ShopShop from '../Components/ShopPages/Common//Shop/Shop.jsx'

const Shop = ({category1}) => {
  // Define the state for query
  const [queryKeyword, setQuery] = useState('');
  const [queryMinPrice, setQueryMinPrice] = useState('');
  const [queryMaxPrice, setQueryMaxPrice] = useState('');
  const [queryCategory2, setQueryCategory2] = useState('');
  const location = useLocation();
  
  // when change the location set the keyword
  useEffect(() => {
    setQuery('');
    setQueryMinPrice('');
    setQueryMaxPrice('');
    setQueryCategory2('');
    console.log('Filters reset due to location or category change.');
  }, [location.pathname]); 

  // Handle search term
  const handleSearch = (searchTerm) => {
    console.log('Main Shop received keyword: ', searchTerm);
    setQuery(searchTerm);
  };

  // Handle price range
  const handlePrice = (minPrice, maxPrice) => {
    console.log('Main Shop received price range: ', minPrice, '-', maxPrice);
    setQueryMinPrice(minPrice);
    setQueryMaxPrice(maxPrice);
  };

  // Handle selected category
  const handleCategory2 = (category2) => {
    console.log('Main Shop received category2: ', category2);
    setQueryCategory2(category2);
  };

  return (
    <div className='shop-container'> 
      <div className='left-margin'>
          {(() => {
            switch (category1) {
              case "Wellness":
                return <WellnessLeftMargin onSearch={handleSearch} onPrice={handlePrice} onCateory2={handleCategory2}/>;
              case "MedicalDevices":
                return <MedicalDevicesLeftMargin onSearch={handleSearch} onPrice={handlePrice} onCateory2={handleCategory2}/>;
              case "PersonalCare":
                return <PersonalCareLeftMargin onSearch={handleSearch} onPrice={handlePrice} onCateory2={handleCategory2}/>;
              case "Rent":
                return <RentLeftMargin onSearch={handleSearch} onPrice={handlePrice} onCateory2={handleCategory2}/>;
              default:
                return null;
            }
          })()}
      </div> 

      <div className='shop'>
        <ShopShop 
          category1={category1} 
          queryKeyword={queryKeyword}
          queryMinPrice={queryMinPrice}
          queryMaxPrice={queryMaxPrice}
          queryCategory2={queryCategory2}/>
      </div>        
    </div>
  )
}

export default Shop