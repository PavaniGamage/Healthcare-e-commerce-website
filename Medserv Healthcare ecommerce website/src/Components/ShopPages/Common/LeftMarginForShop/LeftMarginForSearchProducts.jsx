import React, { useState, useEffect } from 'react';
import './LeftMarginForShop.css'
import { Link, useNavigate } from "react-router-dom";

const LeftMarginForSearchProducts = ({onSearch, onPrice}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event, keyword = searchTerm) => {
        event.preventDefault();
        console.log("Searching for:", keyword);

        // Perform search using the keyword
        onSearch(keyword);

        // Navigate to search results page with query
        navigate(`/search_products?query=${keyword}`);
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
                    <h1>Categories</h1>
                    <ul>
                        <Link className="link-in-margin" to='/wellness'><li>Wellness</li></Link>
                        <Link className="link-in-margin" to='/medical_devices'><li>Medical Devices</li></Link>
                        <Link className="link-in-margin" to='/personal_care'><li>Personal Care</li></Link>
                        <Link className="link-in-margin" to='/rent'><li>Rent</li></Link>
                    </ul>
                </div>
                <div className='brands'>
                    <h1>Keywords</h1>
                    <div className='keyword-list'>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Baby')}>Mother & Baby Care</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Supplements')}>Supplements</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diabetic')}>Diabetic</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'First Aid')}>First Aid</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Personal Protective')}>Personal Protective</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Diagnostic Devices')}>Diagnostic Devices</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Skin Care')}>Skin Care</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Beauty')}>Beauty</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Hygiene')}>Hygiene</p>
                        <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Mobility')}>Mobility</p>
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

export default LeftMarginForSearchProducts