import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const RentLeftMargin = ({onSearch, onPrice, onCateory2}) => {
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
                    <h1>Equipment Rent</h1>
                    <ul>
                        <li onClick={() => handleCategoryClick('Mobility')}>Mobility</li>
                        <li onClick={() => handleCategoryClick('Daily Living AIDs')}>Daily Living AIDs</li>
                        <li onClick={() => handleCategoryClick('Bathroom Safety')}>Bathroom Safety</li>
                        <li onClick={() => handleCategoryClick('Other')}>Other</li>
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

export default RentLeftMargin