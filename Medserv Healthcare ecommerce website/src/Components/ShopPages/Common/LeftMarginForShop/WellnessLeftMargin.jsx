import React,  { useState } from 'react'
import './LeftMarginForShop.css'
import { Link, useNavigate } from "react-router-dom";

const Wellness = ({onSearch}) => {
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
                    <h1>Wellness</h1>
                    <ul>
                        <li>Diet & Nutition</li>
                        <li>Mother & Baby</li>
                        <li>Adults & Dieabetic Care</li>
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

export default Wellness