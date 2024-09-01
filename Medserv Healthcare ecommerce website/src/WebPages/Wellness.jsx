import React from 'react'
import './WebPages CSS/Wellness.css'
import WellnessLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/WellnessLeftMargin.jsx'
import WellnessShop from '../Components/ShopPages/Common//Shop/WellnessShop.jsx'

const Wellness = () => {
  return (
    <div className="wellness-container">
        <WellnessLeftMargin/>
        <WellnessShop/>
    </div>
  )
}

export default Wellness