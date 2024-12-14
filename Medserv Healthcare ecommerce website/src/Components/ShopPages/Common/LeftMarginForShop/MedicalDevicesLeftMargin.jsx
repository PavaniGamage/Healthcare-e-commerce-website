import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const MedicalDevicesLeftMargin = ({onSearch, onPrice, onCateory2}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchSubmit = (event, keyword = searchTerm) => {
        event.preventDefault();
        console.log("Searching for:", keyword);
        onSearch(keyword);
    };

    const handleCategoryClick = (category2) => {
        console.log("Selected category2 passed by Left-Margin:", category2);
        onCateory2(category2); 
    };

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handlePriceSubmit = () => {
        let minPriceValue = minPrice || 0; // Use 0 if minPrice is not set
        let maxPriceValue = maxPrice || Number.MAX_SAFE_INTEGER; // Use a large number if maxPrice is not set
    
        console.log("Price range passed by left-margin:", { min: minPriceValue, max: maxPriceValue });
    
        // Pass these values to a parent component or use them for search
        onPrice(minPriceValue ,maxPriceValue);
    };   

  return (
    <div className='left-margin-for-shop'>
        <div className='lists'>
            <div className='wellness'>
                <h1>Medical Devices</h1>
                <ul>
                    <li onClick={() => handleCategoryClick('First Aid')}>First Aid</li>
                    <li onClick={() => handleCategoryClick('Diagnostic Devices')}>Diagnostic Devices</li>
                    <li onClick={() => handleCategoryClick('Personal Protective Devices')}>Personal Protective Devices</li>
                    <li onClick={() => handleCategoryClick('Other')}>Other</li>
                </ul>
            </div>
            <div className='brands'>
                <h1>Keywords</h1>
                <div className='keyword-list'>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Surgical')}>Surgical Instruments</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'First Aid')}>First Aid</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Injection')}>Injection</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Wound')}>Wound Care</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Protective')}>Protective Devices</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Plasters')}>Plasters</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Bandages')}>Bandages</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diagnostic Tools')}>Diagnostic Tools</p>
                </div>
            </div>
            <div className='price'>
                <h1>Price</h1>
                <dl>
                    <dt>Min</dt>
                    <dd> <input type='number' onChange={(e) => setMinPrice(e.target.value)}/> </dd>
                    <p> - </p>
                    <dt>Max</dt>
                    <dd> <input type='number' onChange={(e) => setMaxPrice(e.target.value)}/> </dd>
                </dl>
                <button className='btn-apply' onClick={handlePriceSubmit}>Apply</button>
            </div>
        </div>
        

        <div className='horizontal-hr'>
            <hr/>
        </div>
    </div>
  )
}

export default MedicalDevicesLeftMargin