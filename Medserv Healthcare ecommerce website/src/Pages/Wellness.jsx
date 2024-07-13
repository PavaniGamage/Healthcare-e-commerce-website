import React from 'react'
import './PagesStyles/Wellness.css'
import LeftMargin from '../Components/WellnessPage/LeftMargin/LeftMargin.jsx'
import Shop from '../Components/WellnessPage/Shop/Shop.jsx'

function Wellness() {
  return (
    <div className="wellness-container">
        <LeftMargin/>
        <Shop/>
    </div>
  )
}

export default Wellness