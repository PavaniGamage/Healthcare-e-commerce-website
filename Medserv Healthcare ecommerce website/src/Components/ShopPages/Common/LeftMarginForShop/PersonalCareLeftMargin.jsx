import React from 'react'
import './LeftMarginForShop.css'

const PersonalCareLeftMargin = () => {
  return (
    <div className='left-margin-for-shop'>
        <div className='lists'>
            <div className='wellness'>
                <h1>Personal Care</h1>
                <ul>
                    <li>Nourishment</li>
                    <li>Skin Care</li>
                    <li>Hair Treating</li>
                    <li>Hygiene</li>
                    <li>Other</li>
                </ul>
            </div>
            <div className='brands'>
                <h1>Brands</h1>
                <ul>
                    <li><input type="radio" name="Brands 1" value="Brands 1"/>Brands 1</li>
                    <li><input type="radio" name="Brands 2" value="Brands 2"/>Brands 2</li>
                    <li><input type="radio" name="Brands 3" value="Brands 3"/>Brands 3</li>
                </ul>
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

export default PersonalCareLeftMargin