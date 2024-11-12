import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const PersonalCareLeftMargin = ({onSearch}) => {
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
                <h1>Keywords</h1>
                <div className='keyword-list'>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Shampoo')}>Shampoo</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Hand Sanitizers')}>Hand Sanitizers</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Soap')}>Soap</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Mouthwash')}>Mouthwash</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Body Lotion')}>Body Lotion</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Hair')}>Hair Treatments</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Conditioners')}>Conditioners</p>
                    <p className="link-in-margin" onClick={(e) => handleSearchSubmit(e, 'Body Washes')}>Body Washes</p>
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

export default PersonalCareLeftMargin