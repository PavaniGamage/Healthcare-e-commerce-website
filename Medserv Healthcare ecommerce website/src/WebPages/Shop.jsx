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
  const location = useLocation();
  
  // when change the location set the keyword
  useEffect(() => {
    setQuery('');
  }, [location.pathname]); 

  // Define the onSearch function
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  };
  console.log("Keyword receive to shop.jsx:" , queryKeyword);

  return (
    <div className='shop-container'> 
      <div className='left-margin'>
          {(() => {
            switch (category1) {
              case "Wellness":
                return <WellnessLeftMargin onSearch={handleSearch}/>;
              case "MedicalDevices":
                return <MedicalDevicesLeftMargin onSearch={handleSearch}/>;
              case "PersonalCare":
                return <PersonalCareLeftMargin onSearch={handleSearch}/>;
              case "Rent":
                return <RentLeftMargin onSearch={handleSearch}/>;
              default:
                return null;
            }
          })()}
      </div> 

      <div className='shop'>
        <ShopShop category1={category1} queryKeyword={queryKeyword}/>
      </div>        
    </div>
  )
}

export default Shop