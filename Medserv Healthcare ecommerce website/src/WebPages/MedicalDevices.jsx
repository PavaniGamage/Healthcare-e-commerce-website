import React from 'react'
import './WebPages CSS/Wellness.css'
import MedicalDevicesLeftMargin from '../Components/ShopPages/Common/LeftMarginForShop/MedicalDevicesLeftMargin.jsx'
import MedicalDevicesShop from '../Components/ShopPages/Common//Shop/MedicalDevicesShop.jsx'


const MedicalDevices = () => {
  return (
    <div className="wellness-container">
        <MedicalDevicesLeftMargin/>
        <MedicalDevicesShop/>
    </div>
  )
}

export default MedicalDevices