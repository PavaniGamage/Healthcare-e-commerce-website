import React from 'react'
import './WebPages CSS/Wellness.css'
import PersonalCareLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/PersonalCareLeftMargin.jsx'
import PersonalCareShop from '../Components/ShopPages/Common//Shop/PersonalCareShop.jsx'


const PersonalCare = () => {
  return (
    <div className="wellness-container">
        <PersonalCareLeftMargin/>
        <PersonalCareShop/>
    </div>
  )
}

export default PersonalCare