import React from 'react'
import './LeftMarginForShop.css'

const LeftMarginForSearchProducts = () => {
  return (
    <div className='left-margin-for-shop'>
        <div className='lists'>
            <div className='wellness'>
                <h1>Categories</h1>
                <ul>
                    <li>Wellness</li>
                    <li>Medical Devices</li>
                    <li>Personal Care</li>
                    <li>Rent</li>
                </ul>
            </div>
            <div className='brands'>
                <h1>Keywords</h1>
                <div className='keyword-list'>
                    <p>Mother & Baby</p>
                    <p>Adult Care</p>
                    <p>Diabetic</p>
                    <p>First Aid</p>
                    <p>Personal Protective</p>
                    <p>Diagnostic Devices</p>
                    <p>Skin Care</p>
                    <p>Beauty</p>
                    <p>Hygiene</p>
                    <p>Mobility</p>
                </div>
            </div>
            <div className='price'>
                <h1>Price</h1>
                <dl>
                    <dt>Min</dt>
                    <dd><input type='number'/></dd>
                    <p> - </p>
                    <dt>Max</dt>
                    <dd><input type='number'/></dd>
                </dl>
            </div>
        </div>

        <div className='horizontal-hr'>
            <hr/>
        </div>
    </div>
  )
}

export default LeftMarginForSearchProducts