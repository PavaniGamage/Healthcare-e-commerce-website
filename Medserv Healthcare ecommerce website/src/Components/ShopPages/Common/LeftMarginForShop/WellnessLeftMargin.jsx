import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const Wellness = ({onSearch, onPrice, onCateory2}) => {
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
                    <h1>Wellness</h1>
                    <ul>
                        <li onClick={() => handleCategoryClick('Diet & Nutrition')}>Diet & Nutrition</li>
                        <li onClick={() => handleCategoryClick('Mother & Baby')}>Mother & Baby</li>
                        <li onClick={() => handleCategoryClick('Adults & Diabetic Care')}>Adults & Diabetic Care</li>
                    </ul> 
                </div>
                <div className='brands'>
                    <h1>Keywords</h1>
                    <div className='keyword-list'>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Baby')}>Baby</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diabetic')}>Diabetic</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Supplements')}>Supplements</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Sleep Masks')}>Sleep Masks</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Baby Lotion')}>Baby Lotion</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Blood Pressure')}>Blood Pressure</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diapers')}>Diapers</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Adult')}>Adult Care</p>
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

export default Wellness