import React from 'react'
import './WebPages CSS/Wellness.css'
import RentLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/RentLeftMargin.jsx'
import RentShop from '../Components/ShopPages/Common//Shop/RentShop.jsx'


const Rent = () => {
  return (
    <div className="wellness-container">
        <RentLeftMargin/>
        <RentShop/>
    </div>
  )
}

export default Rent
