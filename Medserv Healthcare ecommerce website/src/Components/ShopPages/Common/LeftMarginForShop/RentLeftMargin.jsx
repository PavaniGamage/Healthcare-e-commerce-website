import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const RentLeftMargin = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (event, keyword = searchTerm) => {
        event.preventDefault();
        console.log("Searching for:", keyword);

        // Perform search using the keyword
        onSearch(keyword);
    };

  return (
    <div className='left-margin-for-shop'>
        <div className='lists'>
            <div className='wellness'>
                <h1>Equipment Rent</h1>
                <ul>
                    <li>Mobility</li>
                    <li>Daily Living AIDs</li>
                    <li>Bathroom Safety</li>
                    <li>Other</li>
                </ul>
            </div>
            <div className='brands'>
                <h1>Keywords</h1>
                <div className='keyword-list'>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Wheelchair')}>Wheelchair</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Mobility Aids')}>Mobility Aids</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Rent')}>Rent</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Equipment ')}>Equipment</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Oxygen Concentrator')}>Oxygen Concentrator</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Hygiene & Sanitation')}>Hygiene & Sanitation</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diagnostics')}>Diagnostics</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Walker')}>Walker</p>
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

export default RentLeftMargin