import React from 'react'
import './WebPages CSS/Shop.css'
import PersonalCareLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/PersonalCareLeftMargin.jsx'
import WellnessLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/WellnessLeftMargin.jsx'
import MedicalDevicesLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/MedicalDevicesLeftMargin.jsx'
import RentLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/RentLeftMargin.jsx'
import ShopShop from '../Components/ShopPages/Common//Shop/Shop.jsx'


const Shop = ({category1}) => {
  return (
    <div className='shop-container'> 
      <div className='left-margin'>
          {(() => {
            switch (category1) {
              case "Wellness":
                return <WellnessLeftMargin />;
              case "MedicalDevices":
                return <MedicalDevicesLeftMargin />;
              case "PersonalCare":
                return <PersonalCareLeftMargin />;
              case "rent":
                return <RentLeftMargin />;
              default:
                return null;
            }
          })()}
      </div> 

      <div className='shop'>
        <ShopShop category1={category1}/>
      </div>        
    </div>
  )
}

export default Shop