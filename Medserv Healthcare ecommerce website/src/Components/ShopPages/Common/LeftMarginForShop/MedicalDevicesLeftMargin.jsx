import React,  { useState } from 'react'
import './LeftMarginForShop.css'

const MedicalDevicesLeftMargin = ({onSearch}) => {
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
                <h1>Medical Devices</h1>
                <ul>
                    <li>First Aid</li>
                    <li>Diagnostic Devices</li>
                    <li>Personal Protective Devices</li>
                    <li>Other</li>
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

export default MedicalDevicesLeftMargin