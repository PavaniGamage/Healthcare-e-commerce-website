import React from 'react'
import './LeftMargin.css'

const LeftMargin = () => {
  return (
    <div className='left-margin-for-shop'>
        <div className='lists'>
            <div className='wellness'>
                <h1>Wellness</h1>
                <ul>
                    <li>Diet & Nutition</li>
                    <li>Mother & Baby</li>
                    <li>Adults & Dieabetic Care</li>
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

export default LeftMargin